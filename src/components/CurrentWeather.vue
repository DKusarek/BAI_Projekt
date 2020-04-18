<template>
    <div class="col-sm-6" style="border:1px solid black;">
      <h2>Weather for today</h2>
      <h6>{{weatherInfo}}</h6>
      <img v-bind:src="iconSource"/> 
      <h6>Temperature: {{ temperature }}</h6>
    </div>
</template>

<script>
export default {
  data() {
    return {
      temperature: 0,
      weatherInfo: "",
      iconId: ""
    };
  },
  computed:{
      iconSource() {
        return "http://openweathermap.org/img/wn/"+ this.iconId+"@2x.png";
    }
  },
  mounted: function() {
    fetch(
      `${process.env.VUE_APP_URL}/weather?q=London&appid=${process.env.VUE_APP_API_KEY}`,
      {
        method: "get"
      }
    )
      .then(response => {
        return response.json();
      })
      .then(jsonObj => {
        this.weatherInfo = jsonObj.weather[0].description;
        this.temperature =
          Math.round(
            (parseFloat(jsonObj.main.temp) - 272.1 + Number.EPSILON) * 100
          ) / 100;
        this.iconId = jsonObj.weather[0].icon;
      });
  }
}
</script>

