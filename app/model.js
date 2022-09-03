function getCurrentDate(name) {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();
  const fullDate = `${year}-${month}-${day}`;
  return fullDate;
}

const key = "208850fffa3b427c8e4204635222908";
const baseURL = "http://api.weatherapi.com/v1/";

function getCurrentWeather(location) {
  $("#gwoutput").html("");
  // this is for getting and looping through JSON data

  // $.getJSON("data/data.json", (data) => {
  //   for (let i = 0; i < data.length; i++) {
  //     const element = data[i];
  //     console.log(element.name);
  //     $("#app").append(`<p>${element.name}</p>`);
  //   }
  // }).fail(function (e) {
  //   alert("Sorry, your data could not be loaded at this time.");
  // });

  // this is for retreiving an api
  const currentDate = getCurrentDate();
  $.get(
    `${baseURL}forecast.json?key=${key}&q=${location}&days=7&aqi=no&alerts=no`,
    (data) => {
      console.log(data);
      $("#gwoutput").append(
        `<h2>Forecast for ${data.location.name}, ${data.location.region}</h2>
        <h2>${data.location.country}</h2>`
      );
      for (let i = 0; i < data.forecast.forecastday.length; i++) {
        $("#gwoutput").append(`
          <div class="card">
            <p id="gwdate" class="mbottom">${data.forecast.forecastday[i].date}</p>
            <div class="columns">
              <div>
                <p id="gwavgtemp">AVG ${data.forecast.forecastday[i].day.avgtemp_f}&degF</p>
                <p><span id="gwmintemp">${data.forecast.forecastday[i].day.mintemp_f}&degF</span> - <span id="gwmaxtemp">${data.forecast.forecastday[i].day.maxtemp_f}&degF</span></p>
                <p>Feels like ${data.forecast.forecastday[i].day.avghumidity}&degF</p>
              </div>
              <div>
                <img src="${data.forecast.forecastday[i].day.condition.icon}" alt="weather icon">
                <p id="gwcondition">${data.forecast.forecastday[i].day.condition.text}</p>
              </div>
              <div>
                <p id="gwchanceofrain">${data.forecast.forecastday[i].day.daily_chance_of_rain}% chance of rain</p>
                <p id="totalprecip">${data.forecast.forecastday[i].day.totalprecip_in} in</p>
              </div>
            </div>
          </div>
        `);
      }
    }
  ).fail(function (e) {
    alert("Sorry, can't get weather right now.");
  });
}

export { getCurrentDate, getCurrentWeather };
