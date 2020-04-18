const icons = {
    methods: {
        getWeatherIcon: function(main, description) {
            switch (main) {
                case "Clear":
                    return "sun";
                case "Rain":
                    switch (description) {
                        case "light rain":
                        case "moderate rain":
                            return "cloudRain";
                        case "freezing rain":
                            return "snowflake";
                        default:
                            return "cloudShowersHeavy"
                    }
                case "Thunderstorm":
                    return "bolt";
                case "Clouds":
                    switch (description) {
                        case "few clouds: 11-25%":
                        case "scattered clouds: 25-50%":
                            return "cloudSun";
                        default:
                            return "cloud";
                    }
                case "Snow":
                    return "snowflake";
                case "Drizzle":
                    return "water";
                default:
                    return "smog"
            }
        }
    }
};

export { icons };