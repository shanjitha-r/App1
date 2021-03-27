//DATE
let currentDate = new Date();
let h5 = document.querySelector("#date");
let hours = currentDate.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentDate.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[currentDate.getDay()];

h5.innerHTML = `${day}, ${hours}:${minutes}`;


//API 
let apiKey = "42b57b52a827badd57ef4bf4ca7a62ce";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

function showTemperature(response) {
  console.log(response.data);
let temperature = Math.round(response.data.main.temp);
let actualHumidity = document.querySelector("#humidity");
let humidity = response.data.main.humidity;
let actualWind = document.querySelector("#wind");
let wind = response.data.wind.speed;
let h2 = document.querySelector("h2");
h2.innerHTML= `${temperature}°C`;
actualHumidity.innerHTML = `Humidity: ${humidity}%`;
 document.querySelector("#description").innerHTML = response.data.weather.main;
actualWind.innerHTML = `Wind: ${wind} m/s`;
}

function handleSubmit(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-city");
  let city = document.querySelector("h1");
  let newCity = searchCity.value;
  city.innerHTML = `${newCity}`;
  axios
    .get(`${apiUrl}q=${newCity}&appid=${apiKey}&units=metric`)
    .then(showTemperature);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

//Current location 
function displayGeolocWeather(response) {
  let actualcity = document.querySelector("h1");
  actualcity.innerHTML = `${response.data.name}`;
let actualTemp = document.querySelector("#temperature");
 let actualHumidity = document.querySelector("#humidity");
  let actualWind = document.querySelector("#wind");
  let temperature = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let windDirection = response.data.wind.deg;

  actualHumidity.innerHTML = `Humidity: ${humidity}%`;
  actualTemp.innerHTML = `${temperature}`;
  actualWind.innerHTML = `Wind: ${wind} m/s`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}
function handleGeoloc(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  axios
    .get(`${apiUrl}lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`)
    .then(displayGeolocWeather);
}
function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handleGeoloc);
}
let currentLocation = document.querySelector("#actual_position")
 currentLocation.addEventListener("click", getPosition);

