<template>
  <div id="app">
    <Header />
    <div class="container" style="margin-top:20px">
      <div class="row top-row">
        <div class="col-md-3 col-sm-6">
          <CurrentWeather />
        </div>
        <div class="col-md-6 col-sm-12 order-md-1 order-sm-2">
          <TemperatureChart />
        </div>
        <div class="col-md-3 col-sm-6 order-md-2 order-sm-1">
          <Location />
          <br />
          <ExtendedWeather />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <ForecastWeather />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import CurrentWeather from "./components/CurrentWeather.vue";
import ExtendedWeather from "./components/ExtendedWeather.vue";
import ForecastWeather from "./components/ForecastWeather.vue";
import Footer from "./components/Footer.vue";
import Location from "./components/Location.vue";
import TemperatureChart from "./components/TemperatureChart";

export default {
  name: "app",
  components: {
    Header,
    CurrentWeather,
    ExtendedWeather,
    ForecastWeather,
    Footer,
    Location,
    TemperatureChart
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
  margin-bottom: 60px;
  color: #000000ad;
}

button {
  color: #000000ad;
}

.top-row {
  margin-bottom: 3%;
}

.main-weather-container {
  margin-bottom: 10%;
}
.center-items {
  text-align: center;
}
.wind-icon-paragraph {
  margin: 0;
}

@media screen and (max-width: 299px) {
  .small-icon {
    font-size: 1em;
  }
  .medium-icon {
    font-size: 3em;
  }
  .large-icon {
    font-size: 4em;
  }
  h1{
    font-size: 1.5em;
  }
  .component-container {
    margin-bottom: 15%;
  }
  .location-container {
    margin-top: 15%;
  }
}

@media screen and (min-width: 300px) and (max-width: 539px) {
  .component-container {
    margin-bottom: 5%;
  }
  .location-container {
    margin-top: 5%;
  }
}

@media screen and (min-width: 300px) {
  .small-icon {
    font-size: 1.33em;
  }
  .medium-icon {
    font-size: 4em;
  }
  .large-icon {
    font-size: 6em;
  }
}

.weather-icon {
  color: #739fde;
  text-align: center;
}
</style>
