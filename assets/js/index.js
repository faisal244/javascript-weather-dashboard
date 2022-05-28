// Target the parent
const recentSearchesContainer = $("#recent-searches-container");

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

const onReady = () => {
	console.log("READY");
	renderRecentSearches();
};

recentSearchesContainer.click(handleRecentSearchClick);
$(document).ready(onReady);
