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
      
      // Arestas
      let edges = []
      let k = 0
      for (let i = 0; i < json.length; i++) {
        for (let j = 0; j < json[i].edges.length; j++) {
          edges.push(new google.maps.Polyline({ path: [json[i].coord, json[json[i].edges[j] - 1].coord], map: map }))
       }  
     }
    });
}
