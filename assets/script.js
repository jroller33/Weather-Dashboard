let searchHistory = [];

function getSearches() {

    // get search history from local storage
    searchHistory = JSON.parse(localStorage.getItem("search"));
  
    $(".searchHistory").empty();   // clear search history div 

    $(searchHistory).each(function (index) {
      let srchBtn = $("<button>")
        .text(searchHistory[index])
        .addClass("btn1 button is-blue ml-1 has-text-centered mt-3");
      $(".searchHistory").append(srchBtn);
    });

    // $(".btn1").click(function (event) {
    //   currentConditions(event.target.innerHTML);
    // });
  }

  function updateSearches(search) {
    if (!searchHistory.includes(search)) {
        searchHistory.push(search);
    
        localStorage.setItem("search", JSON.stringify(searchHistory));
    
        getSearches();
      }
  }

  let newRowEl = $("<tr>");
let weatherElement = $(".currentWeather");
  




function getForecast(lat, lon, weather, name, temp, wind, humidity) {
  let apiUrl =
  "https://api.openweathermap.org/data/2.5/onecall?lat=" +
  lat +
    "&lon=" +
    lon +
    "&exclude=alerts,hourly,minutely&appid=0830fec5fefb765b207129fdb7fcdf86&units=imperial";
    $.ajax({
    url: apiUrl,
    method: "GET",
  }).then(function (data) {
    let date = dayjs().format("MM/DD/YYYY")

  
    let weatherInfoCurrent = `
    <h2 class="subtitle has-text-centered is-size-2 has-text-black"> 
    Current Weather Conditions <img src="${weather}">
  </h2>
    <h3 class="is-size-3 has-text-centered mb-1">${name} ${date}</h3>
    <ul id="currentWeatherList">
      <li class="is-size-4 has-text-centered">Temperature: ${temp}</li>
      <li class="is-size-4 has-text-centered">Wind Speeds: ${wind}</li>
      <li class="is-size-4 has-text-centered">Humidity: ${humidity}</li>
      <li class="is-size-4 has-text-centered" id="uvi">UV Index:</li>
      </ul>`
      
      weatherElement.html(weatherInfoCurrent);
      
    

    $("#weatherTable").empty();
    postForecast(data);
  });
}



function getCurrentWeather(city) {

  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=0830fec5fefb765b207129fdb7fcdf86&units=imperial";

  $.ajax({

    url: apiUrl,
    method: "GET",
  }).then(function (data) {

    $("#currentCondition").empty()

    // elements for forecast table
    let city = data.name;
    let temperature = data.main.temp + "℉"
    let humidity = data.main.humidity + "%"
    let wind = data.wind.speed + "MPH"

    
    // latitude and longitude for new fetch
    let lat = data.coord.lat;
    let long = data.coord.lon;

    getForecast(lat, long, city, temperature, humidity, wind);
    updateSearches(city);
  });
}