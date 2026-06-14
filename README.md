<div align="center">
  <img src="icons/icon128.png" alt="Dólar Hoje Logo" width="128"/>

  # Dólar Hoje - Chrome Extension
  
  **Uma extensão de navegador rápida e eficiente para monitoramento em tempo real da cotação do Dólar Comercial (USD -> BRL).**

  [![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-4285F4?style=flat-square&logo=google-chrome&logoColor=white)](https://google.com/chrome)
  [![JavaScript Vanilla](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
  [![AwesomeAPI](https://img.shields.io/badge/Data_Provider-AwesomeAPI-22C55E?style=flat-square)](#)
</div>

<br/>

## 📌 Sobre o Projeto

O **Dólar Hoje** é uma extensão projetada para fornecer acesso imediato e ininterrupto à taxa de câmbio atualizada do Dólar Americano frente ao Real Brasileiro. Focado em performance e leveza, o projeto não possui dependências externas de bibliotecas gráficas ou frameworks pesados, utilizando apenas APIs nativas do navegador.

## ✨ Principais Funcionalidades

- **Monitoramento em Tempo Real**: Exibe instantaneamente os valores de bid (compra), ask (venda) e variação percentual.
- **Renderização Gráfica Nativa**: Gráfico histórico de preços renderizado inteiramente através da `Canvas API` (Vanilla JS), com suporte nativo a interatividade, tooltips e cursores rastreadores.
- **Análise Histórica Flexível**: Permite ao usuário filtrar o histórico de cotações por períodos de 7, 15, 30 ou 90 dias com atualização imediata de estado na interface.
- **Sincronização em Background**: Auto-refresh programado a cada 30 segundos, assegurando que o usuário sempre visualize os dados mais recentes do mercado com indicadores visuais responsivos.

## 🛠 Arquitetura e Tecnologias

Este projeto foi desenhado sob uma arquitetura de Client-Side Extension, priorizando baixo consumo de recursos da máquina do usuário:

- **HTML5 & CSS3**: Estruturação semântica e estilização isolada via Custom Properties (variáveis nativas).
- **Vanilla JavaScript (ES6+)**: Lógica de renderização, manipulação de estado local (DOM) e listeners de evento otimizados.
- **Canvas API**: Utilizada para gerar os gráficos dinâmicos sob medida, dispensando o overhead de bibliotecas de terceiros como Chart.js ou D3.
- **Fetch API**: Integração assíncrona com o provedor de dados financeiros.
- **Provedor de Dados**: Integração direta com a [AwesomeAPI](https://docs.awesomeapi.com.br/api-de-moedas) para consumo de cotações de moedas públicas.

## 🚀 Como Instalar e Rodar Localmente

Siga as instruções abaixo para carregar a extensão em modo de desenvolvedor:

1. Clone o repositório ou faça o download dos arquivos compactados:
   ```bash
   git clone https://github.com/seu-usuario/dolar-extension.git
   ```
2. Abra o Google Chrome e acesse o gerenciador de extensões na URL: `chrome://extensions/`.
3. Ative o **Modo do desenvolvedor** através da chave no canto superior direito.
4. Clique no botão **"Carregar sem compactação"** (Load unpacked) na barra superior à esquerda.
5. Selecione o diretório raiz onde o repositório foi salvo no seu computador.
6. A extensão será carregada imediatamente e o ícone do "Dólar Hoje" já estará disponível na sua barra de extensões.

## 📈 Guia de Uso

- Para abrir, clique no ícone da extensão na sua barra do navegador (recomendamos fixar o ícone utilizando o menu de 'Quebra-cabeça' do Chrome).
- Na interface inicial, visualize o preço atual na extremidade superior da tela.
- Posicione o mouse sobre o gráfico em Canvas para ativar o rastreador analítico e inspecionar a cotação exata nos dias passados.
- Alterne entre as abas no menu inferior (7D, 15D, 1M, 3M) para alterar a amplitude temporal dos dados retornados pela API.

## 📄 Licença e Contribuição

Este projeto tem o código aberto. Sinta-se totalmente à vontade para clonar, realizar um *fork*, abrir *issues* com melhorias e sugestões ou contribuir diretamente através de *pull requests*.
