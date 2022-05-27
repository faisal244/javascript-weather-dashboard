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

	if (recentSearches.length) {
		// ifrender recent search list
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
		// add active bootstrap class to clicked city
		event.target.classList.add("active");
		console.log(cityName);
		// function that removes the active class from other cities in the recent searches list
		activeCity();
	}
};

const activeCity = () => {
	var searchedCity = document.querySelector(".active");
	// remove active class from all other cities in the list
	if (searchedCity !== null) {
		searchedCity.classList.remove("active");
	}
};

const onReady = () => {
	console.log("READY");
	renderRecentSearches();
};

recentSearchesContainer.click(handleRecentSearchClick);
$(document).ready(onReady);
