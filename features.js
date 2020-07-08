
$.getJSON("https://franzschug.github.io/data/populationdata.json", function(json) {
	console.log(json)
  initChart(json);
});
	

function initChart(json) {
	window.onload = function() {
	var ctx = document.getElementById("chart1");
	var scatterChart = new Chart(ctx, {
		type: 'scatter',
		data: {
			datasets: [{
				label: 'Scatter Dataset',
				data: [{
					x: -10,
					y: 0
				}, {
					x: 0,
					y: 10
				}, {
					x: 10,
					y: 5
				}]
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
	}
}


