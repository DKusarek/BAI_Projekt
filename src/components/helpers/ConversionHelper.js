const conversion = {
    methods: {
        getWindDirection: function(degree) {
            const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
            return directions[Math.round(degree / 45) % 8];
        },
        convertToCelsius: function(temperature) {
            return Math.round(temperature - 273.15);
        }
    }
}

export { conversion };