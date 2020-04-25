<template>
    <div class="col-sm-6" style="border:1px solid black;">
      <h2>Weather for today</h2>
      <h6>{{weather.description}}</h6>
      <div class="weather-icon" v-if="weather.icon">
        <font-awesome-icon :icon="weather.icon" size="4x" />
      </div>
      <h6>Temperature: {{ weather.temperature }}</h6>
      <canvas ref="myChart" :width="200" :height="100"></canvas>
    </div>
</template>

<script>
import axios from "axios";
import { icons } from "./helpers/IconHelper";
import { conversion } from "./helpers/ConversionHelper";
import { url } from "./helpers/UrlHelper";
import Chart from 'chart.js';

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
      currentWeatherUrl: this.getApiUrl('weather'),
      forecastWeatherUrl: this.getApiUrl('forecast'),
      //chart variables
      chart: null,
      chartLabels: [],
      chartData: []
    };
  },
  mounted: function() {
    this.chart = new Chart(this.$refs.myChart, {
      type: 'line',
      data: {
        labels: this.chartLabels,
        datasets: [{
          label: 'Temperature',
          borderColor: 'rgba(50, 115, 220, 0.5)',
          backgroundColor: 'rgba(50, 115, 220, 0.1)',
          data: this.chartData
        }]
      },
      options: {responsive: true}
    });
    axios
      .get(this.currentWeatherUrl)
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

    //data for chart
    axios
      .get(this.forecastWeatherUrl)
      .then(response => {
        const unixOneDay = 86400;
        let currentTime = response.data.list[0].dt;
        response.data.list.forEach((x/*, index*/) => {
          if (x.dt - currentTime < unixOneDay) {
            let hoursBegin = x.dt_txt.indexOf("00:00:00");
            if( hoursBegin === -1)
            {
              hoursBegin = x.dt_txt.indexOf("00:00") - 3;
            }
            let onlyHour = x.dt_txt.substring(hoursBegin, hoursBegin+5);
            this.chartLabels.push(onlyHour);
            this.chartData.push(this.convertToCelsius(x.main.temp));
          }
        });
        this.chart.update();
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  }
};
</script>

