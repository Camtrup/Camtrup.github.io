var inputSted = document.getElementById("inputSted")
var sokKnapp = document.getElementById("sokKnapp")
var tekstContainer = document.querySelector(".tekst")
var sted;
var lngMarker;//Koordinater
var latMarker;
var map;//Kartet i HTML-dokumentet
var marker;//Markører på kartet
var markers = [] //Array av markører
var latlng;//samlede koordinater: lat, lng
var stedsNavn;




//Initialiserer kartet
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 	51.476852, lng: -0.000500},
    zoom: 6
  });
}

//Søkefunksjon
function sok(){
  sted = inputSted.value
  geocode()
}

//Setter markørene i arrayet på karter, blir brukt til å fjerne de
function setMapOnAll(map) {

  for (var i = 0; i < markers.length; i++) {

    markers[i].setMap(map);
  }
}

//sletter markøren for hver gang du søker
function slettMarkers() {
  setMapOnAll(null);
  markers = []
}

//Funksjon som gjenkjenner oppgitt sted og gir informasjon om stedet
function geocode(){
  axios.get("https://maps.googleapis.com/maps/api/geocode/json",{ //axios.get gjør det lettere å gjøre en forespørsel
    params:{
      address:sted,
      key: "AIzaSyAofHBQXZLbrGW906B-70Ns73kgEEZEytI"
    }
  })
  .then(function(response){
    slettMarkers();
    console.log(response)
    lngMarker = response.data.results[0].geometry.location.lng; //Finner fram til lat og lng fra API
    latMarker = response.data.results[0].geometry.location.lat;
    stedsNavn = response.data.results[0].formatted_address;
    latlng= {lat: latMarker, lng: lngMarker}
    marker = new google.maps.Marker({           //Legger til markør på kartet
      position: latlng,
      map: map,
      draggable: true,
      animation: google.maps.Animation.DROP
      })
      map.setCenter(latlng)                     //Sentrerer kartet rundt markøren etter en har søkt
      markers.push(marker)
      timezone()
  })
  .catch(function(error){
    console.log(error)
    alert("Sjekk om du har skrevet det riktig og prøv igjen!")
  }
);
}

var offSet = "";         //tidsforskjellen mellom opggit sted og Oslo i sekunder
var offSetMinutter = "";
var offSetTimer = "";
var tidsSone;
var tid = document.getElementById("tid")
var minutter;
var sekunder;
var timer;


//Finner tidsforkjell som er "rawOffset" og legger det til den lokale tiden
function timezone(){
  axios.get("https://maps.googleapis.com/maps/api/timezone/json?", {
    params: {
      location: latMarker + "," + lngMarker,
      timestamp: 1585393806,
      key: "AIzaSyAofHBQXZLbrGW906B-70Ns73kgEEZEytI"
    }
  })
  .then(function(response){
    offSetTimer = "";
    offSet = "";
    offSetMinutter = "";
    console.log(response)
    offSet = response.data.rawOffset
    console.log(offSet)
    tidsSone = response.data.timeZoneName
    rundTid();
    startTime();
    visInfo();
    tekstContainer.style.display = "grid"
    console.log(markers)
  })
  .catch(function(error){
    console.log(error)
  })
}
//legger til en 0 foran sekunder og minutter om det er under 10
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function startTime() {
  tid.innerHTML = "";
  var today = new Date();
  var timer = today.getHours() + offSetTimer;
  var minutter = today.getMinutes() + offSetMinutter;
  var sekunder = today.getSeconds();
  minutter = checkTime(minutter);
  sekunder = checkTime(sekunder);
  if (minutter>60) {
    timer += 1
    minutter = minutter - 60
    tid.innerHTML = "Lokal Tid: " + timer + ":" + minutter + ":" + sekunder;
  }
  else {
    tid.innerHTML = "Lokal Tid: " + timer + ":" + minutter + ":" + sekunder;
  }
  timer = setTimeout(function() {
    startTime()
  }, 500);
}

//sjekker om det er også er halve timer i forskjellen, og tar høyde for det
//trekker fra en på grunn av forskjell mellom Norsk tid og UTC.
function rundTid(){
  if (offSet/3600 % 1 != 0) {
    offSetTimer = Math.floor(offSet/3600) - 1
    offSetMinutter = 30
  }
  else {
    offSetTimer = offSet/3600 - 1
  }
}
startTime();


//Viser informasjon om oppgitt sted
function visInfo(){
  var tidsForskjell = document.getElementById("tidsForskjell")
  if (offSetMinutter == 0) {
    tidsForskjell.innerHTML = "Tidsforskjell med Oslo er " + offSetTimer + " timer"
  }
  else {
    tidsForskjell.innerHTML = "Tidsforskjell med Oslo er " + offSetTimer + " timer og " + offSetMinutter + " minutter"
  }
  var tidsSoneTekst = document.getElementById("tidsSoneTekst")
  tidsSoneTekst.innerHTML = "Tidssone: " + tidsSone
  var stedsNavnTekst = document.getElementById("stedsNavnTekst")
  stedsNavnTekst.innerHTML = "Stedsnavn/Land: " + stedsNavn
}

function alertInfo(){
  alert("1. Skriv inn ønsket sted i skrivefeltet for å få informasjon 2. Flytt markøren eller dobbeltklikk på kartet for å få info")
}
function flyttMarker(){
  latMarker = marker.getPosition().lat();
  lngMarker = marker.getPosition().lng();
  console.log(latmarker)
  console.log(lngMarker)
}
google.maps.event.addListener(marker, 'dragend', flyttMarker());
