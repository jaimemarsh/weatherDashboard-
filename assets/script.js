let weatherApiKey = "c33d7e9c5e7e06d80507552604aaf5a5";
let latitude;
let longitude;
let cityChoice;
let cityArray = [];
let searchInput = $("#searchInput")

searchButton.addEventListener("click", editSearchInput)

function editSearchInput() {
    let errorAlert = document.getElementById("divclass")
    //Sets search value to variable & removes the empty spaces between characters
    let city = searchInput.val().replace(/\s/g, "");
    if (city == "") {
        errorAlert.querySelector("#error").innerHTML = "Enter a city and state to see the weather!"
    } else {
        if (city.includes(",")) {
            cityChoice = city.toUpperCase();
            // function
            getCoordinates()
                .then(() => allTheData())
                .catch(() => errorAlert.querySelector("#error").innerHTML = "Error, please try again")
            // function not defined yet
            storeCity();
        } else {
            errorAlert.querySelector("#error").innerHTML = "Type in your city and state name as formatted (Columbus, OH)"
        }
    }
};

function getCoordinates() {
    // is this right? IT WORKS
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityChoice},USA&Appid=${weatherApiKey}`;
    //API to JS
    return fetch(weatherUrl)
        .then(function (response1) {
            if (response1.ok) {
                return response1.json()
            } else {
                throw new Error('Failed to get coordinates')
            }
        })
        //Setting coordinates from api to variables & returning data as an object
        .then((data) => {
            latitude = data.coord.lat;
            longitude = data.coord.lon;
            return {
                latitude: data.coord.lat,
                longitude: data.coord.long
            }
        })
}

function allTheData(input) {
    // Retrreving the api data from onecall & setting it to a variable
    //FIX API KEY
    // c33d7e9c5e7e06d80507552604aaf5a5
    let allTheDataUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&Appid=" + weatherApiKey;
    return fetch(allTheDataUrl)
        .then(function (response) {
            if (response.ok) {
                // looping over 5 days to display data for the 5-day-forecast
                return response.json().then(function (data) {
                    for (let i = 1; i < 6; i++) {
                        let dayTitleCard = $(`#day${i}Title`);
                        dayTitleCard.text(dayjs.unix(data.daily[i].dt).format('ddd MM/DD'));  //Using dayjs to display dates
                        let dayIconCard = $(`#day${i}Icon`);
                        dayIconCard.attr("src", "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + ".png");
                        let dayDescCard = $(`#day${i}Desc`);
                        dayDescCard.html(`Lo: ${parseInt(data.daily[i].temp.min)}\xB0 F</br>Hi: ${parseInt(data.daily[i].temp.max)}\xB0 F</br>Humid: ${data.daily[i].humidity} %</br>Wind: ${data.daily[i].wind_speed} MPH `);
                    }

                    let weatherTitle = $("#weatherTitle");  //Connecting to the DOM element to set the city choice to the section title
                    weatherTitle.text(`5-Day Forecast: ${cityChoice}`);
                    let currentCity = $("#currentCity");
                    currentCity.text(`Current Forecast: ${cityChoice}`);
                    let curDateCard = $("#currentTitle");
                    curDateCard.text(dayjs.unix(data.current.dt).format('ddd, MMM DD, YYYY'));  //Using dayjs for date again
                    let curIconCard = $("#currentIcon");
                    curIconCard.attr("src", "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png");
                    let curTempCard = $("#currentTemp");
                    curTempCard.text(`Temp: ${data.current.temp}`);
                    let curCondCard = $("#currentDesc");
                    curCondCard.text(`Conditions: ${data.current.weather[0].main}`);
                    let curUviCard = $("#currentUvi");
                    curUviCard.text(`UV Index: ${data.current.uvi}`);
                    let curWindCard = $("#currentWind");
                    curWindCard.text(`Wind Speed: ${data.current.wind_speed} MPH`);
                    let curHumidCard = $("#currentHumidity");
                    curHumidCard.text(`Humidity: ${data.current.humidity}%`)

                })
            }
        })
};

// NEED PAST SEARCHES