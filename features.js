
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

	var ctx = document.getElementById("chart2");
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
	
	
	
	var ctx = document.getElementById("chart3");
	var scatterChart2 = new Chart(ctx, {
		type: 'scatter',
		data: {
			datasets: [{
				label: 'Population / Population Density',
                borderColor: "rgba(0,0,0,0)",
                pointBackgroundColor: "rgba(0,0,0,1)",
                pointBorderWidth: 0,
                pointHoverRadius: 4,
                pointHoverBackgroundColor: "rgba(0,0,0,0.3)",
                pointHoverBorderColor: "rgba(91,44,111,1)",
                pointHoverBorderWidth: 0,
                pointRadius: 1,
                pointHitRadius: 6,
				data: coords
			}]
		},
		options: {
			scales: {
				xAxes: [{
					position: 'bottom',
                    scaleLabel: {
                      display: true,
                      labelString: "Population"
                    }
				}],		
				yAxes: [{
					position: 'left',
                    scaleLabel: {
                      display: true,
                      labelString: "Population Density"
                    }
				}]
			}
		}
	});	
	
	


	var ctx = document.getElementById("chart1");
	var scatterChart2 = new Chart(ctx, {
		type: 'scatter',
		data: {
			datasets: [{
				label: 'Population / Population Density',
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
				}],		
				yAxes: [{
					type: 'linear',
					position: 'left',
				}]
			}
		}
	});	
}


