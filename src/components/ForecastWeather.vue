<template>
  <div class="col-sm-12" style="border:1px solid black;">
    <h2>Forecast Wether</h2>
    <div class="day-forecast" v-for="weather in forecast" :key="weather.id">
      <div class="row">
        <div class="col-sm-12">
          <p>Date: {{ weather.date }}</p>
          <p>Description: {{weather.description}}</p>
          <p>Temperature: {{ weather.temperature }}</p>
          <p>Wind: {{ weather.wind.speed }} m/s</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "forecast-weather",
  data() {
    return {
      forecast: [
        {
          id: 0,
          date: null,
          description: "",
          temperature: 0,
          wind: {
            speed: "",
            direction: ""
          }
        }
      ]
    };
  },
  mounted: function() {
    axios
      .get(
        `${process.env.VUE_APP_URL}/forecast?q=London,us&appid=${process.env.VUE_APP_API_KEY}`
      )
      .then(response => {
        let forecast = [];
        response.data.list.forEach((x, index) => {
          if (x.dt_txt.indexOf("12:00:00") !== -1) {
            let weather = {
              id: index,
              date: x.dt_txt.substring(0, x.dt_txt.indexOf("12:00:00")),
              description: x.weather[0].main,
              temperature: x.main.temp,
              wind: {
                speed: x.wind.speed,
                direction: x.wind.deg
              }
            };
            forecast.push(weather);
          }
        });

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