<template>
  <div class="col-sm-12" style="border:1px solid black;">
    <h2>Forecast Wether</h2>
    <div class="day-forecast" v-for="weather in forecast" :key="weather.id">
      <div class="row">
        <div class="col-sm-12">
          <p>Date: {{ weather.date }}</p>
          <div class="weather-icon">
            <font-awesome-icon :icon="weather.icon" size="4x" />
          </div>
          <p>Temperature: {{ weather.temperature }}</p>
          <p>Wind: {{ weather.wind.speed }} m/s</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { icons } from "./helpers/IconHelper";

export default {
  name: "forecast-weather",
  mixins: [icons],
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
          },
          errored: null,
          loading: null,
          city: "",
          latitude: 0,
          longitude: 0,
          url: null
        }
      ]
    };
  },
  created() {
    this.city = JSON.parse(window.localStorage.getItem("city"));
    this.latitude = JSON.parse(window.localStorage.getItem("latitude"));
    this.longitude = JSON.parse(window.localStorage.getItem("longitude"));
    if (this.city) {
      this.url = `${process.env.VUE_APP_URL}/weather?q=${this.city}&appid=${process.env.VUE_APP_API_KEY}`;
    } else if (this.latitude && this.longitude) {
      this.url = `${process.env.VUE_APP_URL}/weather?lat=${this.latitude}&lon=${this.longitude}&appid=${process.env.VUE_APP_API_KEY}`;
    } else {
      this.url = `${process.env.VUE_APP_URL}/weather?q=London&appid=${process.env.VUE_APP_API_KEY}`;
    }
  },
  mounted: function() {
    axios.get(this.url).then(response => {
      let forecast = [];
      response.data.list
        .forEach((x, index) => {
          if (x.dt_txt.indexOf("12:00:00") !== -1) {
            let weather = {
              id: index,
              date: x.dt_txt.substring(0, x.dt_txt.indexOf("12:00:00")),
              icon: this.getWeatherIcon(
                x.weather[0].main,
                x.weather[0].description
              ),
              temperature: x.main.temp,
              wind: {
                speed: x.wind.speed,
                direction: x.wind.deg
              }
            };
            forecast.push(weather);
          }
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));

      this.forecast = forecast;
    });
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
</style>