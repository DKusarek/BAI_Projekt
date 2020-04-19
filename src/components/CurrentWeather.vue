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
          description: "",
          wind: {
            speed: "",
            direction: ""
          }
        }
      ],
      errored: null,
      loading: true,
      apiUrl: this.getApiUrl('weather')
    };
  },
  mounted: function() {
    axios
      .get(this.apiUrl)
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

