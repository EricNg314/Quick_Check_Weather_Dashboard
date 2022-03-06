var searchButton = document.getElementById("searchButton");
var searchList = document.getElementById("searchList");

var needDefaultStorage = true;
var searchStorage = getStorage("searchList");
var infoStorage = getStorage("infoList");


searchButton.addEventListener("click", function(e){
  console.log("search button clicked")
  // TODO: Run function to make API call.
  console.log(config.TEMP_KEY)
})

// Add event listener to search city buttons.
document.addEventListener("DOMContentLoaded", function() {
  searchList.addEventListener("click", function(e){
    if(e.target.classList.contains("button-list")){
      console.log("city button clicked")
      // TODO: Run function to make API call.
    }
  })
});

// TODO: Add search buttons from storage.

// Call display data with infoStorage as default.

// TODO: Function to make api call.
  // Call api
  // Call display data

// TODO: Function to display data. Calls present and forecast.
  // Call display present
  // Call display forecast


// TODO: Function to display present.
// TODO: Function to display forecast.


function getStorage(storageItem) {
  var storageData = JSON.parse(localStorage.getItem(storageItem));
  if (storageData === null) {
    storageData = [];
  } else {
    needDefaultStorage = false;
  }

  return storageData;
}

function saveToStorage() {
  var currentSearchStorage = searchStorage;
  var currentInfoStorage = infoStorage;

  if (currentStorage.length > 1) {
    // currentStorage.sort(compareDescending);
  }
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