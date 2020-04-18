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
                            return "cloud-rain";
                        case "freezing rain":
                            return "snowflake";
                        default:
                            return "cloud-showers-heavy"
                    }
                case "Thunderstorm":
                    return "bolt";
                case "Clouds":
                    switch (description) {
                        case "few clouds":
                        case "scattered clouds":
                            return "cloud-sun";
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