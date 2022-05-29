// Target the parent
const recentSearchesContainer = $("#recent-searches-container");
const weatherInfoContainer = $("#weather-info-container");
const searchForm = $("#search-form");

// reususable modular function to read from local storage
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

const writeToLocalStorage = (key, value) => {
	// convert value to string
	const stringifiedValue = JSON.stringify(value);

	// set stringified value to LS for key cityName
	localStorage.setItem(key, stringifiedValue);
};

const renderCurrentData = () => {
	const currentWeatherCard = `<div class="p-3">
        <div class="text-center">
            <h2 class="my-2">Birmingham</h2>
            <h3 class="my-2">Monday, 9th May, 2022</h3>
            <div>
                <img
                    src="http://openweathermap.org/img/w/04d.png"
                    alt="weather-icon"
                    class="shadow-sm p-3 mt-3 bg-body rounded border"
                />
            </div>
        </div>

        <!-- Weather Metrics div -->
        <div class="mt-4">
            <div class="row g-0">
                <div class="col-sm-12 col-md-4 p-2 border bg-light fw-bold">
                    Temperature
                </div>
                <div class="col-sm-12 col-md-8 p-2 border">16 &deg;C</div>
            </div>

            <div class="row g-0">
                <div class="col-sm-12 col-md-4 p-2 border bg-light fw-bold">
                    Humidity
                </div>
                <div class="col-sm-12 col-md-8 p-2 border">20 &percnt;</div>
            </div>

            <div class="row g-0">
                <div class="col-sm-12 col-md-4 p-2 border bg-light fw-bold">
                    Wind Speed
                </div>
                <div class="col-sm-12 col-md-8 p-2 border">10 MPH</div>
            </div>

            <div class="row g-0">
                <div class="col-sm-12 col-md-4 p-2 border bg-light fw-bold">
                    UV Index
                </div>
                <div class="col-sm-12 col-md-8 p-2 border">
                    <span class="bg-success text-white px-3 rounded-2">1.5</span>
                </div>
            </div>
        </div>
    </div>`;

	weatherInfoContainer.append(currentWeatherCard);
};

const renderForecastData = () => {
	const forecastWeatherCards = `<div>
        <h2 class="mt-3 text-center">5-day Forecast</h2>
        <hr />
        <div class="d-flex flex-row justify-content-center flex-wrap">
            <!-- card 1 -->
            <div class="card m-2 forecast-card">
                <div class="d-flex justify-content-center">
                    <img
                        src="http://openweathermap.org/img/w/04d.png"
                        class="shadow-sm p-3 mt-3 bg-body rounded border card-img-top weather-icon"
                        alt="weather icon"
                    />
                </div>
                <div class="card-body">
                    <h5 class="card-title text-center">Tue, 10th May</h5>
                    <div class="mt-4 text-center">
                        <div class="row g-0">
                            <div class="col-12 p-2 border bg-light fw-bold">
                                Temperature
                            </div>
                            <div class="col-12 p-2 border">16&deg; C</div>
                        </div>
                        <div class="row g-0">
                            <div class="col-12 p-2 border bg-light fw-bold">
                                Humidity
                            </div>
                            <div class="col-12 p-2 border">20&percnt;</div>
                        </div>
                        <div class="row g-0">
                            <div class="col-12 p-2 border bg-light fw-bold">
                                Wind Speed
                            </div>
                            <div class="col-12 p-2 border">10 MPH</div>
                        </div>
                        <div class="row g-0">
                            <div class="col-12 p-2 border bg-light fw-bold">
                                UV Index
                            </div>
                            <div class="col-12 p-2 border">
                                <span class="bg-success text-white px-3 rounded-2"
                                    >1.5</span
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- card 2 -->
            <div class="card m-2 forecast-card">
                <div class="d-flex justify-content-center">
                    <img
                        src="http://openweathermap.org/img/w/04d.png"
                        class="shadow-sm p-3 mt-3 bg-body rounded border card-img-top weather-icon"
                        alt="weather icon"
                    />
                </div>
                <div class="card-body">
                    <h5 class="card-title text-center">Tue, 10th May</h5>
                    <div class="mt-4 text-center">
                        <div class="row g-0">
                            <div class="col-12 p-2 border bg-light fw-bold">
                                Temperature
                            </div>
                            <div class="col-12 p-2 border">16&deg; C</div>
                        </div>
                        <div class="row g-0">
                            <div class="col-12 p-2 border bg-light fw-bold">
                                Humidity
                            </div>
                            <div class="col-12 p-2 border">20&percnt;</div>
                        </div>
                        <div class="row g-0">
                            <div class="col-12 p-2 border bg-light fw-bold">
                                Wind Speed
                            </div>
                            <div class="col-12 p-2 border">10 MPH</div>
                        </div>
                        <div class="row g-0">
                            <div class="col-12 p-2 border bg-light fw-bold">
                                UV Index
                            </div>
                            <div class="col-12 p-2 border">
                                <span class="bg-success text-white px-3 rounded-2"
                                    >1.5</span
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- card 3 -->
            <div class="card m-2 forecast-card">
                <div class="d-flex justify-content-center">
                    <img
                        src="http://openweathermap.org/img/w/04d.png"
                        class="shadow-sm p-3 mt-3 bg-body rounded border card-img-top weather-icon"
                        alt="weather icon"
                    />
                </div>
                <div class="card-body">
                    <h5 class="card-title text-center">Tue, 10th May</h5>
                    <div class="mt-4 text-center">
                        <div class="row g-0">
                            <div class="col-12 p-2 border bg-light fw-bold">
                                Temperature
                            </div>
                            <div class="col-12 p-2 border">16&deg; C</div>
                        </div>
                        <div class="row g-0">
                            <div class="col-12 p-2 border bg-light fw-bold">
                                Humidity
                            </div>
                            <div class="col-12 p-2 border">20&percnt;</div>
                        </div>
                        <div class="row g-0">
                            <div class="col-12 p-2 border bg-light fw-bold">
                                Wind Speed
                            </div>
                            <div class="col-12 p-2 border">10 MPH</div>
                        </div>
                        <div class="row g-0">
                            <div class="col-12 p-2 border bg-light fw-bold">
                                UV Index
                            </div>
                            <div class="col-12 p-2 border">
                                <span class="bg-success text-white px-3 rounded-2"
                                    >1.5</span
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- card 4 -->
            <div class="card m-2 forecast-card">
                <div class="d-flex justify-content-center">
                    <img
                        src="http://openweathermap.org/img/w/04d.png"
                        class="shadow-sm p-3 mt-3 bg-body rounded border card-img-top weather-icon"
                        alt="weather icon"
                    />
                </div>
                <div class="card-body">
                    <h5 class="card-title text-center">Tue, 10th May</h5>
                    <div class="mt-4 text-center">
                        <div class="row g-0">
                            <div class="col-12 p-2 border bg-light fw-bold">
                                Temperature
                            </div>
                            <div class="col-12 p-2 border">16&deg; C</div>
                        </div>
                        <div class="row g-0">
                            <div class="col-12 p-2 border bg-light fw-bold">
                                Humidity
                            </div>
                            <div class="col-12 p-2 border">20&percnt;</div>
                        </div>
                        <div class="row g-0">
                            <div class="col-12 p-2 border bg-light fw-bold">
                                Wind Speed
                            </div>
                            <div class="col-12 p-2 border">10 MPH</div>
                        </div>
                        <div class="row g-0">
                            <div class="col-12 p-2 border bg-light fw-bold">
                                UV Index
                            </div>
                            <div class="col-12 p-2 border">
                                <span class="bg-success text-white px-3 rounded-2"
                                    >1.5</span
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- card 5 -->
            <div class="card m-2 forecast-card">
                <div class="d-flex justify-content-center">
                    <img
                        src="http://openweathermap.org/img/w/04d.png"
                        class="shadow-sm p-3 mt-3 bg-body rounded border card-img-top weather-icon"
                        alt="weather icon"
                    />
                </div>
                <div class="card-body">
                    <h5 class="card-title text-center">Tue, 10th May</h5>
                    <div class="mt-4 text-center">
                        <div class="row g-0">
                            <div class="col-12 p-2 border bg-light fw-bold">
                                Temperature
                            </div>
                            <div class="col-12 p-2 border">16&deg; C</div>
                        </div>
                        <div class="row g-0">
                            <div class="col-12 p-2 border bg-light fw-bold">
                                Humidity
                            </div>
                            <div class="col-12 p-2 border">20&percnt;</div>
                        </div>
                        <div class="row g-0">
                            <div class="col-12 p-2 border bg-light fw-bold">
                                Wind Speed
                            </div>
                            <div class="col-12 p-2 border">10 MPH</div>
                        </div>
                        <div class="row g-0">
                            <div class="col-12 p-2 border bg-light fw-bold">
                                UV Index
                            </div>
                            <div class="col-12 p-2 border">
                                <span class="bg-success text-white px-3 rounded-2"
                                    >1.5</span
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

	weatherInfoContainer.append(forecastWeatherCards);
};

const renderRecentSearches = () => {
	// Get recent Search from local storage
	const recentSearches = readFromLocalStorage("recentSearches", []);
	// const recentSearches = ["London", "Leeds", "Birmingham"];

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

		console.log(recentCities);

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

		// Append to parent
		recentSearchesContainer.append(alert);
	}
};

const handleRecentSearchClick = (event) => {
	// console.log("clicked");
	const target = $(event.target);

	// restrict clicks to only from li items
	if (target.is("li")) {
		// get data city attribute
		const cityName = target.attr("data-city");

		// Remove the active class already applied to any cities in the search list
		let searchedCity = document.querySelector(".active");
		searchedCity.classList.remove("active");

		// add active bootstrap class to clicked city
		event.target.classList.add("active");
		console.log(cityName);
	}
};

const handleFormSubmit = (event) => {
	event.preventDefault();

	// // get form input value (city name)
	const cityName = $("#search-input").val();

	console.log("submit");

	// validate
	if (cityName) {
		// fetch data from API

		// render current data
		renderCurrentData();

		// render forecast data
		renderForecastData();

		console.log(cityName);

		// get recent seraches from localStorage
		const recentSearches = readFromLocalStorage("recentSearches", []);

		// push city name to array
		recentSearches.push(cityName);

		// write recent searches to LS
		writeToLocalStorage("recentSearches", recentSearches);

		// remove previous items
		recentSearchesContainer.children().last().remove();

		// re-render recent cities list
		renderRecentSearches();
	}
};

const onReady = () => {
	console.log("READY");
	renderRecentSearches();
};

recentSearchesContainer.click(handleRecentSearchClick);
searchForm.submit(handleFormSubmit);
$(document).ready(onReady);
