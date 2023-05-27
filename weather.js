const coordinateUrl = "https://get.geojs.io/v1/ip/geo.json";
const shortWeather = "https://api.open-meteo.com/v1/forecast?";

const weatherCard = document.getElementById("weatherCard");
const cityP = document.getElementById("city");
const countryP = document.getElementById("country");
const regionP = document.getElementById("region");
const temperatureP = document.getElementById("temperature");
const windspeedP = document.getElementById("windspeed");
const winddirectionP = document.getElementById("winddirection");
const weathercodeP = document.getElementById("weathercode");

fetchCoordinate();
async function fetchCoordinate() {
    try {
        const responce = await fetch(coordinateUrl);
        const coordinate = await responce.json();

        const { latitude, longitude, city, country, region } = coordinate;
        const latitudeLongitude = "latitude=" + latitude + "&longitude=" + longitude;

        const urlLink = `${shortWeather}${latitudeLongitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`;

        getWeather(urlLink, city, country, region);
    }
    catch (error) {
        console.log("Error fetching weather: ", error);
    }

    async function getWeather(urlLink, city, country, region) {
        try {
            const responceWeather = await fetch(urlLink);
            const weather = await responceWeather.json();
            const { temperature, windspeed, winddirection, weathercode } = weather.current_weather;

            cityP.innerText = city;
            countryP.innerText = country;
            regionP.innerText = region;
            temperatureP.innerText = temperature + "°C";
            windspeedP.innerText = "Windspeed: " + windspeed + " m/sec";
            winddirectionP.innerText = "Winddirection: " + winddirection;
            weathercodeP.innerText = getWeatherByCode(weathercode);
        }
        catch (error) {
            console.log("Error fetching weather: ", error);
        }
    }

    function getWeatherByCode(weathercode) {
        switch (weathercode) {
            case 0:
                return "Clear sky";
            case 1:
                return "Mainly clear";
            case 2:
                return "Partly cloudy";
            case 3:
                return "Overcast";
            case 45:
                return "Fog";
            case 48:
                return "Depositing rime fog";
            case 51:
                return "Drizzle: light intensity";
            case 53:
                return "Drizzle: moderate intensity";
            case 55:
                return "Drizzle: dense intensity";
            case 56:
                return "Freezing Drizzle: light intensity";
            case 57:
                return "Freezing Drizzle: dense intensity";
            case 61:
                return "Rain: slight intensity";
            case 63:
                return "Rain: moderate intensity";
            case 65:
                return "Rain: heavy intensity";
            case 66:
                return "Freezing Rain: light intensity";
            case 67:
                return "Freezing Rain: heavy intensity";
            case 71:
                return "Snow fall: slight intensity";
            case 73:
                return "Snow fall: moderate intensity";
            case 75:
                return "Snow fall: heavy intensity";
            case 77:
                return "Snow grains";
            case 80:
                return "Rain showers: slight";
            case 81:
                return "Rain showers: moderate";
            case 82:
                return "Rain showers: violent";
            case 85:
                return "Snow showers: slight";
            case 86:
                return "Snow showers: heavy";
            case 95:
                return "Thunderstorm";
            case 96:
                return "Thunderstorm with slight hail";
            case 99:
                return "Thunderstorm with heavy hail";
        }
    }
}