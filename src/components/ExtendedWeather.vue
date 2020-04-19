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

export default {
    name: 'ExtendedWeather',
    mixins: [conversion],
    data() {
        return {
            feelsLike: 0,
            clouds: 0,
            humidity: 0,
            pressure: 0,
            rain: 0,
            errored: null,
            loading: null,
            city: '',
            latitude: 0,
            longitude: 0,
            url: null
        }
    },
    created () {
      this.city = JSON.parse(window.localStorage.getItem('city'));
      this.latitude = JSON.parse(window.localStorage.getItem('latitude'));
      this.longitude = JSON.parse(window.localStorage.getItem('longitude'));
      if(this.city) {
        this.url = `${process.env.VUE_APP_URL}/weather?q=${this.city}&appid=${process.env.VUE_APP_API_KEY}`;
      } else if (this.latitude && this.longitude) {
        this.url = `${process.env.VUE_APP_URL}/weather?lat=${this.latitude}&lon=${this.longitude}&appid=${process.env.VUE_APP_API_KEY}`;
      } else {
        this.url = `${process.env.VUE_APP_URL}/weather?q=London&appid=${process.env.VUE_APP_API_KEY}`;
      }
    },
    mounted () {
        axios
          .get(this.url)
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