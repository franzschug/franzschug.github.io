
var satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
var streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
	
var map = L.map('map', {
    center: [52.4319, 13.5342],
    zoom: 13
	});
	
var baseMaps = {
    "Satellite": satellite,
    "Streets": streets
};

var map2 = L.map('map2', {
    center: [52.4319, 13.5342],
    zoom: 13,
    layers: [satellite, streets]
	});

L.control.layers(baseMaps).addTo(map2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


var satellite3 = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
var streets3 = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var baseMaps3 = {
    "Satellite": satellite3,
    "Streets": streets3
};

var map3 = L.map('map3', {
    center: [52.4319, 13.5342],
    zoom: 13,
    layers: [satellite3, streets3]
	});
L.control.layers(baseMaps3).addTo(map3);

vector = new L.GeoJSON.AJAX("data/vector.geojson", {});
vector.addTo(map3);
vector.on('data:loaded', function() {
  vector.bringToFront()
}.bind(this));
