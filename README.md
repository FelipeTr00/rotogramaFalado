# 📌🗺️🧭 Rotograma Falado

Rotograma Falado é uma aplicação web que utiliza **geolocalização** para identificar a posição do usuário e emitir alertas de áudio quando ele se aproxima de determinados pontos. A interface inclui um **Google Maps embutido** e um **sistema de notificações via API TTS (Text-to-Speech)**.

## 🚀 Tecnologias Utilizadas
- **HTML5, CSS3 e Bootstrap 5** para estrutura e estilização
- **JavaScript (ES6+)** para funcionalidade
- **API de Geolocalização** do navegador
- **Web Speech API** para conversão de texto em fala (TTS)
- **Google Maps Iframe API** para exibir mapas
- **JSON** para armazenar os pontos e mensagens

## 🎯 Funcionalidades
✅ Rastreia a posição do usuário em tempo real.
✅ Emite uma mensagem de áudio quando o usuário se aproxima de um ponto cadastrado.
✅ Permite modificar a localização simulada para testes.
✅ Google Maps integrado para visualização dos pontos de interesse.

## 📂 Estrutura do Projeto
```
📦 MeuProjeto
│── 📂 app
│   ├── 📂 assets
│   ├── 📜 main.js      # Lógica de programação 
│   ├── 📜 styles.css   # Estilos
│── 📂 api
│   ├── 📜 response.json # Simula a API com GeoLoc e Mensagens
│── 📜 index.html        # Página principal
│── 📜 README.md         # Documentação do projeto
```

## 📱 Acesse o App
### Link: [Rotograma-Falado](https://rotograma-falado.vercel.app)


## 🗺️ Simulação da API de Pontos e Mensagens
Arquivo `api/response.json`:
```json
{
    "locations": [
        { "latitude": -24.017205, "longitude": -52.351555, "message": "Bem-vindo ao ponto 1" },
        { "latitude": -24.017194, "longitude": -52.352091, "message": "Você chegou ao ponto 2" }
    ]
}
```

## 📄 Licença
### Distribuído sob a ["MIT License"](/LICENSE.txt).


## 👨‍💻 **Desenvolvido por F. Morais**
