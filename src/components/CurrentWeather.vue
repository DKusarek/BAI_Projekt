<template>
  <div>
    <div class="component-container" v-if="!loading">
      <h3>Today</h3>
      <br />
      <div class="row center-items main-weather-container" v-if="weather.icon">
        <div class="col weather-icon">
          <font-awesome-icon :icon="weather.icon" class="large-icon" />
        </div>
      </div>
      <div class="row center-items">
        <div class="col-6">
          <font-awesome-icon icon="temperature-high" title="Temperature" class="small-icon" />
          <p>{{ weather.temperature }} °C</p>
        </div>
        <div class="col-6">
          <p class="wind-icon-paragraph">
            <font-awesome-icon icon="wind" title="Wind" class="small-icon" />
            {{weather.wind.direction}}
          </p>
          <p>{{ weather.wind.speed }} m/s</p>
        </div>
      </div>
      <div v-if="errorStr">
        Sorry, but the following error
        occurred: {{errorStr}}
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
      errorStr: null,
      loading: true,
      currentWeatherUrl: this.getApiUrl("weather")
    };
  },
  // beforeCreate: function() {
    // document.body = "";
  // },
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
        this.errorStr = true;
      })
      .finally(() => (this.loading = false));
  }
};
</script>
