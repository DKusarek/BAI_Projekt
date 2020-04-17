<template>
  <div id="app">
    <Header />
    <NavBar />
    <div class="container" style="margin-top:20px">
      <div class="row">
        <CurrentWeather :temperature="temperature" :weatherInfo="weatherInfo" />
        <ExtendedWeather />
      </div>
      <div class="row">
        <ForecastWeather />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import NavBar from "./components/NavBar.vue";
import CurrentWeather from "./components/CurrentWeather.vue";
import ExtendedWeather from "./components/ExtendedWeather.vue";
import ForecastWeather from "./components/ForecastWeather.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "app",
  components: {
    Header,
    NavBar,
    CurrentWeather,
    ExtendedWeather,
    ForecastWeather,
    Footer
  },
  data() {
    return {
      temperature: 25,
      weatherInfo: "empty"
    };
  },
  mounted: function() {
    fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=London&appid=d5a589d05f905ed2539636a36298d888",
      {
        method: "get"
      }
    )
      .then(response => {
        return response.json();
      })
      .then(jsonObj => {
        //var jsonObj = JSON.parse(jsonData);
        this.weatherInfo = jsonObj.weather[0].description;
        this.temperature =
          Math.round(
            (parseFloat(jsonObj.main.temp) - 272.1 + Number.EPSILON) * 100
          ) / 100;
      });
  }
};
</script>

<style>
@import url("../node_modules/bootstrap/dist/css/bootstrap.min.css");
html {
  position: relative;
  min-height: 100%;
}
body {
  margin-bottom: 60px; /* Margin bottom by footer height */
}

</style>
