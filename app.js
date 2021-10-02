var latitude;
var longitude;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  const mymap = L.map("mapid").setView([latitude, longitude], 18);
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 22,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoiemF3d2FyYWhtZWQiLCJhIjoiY2t1YTJlMG8zMGNsOTMxbW95aWoyOGg3NCJ9.N_vSl6cOTAysVEB4clcs2g",
    }
  ).addTo(mymap);
 const marker = L.marker([latitude, longitude]).addTo(mymap);
}

getLocation();
