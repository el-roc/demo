let currentLat = document.querySelector(".lat")
let currentLng = document.querySelector(".lng")
let currentPark = document.querySelector(".name-of-park")
let canPlot = false
let toggleEdit = document.querySelector(".editable")
let submitBtn = document.querySelector(".submit")
let locations = document.querySelector(".location-data")
const BOSTON = [42.3583333, -71.0602778]
var mymap = L.map('mapid').setView(BOSTON,12);
// console.log(mapInfo)
// mapInfo
console.log("locations object ", locations.textContent)
fetch('map')
.then(res=> res.json())
.then(data => {
console.log("new add data: ",data)
// window.location.reload(true)
})
.catch((err)=>{
    console.log(err)
})

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
    .bindPopup("<a href='/individualpark?id=5e9720921c9d4400007359d5' id='5e9720921c9d4400007359d5'><b>The Boston Common</b><br /><a/><a href='https://www.google.com/maps/dir//Boston+Common,+Tremont+Street,+Boston,+MA/@42.359948,-71.0971613'>Directions to the Boston Common</a>").openPopup();

    L.marker([42.316667, -71.120278]).addTo(mymap)
    .bindPopup("<a href='/individualpark?id=5e9736771c9d4400007359d6' id='5e9736771c9d4400007359d6'><b>The Jamaica Pond</b><br /></a><a href='https://www.google.com/maps/dir//Jamaica+Pond,+Boston,+MA/@42.3172192,-71.1553617'>Directions to Jamaica Pond</a>").openPopup();

    L.marker([42.2810139,-71.1792237]).addTo(mymap)
    .bindPopup("<a href='/individualpark'><b>Millenium Park</b><br /></a><a href='https://www.google.com/maps/dir//Millennium+Park,+Boston,+MA/@42.2810682,-71.2120544'>Direction to Millenium Park</a>").openPopup();

    // const [x, y] = BOSTON;
    // const BROOKLINE = [x-0.1, y]
    
    L.marker([42.3423, -71.093]).addTo(mymap)
    .bindPopup("<a href='/individualpark?id=5e9736de1c9d4400007359d7' id='5e9736de1c9d4400007359d7'><b>The Fens</b><br /></a><a href='https://www.google.com/maps/dir//Clemente+Field,+Boston,+MA/@42.3408147,-71.1325221'>Direction to Fens in Fenway</a>.").openPopup();
   
    
    // var marker = L.marker();
// function onMapClick(e) {
//     marker
//         .setLatLng(e.latlng)
//         .setContent("You clicked the map at " + e.latlng.toString())
//         .openOn(mymap);
// }

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


// var popup = L.popup();

// function onMapClick(e) {
//     popup
//         .setLatLng(e.latlng)
//         .setContent("You clicked the map at " + e.latlng.toString())
//         .openOn(mymap);
// }

toggleEdit.addEventListener("click", (e) =>{
    e.preventDefault()
    canPlot = !canPlot
    if(canPlot){
        toggleEdit.textContent = "Disable Map"
    }else{
        toggleEdit.textContent = "Edit Map"
    }
})

let newAddr = { }
// let newVar = e.latlng
function onMapClick(e) {
    // alert(e.latlng);
    // let newVar = e.latlng
    // newAddr = newVar
    // console.log(newVar);
    if(canPlot){
        let newVar = e.latlng
        newAddr = newVar
        console.log(newVar);
        L.marker([newAddr.lat, newAddr.lng]).addTo(mymap) //make new marker with var newAddr
        // .bindPopup("<a href='/individualpark?id=5e9736de1c9d4400007359d7' id='5e9736de1c9d4400007359d7'><b>The Fens</b><br /></a><a href='https://www.google.com/maps/dir//Clemente+Field,+Boston,+MA/@42.3408147,-71.1325221'>Direction to Fens in Fenway</a>.").openPopup();
        currentLat.value = newAddr.lat
        currentLng.value = newAddr.lng
        // fetch('mark', {
        //     method: 'post',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify(newAddr)
        //   })
        //   .then(response => {
        //     if (response.ok) return response.json()
        //   })
        //   .then(data => {
        //     console.log("new add data: ",data)
        //     // window.location.reload(true)
        //   })
        // .catch((err)=>{
        //     console.log(err)
        // })
        return(newVar);
    }
    
    submitBtn.addEventListener("click", (e) =>{
        canPlot = false
        toggleEdit.textContent = "Edit Map"
    })

    // .bindPopup("<a href='/individualpark?id=5e9736de1c9d4400007359d7' id='5e9736de1c9d4400007359d7'><b>The Fens</b><br /></a><a href='https://www.google.com/maps/dir//Clemente+Field,+Boston,+MA/@42.3408147,-71.1325221'>Direction to Fens in Fenway</a>.").openPopup();
    // currentLat.value = newAddr.lat
    // currentLng.value = newAddr.lng
    // fetch('mark', {
    //     method: 'post',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify(newAddr)
    //   })
    //   .then(response => {
    //     if (response.ok) return response.json()
    //   })
    //   .then(data => {
    //     console.log("new add data: ",data)
    //     // window.location.reload(true)
    //   })
    // .catch((err)=>{
    //     console.log(err)
    // })
    // return(newVar);
}
mymap.on('click', onMapClick);
