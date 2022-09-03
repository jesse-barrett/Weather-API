import * as MODEL from "./model.js";

function initListeners() {
  $("#gw").click((e) => {
    const location = $("#gwinput").val();
    if (location != "") {
      getWeather(location);
    } else {
      alert("You need to put a location in first!");
    }
  });
}

function getWeather(location) {
  MODEL.getCurrentWeather(location);
  $("#gwinput").val("");
}

$(document).ready(function () {
  initListeners();
});
