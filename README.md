<div align="center">
  <img src="icons/icon128.png" alt="Dólar Hoje Logo" width="128"/>

  # Dólar Hoje - Extensão para Chrome
  
  **Uma forma minimalista, rápida e elegante de acompanhar a cotação do Dólar Comercial (USD -> BRL).**

  [![Tema](https://img.shields.io/badge/Tema-Minimalista-f3f3f3?style=flat-square&labelColor=1f2937&color=f3f3f3)](https://github.com/)
  [![Cores](https://img.shields.io/badge/Accent-Verde_Pastel-86efac?style=flat-square&labelColor=1f2937&color=86efac)](https://github.com/)
</div>

<br/>

## 🎨 Design & Paleta de Cores
Esta extensão foi construída com foco absoluto em uma experiência de usuário limpa (Clean UI), moderna e com poucas distrações visuais.

| Cor | Hexadecimal | Uso no Layout |
| :---: | :---: | :--- |
| <img src="https://placehold.co/15x15/f3f3f3/f3f3f3.png" width="15" /> | `#f3f3f3` | **Background Principal** - Fundo claro que proporciona leveza visual. |
| <img src="https://placehold.co/15x15/ffffff/ffffff.png" width="15" /> | `#ffffff` | **Superfícies** - Usado nas caixas flutuantes (cards) e botões para criar profundidade com sombras sutis (soft shadows) ao invés de bordas rígidas. |
| <img src="https://placehold.co/15x15/1f2937/1f2937.png" width="15" /> | `#1f2937` | **Texto Principal** - Contraste ideal contra o fundo claro (reduz o cansaço ocular causado pelo preto puro). |
| <img src="https://placehold.co/15x15/86efac/86efac.png" width="15" /> | `#86efac` | **Verde Pastel** - Nossa cor de destaque (accent). Traz energia aos *hovers* e botões de abas ativas. |
| <img src="https://placehold.co/15x15/10b981/10b981.png" width="15" /> | `#10b981` | **Verde Forte (Esmeralda)** - Utilizado como a linha gráfica do histórico, contornos em alto contraste e na nossa logo (Símbolo $) completamente transparente. |

## ✨ Funcionalidades

- **Cotação em Tempo Real**: Visualize os valores de compra, venda e a variação percentual de forma instantânea.
- **Gráfico Interativo (Vanilla Canvas)**: Passe o mouse por cima do gráfico para acionar tooltips dinâmicos que exibem o preço histórico e a respectiva data, acompanhados de cursores rastreadores.
- **Navegação Histórica Fluída**: Explore a variação do dólar ao longo dos últimos 7, 15, 30 ou 90 dias com botões modernos na tela principal.
- **Atualização Contínua (Ao Vivo)**: Ciclo embutido que consulta o preço a cada 30 segundos, exibindo o status piscante de "Ao Vivo".

## 🚀 Como Instalar e Testar

1. Baixe os arquivos desta extensão.
2. Abra seu Google Chrome e digite na URL: `chrome://extensions/`.
3. No canto superior direito, ative o botão deslizante do **Modo do desenvolvedor**.
4. No canto superior esquerdo, clique em **"Carregar sem compactação"**.
5. Selecione a pasta da extensão (onde este `README.md` está localizado).
6. Pronto! Para usá-la, basta clicar no ícone de "Quebra-cabeça" na barra de extensões do Chrome e "Pinar" a extensão `Dólar Hoje`.

## 🛠 Stack de Tecnologias

- **HTML5 & CSS3**: Utilizando propriedades nativas modernas e design sem dependências para maior rapidez (zero bloatware).
- **JavaScript (Vanilla)**: A lógica, os eventos em tela e o desenho do gráfico interativo ocorrem usando a `Canvas API` nativa do browser.
- **AwesomeAPI**: Os dados provêm do serviço público de conversão financeira [AwesomeAPI](https://docs.awesomeapi.com.br/).

---
<div align="center">
  <sub>Construído com elegância, velocidade e minimalismo.</sub>
</div>
