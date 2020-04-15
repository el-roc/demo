const BOSTON = [42.3583333, -71.0602778]
var mymap = L.map('mapid').setView(BOSTON,12);
// console.log(mapInfo)
// mapInfo

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoicm9jLXN0b3JtIiwiYSI6ImNrOTBrcGsyNzAydHgzbnJpN2x5c2lsaTkifQ.tbliwu04DtIgSuTZrPeDFA', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);

    L.marker([42.3557,-71.0647]).addTo(mymap)
    .bindPopup("<b>Hello boston!</b><br /><a href='https://www.google.com/maps/dir//Boston+Common,+Tremont+Street,+Boston,+MA/@42.359948,-71.0971613'>Boston Common</a>").openPopup();

    L.marker([42.316667, -71.120278]).addTo(mymap)
    .bindPopup("<b>Hello boston!</b><br /><a href='https://www.google.com/maps/dir//Jamaica+Pond,+Boston,+MA/@42.3172192,-71.1553617'>Jamaica Pond</a>").openPopup();

    L.marker([42.2810139,-71.1792237]).addTo(mymap)
    .bindPopup("<b>Hello boston!</b><br /><a href='https://www.google.com/maps/dir//Millennium+Park,+Boston,+MA/@42.2810682,-71.2120544'>Millenium Park</a>").openPopup();

    // const [x, y] = BOSTON;
    // const BROOKLINE = [x-0.1, y]
    
    L.marker([42.3423, -71.093]).addTo(mymap)
    .bindPopup("<b>Hello boston!</b><br /><a href='https://www.google.com/maps/dir//Clemente+Field,+Boston,+MA/@42.3408147,-71.1325221'>Fens in Fenway</a>.").openPopup();
   
// L.circle(BOSTON, 500, {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5
// }).addTo(mymap).bindPopup("I am a circle.");

// L.polygon([
//     [51.509, -0.08],
//     [51.503, -0.06],
//     [51.51, -0.047]
// ]).addTo(mymap).bindPopup("I am a polygon.");


var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);
