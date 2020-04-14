<template>
    <div>
        <table class="table">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <th scope="row">1</th>
            <td>{{ currency }}</td>
            <td>Otto</td>
            <td>@mdo</td>
            </tr>
        </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'ExtendedWeather',
    data() {
        return {
            currency: 'eeee',
            errored: null,
            loading: null
        }
    },
    mounted () {
        axios
        .get('http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=948d882d5808de809bfe312cd727d8c5')
        .then(response => (this.currency = response))
        .catch(error => {
            console.log(error)
            this.errored = true
        })
        .finally(() => this.loading = false)
    }
}
</script>
<style>
    @import url("../node_modules/bootstrap/dist/css/bootstrap.min.css");
</style>
