const cityHelper = {
    mounted() {
        this.sendRequest(),
        window.addEventListener('city-localstorage-changed', (event) => {
          this.city = event.detail.storage;
        });
    },
    watch: {
        city: function(){
            this.sendRequest()
        }
    }
}

export {cityHelper};