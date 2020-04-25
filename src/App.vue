<template>
  <div id="app">
    <Header />
    <div class="container" style="margin-top:20px">
      <div class="row"></div>
      <div class="row">
        <div class="col-sm-3" style="border:1px solid black;">
          <CurrentWeather />
        </div>
        <div class="col-sm-6" style="border:1px solid black;">
          <TemperatureChart />
        </div>
        <div class="col-sm-3">
          <Location />
          <br />
          <ExtendedWeather />
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12" style="border:1px solid black;">
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

.weather-icon {
  color: #5b8fc7;
  text-align: center;
}
</style>
