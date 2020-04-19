const url = {
    methods: {
        getApiUrl: function(type) {
            let apiUrl = null;
            let city = JSON.parse(window.localStorage.getItem('city'));
            let latitude = JSON.parse(window.localStorage.getItem('latitude'));
            let longitude = JSON.parse(window.localStorage.getItem('longitude'));
            if(city) {
                apiUrl = `${process.env.VUE_APP_URL}/${type}?q=${city}&appid=${process.env.VUE_APP_API_KEY}`;
            } else if (latitude && longitude) {
                apiUrl = `${process.env.VUE_APP_URL}/${type}?lat=${latitude}&lon=${longitude}&appid=${process.env.VUE_APP_API_KEY}`;
            } else {
                apiUrl = `${process.env.VUE_APP_URL}/${type}?q=London&appid=${process.env.VUE_APP_API_KEY}`;
            }
            return apiUrl;
        }
    }
}

export { url };