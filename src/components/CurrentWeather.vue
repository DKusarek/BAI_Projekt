<template>
  <div>
    <div v-if="!loading">
      <h3>Today</h3>
      <br />
      <div class="weather-icon" v-if="weather.icon">
        <font-awesome-icon :icon="weather.icon" size="6x" />
      </div>
      <div class="row weather-parameters">
        <div class="temperature-container">
          <font-awesome-icon icon="temperature-high" size="lg" />
          <p>{{ weather.temperature }} °C</p>
        </div>
        <div class="wind-container">
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
.day-forecast {
  display: inline-block;
  width: 20%;
  border: 1px solid black;
  vertical-align: top;
}

.weather-parameters {
  width: 100%;
  margin: 10% 0 0 12%;
}

.temperature-container {
  display: inline-block;
  width: 45%;
}

.wind-icon-paragraph {
  margin: 0;
}
</style>