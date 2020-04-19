<template>
    <div class="col-sm-6" style="border:1px solid black;">
      <h2>Weather for today</h2>
      <h6>{{weather.description}}</h6>
      <div class="weather-icon" v-if="weather.icon">
        <font-awesome-icon :icon="weather.icon" size="4x" />
      </div>
      <h6>Temperature: {{ weather.temperature }}</h6>
    </div>
</template>

<script>
import axios from "axios";
import { icons } from "./helpers/IconHelper";
import { conversion } from "./helpers/ConversionHelper";

export default {
  name: "current-weather",
  mixins: [icons, conversion],
  data() {
   return {
      weather: [
        {
          icon: "",
          temperature: 0,
          description: "",
          wind: {
            speed: "",
            direction: ""
          }
        }
      ],
      errored: null,
      loading: true,
      city: "",
      latitude: 0,
      longitude: 0,
      url: null
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
    axios
      .get(this.url)
      .then(response => {
            this.weather = {
              description: response.data.weather[0].description,
              icon: this.getWeatherIcon(
                response.data.weather[0].main,
                response.data.weather[0].description
              ),
              temperature: response.data.main.temp,
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

