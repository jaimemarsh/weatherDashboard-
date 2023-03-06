// global var
// weather api
var apiKey = "c33d7e9c5e7e06d80507552604aaf5a5";
// need to look over, need to convert lat and lon to city for api
var geoCoord = "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}";
var searchHistory = []

//html references
var searchBox = document.querySelector('#searchBox')
var searchBar = document.querySelector('#searchInput')
var todayBox = document.querySelector('#todayBox')
var forecastBox = document.querySelector('#forecastBox')
var searchHistoryBox = document.querySelector('#searchHistory')


