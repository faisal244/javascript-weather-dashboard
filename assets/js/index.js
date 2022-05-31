// Global declaration of variables

const recentSearchesContainer = $("#recent-searches-container");
const weatherInfoContainer = $("#weather-info-container");
const searchForm = $("#search-form");

// reususable modular function to read data from Local Storage
const readFromLocalStorage = (key, defaultValue) => {
	// get from LS using key name
	const dataFromLS = localStorage.getItem(key);

	// Parse data from LS
	const parsedData = JSON.parse(dataFromLS);

	if (parsedData) {
		return parsedData;
	} else {
		return defaultValue;
	}
};

// Function that uses Local Storage to store persistent data.
const writeToLocalStorage = (key, value) => {
	// convert value to string
	const stringifiedValue = JSON.stringify(value);

	// set stringified value to LS for key cityName
	localStorage.setItem(key, stringifiedValue);
};

const constructUrl = (baseUrl, params) => {
	const queryParams = new URLSearchParams(params).toString();

	return queryParams ? `${baseUrl}?${queryParams}` : baseUrl;
};

// Function to fetch data from an API
const fetchData = async (url, options = {}) => {
	try {
		const response = await fetch(url, options);

		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			throw new Error("Failed to fetch data");
		}
	} catch (error) {
		throw new Error(error.message);
	}
};

// Function that applies red/amber/green colour to the UV index depending on its severity
const getUviClassName = (uvi) => {
	if (uvi >= 0 && uvi <= 2) {
		return "bg-success";
	}

	if (uvi > 2 && uvi <= 8) {
		return "bg-warning";
	}
	if (uvi > 8) {
		return "bg-danger";
	}
};

// Function to render todays weather info for the users chosen city
const renderCurrentData = (data) => {
	const currentWeatherCard = `<div class="p-3 jumbotron">
    <div class="text-center">
      <h2 class="my-2">${data.cityName}</h2>
      <h3 class="my-2">${moment
				.unix(data.weatherData.current.dt + data.weatherData.timezone_offset)
				.subtract({ hours: 1 })
				.format("dddd, Do MMM, YYYY HH:mm:ss")}</h3>
      <div>
        <img
          src="http://openweathermap.org/img/w/${
						data.weatherData.current.weather[0].icon
					}.png"
          alt="weather icon"
          class="shadow-sm p-3 mt-3 bg-body rounded border"
        />
      </div>
    </div>
    <!-- weather metric div -->
    <div class="mt-4">
      <div class="row g-0">
        <div class="col-sm-12 col-md-4 p-2 border bg-light fw-bold">
          Temperature
        </div>
        <div class="col-sm-12 col-md-8 p-2 border">${
					data.weatherData.current.temp
				}&deg; C</div>
      </div>
      <div class="row g-0">
        <div class="col-sm-12 col-md-4 p-2 border bg-light fw-bold">
          Humidity
        </div>
        <div class="col-sm-12 col-md-8 p-2 border">${
					data.weatherData.current.humidity
				}&percnt;</div>
      </div>
      <div class="row g-0">
        <div class="col-sm-12 col-md-4 p-2 border bg-light fw-bold">
          Wind Speed
        </div>
        <div class="col-sm-12 col-md-8 p-2 border">${
					data.weatherData.current.wind_speed
				} MPH</div>
      </div>
      <div class="row g-0">
        <div class="col-sm-12 col-md-4 p-2 border bg-light fw-bold">
          UV Index
        </div>
        <div class="col-sm-12 col-md-8 p-2 border">
          <span class="text-white px-3 rounded-2 ${getUviClassName(
						data.weatherData.current.uvi
					)}"
                >${data.weatherData.current.uvi}</span>
        </div>
      </div>
    </div>
  </div>`;
	// Append to parent container
	weatherInfoContainer.append(currentWeatherCard);
};

// Function to render the 5 day forecast cards
const renderForecastData = (data) => {
	const createForecastCard = (each) => {
		const forecast = `<div class="card m-2 forecast-card forecast-cards-bg">
      <div class="d-flex justify-content-center">
        <img
          src="http://openweathermap.org/img/w/${each.weather[0].icon}.png"
          class="shadow-sm p-3 mt-3 bg-body rounded border card-img-top weather-icon"
          alt="weather icon"
        />
      </div>
      <div class="card-body">
        <h5 class="card-title text-center text-white">${moment
					.unix(each.dt)
					.format("ddd, Do MMM")}</h5>
        <div class="mt-4 text-center">
          <div class="row g-0">
            <div class="col-12 p-2 border bg-light fw-bold">
              Temperature
            </div>
            <div class="col-12 p-2 border text-white">${
							each.temp.day
						}&deg; C</div>
          </div>
          <div class="row g-0">
            <div class="col-12 p-2 border bg-light fw-bold">
              Humidity
            </div>
            <div class="col-12 p-2 border text-white">${
							each.humidity
						}&percnt;</div>
          </div>
          <div class="row g-0">
            <div class="col-12 p-2 border bg-light fw-bold">
              Wind Speed
            </div>
            <div class="col-12 p-2 border text-white">${
							each.wind_speed
						} MPH</div>
          </div>
          <div class="row g-0">
            <div class="col-12 p-2 border bg-light fw-bold">
              UV Index
            </div>
            <div class="col-12 p-2 border text-white">
              <span class="text-white px-3 rounded-2 ${getUviClassName(
								each.uvi
							)}"
                     >${each.uvi}</span>
            </div>
          </div>
        </div>
      </div>
    </div>`;

		return forecast;
	};

	const forecastCards = data.weatherData.daily
		.slice(1, 6)
		.map(createForecastCard)
		.join("");

	const forecastWeatherCards = `<div>
    <h2 class="mt-3 text-center">5-day Forecast</h2>
    <hr />
    <div class="d-flex flex-row justify-content-center flex-wrap">
      ${forecastCards}
    </div>
  </div>`;

	// Append to parent container
	weatherInfoContainer.append(forecastWeatherCards);
};

// Function to render recently searched cities from local storage
const renderRecentSearches = () => {
	// Get recent Search from local storage
	const recentSearches = readFromLocalStorage("recentSearches", []);

	if (recentSearches.length) {
		const createRecentCity = (city) => {
			return `<li
                        class="list-group-item border-top-0 border-end-0 border-start-0"
                        data-city="${city}"
                    >
                        ${city}
                    </li>`;
		};

		const recentCities = recentSearches.map(createRecentCity).join("");

		// if render recent search list
		const ul = `<ul class="list-group rounded-0">
                    ${recentCities}
                    </ul>`;

		// Append to parent container
		recentSearchesContainer.append(ul);
	} else {
		// else empty, show alert

		// Create alert component
		const alert = `<div class="alert alert-warning" role="alert">
            You have no recent searches
            </div>`;

		// Append to parent container
		recentSearchesContainer.append(alert);
	}
};

// Function to render an error message
const renderErrorAlert = () => {
	// empty container
	weatherInfoContainer.empty();

	const alert = `<div class="alert alert-danger" role="alert">
    Something went wrong!! Please try again.
  </div>`;

	weatherInfoContainer.append(alert);
};

const renderWeatherInfo = async (cityName) => {
	try {
		// fetch weather data
		const weatherData = await fetchWeatherData(cityName);

		// empty container
		weatherInfoContainer.empty();

		// render current data
		renderCurrentData(weatherData);

		// render forecast data
		renderForecastData(weatherData);

		return true;
	} catch (error) {
		renderErrorAlert();
		return false;
	}
};

// Function to fetch weather data from the API
const fetchWeatherData = async (cityName) => {
	// current data url
	const currentDataUrl = constructUrl(
		"https://api.openweathermap.org/data/2.5/weather",
		{
			q: cityName,
			appid: "8109f605d79877f7488a194794a29013",
		}
	);

	const currentData = await fetchData(currentDataUrl);

	// get lat, lon and city name
	const lat = currentData?.coord?.lat;
	const lon = currentData?.coord?.lon;
	const displayCityName = currentData?.name;

	// forecast url
	const forecastDataUrl = constructUrl(
		"https://api.openweathermap.org/data/2.5/onecall",
		{
			lat: lat,
			lon: lon,
			exclude: "minutely,hourly",
			units: "metric",
			appid: "5ecb90e18bea9914051a8dd07617a181",
		}
	);

	const forecastData = await fetchData(forecastDataUrl);

	return {
		cityName: displayCityName,
		weatherData: forecastData,
	};
};

// function to add and remove the active highlight from cities in the recent searches list
const handleRecentSearchClick = async (event) => {
	const target = $(event.target);

	// restrict clicks to only from li items
	if (target.is("li")) {
		// get data city attribute
		const cityName = target.attr("data-city");

		// add active bootstrap class to clicked city, remove it from siblings
		$(target).addClass("active").siblings().removeClass("active");

		await renderWeatherInfo(cityName);
	}
};

const handleFormSubmit = async (event) => {
	event.preventDefault();
	await handleRecentSearchClick(event);

	// // get form input value (city name)
	const cityName = $("#search-input").val();

	// validate
	if (cityName) {
		// render weather cards
		const renderStatus = await renderWeatherInfo(cityName);

		// get recentSearches from LS
		const recentSearches = readFromLocalStorage("recentSearches", []);

		if (!recentSearches.includes(cityName) && renderStatus) {
			// push city name to array
			recentSearches.push(cityName);

			// write recent searches to LS
			writeToLocalStorage("recentSearches", recentSearches);

			// remove previous items
			recentSearchesContainer.children().last().remove();

			// re-render recent cities
			renderRecentSearches();
		}
	}
};

const onReady = () => {
	renderRecentSearches();
};

// Event listeners
recentSearchesContainer.click(handleRecentSearchClick);
searchForm.submit(handleFormSubmit);
$(document).ready(onReady);
