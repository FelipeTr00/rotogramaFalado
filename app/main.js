let falou = false; // Mensagem foi lida?
const proximidadeMaxima = 50; // Proximidade do ponto

async function startTracking() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(verificarLocalizacao, erroLocalizacao, {
            enableHighAccuracy: true,
            maximumAge: 0
        });
        document.getElementById("status").innerText = "Rastreamento iniciado...";
    } else {
        alert("Geolocalização não é suportada.");
    }
}

async function verificarLocalizacao(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    document.getElementById("status").innerText = `Localização atual: ${lat.toFixed(5)}, ${lon.toFixed(5)}`;

    try {
        const response = await fetch("api/response.json");
        const data = await response.json();

        let estaNoPerimetro = false;

        if (data && data.locations) {
            for (const location of data.locations) {
                const distancia = calcularDistancia(lat, lon, location.latitude, location.longitude);
                
                if (distancia <= proximidadeMaxima) {
                    estaNoPerimetro = true;
                    if (!falou) {
                        falarDuasVezes(location.message);
                        falou = true;
                    }
                    break;
                }
            }
        }

        // Se o usuário sair da área de proximidade, permite falar novamente
        if (!estaNoPerimetro) {
            falou = false;
        }

    } catch (error) {
        console.error("Erro na API: ", error);
    }
}

function calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371000; // Raio da Terra em metros
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Retorna a distância em metros
}

function erroLocalizacao(error) {
    console.error("Erro ao obter localização: ", error.message);
}

function falarDuasVezes(mensagem) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(mensagem);
    utterance.lang = "pt-BR";

    // Primeira leitura
    synth.speak(utterance);

    // Segunda Leitura
    setTimeout(() => {
        const utterance2 = new SpeechSynthesisUtterance(mensagem);
        utterance2.lang = "pt-BR";
        synth.speak(utterance2);
    }, 4000); // Time await
}
