var searchButton = document.getElementById("searchButton");
var searchList = document.getElementById("searchList");

var defaultInfoStorage = false;
var searchStorage = getStorage("searchList");
var infoStorage = getStorage("infoList");

// defaultInfoStorage is true for initial load.
if (infoStorage.length > 0) {
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
    // TODO: Run function to make API call.
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
      // TODO: Run function to make API call.
    }
  })
});

// TODO: Add search buttons from storage.
function displaySearchedCities() {
  searchList.innerHTML = "";
  for(var i=0; i < searchStorage.length; i++){    
    var liBtnStr = `<li><button class="color-tertiary button button-list">${searchStorage[i]}</button></li>`;
    searchList.insertAdjacentHTML('beforeend', liBtnStr)
  }
}


// Call display data with infoStorage as default.
function displayDefaultInfo(){
  if(defaultInfoStorage === true){
    displayPresent();
    displayForecast();
  }
}

// TODO: Function to display data. Calls present and forecast.
function displayInfo(){
  console.log("function displayInfo")
  displayPresent();
  displayForecast();
}

// TODO: Function to make api call.
function getWeatherData(){
  console.log("function getWeatherData")
  // Call api
  // Call display data
}


// TODO: Function to display present.
function displayPresent(){
  console.log("function displayPresent")
}
// TODO: Function to display forecast.
function displayForecast(){
  console.log("function displayForecast")
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