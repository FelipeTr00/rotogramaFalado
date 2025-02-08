let falou = false;
const proximidadeMaxima = 50; // Definir a proximidade em metros

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

        let dentroDaZona = false; // Verifica se está perto de algum ponto salvo

        if (data && data.locations) {
            for (const location of data.locations) {
                const distancia = calcularDistancia(lat, lon, location.latitude, location.longitude);
                
                if (distancia <= proximidadeMaxima) {
                    dentroDaZona = true;
                    if (!falou) {
                        falarTexto(location.message);
                        falou = true; // Evita repetição
                    }
                    break; // Sai do loop ao encontrar um ponto próximo
                }
            }
        }

        // Se o usuário sair da área de proximidade, permite falar novamente
        if (!dentroDaZona) {
            falou = false;
        }

    } catch (error) {
        console.error("Erro ao buscar dados do JSON: ", error);
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

function falarTexto(mensagem) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(mensagem);
    utterance.lang = "pt-BR";
    synth.speak(utterance);
}
