<template>
  <div>
    <h5>Daily temperature</h5>
    <canvas ref="myChart" :width="200" :height="100"></canvas>
  </div>
</template>

<script>
import axios from "axios";
import { conversion } from "./helpers/ConversionHelper";
import { url } from "./helpers/UrlHelper";
import Chart from "chart.js";

export default {
  name: "temperature-chart",
  mixins: [conversion, url],
  data() {
    return {
      forecastWeatherUrl: this.getApiUrl("forecast"),
      chart: null,
      chartLabels: [],
      chartData: []
    };
  },
  mounted: function() {
    this.chart = new Chart(this.$refs.myChart, {
      type: "line",
      data: {
        labels: this.chartLabels,
        datasets: [
          {
            label: "Temperature",
            borderColor: "rgba(50, 115, 220, 0.5)",
            backgroundColor: "rgba(50, 115, 220, 0.1)",
            data: this.chartData
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [
            {
              ticks: {
                suggestedMin: 0,
                suggestedMax: 20
              }
            }
          ]
        }
      }
    });

    //data for chart
    axios
      .get(this.forecastWeatherUrl)
      .then(response => {
        const unixOneDay = 86400;
        let currentTime = response.data.list[0].dt;
        response.data.list.forEach((x /*, index*/) => {
          if (x.dt - currentTime < unixOneDay) {
            let hoursBegin = x.dt_txt.indexOf("00:00:00");
            if (hoursBegin === -1) {
              hoursBegin = x.dt_txt.indexOf("00:00") - 3;
            }
            let onlyHour = x.dt_txt.substring(hoursBegin, hoursBegin + 5);
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

