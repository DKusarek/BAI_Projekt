<template>
  <div class="component-container location-container">
    <h5>Location</h5>
    <div class="row">
      <div class="col">
        <input type="text" v-model="city" placeholder="Custom" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button type="button" @click="saveCity" title="Save location">
          <font-awesome-icon icon="save" />
        </button>
        <button type="button" @click="currentLocation" title="Current location">
          <font-awesome-icon icon="thumbtack" />
        </button>
      </div>
    </div>
    <div v-if="errored">
      Sorry, something went wrong
    </div>
    <div v-if="loading">
      <i>Getting your location...</i>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Location",
  data() {
    return {
      city: JSON.parse(window.localStorage.getItem("city")),
      location: null,
      loading: true,
      errored: false,
      ip: JSON.parse(window.localStorage.getItem("ip"))
    };
  },
  beforeMount() {
    axios
      .get(`${process.env.VUE_APP_URL_TO_GET_IP}`)
      .then(response => (localStorage.setItem("ip", JSON.stringify(response.data.ip))))
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
  mounted() {
    axios
      .get(`${process.env.VUE_APP_URL_TO_GET_GEOLOCATION}&ip=${this.ip}`)
      .then(response => {
        this.saveGeolocation(response.data.latitude, response.data.longitude)
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
  methods: {
    saveCity() {
      localStorage.setItem("city", JSON.stringify(this.city));
      window.dispatchEvent(new CustomEvent('city-localstorage-changed', {
        detail: {
          storage: JSON.parse(window.localStorage.getItem('city'))
        }
      }));    
    },
    saveGeolocation(latitude, longitude) {
      localStorage.setItem(
        "latitude",
        JSON.stringify(Math.round(latitude))
      );
      localStorage.setItem(
        "longitude",
        JSON.stringify(Math.round(longitude))
      );
    },
    currentLocation() {
      localStorage.removeItem("city");
      this.city = "";
      window.dispatchEvent(new CustomEvent('city-localstorage-changed', {
        detail: {
          storage: ''
        }
      }));   
    }
  }
};
</script>
<style>
button {
  display: inline-block;
}
</style>