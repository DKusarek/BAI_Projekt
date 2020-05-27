<template>
  <div class="component-container">
    <h5>Extended Weather</h5>
    <span>Feels like: {{feelsLike}} °C</span>
    <br />
    <span>Pressure: {{pressure}} hPa</span>
    <br />
    <span>Humidity: {{humidity}} %</span>
    <br />
    <span>Clouds: {{clouds}} %</span>
    <br />
    <span>Rain: {{rain}} %</span>
  </div>
</template>

<script>
import axios from "axios";
import { conversion } from "./helpers/ConversionHelper";
import { url } from "./helpers/UrlHelper";

export default {
  name: "ExtendedWeather",
  mixins: [conversion, url],
  data() {
    return {
      feelsLike: 0,
      clouds: 0,
      humidity: 0,
      pressure: 0,
      rain: 0,
      errored: null,
      loading: null,
      apiUrl: this.getApiUrl("weather")
    };
  },
  mounted() {
    axios
      .get(this.apiUrl)
      .then(response => {
        (this.feelsLike = this.convertToCelsius(
          response["data"]["main"]["feels_like"]
        )),
          (this.clouds = response["data"]["clouds"]["all"]),
          (this.pressure = response["data"]["main"]["pressure"]),
          (this.humidity = response["data"]["main"]["humidity"]),
          (this.rain = response["data"]["rain"]["3h"]);
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  }
};
</script>
