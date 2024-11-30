require("dotenv").config();
document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  const API_KEY = process.env.API_KEY;

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();

    // Clear previous results and error message
    weatherInfo.classList.add("hidden");
    errorMessage.classList.add("hidden");

    if (!city) return;

    // it may throw an error
    // server/database is always in another continent

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    const { name, main, weather } = data;
    const weatherCondition = weather[0].main;

    cityNameDisplay.textContent = name;
    temperatureDisplay.innerHTML = `Temperature: ${
      main.temp
    } °C ${getWeatherIcon(weatherCondition)}`;
    descriptionDisplay.textContent = `Description: ${weather[0].description}`;

    // Show weather information
    weatherInfo.classList.remove("hidden");

    // Hide error message
    errorMessage.classList.add("hidden");
  }

  function showError() {
    // Hide the weather information and show the error message
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
    errorMessage.textContent = "City not found. Please try again!";
  }

  function getWeatherIcon(weatherCondition) {
    // Choose emoji based on weather condition
    let icon = "";
    switch (weatherCondition.toLowerCase()) {
      case "clear":
        icon = "☀️"; // Sun emoji
        break;
      case "rain":
      case "drizzle":
        icon = "🌧️"; // Rain emoji
        break;
      case "clouds":
        icon = "☁️"; // Cloud emoji
        break;
      case "snow":
        icon = "❄️"; // Snow emoji
        break;
      case "thunderstorm":
        icon = "⚡"; // Thunderstorm emoji
        break;
      case "mist":
      case "haze":
      case "fog":
        icon = "🌫️"; // Fog emoji
        break;
      default:
        icon = "🌡️"; // Default weather emoji
        break;
    }
    return icon;
  }
});
