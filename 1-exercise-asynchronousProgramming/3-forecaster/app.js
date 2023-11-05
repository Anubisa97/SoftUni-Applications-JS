function attachEvents() {
  const inputRef = document.getElementById("location");
  const buttonRef = document.getElementById("submit");
  const forecastEl = document.getElementById("forecast");
  const currentWeatherEl = document.getElementById("current");
  const upcomingWeatherEl = document.getElementById("upcoming");

  buttonRef.addEventListener("click", getWeather);

  const weatherSymbols = {
    Sunny: "&#x2600",
    "Partly sunny": "&#x26C5",
    Overcast: "&#x2601",
    Rain: "&#x2614",
    Degrees: "&#176",
  };

  async function getWeather() {
    try {
      const locations = await fetch(
        "http://localhost:3030/jsonstore/forecaster/locations"
      );
      let allLocations = await locations.json();
      ("");

      const requestedLocation = inputRef.value;
      let locationCode = allLocations.find(
        (location) => location.name === requestedLocation
      ).code;
      displayForecast(locationCode);
    } catch (error) {
      forecastEl.style.display = "block";
      document.querySelector(".label").textContent = "Error";
    }
  }

  async function displayForecast(code) {
    try {
      const todayURL = `http://localhost:3030/jsonstore/forecaster/today/${code}`;
      const upcomingURL = `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`;

      const responseTodayWeather = await fetch(todayURL);
      const dataTodayWeather = await responseTodayWeather.json();

      const responseUpcomingWeather = await fetch(upcomingURL);
      const dataUpcomingWeather = await responseUpcomingWeather.json();

      forecastEl.style.display = "block";

      createTodayWeather(dataTodayWeather);
      const upcomingSpans = generateUpcoming(dataUpcomingWeather);
      upcomingWeatherEl.appendChild(upcomingSpans);
    } catch (error) {
      forecastEl.style.display = "block";
      document.querySelector(".label").textContent = "Error";
    }
  }

  function createTodayWeather(data) {
    const { condition, high, low } = data.forecast;
    const forecastDiv = document.createElement("div");
    forecastDiv.classList.add("forecasts");

    const symbolSpan = document.createElement("span");
    symbolSpan.classList.add("condition", "symbol");
    symbolSpan.innerHTML = `${weatherSymbols[condition]}`;
    forecastDiv.appendChild(symbolSpan);

    const conditionSpan = document.createElement("span");
    conditionSpan.classList.add("condition");
    forecastDiv.appendChild(conditionSpan);

    const nameSpan = document.createElement("span");
    nameSpan.classList.add("forecast-data");
    nameSpan.textContent = data.name;
    conditionSpan.appendChild(nameSpan);

    const temperatureSpan = document.createElement("span");
    temperatureSpan.classList.add("forecast-data");
    temperatureSpan.innerHTML = `${low}${weatherSymbols.Degrees}/${high}${weatherSymbols.Degrees}`;
    conditionSpan.appendChild(temperatureSpan);

    const weatherSpan = document.createElement("span");
    weatherSpan.classList.add("forecast-data");
    weatherSpan.textContent = condition;
    conditionSpan.appendChild(weatherSpan);

    currentWeatherEl.appendChild(forecastDiv);
  }

  function generateUpcoming(data) {
    const forecastDiv = document.createElement("div");
    forecastDiv.classList.add("forecast-info");

    data.forecast.forEach((day) => {
      const container = createUpcomingWeather(day);
      forecastDiv.appendChild(container);
    });
    return forecastDiv;
  }

  function createUpcomingWeather(data) {
    const { condition, high, low } = data;

    const upcomingSpan = document.createElement("span");
    upcomingSpan.classList.add("upcoming");

    const symbolSpan = document.createElement("span");
    symbolSpan.classList.add("symbol");
    symbolSpan.innerHTML = `${weatherSymbols[condition]}`;
    upcomingSpan.appendChild(symbolSpan);

    const temperatureSpan = document.createElement("span");
    temperatureSpan.classList.add("forecast-data");
    temperatureSpan.innerHTML = `${low}${weatherSymbols.Degrees}/${high}${weatherSymbols.Degrees}`;
    upcomingSpan.appendChild(temperatureSpan);

    const weatherSpan = document.createElement("span");
    weatherSpan.classList.add("forecast-data");
    weatherSpan.textContent = condition;
    upcomingSpan.appendChild(weatherSpan);

    return upcomingSpan;
  }
}

attachEvents();
