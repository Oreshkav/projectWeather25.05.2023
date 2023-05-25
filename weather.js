const coordinateUrl = "https://get.geojs.io/v1/ip/geo.json";
// const weatherUrl = "https://open-meteo.com/"
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

        // console.log(coordinate);

        const urlLink = `${shortWeather}${latitudeLongitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`;
        
        console.log(urlLink);

        const responceWeather = await fetch(urlLink);
        const weather = await responceWeather.json();  
        const {temperature, windspeed, winddirection, weathercode} = weather.current_weather;

        /**log**/
        // console.log("weather:", weather.current_weather)
        // console.log(city);
        // console.log(country);
        // console.log(region);

        cityP.innerText = "City: " + city;
        countryP.innerText = country;
        regionP.innerText = region;
        temperatureP.innerText = "Temperature: " + temperature;
        windspeedP.innerText = "Windspeed: " + windspeed;
        winddirectionP.innerText = "Winddirection: " + winddirection;
        regionP.weathercodeP = "Weathercode; " + weathercode;

    }
    catch (error) {
        console.log("Error fetching weather: ", error);
    }
}

// function fillWeatherCard ()



// fetchWeather();
// async function fetchWeather(latitudeLongitude) {
//     try {
//         const urlLink = `${shortWeather}${latitudeLongitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`;
//         console.log(urlLink);
//         const responce = await fetch(urlLink);
//         const weather = await responce.json();
//         console.log(weather);
//     }
//     catch (error) {
//         console.log("Error fetching weather: ", error);
//     }
// }
