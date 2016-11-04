var weather = {}
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
	 weather = {
	 	'temperature_f': json.current_observation.temp_f,
	 	'temperature_c': json.current_observation.temp_c
	 };
	console.log(json)
	console.log(weather)
	updateView()	
	//$('.weather').html(weather.temperature_f);
};

function updateView(){
	$('.weather').html(weather.temperature_f);
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