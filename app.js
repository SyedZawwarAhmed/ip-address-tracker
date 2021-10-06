const ipAddressElement = document.getElementById("ip-address");
const locationElement = document.getElementById("location");
const ispElement = document.getElementById("isp");
const timezoneElement = document.getElementById("timezone");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
// const mapid = document.getElementById("mapid");
const errorLabel = document.getElementById("error-label")

let mymap;

let latitude, longitude, jsondata, ipAddress, locationDetails;
let ipApiUrl = "https://api.ipify.org/?format=json";

async function getJson(url) {
  let jdata = await fetch(url)
    .then((res) => {
      if (res.status >= 400 && res.status < 600) {
        throw new Error("Bad response from server");
      }
      return res;
    })
    .then((data) => data.json())
    .catch((error) => {
      console.log(error);
      errorLabel.classList.add("visible")
    });
  return jdata;
}

async function main() {
  if (searchInput.value === "") {
    jsondata = await getJson(ipApiUrl);
    ipAddress = await jsondata.ip;
  }
  let ipApiDetailsUrl = `https://geo.ipify.org/api/v1?apiKey=at_2ZWF2jDUUGiXiaNJBMPMtnB6EKs6q&ipAddress=${ipAddress}`;
  console.log(ipAddress);

  locationDetails = await getJson(ipApiDetailsUrl);
  latitude = locationDetails.location.lat;
  longitude = locationDetails.location.lng;
  console.log(locationDetails);

  mymap = L.map("mapid").setView([latitude, longitude], 18);
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
  var greenIcon = L.icon({
    iconUrl: "images/icon-location.svg",
    iconSize: [38, 55], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's locationDetails
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });
  const marker = L.marker([latitude, longitude], { icon: greenIcon }).addTo(
    mymap
  );

  ipAddressElement.innerText = locationDetails.ip;
  locationElement.innerText = `${locationDetails.location.city}, ${locationDetails.location.region}`;
  ispElement.innerText = locationDetails.isp;
  timezoneElement.innerText = `UTC ${locationDetails.location.timezone}`;
}

main();

searchBtn.addEventListener("click", () => {
  errorLabel.classList.remove("visible")
  if (mymap !== undefined)
  mymap.remove();
  ipAddress = searchInput.value;
  main();
});
