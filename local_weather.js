var weather = {}
var myLocation = {}

var getWeather = function(json) {
	 weather = {
	 	'temperature_f': json.current_observation.temp_f,
	 	'temperature_c': json.current_observation.temp_c
	 };
	console.log(json)
	console.log(weather)
};

var getLocation = function(json) {
	myLocation = {
		'city': json.city,
		'region': json.region_code,
		'zip_code': json.zip_code,
		'latitude': json.latitude,
		'longitude': json.longitude
	};	
	console.log(json)
	console.log(myLocation)
};

function updatePage(){
	$('.city').html(myLocation.city);
	$('.weather').html(weather.temperature_f);
};

var weather_URL = "https://api.wunderground.com/api/9e34a9a814ceadcf/conditions/q/"
var location_URL = "https://freegeoip.net/json/";

$(document).ready(function (){
	$.ajax({
		url: location_URL,
		dataType: 'json',
		async: false,
		success: getLocation
	});
	weather_URL += myLocation.latitude + "," + myLocation.longitude + ".json"
	$.ajax({
		url: weather_URL,
		dataType: 'json',
		async: false,
		success: getWeather
	});
	//$.getJSON(weather_URL, getWeather);

	updatePage();
});