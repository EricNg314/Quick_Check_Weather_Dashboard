var searchButton = document.getElementById("searchButton");
var searchList = document.getElementById("searchList");

var defaultInfoStorage = false;
var searchStorage = getStorage("searchList");
var infoStorage = getStorage("infoList");

// defaultInfoStorage is true for initial load.
if (Object.keys(infoStorage).length > 0) {
  defaultInfoStorage = true;
}

displaySearchedCities();
displayDefaultInfo();

searchButton.addEventListener("click", function (e) {
  var city = document.getElementById("cityName").value;
  if (city.length > 0) {
    searchStorage.unshift(city);
    // limit max number of search city buttons to 8
    if (searchStorage.length > 8) {
      searchStorage = searchStorage.slice(0, 8);
    }
    console.log("search button clicked");
    getWeatherData(city);
    saveToStorage();
    displaySearchedCities();
  }
});

// Add event listener to search city buttons.
document.addEventListener("DOMContentLoaded", function() {
  searchList.addEventListener("click", function(e){
    if(e.target.classList.contains("button-list")){
      var city = e.target.innerText;
      console.log("city button clicked")
      console.log("city: ", city)
      getWeatherData(city);
      // TODO: Run function to make API call.
    }
  })
});


function displaySearchedCities() {
  searchList.innerHTML = "";
  for(var i=0; i < searchStorage.length; i++){    
    var liBtnStr = `<li><button class="color-tertiary button button-list">${searchStorage[i]}</button></li>`;
    searchList.insertAdjacentHTML('beforeend', liBtnStr)
  }
}

// Call display data with infoStorage as default.
function displayDefaultInfo(){
  console.log("entered displayDefaultInfo")
  console.log("defaultInfoStorage: ", defaultInfoStorage)
  if(defaultInfoStorage === true){
    displayPresent(infoStorage);
    displayForecast(infoStorage);
  }
}

// TODO: Function to display data. Calls present and forecast.
function displayInfo(){
  console.log("function displayInfo")
  displayPresent(infoStorage);
  displayForecast(infoStorage);
}

// TODO: Function to make api call.
function getWeatherData(city){
  console.log("function getWeatherData")
  // Call api
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${config.TEMP_KEY}`;

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        infoStorage = data;
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        getUVIndex(lat, lon);
      });
    } else {
      console.log("errored response: ",response)
    }
  });
}

function getUVIndex(lat, lon){
  var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&appid=${config.TEMP_KEY}`;

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        infoStorage.onecall = data
        displayInfo()
        saveToStorage()
      });
    } else {
      console.log("errored response: ",response)
    }
  });
}

// TODO: Function to display present.
function displayPresent(infoStorage){
  console.log("function displayPresent")
  console.log("infoStorage: ", infoStorage)
  var presentEle = document.getElementById("present");
  // var presentListEle = presentEle.getElementsByTagName("ul")[0];
  var present = infoStorage;
  presentEle.classList.remove("hidden");

  presentEle.innerHTML = ""
  console.log("present: ", present)
  var uvIndex = present.onecall.daily[0].uvi;
  var uvColor = Math.floor(uvIndex);

  if(uvIndex >= 11){
    uvColor = 11;
  }

  var uvClass = `uvIndex-${uvColor}`;

  var date = luxon.DateTime.fromSeconds(present.dt).toLocaleString(luxon.DateTime.DATE_SHORT);
    var liTileStr = `
    <div class="flex-row">
      <h3 class="section-subHeader">${present.name} (${date})</h3>
      <img class="info-icon" src="http://openweathermap.org/img/wn/${present.weather[0].icon}@2x.png">
    </div>
    <div>
      <p>Temp: <span class="info-present-temp">${present.main.temp_max}°F - ${present.main.temp_min}°F</span></p>
      <p>Wind: ${present.wind.speed} MPH</p>
      <p>Humidity: ${present.main.humidity} %</p>
      <p>UV Index: <span class="uv-background ${uvClass}">${uvIndex}</span></p>
    </div>`;
    presentEle.insertAdjacentHTML('beforeend', liTileStr)
  
}

function displayForecast(infoStorage){
  console.log("function displayForecast")
  console.log("infoStorage: ", infoStorage)
  var forecastEle = document.getElementById("forecast");
  var forecastListEle = forecastEle.getElementsByTagName("ul")[0];
  var forecast = infoStorage.onecall.daily;
  forecastEle.classList.remove("hidden");

  forecastListEle.innerHTML = ""
  console.log("forecast: ", forecast)
  for(var i=1; i < 6; i++){
  var date = luxon.DateTime.fromSeconds(forecast[i].dt).toLocaleString(luxon.DateTime.DATE_SHORT);
    var liTileStr = `
    <li class="">
      <div class="li-content">
        <h4>${date}</h4>
        <img class="info-icon" src="http://openweathermap.org/img/wn/${forecast[i].weather[0].icon}@2x.png">
        <p>Temp: <span class="temp-max">${forecast[i].temp.max}°F</span> - <span class="temp-min">${forecast[i].temp.min}°F</span></p>
        <p>Wind: ${forecast[i].wind_speed} MPH</p>
        <p>Humidity: ${forecast[i].humidity} %</p>
      </div>
    </li>`;
    forecastListEle.insertAdjacentHTML('beforeend', liTileStr)
  }

  // https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
}


function getStorage(storageItem) {
  var storageData = JSON.parse(localStorage.getItem(storageItem));
  if (storageData === null) {
    storageData = [];
  }

  return storageData;
}

function saveToStorage() {
  var currentSearchStorage = searchStorage;
  var currentInfoStorage = infoStorage;

  // if (currentInfoStorage.length > 1) {
    // currentSearchStorage.sort(compareDescending);
  // }
  localStorage.setItem("searchList", JSON.stringify(currentSearchStorage));
  localStorage.setItem("infoList", JSON.stringify(currentInfoStorage));
}

function compareDescending(a, b) {
  // sort current object and next object by time key
  if (a.date > b.date) {
    return -1;
  }
  if (a.date < b.date) {
    return 1;
  }
  return 0;
}