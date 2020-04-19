<template>
  <div id="app">
    <Header />
    <NavBar />
    <div class="container" style="margin-top:20px">
      <div class="row">
        <Location />
      </div>
      <div class="row">
        <CurrentWeather />
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
import Location from "./components/Location.vue";

export default {
  name: "app",
  components: {
    Header,
    NavBar,
    CurrentWeather,
    ExtendedWeather,
    ForecastWeather,
    Footer,
    Location
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
}

.weather-icon{
  color: #5b8fc7;
  text-align: center;
}

</style>
