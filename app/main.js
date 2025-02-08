
let falou = false;

async function startTracking() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(verificarLocalizacao, erroLocalizacao, {
            enableHighAccuracy: true,
            maximumAge: 0
        });
        document.getElementById("status").innerText = "Rastreamento iniciado...";
    } else {
        alert("Geolocalização não é suportada neste navegador.");
    }
}

async function verificarLocalizacao(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    document.getElementById("status").innerText = `Localização atual: ${lat.toFixed(5)}, ${lon.toFixed(5)}`;
    
    try {
        const response = await fetch("api/response.json");
        const data = await response.json();
        
        if (data && data.message && !falou) {
            falarTexto(data.message);
            falou = true; // Evita repetir
        }
    } catch (error) {
        console.error("Erro ao buscar dados do JSON: ", error);
    }
}

function erroLocalizacao(error) {
    console.error("Erro ao obter localização: ", error.message);
}

function falarTexto(mensagem) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(mensagem);
    utterance.lang = "pt-BR";
    synth.speak(utterance);
}
