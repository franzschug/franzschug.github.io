
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
    center: [52.4319, 11.5342],
    zoom: 6,
    layers: [satellite3, streets3]
	});
L.control.layers(baseMaps3).addTo(map3);

vector = new L.GeoJSON.AJAX("data/vector.geojson", {});
vector.addTo(map3);
vector.on('data:loaded', function() {
  vector.bringToFront()
}.bind(this));




var satellite4 = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
var streets4 = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var baseMaps4 = {
    "Satellite": satellite4,
    "Streets": streets4
};

var map4 = L.map('map4', {
    center: [52.4319, 11.5342],
    zoom: 6,
    layers: [satellite4, streets4]
	});
L.control.layers(baseMaps4).addTo(map4);

vector = new L.GeoJSON.AJAX("data/vector.geojson", {onEachFeature: checkHover});
vector.addTo(map4);
vector.on('data:loaded', function() {
  vector.setStyle(regularStyle);
  vector.bringToFront()
}.bind(this));

function checkHover(feature, layer) {
  	layer.on({
  		mouseover: function(e) {
			layer.setStyle(highlightStyle)
  		},
  		mouseout: function(e) {
			layer.setStyle(regularStyle)
  		},
      click: function(e) {
	  }
  	});
  }
  


var satellite5 = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
var streets5 = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var baseMaps5 = {
    "Satellite": satellite5,
    "Streets": streets5
};

var map5 = L.map('map5', {
    center: [52.4319, 11.5342],
    zoom: 6,
    layers: [satellite5, streets5]
	});
L.control.layers(baseMaps5).addTo(map5);

vector2 = new L.GeoJSON.AJAX("data/vector.geojson", {onEachFeature: checkHover2});
vector2.addTo(map5);
vector2.on('data:loaded', function() {
  vector2.setStyle(regularStyle);
  vector2.bringToFront()
}.bind(this));

function checkHover2(feature, layer) {
	layer.bindTooltip("<b>" + layer.feature.properties.GEN + '</b><br>Pop. Density: '+ layer.feature.properties.EW_Dens);
	col = getColor(layer.feature.properties.EW_Dens);
	layer.setStyle({fillColor:col;)
  	layer.on({
  		mouseover: function(e) {
			layer.setStyle(highlightStyle2)
  		},
  		mouseout: function(e) {
			layer.setStyle(regularStyle)
  		},
      click: function(e) {
	  }
  	});
  }
  


function getColor(d) {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
}

var regularStyle = {
	stroke: true,
	fillOpacity: 0,
	color: '#847c7b',
	opacity: 0.7,
	weight: 1
};

var highlightStyle = {
	stroke: true,
	fillOpacity: 0,
	color: '#b52020',
	opacity: 1,
	weight: 2.5
};

var regularStyle2 = {
	stroke: true,
	fillOpacity: 1,
	color: '#847c7b',
	opacity: 0.7,
	weight: 1
};

var highlightStyle2 = {
	stroke: true,
	color: '#b52020',
	opacity: 1,
	weight: 2.5
};