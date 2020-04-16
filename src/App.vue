<template>
  <div id="app">  
    <Header/>
    <LeftComponent/>
    <RightComponent
       :temperature="temperature"
       :weatherInfo="weatherInfo"
    />
    <Footer/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import LeftComponent from './components/LeftComponent.vue'
import RightComponent from './components/RightComponent.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'app',
  components: {
     Header,
     LeftComponent,
     RightComponent,
     Footer
  },
  data() {
    return {
      temperature: 25,
      weatherInfo: "empty",
    }
  },
  mounted: function() {
    fetch('http://api.openweathermap.org/data/2.5/weather?q=London&appid=d5a589d05f905ed2539636a36298d888', {
      method: 'get'
    })
      .then((response) => {
        return response.json()
      })
      .then((jsonObj) => {
        //var jsonObj = JSON.parse(jsonData);
        this.weatherInfo = jsonObj.weather[0].description;
        this.temperature = Math.round(((parseFloat(jsonObj.main.temp) - 272.1) + Number.EPSILON) * 100) / 100;
      })
  }
}
</script>

<style>
@import url("../node_modules/bootstrap/dist/css/bootstrap.min.css");
</style>
