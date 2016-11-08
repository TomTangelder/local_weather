var weather_info = {}
var myLocation = {}
var weather_URL = "https://api.wunderground.com/api/9e34a9a814ceadcf/conditions/q/"

function getLocalWeather(func){
	console.log("Hi I'm in getLocalWeather")
	if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (pos){
        	func(pos.coords);
        });
    } else {
        console.log("Geolocation not supported")
        //todo log a message on the website saying unable to determine location
    }
};

var updateWeather = function(json) {
	console.log("Updating the Weather")
	 weather_info = {
	 	'temperature_f': json.current_observation.temp_f,
	 	'temperature_c': json.current_observation.temp_c,
	 	'feelslike_f': json.current_observation.feelslike_f,
	 	'feelslike_c': json.current_observation.feelslike_c,
	 	'weather': json.current_observation.weather,
	 	'weather_icon_url': json.current_observation.icon_url.replace("http", "https"),
	 	'precip_today_in': json.current_observation.precip_today_in, 
	 	'wind_mph': json.current_observation.wind_mph,
	 	'city': json.current_observation.display_location.city,
	 	'state': json.current_observation.display_location.state,
	 	'state_name': json.current_observation.display_location.state_name,
	 	'country': json.current_observation.display_location.country
	 };
	console.log(json)
	console.log(weather_info)
	updateView()	
};

function updateView(){
	$('.weather').html(weather_info.temperature_f + " &#x2109");
	$('.icon').html("<img src=" + weather_info.weather_icon_url + ">");
	$('.location').html(weather_info.city + ", " + weather_info.state);
	$('.precipitation').html("Precipitation: " + weather_info.precip_today_in + " in");
	$('.wind').html("Wind: " + weather_info.wind_mph + " mph");
}

function getWeatherData(position){
	console.log("And here I am in getWeatherData")
	console.log("My Latitude is:" + position.latitude)
	console.log("My longitude is:" + position.longitude)
	myLocation = {
		'latitude': position.latitude,
		'longitude': position.longitude
	};
	weather_URL += position.latitude + "," + position.longitude + ".json"
	console.log("Weather URL: " + weather_URL)	
	$.getJSON(weather_URL, updateWeather)	
}

$(document).ready(function(){
	getLocalWeather(getWeatherData)
});