<template>
    <!-- todo -->
    <div class="col-sm-6" style="border:1px solid black;">
      <h2>Extended Wether</h2>
      <h5>Wind speed: {{windSpeed}}</h5>
      <h5>Feels like: {{feelsLike}}</h5>
      <h5>Minimal temperature: {{tempMin}}</h5>
      <h5>Maximal temperature: {{tempMax}}</h5>
      <h5>Humidity: {{humidity}}</h5>
      <h5>Pressure: {{pressure}}</h5>
    </div>
    <!-- end of todo -->
</template>

<script>
import axios from 'axios'

export default {
    name: 'ExtendedWeather',
    data() {
        return {
            windSpeed: null,
            feelsLike: null,
            tempMin: null,
            tempMax: null,
            humidity: null,
            pressure: null,
            errored: null,
            loading: null
        }
    },
    mounted () {
        axios
        .get(`${process.env.VUE_APP_URL}/weather?q=London&appid=${process.env.VUE_APP_API_KEY}`)
        .then(response => {
            this.windSpeed = response['data']['wind']['speed'],
            this.feelsLike = response['data']['main']['feels_like'],
            this.tempMin = response['data']['main']['temp_min'],
            this.tempMax = response['data']['main']['temp_max'],
            this.pressure = response['data']['main']['pressure'],
            this.humidity = response['data']['main']['humidity']
          })
        .catch(error => {
            console.log(error)
            this.errored = true
        })
        .finally(() => this.loading = false)
    }
}
</script>
<style>
</style>