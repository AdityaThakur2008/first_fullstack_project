// Map initialize: setView([latitude, longitude], zoom level)
var map = L.map("map").setView([28.6139, 77.209], 12); // Delhi example

// Tile layer (OpenStreetMap ka free tiles)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// Marker add karo
L.marker([28.6139, 77.209]).addTo(map).bindPopup("Hello Delhi!").openPopup();
