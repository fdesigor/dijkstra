// Initialize and add the map
var map;
function initMap() {
  fetch("./dataset.json")
    .then((response) => response.json())
    .then((json) => console.log(json));

  // Opções do mapa
  const center = { lat: 38.0603693, lng: -95.4713246 };
  const options = { zoom: 5, scaleControl: true, center: center };

  map = new google.maps.Map(document.getElementById("map"), options);

  // Cidades
  const chicago = { lat: 41.85003, lng: -87.65005 };
  var mk1 = new google.maps.Marker({ position: chicago, map: map });

  const peoria = { lat: 40.69365, lng: -89.58899 };
  var mk2 = new google.maps.Marker({ position: peoria, map: map });

  const springfield = { lat: 39.80172, lng: -89.64371 };
  var mk3 = new google.maps.Marker({ position: springfield, map: map });

  const saint_louis = { lat: 38.62727, lng: -90.19789 };
  var mk4 = new google.maps.Marker({ position: saint_louis, map: map });

  const poplar_bluff = { lat: 36.757, lng: -90.39289 };
  var mk5 = new google.maps.Marker({ position: poplar_bluff, map: map });

  const hannibal = { lat: 39.70838, lng: -91.35848 };
  var mk6 = new google.maps.Marker({ position: hannibal, map: map });

  const jeferson_city = { lat: 38.5767, lng: -92.17352 };
  var mk7 = new google.maps.Marker({ position: jeferson_city, map: map });

  const little_rock = { lat: 34.74648, lng: -92.28959 };
  var mk8 = new google.maps.Marker({ position: little_rock, map: map });

  const springfield_missouri = { lat: 37.21533, lng: -93.29824 };
  var mk9 = new google.maps.Marker({
    position: springfield_missouri,
    map: map,
  });

  const des_moines = { lat: 41.60054, lng: -93.60911 };
  var mk10 = new google.maps.Marker({ position: des_moines, map: map });

  const fort_smith = { lat: 35.38592, lng: -94.39855 };
  var mk11 = new google.maps.Marker({ position: fort_smith, map: map });

  const kansas_city = { lat: 39.09973, lng: -94.57857 };
  var mk12 = new google.maps.Marker({ position: kansas_city, map: map });

  const fort_scott = { lat: 37.83976, lng: -94.7083 };
  var mk13 = new google.maps.Marker({ position: fort_scott, map: map });

  const saint_joseph = { lat: 39.76861, lng: -94.84663 };
  var mk14 = new google.maps.Marker({ position: saint_joseph, map: map });

  const tulsa = { lat: 36.15398, lng: -95.99277 };
  var mk15 = new google.maps.Marker({ position: tulsa, map: map });

  const omaha = { lat: 41.25626, lng: -95.94043 };
  var mk16 = new google.maps.Marker({ position: omaha, map: map });

  const beatrice = { lat: 40.26806, lng: -96.74697 };
  var mk17 = new google.maps.Marker({ position: beatrice, map: map });

  const wichita = { lat: 37.69224, lng: -97.33754 };
  var mk18 = new google.maps.Marker({ position: wichita, map: map });

  const oklahoma = { lat: 35.46756, lng: -97.51643 };
  var mk19 = new google.maps.Marker({ position: oklahoma, map: map });

  const great_bend = { lat: 38.36446, lng: -98.76481 };
  var mk20 = new google.maps.Marker({ position: great_bend, map: map });

  const phillipsburg = { lat: 39.75612, lng: -99.32399 };
  var mk21 = new google.maps.Marker({ position: phillipsburg, map: map });

  const grand_island = { lat: 40.92501, lng: -98.34201 };
  var mk22 = new google.maps.Marker({ position: grand_island, map: map });

  const dodge_city = { lat: 37.7528, lng: -100.01708 };
  var mk23 = new google.maps.Marker({ position: dodge_city, map: map });

  const guymon = { lat: 36.6828, lng: -101.48155 };
  var mk24 = new google.maps.Marker({ position: guymon, map: map });

  const north_platte = { lat: 41.12389, lng: -100.76542 };
  var mk25 = new google.maps.Marker({ position: north_platte, map: map });

  const amarillo = { lat: 35.222, lng: -101.8313 };
  var mk26 = new google.maps.Marker({ position: amarillo, map: map });

  const kit_carson = { lat: 39.30544, lng: -102.60289 };
  var mk27 = new google.maps.Marker({ position: kit_carson, map: map });

  const tucumcari = { lat: 35.17191, lng: -103.72686 };
  var mk28 = new google.maps.Marker({ position: tucumcari, map: map });

  const raton = { lat: 36.90336, lng: -104.43915 };
  var mk29 = new google.maps.Marker({ position: raton, map: map });

  const pueblo = { lat: 38.25445, lng: -104.60914 };
  var mk30 = new google.maps.Marker({ position: pueblo, map: map });

  const denver = { lat: 39.73915, lng: -104.9847 };
  var mk31 = new google.maps.Marker({ position: denver, map: map });

  const santa_fe = { lat: 35.68698, lng: -105.9378 };
  var mk32 = new google.maps.Marker({ position: santa_fe, map: map });

  const albuquerque = { lat: 35.08449, lng: -106.65114 };
  var mk33 = new google.maps.Marker({ position: albuquerque, map: map });

  const durango = { lat: 37.27528, lng: -107.88007 };
  var mk34 = new google.maps.Marker({ position: durango, map: map });

  const grand_junction = { lat: 39.06387, lng: -108.55065 };
  var mk35 = new google.maps.Marker({ position: grand_junction, map: map });

  const gallup = { lat: 35.52808, lng: -108.74258 };
  var mk36 = new google.maps.Marker({ position: gallup, map: map });

  const green_river = { lat: 38.9803425, lng: -110.1687336 };
  var mk37 = new google.maps.Marker({ position: green_river, map: map });

  const flagstaff = { lat: 35.19807, lng: -111.65127 };
  var mk38 = new google.maps.Marker({ position: flagstaff, map: map });

  const carmel_junction = { lat: 37.2227412, lng: -112.6884808 };
  var mk39 = new google.maps.Marker({ position: carmel_junction, map: map });

  const grand_canyon = { lat: 36.05443, lng: -112.13934 };
  var mk40 = new google.maps.Marker({ position: grand_canyon, map: map });

  var line = new google.maps.Polyline({ path: [chicago, peoria], map: map });
}

// function loadJSON(callback) {
//   var xobj = new XMLHttpRequest();
//   xobj.overrideMimeType("application/json");
//   xobj.open("GET", "../dataset.json", true);
//   xobj.onreadystatechange = function () {
//     if (xobj.readyState == 4 && xobj.status == "200") {
//       callback(JSON.parse(xobj.responseText));
//     }
//   };
//   xobj.send(null);
// }
