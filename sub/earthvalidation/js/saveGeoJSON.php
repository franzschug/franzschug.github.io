<?php

$plotid = $_POST['plotid'];
$sampleids = json_decode($_POST['sampleids']);
$labels = json_decode($_POST['labels']);
$xC = json_decode($_POST['xCoords']);
$yC = json_decode($_POST['yCoords']);

$jsonString = '{"type": "FeatureCollection","name":"plot' . $plotid . '","crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },"features": [';

for ($i = 0; $i < count($sampleids); $i++) {
	$jsonString = $jsonString . '{ "type": "Feature", "properties": { "id":' . $sampleids[$i] . ', "label":' . $labels[$i] . ', "sampleid":' . $sampleids[$i] . ', "plotid":' . $plotid . ' }, "geometry": { "type": "Point", "coordinates": [ ' . $xC[$i] . ', ' . $yC[$i] . ' ] } }'; 
	if(count($sampleids) - $i > 1) { # last element, no comma at the end
		$jsonString = $jsonString . ',';
	}
}

$jsonString = $jsonString . ']}';

$file = fopen("../data/labels/plot" . $plotid . ".geojson", "w") or die("Unable to open file!");
fwrite($file, $jsonString);
fclose($file);

?>
