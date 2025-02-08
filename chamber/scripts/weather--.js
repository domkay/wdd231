document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "3b0dc23895504032b3392679c079280a"; // Your API key
  const city = "Kinshasa";
  const units = "metric"; // Use 'imperial' for Fahrenheit

  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`); // Improved error handling
      }
      return response.json();
    })
    .then((data) => {
      const weatherInfo = document.getElementById("weather-info");
      const currentWeather = data.list[0];

      const temperature = Math.round(currentWeather.main.temp);
      const description = currentWeather.weather[0].description
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      weatherInfo.innerHTML = `<p>Temperature: ${temperature}°${
        units === "metric" ? "C" : "F"
      }</p><p>Description: ${description}</p>`;

      weatherInfo.innerHTML += "<h3>3-Day Forecast:</h3><ul>";
      for (let i = 8; i < data.list.length; i += 8) {
        const forecast = data.list[i];
        const forecastDate = new Date(forecast.dt * 1000).toLocaleDateString();
        const forecastTemp = Math.round(forecast.main.temp);
        const forecastDescription = forecast.weather[0].description
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        weatherInfo.innerHTML += `<li>${forecastDate}: ${forecastTemp}°${
          units === "metric" ? "C" : "F"
        } - ${forecastDescription}</li>`;
      }
      weatherInfo.innerHTML += "</ul>";
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      document.getElementById("weather-info").innerHTML =
        "<p>Error fetching weather data. Please check your API key and internet connection.</p>"; // More informative error message
    });
});
