<template>
  <div>
    <div v-if="!loading">
      <h3>Today</h3>
      <br />
      <div class="row center-items main-weather-container" v-if="weather.icon">
        <div class="col-sm-12 weather-icon">
          <font-awesome-icon :icon="weather.icon" size="6x" />
        </div>
      </div>
      <div class="row center-items">
        <div class="col-sm-6">
          <font-awesome-icon icon="temperature-high" size="lg" />
          <p>{{ weather.temperature }} °C</p>
        </div>
        <div class="col-sm-6">
          <p class="wind-icon-paragraph">
            <font-awesome-icon icon="wind" size="lg" />
            {{weather.wind.direction}}
          </p>
          <p>{{ weather.wind.speed }} m/s</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { icons } from "./helpers/IconHelper";
import { conversion } from "./helpers/ConversionHelper";
import { url } from "./helpers/UrlHelper";

export default {
  name: "current-weather",
  mixins: [icons, conversion, url],
  data() {
    return {
      weather: [
        {
          icon: "",
          temperature: 0,
          wind: {
            speed: "",
            direction: ""
          }
        }
      ],
      errored: null,
      loading: true,
      currentWeatherUrl: this.getApiUrl("weather")
    };
  },
  mounted: function() {
    axios
      .get(this.currentWeatherUrl)
      .then(response => {
        this.weather = {
          icon: this.getWeatherIcon(
            response.data.weather[0].main,
            response.data.weather[0].description
          ),
          temperature: this.convertToCelsius(response.data.main.temp),
          wind: {
            speed: response.data.wind.speed,
            direction: this.getWindDirection(response.data.wind.deg)
          }
        };
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  }
};
</script>


<style scoped>
.main-weather-container {
  margin-bottom: 10%;
}
.center-items {
  text-align: center;
}
.wind-icon-paragraph {
  margin: 0;
}
</style>