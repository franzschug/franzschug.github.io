
$.getJSON("https://franzschug.github.io/data/populationdata.json", function(json) {
  initChart(json);
});
	

function initChart(json) {
	populations = []
	densities = []
	
	for (var i = 0; i < json.length; i++) {
		var object = json[i];
		populations.push(object['EWZ'])
		densities.push(object['EW_Dens'])
}

	let coords = populations.map( (v,i) => ({ x: v, y: densities[i]}) )
	
	data = [{ x: -8, y: 3 }, { x: 2, y: 8 }, { x: 3, y: 9 }]
	//window.onload = function() {

	var ctx = document.getElementById("chart1");
	var scatterChart = new Chart(ctx, {
		type: 'scatter',
		data: {
			datasets: [{
				label: 'Population / Population Density',
				data: coords
			}]
		},
		options: {
			scales: {
				xAxes: [{
					type: 'linear',
					position: 'bottom'
				}]
			}
		}
	});
	//}
}


