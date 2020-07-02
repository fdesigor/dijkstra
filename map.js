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
      const options = { zoom: 5, scaleControl: true, center: center };

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

      // Salvar como CSV
      var csv = '';
      matrix.forEach(function(row) {
              csv += row.join(',');
              csv += "\n";
      });
  
      console.log(csv);
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

// ROUTE API #########################################################
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