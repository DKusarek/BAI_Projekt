<template>
    <!-- todo -->
    <div class="col-sm-6" style="border:1px solid black;">
      <h2>Extended Wether</h2>
      <h5>Feels like: {{feelsLike}} °C</h5>
      <h5>Pressure: {{pressure}} hPa</h5>
      <h5>Humidity: {{humidity}} %</h5>
      <h5>Clouds: {{clouds}} %</h5>
      <h5>Rain: {{rain}} %</h5>
    </div>
    <!-- end of todo -->
</template>

<script>
import axios from 'axios'
import { conversion } from './helpers/ConversionHelper'
import { url } from "./helpers/UrlHelper";

export default {
    name: 'ExtendedWeather',
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
            apiUrl: this.getApiUrl('weather')
        }
    },
    mounted () {
        axios
          .get(this.apiUrl)
          .then(response => {
            this.feelsLike =  this.convertToCelsius(response['data']['main']['feels_like']),
            this.clouds = response['data']['clouds']['all'],
            this.pressure = response['data']['main']['pressure'],
            this.humidity = response['data']['main']['humidity'],
            this.humidity = response['data']['rain']['3h']
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
          .finally(() => this.loading = false);
    }
}
</script>
<style>
</style>