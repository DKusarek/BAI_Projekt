import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faSun,
    faCloud,
    faCloudSun,
    faCloudSunRain,
    faCloudShowersHeavy,
    faCloudRain,
    faSnowflake,
    faBolt,
    faWater,
    faSmog,
    faWind,
    faTemperatureHigh,
    faThumbtack,
    faSave
}
from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSun, faCloud, faCloudSun, faCloudSunRain, faWind,
    faCloudShowersHeavy, faCloudRain, faSnowflake, faBolt, faWater, faSmog,
    faTemperatureHigh, faThumbtack, faSave);

Vue.component('font-awesome-icon', FontAwesomeIcon);


Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
}).$mount('#app');