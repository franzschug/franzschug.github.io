
var map; 
var sidebar;

initMap();
initSideBar();
initInterface();


function initMap() {
 var satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
var streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
 var dark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
});

 	var baseMaps = {
    "Streets": streets,
    "Dark Matter": dark,
	"Satellite": satellite
	};

  map = L.map('map', {
		center: [0, 0],
		zoom: 2,
        minZoom: 2,
        maxZoom: 16,
		layers: [satellite]
  });
  
    map.zoomControl.setPosition('topright');
    L.control.layers(baseMaps, null, { position: 'topright' }).addTo(map);

	L.easyButton('<img src="img/info_small.png" class="icon">', function(btn, map){
		disp = document.getElementById("infoText").style.visibility
		if(disp == "hidden") {
			document.getElementById("infoText").style.visibility = "visible"
		} else {
			document.getElementById("infoText").style.visibility = "hidden"
		}
	}, 'Site Information', {
	position: 'topright'
	}).addTo(map);
	
	ar = new L.GeoJSON.AJAX("data/places1.geojson", { pointToLayer: function (feature, latlng) {
		cm = L.circleMarker(latlng, regularStyle);
		cm.bindTooltip(feature.properties.name)
		return cm
    }, onEachFeature: onEachPlace});  
  
	ar.addTo(map);
	
	ar.on('data:loaded', function() {
		ar.bringToFront()
		//ar.setStyle(regularStyle);
	}.bind(this));
	
	tiles01Ams = L.tileLayer('data/topic1/AMSTERDAM/{z}/{x}/{y}.png', {tms:true});
	tiles01Bos = L.tileLayer('data/topic1/BOSTON/{z}/{x}/{y}.png', {tms:true});
	tiles01Fra = L.tileLayer('data/topic1/FRANKFURT/{z}/{x}/{y}.png', {tms:true});
	tiles01Gen = L.tileLayer('data/topic1/GENEVA/{z}/{x}/{y}.png', {tms:true});
	tiles01Kob = L.tileLayer('data/topic1/KOBE/{z}/{x}/{y}.png', {tms:true});
	tiles01Osl = L.tileLayer('data/topic1/OSLO/{z}/{x}/{y}.png', {tms:true});
	tiles01Par = L.tileLayer('data/topic1/PARIS/{z}/{x}/{y}.png', {tms:true});
	tiles01Tel = L.tileLayer('data/topic1/TEL_AVIV/{z}/{x}/{y}.png', {tms:true});
	tiles01Tur = L.tileLayer('data/topic1/TURIN/{z}/{x}/{y}.png', {tms:true});
	tiles01Van = L.tileLayer('data/topic1/VANCOUVER/{z}/{x}/{y}.png', {tms:true});
	
	tileCollection  = [tiles01Ams, tiles01Bos, tiles01Fra, tiles01Gen, tiles01Kob, tiles01Osl, tiles01Par, tiles01Tel, tiles01Tur, tiles01Van]
	
	names = ["Amsterdam", "Boston", "Frankfurt", "Geneva", "Kobe", "Oslo", "Paris", "Tel Aviv", "Turin", "Vancouver"]
}


function initSideBar() {
	sidebar = L.control.sidebar('sidebar').addTo(map);
	setTimeout(function () {
		sidebar.open('info');
	}, 500);
}

function initInterface() {
  scale = L.control.scale({ position: 'bottomright' }).addTo(map);
}

function onEachPlace(feature, layer) {
	//console.log(feature)
}





