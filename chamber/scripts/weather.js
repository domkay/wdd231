// Function to fetch and display weather data
async function fetchWeather() {
  const apiKey = "3b0dc23895504032b3392679c079280a";
  const city = "Kinshasa";
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`; // Use imperial units for Fahrenheit

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Extract current weather data
    const currentWeather = data.list[0];
    const currentTemp = Math.round(currentWeather.main.temp); // Temperature in Fahrenheit
    const weatherCondition = currentWeather.weather[0].main; // Weather condition (e.g., Cloudy, Sunny, Rainy)
    const highTemp = Math.round(currentWeather.main.temp_max); // Highest temperature in Fahrenheit
    const lowTemp = Math.round(currentWeather.main.temp_min); // Lowest temperature in Fahrenheit
    const humidity = currentWeather.main.humidity; // Humidity percentage

    // Assign icon based on weatherCondition
    let icon = "";
    switch (weatherCondition) {
      case "Clear":
        icon = "images/clear.png";
        break;
      case "Clouds":
        icon = "images/clouds.png";
        break;
      case "Rain":
        icon = "images/rain.png";
        break;
      case "Thunderstorm":
        icon = "images/thunder.png";
        break;
      case "Snow":
        icon = "images/snow.png";
        break;
      case "Drizzle":
      case "Mist":
        icon = "images/mist.png";
        break;
      default:
        icon = "weather-app.png";
    }

    // Convert sunrise and sunset times
    const sunriseTime = new Date(data.city.sunrise * 1000).toLocaleTimeString(
      [],
      { hour: "2-digit", minute: "2-digit" }
    );
    const sunsetTime = new Date(data.city.sunset * 1000).toLocaleTimeString(
      [],
      { hour: "2-digit", minute: "2-digit" }
    );

    // Display current weather
    const weatherInfo = document.getElementById("weather-info");
    weatherInfo.innerHTML = `
      <div class="condition">
        <img src="${icon}" alt="${weatherCondition}">
      </div>
      <div class="weather-details">
        <p><strong>Temperature:</strong> ${currentTemp}°F</p>
        <p><strong>Condition:</strong> ${weatherCondition}</p>
        <p><strong>High:</strong> ${highTemp}°F</p>
        <p><strong>Low:</strong> ${lowTemp}°F</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Sunrise:</strong> ${sunriseTime}</p>
        <p><strong>Sunset:</strong> ${sunsetTime}</p>
      </div>
    `;

    // Weather forecast
    const forecast = [];
    for (let i = 0; i < data.list.length; i += 8) {
      // 8 intervals = 1 day
      const day = data.list[i];
      forecast.push({
        date: new Date(day.dt * 1000).toLocaleDateString("en-US", {
          weekday: "short",
        }),
        temp: Math.round(day.main.temp),
        condition: day.weather[0].main,
      });
    }

    // Display weather forecast
    const weatherForecast = document.getElementById("weather-forecast");
    weatherForecast.innerHTML = `
      <ul>
        ${forecast
          .map(
            (day) => `
            <li>
              <strong>${day.date}:</strong> ${day.temp}°F
            </li>
          `
          )
          .join("")}
      </ul>
    `;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    const weatherInfo = document.getElementById("weather-info");
    weatherInfo.innerHTML =
      "<p>Failed to load weather data. Please try again later.</p>";

    const weatherForecast = document.getElementById("weather-forecast");
    weatherForecast.innerHTML =
      "<p>Failed to load weather forecast. Please try again later.</p>";
  }
}

// Call the function to load weather data
fetchWeather();
