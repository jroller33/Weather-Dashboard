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

  
    let currentWeatherForecast = `
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
      
      weatherElement.html(currentWeatherForecast);
      
    

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

function postForecast(data) {
  $(data.daily).each(function (i) {

    // loops thru each day
    if (i < 5) {
      let newRowForecast = $("<tr>");
      let dateData = new Date(data.daily[i].dt * 1000);
      let peopleDate = dateData.toLocaleDateString();
      let currentDate = $("<td>").text(peopleDate).addClass("is-size-2");

      let tempForecast = $("<td>")
        .text(data.daily[i].temp.day + "℉")
        .addClass("is-size-2");

      let humidityForecast = $("<td>")
        .text(data.daily[i].humidity + "%")
        .addClass("is-size-2");

      let windForecast = $("<td>")
        .text(data.daily[i].wind_speed + "MPH")
        .addClass("is-size-2");

      newRowForecast.append(
        currentDate,
        tempForecast,
        humidityForecast,
        windForecast
      );

      $("#weatherTable").append(newRowForecast);
    }
  });
}

$("#chooseCity").click(function (event) {
  event.preventDefault();
  let userCity = $("#city").val();
  $("#city").val("");
  getCurrentWeather(userCity);
});

//clear local storage
$("#clear").click(function () {
  localStorage.clear();
  location.reload();
});
