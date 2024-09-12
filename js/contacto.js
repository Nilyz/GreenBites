const btn_calculate = document.getElementById("btn_calculate");
const btn_getLocation= document.getElementById("btn_getLocation");

// Inicializar el mapa
var map = L.map('map').setView([40.4192055, -3.6981101], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Marcar la ubicación del negocio
var businessMarker = L.marker([40.4192055, -3.6981101]).addTo(map)
    .bindPopup('Green Bites')
    .openPopup();

// Función para obtener la ubicación actual del cliente
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            L.marker([lat, lng]).addTo(map).bindPopup("Tu ubicación actual").openPopup();
            calculateRouteWithCoords(lat, lng);
        }, function() {
            alert('No se pudo obtener tu ubicación');
        });
    } else {
        alert('Tu navegador no soporta geolocalización');
    }
}

// Geocodificación de la dirección a coordenadas
function geocodeAddress(address, callback) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const lat = data[0].lat;
                const lon = data[0].lon;
                callback(lat, lon);
            } else {
                alert('Dirección no encontrada');
            }
        })
        .catch(error => console.error('Error en la geocodificación:', error));
}

// Calcular la ruta cuando se ingresa la dirección
function calculateRoute() {
    const destination = document.getElementById("destination").value;
    if (destination) {
        geocodeAddress(destination, function(lat, lon) {
            calculateRouteWithCoords(lat, lon);
        });
    } else {
        alert("Por favor, ingresa una dirección.");
    }
}

// Calcular ruta con las coordenadas
function calculateRouteWithCoords(lat, lng) {
    L.Routing.control({
        waypoints: [
            L.latLng(lat, lng),  // Ubicación del cliente
            L.latLng(40.4192055, -3.6981101)  // Ubicación del negocio
        ],
        routeWhileDragging: true
    }).addTo(map);
}


btn_calculate.addEventListener("click",calculateRoute)
btn_getLocation.addEventListener("click",getCurrentLocation)