# Weather Dashboard

Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Developers are often tasked with retrieving data from another application's API and using it in the context of their own.

I was tasked with building a weather dashboard that could run in the browser and feature dynamically updated HTML and CSS. This dashboard uses the [OpenWeather One Call API](https://openweathermap.org/api/one-call-api) to retrieve weather data for cities, and uses `localStorage` to store persistent data.

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

## Mock-Up

The following image shows the web application's appearance and functionality:

![The weather app includes a search option, a list of cities, and a five-day forecast and current weather conditions for Atlanta.](./Assets/06-server-side-apis-homework-demo.png)

---

## Link to deployed application

- ***

---

Below is an overview of the approach i took when working on the code and underlying JavaScript logic for this project in order to meet the University of Birmingham acceptance criteria:

## JavaScript

- Created functions to read and render recent searches from local storage once the page has finished loading

- Created a function that adds/removes the active bootstrap class from cities in the recent searches section - so only the city the user has clicked on will be highlighted by the .active bootstrap css class

- Created functions in index.js that use template strings to render the users recent searches from local storage in the form of a list

- Created a function to handle form submissions, which removes the error message from the empty recent searches list, reads from local storage, adds the users new search to the array of searched cities in LS, writes the updated array back to LS, then re-renders the recent searches list

- Created a function to render city weather details and the 5 day forecast section. Moved the code for these sections from html into JavaScript, so that they will render when a user clicks on the search button.

- Current city data now renders dynamically with info pulled in from the API

- Used slice, map and join array methods to get api data to render as a weather card, and for 5 cards to render on form submit to display 5 days worth of data

- Each card now shows red/amber/green depending on the UV index for that day

- Added some try/catch statements to validate the users search query before making an API request

- Created a function called renderStatus to be used to validate that only a valid city can be pushed to local storage, if the users input doesn't validate, they will be presented with an error message

- Used moment.js to allow for the local time of the country the user has searched for to be displayed

- used the .subtract method from the moment.js library to account for daylight savings

## HTML

- Used Bootstrap 5 for rapid prototyping and front end development

- Used a bootstrap list component to display a history of previously searched cities

- Created and styled a jumbotron section that displays the temperature, humidity, wind speed and UV index for the city the user has searched for

- Added a data-city html attribute to cities in the recent searches list so that they can be targeted/rendered in JavaScript

## CSS

- Styled using a mix of bootstrap classes, and overwriting some default colours/spacing/positioning in styles.css

- Styled and positioned the elements within the jumbotron section by applying various bootstrap css classes

- The width for the forecast cards is now controlled via a CSS rule -adjusted down from 16 to 12 REM so all the cards are in one line when viewed on viewports larger than tablet size

- Defined a media query that makes each card 100% width at the breakpoint of 576px to optimise usability on mobile devices

---

## Challenges I faced

- I encountered an issue where if the user clicked on one of the cities in the recent searches list after doing a search, an error would be thrown in the console. I solved this by refactoring handleRecentSearchClick() so that it now no longer throws an error.

The bug was caused by trying to use document.querySelector(".active") on content that was being dynamically rendered by JS. Moving to jQuery and using $(target).addClass("active").siblings().removeClass("active") resolved this issue.

- I wanted to display the local time in the city the user had searched for instead of the time in their current timezone. The solution i implemented involved combining 2 different pieces of data from moment.js:

.unix(data.weatherData.current.dt + data.weatherData.timezone_offset)

- I then encountered another issue where the time being displayed was consistently 1 hour behind the actual time. After some research i discovered that this was happening because daylight savings weren't being accounted for.

I resolved this by using another method from the moment.js API - .subtract({ hours: 1 })
Once this was added the local time that is displayed is now correct no matter which country the user searches for

---

## Future Development

- Animated backgrounds that change depending on the time of day and weather in your searched city

- A contact page containing links to my portfolio and ways to get in touch with me

- Re-building the weather cards to be more interactive using React

## My Development Environment

- MacOS Monterey
- VScode
- Terminal
- Google Chrome Developer Tools
- Git
- Github

## Languages, Libraries and APIs used

- Javascript
- HTML
- CSS
- jQuery
- Moment.JS
- Bootstrap 5
- Google Fonts
- Font Awesome
- OpenWeather One Call API

---
