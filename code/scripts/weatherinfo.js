$(function () {

	var status = $('#status');
    //get current location of user's computer
	(function getGeoLocation() {
		status.text('Getting Location...');
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function (position) {
				var lat = position.coords.latitude;
				var long = position.coords.longitude;

				// Call the getData function, send the lat and long
				getData(lat, long);

			});
		} else {
			status.text("We are having difficulty with getting your geolocation information. Your browser may not support geolocation.");
		}

	})();

	function getData(lat, long){
		// Get the data from the wunderground API
		jQuery(document).ready(function($) {
        $.ajax({
            //get weatherunderground info from api using my key
            url : "https://api.wunderground.com/api/987360510eace1b9/geolookup/conditions/q/" + lat + "," + long + ".json",
            dataType : "jsonp",
            success : function(data) {
                //write data to console for debug purposes
                console.log(data);
                //read in info
                var location = data.location.city + ", " + data.location.state ;
                //var temp_f = parsed_json['current_observation']['temp_f'];
                var currTemp = parseInt(data.current_observation.temp_f);
                var summary = data.current_observation.weather;
                var feelsLike = parseInt(data.current_observation.feelslike_f);
                var humidity = data.current_observation.relative_humidity;
                var windMph = data.current_observation.wind_mph;
                //update screen with data
                $("#cityDisplay").text(location);
                $("#currentTemp").html(currTemp  + "&#8457");
                $("#summary").text(summary);
                $("#add1").html("Feels Like: " + feelsLike + "&#8457");
                $("#add2").text("Relative Humidity: " + humidity);
                $("#add3").text("Wind: " + windMph + "mph");
                
                
                $( "title" ).prepend( location + " - " ); //Doesn't work for some reason.

            } 
            
		});
        //fadeout loading text   
        $("#cover").fadeOut(250);
        });
	}

	// A function for changing a string to TitleCase
	function toTitleCase(str){
		return str.replace(/\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}
});
