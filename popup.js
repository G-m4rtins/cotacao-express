// API base
const API = 'https://economia.awesomeapi.com.br/json';

let currentPeriod = 7;
let historyData = [];
let globalChartPts = [];

// Auto-refresh
const REFRESH_INTERVAL = 30; // seconds
let countdown = REFRESH_INTERVAL;
let refreshTimer = null;
let countdownTimer = null;

// Helpers
function fmtShort(val) {
  return parseFloat(val).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtDate(ts) {
  const d = new Date(parseInt(ts) * 1000);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
}

function fmtTime(ts) {
  const d = new Date(parseInt(ts) * 1000);
  return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

function setNow() {
  const now = new Date();
  document.getElementById('footerTime').textContent =
    'Atualizado ' + now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

// Fetch current rate
async function fetchRate() {
  const res = await fetch(`${API}/last/USD-BRL`);
  const data = await res.json();
  return data.USDBRL;
}

// Fetch daily history — /daily/USD-BRL/{days} returns one candle per day
async function fetchHistory(days) {
  const res = await fetch(`${API}/daily/USD-BRL/${days}`);
  const data = await res.json();

  // Group by calendar date (keeps latest entry per day) then sort oldest first
  const byDate = {};
  for (const entry of data) {
    const date = new Date(parseInt(entry.timestamp) * 1000)
      .toISOString().slice(0, 10);
    byDate[date] = entry;
  }

  return Object.entries(byDate)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, v]) => v);
}

// Render current rate
function renderRate(r) {
  document.getElementById('rateLoading').style.display = 'none';
  document.getElementById('rateContent').style.display = 'block';

  document.getElementById('rateValue').textContent = fmtShort(r.bid);
  document.getElementById('rateBid').textContent = 'R$ ' + fmtShort(r.bid);
  document.getElementById('rateAsk').textContent = 'R$ ' + fmtShort(r.ask);

  const pct = parseFloat(r.pctChange);
  const sign = pct >= 0 ? '+' : '';
  const badge = document.getElementById('rateBadge');
  badge.textContent = sign + pct.toFixed(2) + '%';
  badge.className = 'rate-badge ' + (pct >= 0 ? 'up' : 'down');

  const changeEl = document.getElementById('rateChange');
  changeEl.textContent = sign + pct.toFixed(2) + '%';
  changeEl.style.color = pct >= 0 ? 'var(--green)' : 'var(--red)';

  document.getElementById('rateTime').textContent = 'às ' + fmtTime(r.timestamp);
}

// Draw chart
function drawChart(data, hoverIndex = -1) {
  if (!data || data.length < 2) return;

  const canvas = document.getElementById('rateChart');
  canvas.style.display = 'block';
  document.getElementById('chartLoading').style.display = 'none';

  const dpr = window.devicePixelRatio || 1;
  const W = 308, H = 180;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width = W + 'px';
  canvas.style.height = H + 'px';

  const c = canvas.getContext('2d');
  c.scale(dpr, dpr);
  c.clearRect(0, 0, W, H);

  const prices = data.map(d => parseFloat(d.bid));
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 0.001;

  const pad = { top: 8, right: 8, bottom: 20, left: 8 };
  const cW = W - pad.left - pad.right;
  const cH = H - pad.top - pad.bottom;

  const pts = prices.map((p, i) => ({
    x: pad.left + i * (cW / (prices.length - 1)),
    y: pad.top + cH - ((p - min) / range) * cH
  }));
  globalChartPts = pts;

  // Gradient fill
  const grad = c.createLinearGradient(0, pad.top, 0, H - pad.bottom);
  grad.addColorStop(0, 'rgba(16, 185, 129, 0.2)');
  grad.addColorStop(1, 'rgba(16, 185, 129, 0)');

  c.beginPath();
  c.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) {
    const cp1x = (pts[i - 1].x + pts[i].x) / 2;
    c.bezierCurveTo(cp1x, pts[i - 1].y, cp1x, pts[i].y, pts[i].x, pts[i].y);
  }
  c.lineTo(pts[pts.length - 1].x, H - pad.bottom);
  c.lineTo(pts[0].x, H - pad.bottom);
  c.closePath();
  c.fillStyle = grad;
  c.fill();

  // Line
  c.beginPath();
  c.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) {
    const cp1x = (pts[i - 1].x + pts[i].x) / 2;
    c.bezierCurveTo(cp1x, pts[i - 1].y, cp1x, pts[i].y, pts[i].x, pts[i].y);
  }
  c.strokeStyle = '#10b981';
  c.lineWidth = 2;
  c.stroke();

  // Last dot
  const last = pts[pts.length - 1];
  c.beginPath();
  c.arc(last.x, last.y, 4, 0, Math.PI * 2);
  c.fillStyle = '#10b981';
  c.fill();
  c.strokeStyle = '#f3f3f3';
  c.lineWidth = 2;
  c.stroke();

  if (hoverIndex >= 0 && hoverIndex < pts.length) {
    const hPt = pts[hoverIndex];
    // Vertical line
    c.beginPath();
    c.moveTo(hPt.x, pad.top);
    c.lineTo(hPt.x, H - pad.bottom);
    c.strokeStyle = 'rgba(16, 185, 129, 0.4)';
    c.lineWidth = 1;
    c.setLineDash([3, 3]);
    c.stroke();
    c.setLineDash([]);
    
    // Hover dot
    c.beginPath();
    c.arc(hPt.x, hPt.y, 5, 0, Math.PI * 2);
    c.fillStyle = '#10b981';
    c.fill();
    c.strokeStyle = '#ffffff';
    c.lineWidth = 2;
    c.stroke();
  }

  // Range labels
  document.getElementById('chartRange').innerHTML =
    `<span>R$ ${fmtShort(min)}</span><span>R$ ${fmtShort(max)}</span>`;
}



// Load everything
async function loadAll(period) {
  if (period !== undefined) currentPeriod = period;

  // Cotação atual
  try {
    const rate = await fetchRate();
    renderRate(rate);
  } catch (e) {
    document.getElementById('rateLoading').innerHTML = '<span class="error-msg">Erro ao carregar cotação</span>';
  }

  document.getElementById('chartLoading').style.display = 'flex';
  document.getElementById('rateChart').style.display = 'none';

  try {
    const hist = await fetchHistory(currentPeriod);
    historyData = hist;
    drawChart(hist);
  } catch (e) {
    document.getElementById('chartLoading').innerHTML = '<span class="error-msg">Erro ao carregar gráfico</span>';
  }

  setNow();
}

// Auto-refresh
function startAutoRefresh() {
  clearInterval(countdownTimer);
  countdown = REFRESH_INTERVAL;
  updateCountdown();

  countdownTimer = setInterval(() => {
    countdown--;
    updateCountdown();
    if (countdown <= 0) {
      countdown = REFRESH_INTERVAL;
      doRefreshRate();
    }
  }, 1000);
}

function updateCountdown() {
  const el = document.getElementById('countdownLabel');
  if (el) el.textContent = `Atualiza em ${countdown}s`;
}

async function doRefreshRate() {
  const btn = document.getElementById('refreshBtn');
  btn.classList.add('spinning');
  try {
    const rate = await fetchRate();
    renderRate(rate);
    setNow();
    flashLive();
  } catch (e) {}
  setTimeout(() => btn.classList.remove('spinning'), 400);
}

function flashLive() {
  const dot = document.getElementById('liveDot');
  if (!dot) return;
  dot.classList.add('pulse');
  setTimeout(() => dot.classList.remove('pulse'), 800);
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  loadAll(7);
  startAutoRefresh();

  const canvas = document.getElementById('rateChart');
  const tooltip = document.getElementById('chartTooltip');

  canvas.addEventListener('mousemove', (e) => {
    if (!globalChartPts.length || !historyData.length) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    
    let closestIdx = 0;
    let minDiff = Infinity;
    for(let i=0; i<globalChartPts.length; i++) {
       const diff = Math.abs(globalChartPts[i].x - mouseX);
       if(diff < minDiff) {
          minDiff = diff;
          closestIdx = i;
       }
    }
    
    const pt = globalChartPts[closestIdx];
    const dataPt = historyData[closestIdx];
    
    tooltip.style.display = 'flex';
    tooltip.style.left = (pt.x + rect.left - canvas.parentElement.getBoundingClientRect().left) + 'px';
    tooltip.style.top = (pt.y + rect.top - canvas.parentElement.getBoundingClientRect().top) + 'px';
    
    document.getElementById('ttDate').textContent = fmtDate(dataPt.timestamp);
    document.getElementById('ttPrice').textContent = 'R$ ' + fmtShort(dataPt.bid);
    
    drawChart(historyData, closestIdx);
  });

  canvas.addEventListener('mouseleave', () => {
    tooltip.style.display = 'none';
    drawChart(historyData, -1);
  });

  document.querySelectorAll('.tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      loadAll(parseInt(btn.dataset.period));
    });
  });

  document.getElementById('refreshBtn').addEventListener('click', () => {
    const btn = document.getElementById('refreshBtn');
    btn.classList.add('spinning');
    countdown = REFRESH_INTERVAL;
    updateCountdown();
    loadAll().finally(() => {
      setTimeout(() => btn.classList.remove('spinning'), 400);
    });
  });
});
