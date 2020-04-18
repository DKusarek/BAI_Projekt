<template>
    <!-- todo -->
    <div class="col-sm-6">
        <form v-on:submit="saveCity">
            <input type="text" v-model="city" placeholder="Custom">
            <button type="submit">Save</button>
        </form>
        <div v-if="errorStr">
            Sorry, but the following error
            occurred: {{errorStr}}
        </div>
        <div v-if="gettingLocation">
            <i>Getting your location...</i>
        </div>
        <div v-if="location">
            Your location data is {{ location.coords.latitude }}, {{ location.coords.longitude}}
        </div>
    </div>
    <!-- end of todo -->
</template>

<script>
export default {
    name: 'Location',
    data() {
        return {
            city: '',
            location:null,
            gettingLocation: false,
            errorStr:null
        }
    },
    created() {
        if(!("geolocation" in navigator)) {
            this.errorStr = 'Geolocation is not available.';
            return;
        }
        this.gettingLocation = true;
        navigator.geolocation.getCurrentPosition(pos => {
            this.gettingLocation = false;
            this.location = pos;
            this.saveGeolocation();
        }, err => {
            this.gettingLocation = false;
            this.errorStr = err.message;
        })
    },
    methods: {
        saveCity() {
            localStorage.setItem('city',JSON.stringify(this.city));
        }, 
        saveGeolocation() {
            localStorage.setItem('latitude',JSON.stringify(this.location.coords.latitude));
            localStorage.setItem('longitude',JSON.stringify(this.location.coords.longitude));
        }
    }
}
</script>
<style>
</style>