  $(function() {
  // get ipinfo
	let ipData;
	let weatherInfo;
	let tempInC;
	$.get('http://ipinfo.io', function(response) {
		ipData = response;
	}, 'jsonp')

  // get weather Info
  .done(function() {
	console.log(ipData);
	let country = ipData.region;
	let city = ipData.city;
	let coordinates = ipData.loc.split(',');
	console.log(coordinates);
	let url = 'http://api.openweathermap.org/data/2.5/weather?';
	let apiKey = '&appid=b7af5b7cb2db3880de78c3129bbcb146';
	let weatherApi = url + 'lat=' + coordinates[0] + '&lon=' + coordinates[1]+ apiKey;
	console.log(weatherApi);
	$.get(weatherApi, function(weatherInfo) {
		console.log(weatherInfo.main.temp);
		tempInC = Math.round((weatherInfo.main.temp - 273.15) * 10) / 10;
		console.log(tempInC);
		$('#country').html(country);
		$('#city').html(city);
		$('#temperature').text(tempInC);
		$('#weatherDescription').html(weatherInfo.weather[0].description.toUpperCase());
		displayWeatherIcon(weatherInfo.weather[0].description);
	});
});

  // handle button click event
	$('#button').on('click', function() {
		if ($('#button').text() === 'C') {
			$('#button').text('F');
			varTemp = convertToFarenheit(tempInC);
			$('#temperature').text(Math.round(varTemp * 10) / 10);
		} else if ($('#button').text() === 'F') {
			$('#button').text('C');
			$('#temperature').text(tempInC);
		}
	});

	function convertToFarenheit(c) {
		return c * (9 / 5) + 32;
	}

	function displayWeatherIcon(weatherDescription) {
    // COURTESY OF https://codepen.io/palimadra/pen/vfncA
		var icons = new Skycons({
			'color': 'white'
		});
		icons.play();
		switch (weatherDescription.toLowerCase()) {
		case 'shower rain':
			icons.set('weatherIcon', Skycons.RAIN);
			break;
		case 'rain':
			icons.set('weatherIcon', Skycons.RAIN);
			break;
		case 'broken clouds':
			icons.set('weatherIcon', Skycons.CLOUDY);
			break;
		case 'scattered clouds':
			icons.set('weatherIcon', Skycons.CLOUDY);
			break;
		case 'few clouds':
			icons.set('weatherIcon', Skycons.CLOUDY);
			break;
		case 'snow':
			icons.set('weatherIcon', Skycons.SNOW);
			break;
		case 'clear sky':
			icons.set('weatherIcon', Skycons.CLEAR_DAY);
			break;
		case 'thunderstorm':
			icons.set('weatherIcon', Skycons.SLEET);
			break;
		case 'thunderstorm with rain':
			icons.set('weatherIcon', Skycons.SLEET);
			break;
		case 'thunderstorm with light rain':
			icons.set('weatherIcon', Skycons.SLEET);
			break;
		case 'mist':
			icons.set('weatherIcon', Skycons.FOG);
			break;
		}
	}
});