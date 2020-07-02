// Initialize and add the map
var map;
function initMap() {
  fetch("./dataset.json")
    .then((response) => response.json())
    .then((json) => {
      // Funções auxiliares
      const reducer = (accumulator, currentValue) => accumulator + currentValue;

      // Opções do mapa
      const center = { 
        lat: json.map(value => value.coord.lat).reduce(reducer)/json.length, 
        lng: json.map(value => value.coord.lng).reduce(reducer)/json.length
      };
      const options = { zoom: 6, scaleControl: true, center: center };

      map = new google.maps.Map(document.getElementById("map"), options);

      // Vertices
      let nodes = json.map(city => new google.maps.Marker({ position: city.coord, map: map }));

      // Matriz de distancia
      let matrix = []
      for (let i = 0; i < json.length; i++) {
        matrix.push([])
        for (let j = 0; j < json.length; j++) {
          matrix[i].push(Infinity)
        }
      }

      
      
      // Arestas
      let edges = []
      let k = 0
      for (let i = 0; i < json.length; i++) {
        for (let j = 0; j < json[i].edges.length; j++) {
          edges.push(new google.maps.Polyline({ path: [json[i].coord, json[json[i].edges[j] - 1].coord], map: map }))
          matrix[i][json[i].edges[j] - 1] = haversine_distance(nodes[i], nodes[json[i].edges[j] - 1])
        }  
      }

      // Grafo Dijkstra
      var mapDijkistra = {};
      for (let i = 0; i < json.length; i++) {
        
        mapDijkistra = Object.assign(mapDijkistra, { [json[i].id] : {} })
      
        for (let j = 0; j < json.length; j++) {
          if (matrix[i][j] !== Infinity) {
            mapDijkistra[i+1] = Object.assign(mapDijkistra[i+1], { [j+1] : matrix[i][j] })
            
          }
        }  
      }

      var graph = new Dijkstra(mapDijkistra);

      console.log(graph.findShortestPath(1, 40));

      let shortestPath = graph.findShortestPath(1, 40);

      let optionsPoly = {
        strokeColor: '#C83939',
        strokeOpacity: 0,
        strokeWeight: 4,
        icons: [{
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: '#C83939',
            fillOpacity: 1,
            scale: 2,
            strokeColor: '#C83939',
            strokeOpacity: 1,
          },
          offset: '0',
          repeat: '10px'
        }]
      }

      for (let i = 0; i < shortestPath.length - 1; i++) {
        for (let j = 0; j < json.length; j++) {
          for (let k = 0; k < json[j].edges.length; k++) {
            if(shortestPath[i] === json[j].id && shortestPath[i + 1] === json[j].edges[k]){
              edges[j+k] = new google.maps.Polyline({ path: [json[j].coord, json[json[j].edges[k] - 1].coord], map: map, options: optionsPoly })
            }
          }
        }
      }
      
      // ANIMATED MARKER
      // let mk = new google.maps.Marker({ position: { "lat": 41.85003000, "lng": -87.65005000 }, map: map })
      // mk.setPosition(new google.maps.LatLng(-5.7930018, -37.5629128))

      // Salvar como CSV
      var csv = '';
      matrix.forEach(function(row) {
              csv += row.join(';');
              csv += "\n";
      });

      var hiddenElement = document.createElement('a');
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
      hiddenElement.target = '_blank';
      hiddenElement.download = 'distance.csv';
      hiddenElement.click();

    });
}

function haversine_distance(mk1, mk2) {
  var R = 3958.8; // Radius of the Earth in miles
  var rlat1 = mk1.position.lat() * (Math.PI/180); // Convert degrees to radians
  var rlat2 = mk2.position.lat() * (Math.PI/180); // Convert degrees to radians
  var difflat = rlat2-rlat1; // Radian difference (latitudes)
  var difflon = (mk2.position.lng()-mk1.position.lng()) * (Math.PI/180); // Radian difference (longitudes)

  var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
  return d;
}

var Dijkstra = (function (undefined) {

	var extractKeys = function (obj) {
		var keys = [], key;
		for (key in obj) {
		    Object.prototype.hasOwnProperty.call(obj,key) && keys.push(key);
		}
		return keys;
	}

	var sorter = function (a, b) {
		return parseFloat (a) - parseFloat (b);
	}

	var findPaths = function (map, start, end, infinity) {
		infinity = infinity || Infinity;

		var costs = {},
		    open = {'0': [start]},
		    predecessors = {},
		    keys;

		var addToOpen = function (cost, vertex) {
			var key = "" + cost;
			if (!open[key]) open[key] = [];
			open[key].push(Number(vertex));
		}

		costs[start] = 0;

		while (open) {
			if(!(keys = extractKeys(open)).length) break;

			keys.sort(sorter);

			var key = keys[0],
			    bucket = open[key],
			    node = bucket.shift(),
			    currentCost = parseFloat(key),
			    adjacentNodes = map[node] || {};

			if (!bucket.length) delete open[key];

			for (var vertex in adjacentNodes) {
			    if (Object.prototype.hasOwnProperty.call(adjacentNodes, vertex)) {
					var cost = adjacentNodes[vertex],
					    totalCost = cost + currentCost,
					    vertexCost = costs[vertex];

					if ((vertexCost === undefined) || (vertexCost > totalCost)) {
						costs[vertex] = totalCost;
						addToOpen(totalCost, vertex);
						predecessors[vertex] = node;
					}
				}
			}
		}

		if (costs[end] === undefined) {
			return null;
		} else {
			return predecessors;
		}

	}

	var extractShortest = function (predecessors, end) {
		var nodes = [],
		    u = end;

		while (u !== undefined) {
			nodes.push(u);
			u = predecessors[u];
		}

		nodes.reverse();
		return nodes;
	}

	var findShortestPath = function (map, nodes) {
		var start = nodes.shift(),
		    end,
		    predecessors,
		    path = [],
		    shortest;

		while (nodes.length) {
			end = nodes.shift();
			predecessors = findPaths(map, start, end);

			if (predecessors) {
				shortest = extractShortest(predecessors, end);
				if (nodes.length) {
					path.push.apply(path, shortest.slice(0, -1));
				} else {
					return path.concat(shortest);
				}
			} else {
				return null;
			}

			start = end;
		}
	}

	var toArray = function (list, offset) {
		try {
			return Array.prototype.slice.call(list, offset);
		} catch (e) {
			var a = [];
			for (var i = offset || 0, l = list.length; i < l; ++i) {
				a.push(list[i]);
			}
			return a;
		}
	}

	var Graph = function (map) {
		this.map = map;
	}

	Graph.prototype.findShortestPath = function (start, end) {
		if (Object.prototype.toString.call(start) === '[object Array]') {
			return findShortestPath(this.map, start);
		} else if (arguments.length === 2) {
			return findShortestPath(this.map, [start, end]);
		} else {
			return findShortestPath(this.map, toArray(arguments));
		}
	}

	Graph.findShortestPath = function (map, start, end) {
		if (Object.prototype.toString.call(start) === '[object Array]') {
			return findShortestPath(map, start);
		} else if (arguments.length === 3) {
			return findShortestPath(map, [start, end]);
		} else {
			return findShortestPath(map, toArray(arguments, 1));
		}
	}

	return Graph;

})();


// ROUTE API #########################################################
// https://stackoverflow.com/questions/37442714/google-map-api-v3-how-to-draw-walking-path-like-googlemaps-web-applications
// https://cloud.google.com/blog/products/maps-platform/how-calculate-distances-map-maps-javascript-api
// let directionsService = new google.maps.DirectionsService();
//   let directionsRenderer = new google.maps.DirectionsRenderer();
//   directionsRenderer.setMap(map); // Existing map object displays directions
//   // Create route from existing points used for markers
//   const route = {
//       origin: dakota,
//       destination: frick,
//       travelMode: 'DRIVING'
//   }

//   directionsService.route(route,
//     function(response, status) { // anonymous function to capture directions
//       if (status !== 'OK') {
//         window.alert('Directions request failed due to ' + status);
//         return;
//       } else {
//         directionsRenderer.setDirections(response); // Add route to the map
//         var directionsData = response.routes[0].legs[0]; // Get data about the mapped route
//         if (!directionsData) {
//           window.alert('Directions request failed');
//           return;
//         }
//         else {
//           document.getElementById('msg').innerHTML += " Driving distance is " + directionsData.distance.text + " (" + directionsData.duration.text + ").";
//         }
//       }
//     });