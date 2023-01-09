<?php

if (isset($_POST['xCoord'])) {
$xCoord = $_POST['xCoord'];
$yCoord = $_POST['yCoord'];

$kmlString = '<?xml version="1.0" encoding="UTF-8"?>'
.'<kml xmlns="http://www.opengis.net/kml/2.2">'
  .'<Placemark>'
    .'<name>Label this spot!</name>'
    .'<Point>'
      .'<coordinates>'. $xCoord . ',' . $yCoord . ',0</coordinates>'
    .'</Point>'
    .'</Placemark>'
.'</kml>';

$file = fopen("currentSpot.kml", "w") or die("Unable to open file!");
fwrite($file, $kmlString);
fclose($file);

echo $xCoord;
} else {
  echo "no";
}
?>
