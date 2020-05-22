<template>
  <div class="component-container forecast-container" v-if="!loading">
    <h5>Forecast Wether</h5>
    <div class="day-forecast" v-for="weather in forecast" :key="weather.id">
      <div class="row">
        <div class="col center-items">
          <p>{{ weather.date }}</p>
          <div class="row center-items main-weather-container" v-if="weather.icon">
            <div class="col weather-icon">
              <font-awesome-icon :icon="weather.icon" class="medium-icon" />
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
        </div>
      </div>
    </div>
    <div v-if="errorStr">
      Sorry, but the following error
      occurred: {{errorStr}}
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { icons } from "./helpers/IconHelper";
import { conversion } from "./helpers/ConversionHelper";
import { url } from "./helpers/UrlHelper";
import { cityHelper } from "./helpers/CityHelper";

export default {
  name: "forecast-weather",
  mixins: [icons, conversion, url, cityHelper],
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
      errorStr: null,
      loading: true,
      city: null
    };
  },
  methods: {
    sendRequest(){
      axios
      .get(this.getApiUrl("forecast"))
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
        this.errorStr = true;
      })
      .finally(() => (this.loading = false));
    }
  }
};
</script>

<style scoped>
@media screen and (max-width: 299px) {
  .day-forecast {
    display: inline-block;
    width: 100%;
    vertical-align: top;
    border-bottom: 3px solid #8080802e;
  }
}
@media screen and (min-width: 300px) and (max-width: 799px) {
  .day-forecast {
    display: inline-block;
    width: 50%;
    vertical-align: top;
    border-bottom: 3px solid #8080802e;
  }
}
@media screen and (min-width: 800px) {
  .day-forecast {
    display: inline-block;
    width: 20%;
    vertical-align: top;
  }
}
.forecast-container {
  text-align: center;
}
</style>