Number.prototype.toRad = function() {
  return this * Math.PI / 180;
}

var map;
var ctx;
var tiles = null;
var currentValidationElement = null;

var plotIterator = 0;
var currentPlotID = 0;
var nextPlotID = 0;
var sampleIterator = 0;
var currentSampleID = 0;

var allPlots = [];
var allSamplesInPlot = [];
var allXCoordinates = []
var	allYCoordinates = []

var allSamplesInPlotBool = null;
var allSampleClasses = null;

var allowInteraction = true;

var iterator = 0;
var popup = null;
var selectedSurface = 0;


initMap();
initInterface();

function initMap() {

 L.mapbox.accessToken = 'pk.eyJ1Ijoia2ltYWVyYSIsImEiOiJFRmx4Q2k0In0.1xgFS81ORguzsqeKGavBiA';
  var satellite = L.mapbox.tileLayer('mapbox.satellite');
  var streets = L.mapbox.tileLayer('mapbox.streets', {
  maxZoom: 21,
  });
    var	googleSat = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 21,
    subdomains:['mt0','mt1','mt2','mt3']
	});

	var googleStreets = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 21,
    subdomains:['mt0','mt1','mt2','mt3']
	});

	var googleTerrain = L.tileLayer('https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom: 21,
    subdomains:['mt0','mt1','mt2','mt3']
	});


  map = L.mapbox.map('map','mapbox.streets', { // 'mapbox.streets'
        minZoom: 4,
        maxZoom: 21,
        attribution: false,
        preferCanvas: true,
        zoomControl: true,
		closePopupOnClick: false,
		 layers: [googleSat]
  }).setView([52.608255, 13.249055], 18);   // latitude 40, longitude -75, zoom level 5

	var baseMaps = {
	"Mapbox Satellite": satellite,
    "Mapbox Streets (OSM)": streets,
	"Google Satellite": googleSat,
	"Google Streets": googleStreets,
	"Google Terrain": googleTerrain
	};

	L.control.layers(baseMaps).addTo(map);

	 L.easyButton('<img src="img/info_small.png" class="icon">', function(btn, map){
		disp = document.getElementById("infoText").style.visibility
		if(disp == "hidden") {
			document.getElementById("infoText").style.visibility = "visible"
		} else {
			document.getElementById("infoText").style.visibility = "hidden"
		}
	}, 'Site Information', {
  position: 'topleft'
  }).addTo(map);
}

function initInterface() {

  scale = L.control.scale({ position: 'bottomright' }).addTo(map);
  attribution = L.control.attribution({ position: 'topright' }).addTo(map);
  //zoom = L.control.zoom({ position: 'bottomright'}).addTo(map);

//tiles = new L.GeoJSON.AJAX("data/testGrid2.geojson", {onEachFeature: onEachTile,
//    pointToLayer: function (feature, latlng) {
//        return L.circleMarker(latlng, regularTileStyle);
//    }
//});

//console.log(JSON.parse("data/testGrid2.geojson"))
/*$.getJSON("data/valGrid.geojson", function(json) {
    console.log(json); // this will show the info in firebug console

    var vectorGrid = L.vectorGrid.slicer(json, {
  rendererFactory: L.canvas.tile,
  vectorTileLayerStyles: {
    sliced: function(properties, zoom) {
      //console.log("sliced")
      //console.log(properties)
      //console.log(zoom)
      return {
        stroke: true,
        fillOpacity: 0,
        weight: 1.5,
        color: "#08488f",
        radius: 3,
      }
    }
  },
  interactive: true,
  maxZoom: 19,
  getFeatureId: function(f) {
    return f.properties.wb_a3;
  }
})
.on('mouseover', function(e) {
  //var properties = e.layer.properties;
  //L.popup()
   // .setContent(properties.name || properties.type)
    //.setLatLng(e.latlng)
    //.openOn(map);

  //clearHighlight();
  //highlight = properties.wb_a3;

  var style = {
    fillColor:'#800026',
    fillOpacity: 0.5,
    fillOpacity: 1,
    stroke: true,
    fill: true,
    color: 'red',
    opacity: 1,
    weight: 2,
  };

  //vectorGrid.setFeatureStyle(properties.wb_a3, style);
})
.addTo(map);

vectorGrid.bringToFront()
console.log("vGrid")
console.log(vectorGrid)

tempPlotIDs = []
	// get all plot numbers and save them in all plots
	for (i = 0; i < vectorGrid.getLayers().length; i++) {
		tempPlotIDs.push(tiles.getLayers()[i].feature.properties.plotid)
	}

	console.log("tempPlotIDs")
	console.log(tempPlotIDs)
	allPlots = tempPlotIDs.filter(onlyUnique);  // All unique Plot IDs
	console.log("allPlots")
	console.log(allPlots)

	// get current plot id = first id in all plot numbers
	nextPlotID = allPlots[0]
	console.log("nextPlotID")
	console.log(nextPlotID)
	nextPlot(nextPlotID, first = true)

    /*var tileIndex = geojsonvt(json);
    console.log("tileindex")
console.log(tileIndex)

bounds = map.getBounds();
console.log("bounds")
console.log(bounds._northEast)

// request a particular tile
url = getTileURL(bounds._northEast.lat, bounds._northEast.lng, map.getZoom())
console.log(url)
console.log(tileIndex.getTile(0,0, 0).features)
var features = tileIndex.getTile(url[0], url[1], url[2]).features;

// show an array of tile coordinates created so far
console.log("tilecoords")
console.log(tileIndex.tileCoords); // [{z: 0, x: 0, y: 0}, ...]
});*/

allPlots = []
    $.ajax({
           url: "js/getPlotIDs.php",
           type: "POST",
           success: function (response) {
              // you will get response from your php page (what you echo or print)
			  plotPaths = JSON.parse(response)

			  for (p = 0; p < plotPaths.length; p++) {
				  if(plotPaths[p].match(/\d/g) != null) {
					var n = plotPaths[p].match(/\d/g);
					n = n.join("");
					allPlots.push(n)
				  }
			  }

				console.log("allPlots")
				console.log(allPlots)
				nextPlotID = allPlots[0]
				nextPlot(nextPlotID, first = true)
           },
           error: function(jqXHR, textStatus, errorThrown) {
              console.log(textStatus, errorThrown);
           }
       });

  /*tiles.addTo(map);
  tiles.on('data:loaded', function() {
    // build an initial index of tiles
    tiles.bringToFront()
    tiles.setStyle(regularTileStyle);

	console.log(tiles.getLayers())

	tempPlotIDs = []
	// get all plot numbers and save them in all plots
	for (i = 0; i < tiles.getLayers().length; i++) {
		tempPlotIDs.push(tiles.getLayers()[i].feature.properties.plotid)
	}

	console.log("tempPlotIDs")
	console.log(tempPlotIDs)
	allPlots = tempPlotIDs.filter(onlyUnique);  // All unique Plot IDs
	console.log("allPlots")
	console.log(allPlots)

	// get current plot id = first id in all plot numbers
	//nextPlotID = allPlots[0]
	console.log("nextPlotID")
	console.log(nextPlotID)
	nextPlot(nextPlotID, first = true)
}.bind(this));*/


  // LEGEND
 var layers = ['Built-up', 'Other Impervious Surface', 'High Vegetation', 'Permanent Low Vegetation', 'Seasonal Low Vegetation', 'Permanent Soil', 'Water'];
 var colors = ['rgb(194,34,0)', 'rgb(255,154,0)', 'rgb(52,148,57)', 'rgb(0, 255, 39)', 'rgb(238,221,0)', 'rgb(175,240,254)', 'rgb(0,0,255)'];

 for (i = 0; i < layers.length; i++) {
   var layer = layers[i];
   var color = colors[i];
   var item = document.createElement('div');
   var key = document.createElement('span');
   key.className = 'legend-key';
   key.style.backgroundColor = color;

   var value = document.createElement('span');
   value.innerHTML = layer;
   item.appendChild(key);
   item.appendChild(value);
   legend.appendChild(item);
 }

 var closeButton = document.createElement('div');
 closeButton.className = 'cB';
 legend.appendChild(closeButton);
 closeButton.onclick = function() {
   document.getElementById("legend").style.visibility = 'hidden';
   document.getElementById("showLegend").style.visibility = 'visible';
 }

 document.getElementById("showLegend").onclick = function() {
   document.getElementById("legend").style.visibility = 'visible';
   document.getElementById("showLegend").style.visibility = 'hidden';
 }

 		document.addEventListener("keyup",function(event) {

    event.preventDefault();
    //if (event.keyCode === 97) {
    if (event.keyCode === 49) {
      document.getElementById("buttonBuiltUp").click();
    //} else if (event.keyCode === 98) {
    } else if (event.keyCode === 50) {
		document.getElementById("buttonOtherImp").click();
	//} else if (event.keyCode === 99) {
	} else if (event.keyCode === 51) {
		document.getElementById("buttonForest").click();
	//} else if (event.keyCode === 100) {
	} else if (event.keyCode === 52) {
		document.getElementById("buttonOtherVeg").click();
	//} else if (event.keyCode === 101) {
	} else if (event.keyCode === 53) {
		document.getElementById("buttonSoil").click();
	//} else if (event.keyCode === 102) {
	} else if (event.keyCode === 90) {
		document.getElementById("buttonUnclear").click();
	//} else if (event.keyCode === 103) { // water clemens
	} else if (event.keyCode === 55) { // water clemens
		document.getElementById("buttonWater").click();
	}
	});
}

function onEachTile(feature, layer) {
	layer.on({
  		mouseover: function(e) {
			     //layer.setStyle(hoverTileStyle)
  		},
  		mouseout: function(e) {
			//if(currentTile == layer) {
			//	layer.setStyle(highlightTileStyle)
			//} else {
			//	layer.setStyle(regularTileStyle)
			//}
  		},
      click: function(e) {
		 // get sampleid, iterator = sampleid
		 if(allowInteraction) {
			currentSampleID = layer.feature.properties.sampleid
			sampleIterator = allSamplesInPlot.indexOf(currentSampleID);
			next(currentSampleID, allowInteraction)
		 }
	  }
	});
  }

  function select(cl, surface) {
	  console.log("selected pressed")
	  console.log(surface)
	// todo color point according to selected class
	if(surface == 1) { // built-up
		currentValidationElement.setStyle({color: '#c22200'})
	} else if(surface == 2) { // impervious
		currentValidationElement.setStyle({color: '#ff9a00'})
	} else if(surface == 3) { // woody veg
		currentValidationElement.setStyle({color: '#349439'})
	} else if(surface == 4) { // non-woody veg
		currentValidationElement.setStyle({color: '#00ff27'})
	} else if(surface == 5) { // soil
		currentValidationElement.setStyle({color: '#eedd00'})
	} else if(surface == 6) { // unclear
		currentValidationElement.setStyle({color: '#aff0fe'})
	} else if(surface == 7) { // water clemens!
		currentValidationElement.setStyle({color: '#0000FF'})
  }

	// fill array position in allPlotsArray
	allSamplesInPlotBool[sampleIterator] = true
  allSampleClasses[sampleIterator] = surface

	// Deselect all buttons
	//allButtons = document.getElementsByClassName("selectionButton")

	//for (var i = 0; i < allButtons.length; i++) {
	//	allButtons[i].style.backgroundColor = "white"
	//	allButtons[i].style.borderBottom  = "1px solid black"
	//}

	 //Select this
	cl.style.backgroundColor = "#d6d6d6"
	cl.style.borderBottom  = "2px solid #9b0000"

	//document.getElementById("buttonNext").style.backgroundColor = "white"
	sampleIterator += 1

	if(sampleIterator == allSamplesInPlot.length) { // if this has been the last sample element, reset to first element
	sampleIterator = 0; // iterator here: sample iterator
	}

	// get next sample id from sample iterator
	currentSampleID = allSamplesInPlot[sampleIterator]
	console.log("new sample id")
	console.log(currentSampleID)
	console.log(sampleIterator)
	//setTimeout(function(){
		next(currentSampleID, allowInteraction);
	//}, 10);
  }


 function next(sample, interact) { // interact: user can interact with features
	// find validation element based on currentSampleID (=sample)
	//tiles.setStyle(regularTileStyle);
			console.log("l")
		console.log(tiles.getLayers().length)
	for (i = 0; i < tiles.getLayers().length; i++) {
		console.log("i")
		console.log(i)
		if(tiles.getLayers()[i].feature.properties.sampleid == sample) {
			currentValidationElement = tiles.getLayers()[i]
		}
	}

	console.log("currentValidationElement")
	console.log(currentValidationElement)
	map.setView([currentValidationElement.feature.geometry.coordinates[1],currentValidationElement.feature.geometry.coordinates[0]]);

    $.ajax({
           url: "js/updateKML.php",
           type: "POST",
           data: {xCoord: currentValidationElement.feature.geometry.coordinates[0], yCoord: currentValidationElement.feature.geometry.coordinates[1]},
           success: function (response) {
              // you will get response from your php page (what you echo or print)
              console.log(response)
           },
           error: function(jqXHR, textStatus, errorThrown) {
              console.log(textStatus, errorThrown);
           }
       });

	 // all features: activate next plot, no button events

   //franz
	if(allowInteraction) {
		popupContent = "<b>Label this spot!    // Plot-ID: " + currentPlotID + " </b> <div id='labelSelection'> <div id='buttonBuiltUp' class='selectionButton' onclick='select(this,1)'> (1) Built-up</div> <div id='buttonOtherImp' class='selectionButton' onclick='select(this,2)'> (2) Other Imper.</div> <div id='buttonForest' class='selectionButton' onclick='select(this,3)'> (3) High Veg.</div>  <div id='buttonOtherVeg' class='selectionButton' onclick='select(this,4)'> (4) Perm. low veg.</div> <div id='buttonSoil' class='selectionButton' onclick='select(this,5)'> (5) Seas. low veg.</div>  <div id='buttonUnclear' class='selectionButton' onclick='select(this,6)'> (6) Perm. Soil</div> <div id='buttonWater' class='selectionButton' onclick='select(this,7)'> (7) Water</div> <div id='buttonNext' class='nextButton' onclick='nextPlot(" + nextPlotID + ")'> Save and Next Plot</div></div>"
	} else {
		popupContent = "<b>This plot has been labeled!    // Plot-ID: " + currentPlotID + " </b> <div id='labelSelection'> <div id='buttonBuiltUp' class='deactivatedButton'> (1) Built-up</div> <div id='buttonOtherImp' class='deactivatedButton'> (2) Other Imper.</div> <div id='buttonForest' class='deactivatedButton'> (3) High Veg.</div>  <div id='buttonOtherVeg' class='deactivatedButton'> (4) Perm. low veg.</div> <div id='buttonSoil' class='deactivatedButton'>(5) Seas. low veg.</div>  <div id='buttonUnclear' class='deactivatedButton'> (6) Perm. Soil</div> <div id='buttonWater' class='deactivatedButton'> (7) Water</div> <div id='buttonNextActive' onclick='nextPlot(" + nextPlotID + ")'> Save and Next Plot</div></div>"
	}

  //clemens
  //if(allowInteraction) {
  //  popupContent = "<b>Label this spot!                // Plot-ID: " + currentPlotID + " </b> <div id='labelSelection'> <div id='buttonBuiltUp' class='selectionButton' onclick='select(this,1)'> (1) Needleleaf</div> <div id='buttonOtherImp' class='selectionButton' onclick='select(this,2)'> (2) Broadleaf</div> <div id='buttonForest' class='selectionButton' onclick='select(this,3)'> (3) Shrubs</div>  <div id='buttonOtherVeg' class='selectionButton' onclick='select(this,4)'> (4) Grasses</div> <div id='buttonSoil' class='selectionButton' onclick='select(this,5)'> (5) Soil</div>  <div id='buttonUnclear' class='selectionButton' onclick='select(this,6)'> (6) Imp</div> <div id='buttonWater' class='selectionButton' onclick='select(this,2)'> (7) Water</div> <div id='buttonNext' class='nextButton' onclick='nextPlot(" + nextPlotID + ")'> Save and Next Plot</div></div>"
  //} else {
  //  popupContent = "<b>This plot has been labeled!    // Plot-ID: " + currentPlotID + " </b> <div id='labelSelection'> <div id='buttonBuiltUp' class='deactivatedButton'> (1) Needleleaf</div> <div id='buttonOtherImp' class='deactivatedButton'> (2) Broadleaf</div> <div id='buttonForest' class='deactivatedButton'> (3) Shrubs</div>  <div id='buttonOtherVeg' class='deactivatedButton'> (4) Grasses</div> <div id='buttonSoil' class='deactivatedButton'>(5) Soil</div>  <div id='buttonUnclear' class='deactivatedButton'> (6) Imp</div> <div id='buttonWater' class='deactivatedButton'> (2) Water</div> <div id='buttonNextActive' onclick='nextPlot(" + nextPlotID + ")'> Save and Next Plot</div></div>"
  //}

	map.closePopup();
	popup = L.popup()
	.setLatLng([currentValidationElement.feature.geometry.coordinates[1],currentValidationElement.feature.geometry.coordinates[0]])
	// content: set variable for next plot. translate plotiterator into plot id
	.setContent(popupContent)
	.openOn(map);

	// if all samples are true (have been classified), then activate next plot button
	console.log("allTrue")
	console.log(allSamplesInPlotBool)
	var allTrue = allSamplesInPlotBool.every(isTrue)

	if(allTrue) {
		console.log("all is true!")
		nb = document.getElementsByClassName("nextButton")
		console.log(nb)
		for (var i = 0; i < nb.length; i++) {
			console.log(nb[i])
			nb[i].style.pointerEvents = "auto";
			nb[i].style.backgroundColor = "white"
		}
	}
 }

 function nextPlot(plt, first = false, save = true) {
	 console.log("save")
	 console.log(save)
	 if(tiles != null) {
		map.removeLayer(tiles)
	 }

	//map.eachLayer(function (layer) {
	//	map.removeLayer(layer);
	//});

   console.log("arrived in plot")
   console.log(plt)
   tiles = new L.GeoJSON.AJAX("data/plot" + plt + ".geojson", {onEachFeature: onEachTile,
   //tiles = new L.GeoJSON.AJAX("data/testGrid2.geojson", {onEachFeature: onEachTile,
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, regularTileStyle);
    }
	});
	console.log("tiles")
	console.log(tiles)
	tiles.addTo(map);

	tiles.on('data:loaded', function() {
    // build an initial index of tiles
    tiles.bringToFront()
    tiles.setStyle(regularTileStyle);

	map.setMaxBounds(tiles.getBounds())

	console.log(tiles.getLayers())

		 // if first plot, then do not save todo save the previous!!
	 if(!first) {
		 if(save) {
			 if(allowInteraction) {
			console.log("toBeSent")
			console.log(allSamplesInPlot)
			console.log(allSampleClasses)
			console.log(allXCoordinates)
			  console.log(allYCoordinates)
			  var sampleidsjson = JSON.stringify(allSamplesInPlot);
			  var labelsjson = JSON.stringify(allSampleClasses);
			  var allX = JSON.stringify(allXCoordinates);
			  var allY = JSON.stringify(allYCoordinates);


		      $.ajax({
             url: "js/saveGeoJSON.php",
             type: "POST",
             data: {plotid: currentPlotID, sampleids: sampleidsjson, labels: labelsjson, xCoords: allX, yCoords: allY},
             success: function (response) {
                // you will get response from your php page (what you echo or print)
                console.log("response_plot")
                console.log(JSON.parse(response))

             },
             error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
             }
         });
		}
		 }

	 }

	 	currentPlotID = plt; // currentPlotID will not be incremented and will be corresponding to the previous plot above this line. this can be used for saving results of the last plot!
		console.log(currentPlotID)
			$.ajax({
			url: "js/getLabeledPlots.php",
			type: "POST",
			success: function (response) {
              // you will get response from your php page (what you echo or print)
			  resp = JSON.parse(response)
			  console.log("plots existing")
			  console.log(resp)
			  labeledPlots = []
				// add all plots that have already been labeled to labeledPlots
				for (p = 0; p < resp.length; p++) {
					if(resp[p].match(/\d/g) != null) {
						var n = resp[p].match(/\d/g);
						n = n.join("");
						console.log(n)
						labeledPlots.push(parseInt(n))
					}
				}

				console.log("existingPlotsArray")
				console.log(labeledPlots)
				console.log(plt)

				if(labeledPlots.includes(parseInt(plt))) { // switch to next plot for viewing only
					allowInteraction = false;


					console.log("plot exists")

					allSamplesInPlot = []
						for (i = 0; i < tiles.getLayers().length; i++) {
						allSamplesInPlot.push(tiles.getLayers()[i].feature.properties.sampleid)
					}

										plotIterator += 1
				  if(plotIterator == allPlots.length) { // if this has been the last sample element, reset to first element
					plotIterator = 0; // iterator here: sample iterator
				  }
				  nextPlotID = allPlots[plotIterator]
				  console.log("nextPlotID")
				  console.log(nextPlotID)
				  sampleIterator = 0
				  	console.log("allSamplesInPlot[sampleIterator]")
					console.log(allSamplesInPlot[sampleIterator])
					currentSampleID = allSamplesInPlot[sampleIterator]
					console.log("currentSampleID")
					console.log(currentSampleID)

				  tiles.setStyle(deactivatedTileStyle);
					next(currentSampleID, allowInteraction)

				} else { // switch to next plot for labeling
					allowInteraction = true;

					// get list of all sample ids in plot
					allSamplesInPlot = []
					allXCoordinates = []
					allYCoordinates = []
					for (i = 0; i < tiles.getLayers().length; i++) {
						allSamplesInPlot.push(tiles.getLayers()[i].feature.properties.sampleid)
						allXCoordinates.push(tiles.getLayers()[i].feature.geometry.coordinates[0])
						allYCoordinates.push(tiles.getLayers()[i].feature.geometry.coordinates[1])
					}

					console.log("allSamplesInPlot")
					console.log(allSamplesInPlot)

					allSamplesInPlotBool = Array(allSamplesInPlot.length).fill(false)
					allSampleClasses = Array(allSamplesInPlot.length).fill(0)
					console.log("allSamplesInPlotBool")
					console.log(allSamplesInPlotBool)

					plotIterator += 1
				  if(plotIterator == allPlots.length) { // if this has been the last sample element, reset to first element
					plotIterator = 0; // iterator here: sample iterator
				  }
				  nextPlotID = allPlots[plotIterator]
				  console.log("nextPlotID")
				  console.log(nextPlotID)

					sampleIterator = 0
					console.log("allSamplesInPlot[sampleIterator]")
					console.log(allSamplesInPlot[sampleIterator])
					currentSampleID = allSamplesInPlot[sampleIterator]
					console.log("currentSampleID")
					console.log(currentSampleID)

					next(currentSampleID, allowInteraction)
				}

				console.log(labeledPlots)

				   },
				   error: function(jqXHR, textStatus, errorThrown) {
					  console.log(textStatus, errorThrown);
				   }
			   });
	}.bind(this));
 }

 /*function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}*/

function isTrue(b) {
	return b;
}

/*function getTileURL(lat, lon, zoom) {
  console.log("getTileULR")
  console.log(lat)
    var xtile = parseInt(Math.floor( (lon + 180) / 360 * (1<<zoom) ));
    var ytile = parseInt(Math.floor( (1 - Math.log(Math.tan(lat.toRad()) + 1 / Math.cos(lat.toRad())) / Math.PI) / 2 * (1<<zoom) ));
    return [zoom, xtile, ytile]
    //return "" + zoom + "/" + xtile + "/" + ytile;
}*/

function plotFromInput() {

	idx = allPlots.indexOf(document.getElementById("myText").value)
	console.log("idx")
	console.log(idx)
	console.log(allPlots)
	if(idx != -1){
		currentPlotID = document.getElementById("myText").value
		plotIterator = allPlots.indexOf(currentPlotID);
		nextPlot(currentPlotID, first = false, save = false);
	}

	document.getElementById("myText").value = "Go to plot ID..."
}
