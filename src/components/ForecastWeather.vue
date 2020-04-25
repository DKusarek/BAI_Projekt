<template>
  <div v-if="!loading">
    <h5>Forecast Wether</h5>
    <div class="day-forecast" v-for="weather in forecast" :key="weather.id">
      <div class="row">
        <div class="col-sm-12 center-items">
          <p>{{ weather.date }}</p>
          <div class="row center-items main-weather-container" v-if="weather.icon">
            <div class="col-sm-12 weather-icon">
              <font-awesome-icon :icon="weather.icon" size="4x" />
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
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { icons } from "./helpers/IconHelper";
import { conversion } from "./helpers/ConversionHelper";
import { url } from "./helpers/UrlHelper";

export default {
  name: "forecast-weather",
  mixins: [icons, conversion, url],
  data() {
    return {
      forecast: [
        {
          id: 0,
          date: null,
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
      apiUrl: this.getApiUrl("forecast")
    };
  },
  mounted: function() {
    axios
      .get(this.apiUrl)
      .then(response => {
        let forecast = [];
        response.data.list.forEach((x, index) => {
          if (x.dt_txt.indexOf("12:00:00") !== -1) {
            let weather = {
              id: index,
              date: x.dt_txt.substring(0, x.dt_txt.indexOf("12:00:00") - 1),
              icon: this.getWeatherIcon(
                x.weather[0].main,
                x.weather[0].description
              ),
              temperature: this.convertToCelsius(x.main.temp),
              wind: {
                speed: x.wind.speed,
                direction: this.getWindDirection(x.wind.deg)
              }
            };
            forecast.push(weather);
          }
        });

        this.forecast = forecast;
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
  vertical-align: top;
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
</style>