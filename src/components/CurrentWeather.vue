<template>
    <div class="col-sm-4">
      <h2>Current Weather</h2>
      <h5 id="weather"></h5>
      <h5>WeatherVue: {{weatherInfo}}</h5>
      <div class="weather_img">weather_img</div>
      <h3>Parameters</h3>
      <p>NULL</p>
      <ul class="nav nav-pills flex-column">
        <li>
            <p id="temperature"></p>
            <p>TemperatureVue: {{ temperature }}</p>
        </li>
         <li>
            <p>SomeParam_1:</p>
        </li>
        <li>
            <p>SomeParam_2:</p>
        </li>
        <li>
            <p>SomeParam_3:</p>
        </li>
        <li>
            <p>SomeParam_4:</p>
        </li>
        <!-- <li>
            <p>SomeParam_5:</p>
        </li> -->
      </ul>
      <hr class="d-sm-none">
    </div>
</template>

<script>
export default {
  props: [
    'temperature',
    'weatherInfo'
  ]
}
</script>

