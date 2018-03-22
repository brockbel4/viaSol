jQuery(document).ready(function($) {
    $.ajax({
    url : "http://api.wunderground.com/api/Your_Key/geolookup/conditions/q/IA/Cedar_Rapids.json",
    dataType : "jsonp",
    success : function(parsed_json) {
    var location = parsed_json['location']['city'];
    var temp_f = parsed_json['current_observation']['temp_f'];
    alert("Current temperature in " + location + " is: " + temp_f);
    }
    });
  });

var APIkey = "1a7471eee44adb74";

var queryURLconditions = "http://api.wunderground.com/api/" + APIkey + "/conditions/q/" + state + "/" + cityReplaced + ".json";

var queryURLhourly = "http://api.wunderground.com/api/" + APIkey + "/hourly/q/" + state + "/" + cityReplaced + ".json";

var queryAlerts = "http://api.wunderground.com/api/1a7471eee44adb74/alerts/q/" + state + "/" + cityReplaced + ".json"
var map;
var directionsDisplay;
var directionsService;

function initMap() {
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  var centerUS = new google.maps.LatLng(39.83333, -98.585522);
  var mapOptions = {
    zoom:4,
    center: centerUS
  }
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('directionsPanel'));
}

function calcRoute() {
  var start = $("#start-location").val().trim();
  var end = $("#end-location").val().trim();
  var request = {
    origin:start,
    destination:end,
    travelMode: 'DRIVING'
  };
  console.log(directionsService);
  directionsService.route(request, function(response, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(response);
    }
  });
}

$(document).on("click", "#search", function calculateAndDisplayRoute() {
  console.log("This button works")
  event.preventDefault();
  calcRoute();
})

// <!--START WEATHER API'S BELOW  -->

        // ONCLICK EVENT FUNCTION FOR OUR USER SEARCH BUTTON
        $("#search").on("click", function () {
            // Listing variables
            // This is our API key
            var APIKey = "1a7471eee44adb74";
            var state = "";
            var city = "";
            var lat = "";
            var lng = "";
            // 'for' is for FORECAST
            var forCondition = "";
            var forWdir = "";
            var forWspd = "";
            var forTemp = "";
            // Checking if user values collected
            console.log(city);
            console.log(state);


            // TO FIND NEAREST CITY AND STATE FROM GEOCODE LAT LONG (COMMENTED OUT UNTIL WE PLUGIN MAP DATA)
            var queryURL = "http://api.wunderground.com/api/" + APIKey + "/geolookup/q/" + lat + "," + lng + ".json";


            // Here we run our AJAX call to the Wunderground API TO CONVERT GEOCODE LAT LONG TO NEAREST CITY AND STATE WEATHER STATION
            $.ajax({
                url: queryURL,
                method: "GET"
            })
                .then(function (response) {

                    // Log the queryURL
                    console.log(queryURL);

                    // LOG LOCATION RESPONSES
                    console.log(response);
                    console.log(response.location.country_name);
                    console.log(response.location.state);
                    console.log(response.location.city);
                    console.log(state);
                    console.log(city);
                    
                    // object RESPONSE returns city names of more than one word with a space in between the words. but API below requires an underscore instead of a space for query. this replaces the space with an underscore.
                    var cityReplaced = city.split(' ').join('_');


                    var APIkey = "1a7471eee44adb74";
                    // CURRENT CONDITIONS SHOULD BE PULLED FROM CURRENT LOCATION
                    var queryURLconditions = "http://api.wunderground.com/api/" + APIkey + "/conditions/q/" + state + "/" + cityReplaced + ".json";
                    var queryURLhourly = "http://api.wunderground.com/api/" + APIkey + "/hourly/q/" + state + "/" + cityReplaced + ".json";
                    var queryAlerts= "http://api.wunderground.com/api/" + APIkey+"/alerts/q/"+ state + "/" + cityReplaced +".json";



                    // HERE WE RUN OUR ajax CALL TO THE wUNDERGROUND api TO FIND CURRENT CONDITIONS FROM NEAREST CITY AND STATE WEATHER STATION POST LONG LAT CONVERSION
                    $.ajax({
                        url: queryURLconditions,
                        method: "GET"
                    })
                        .then(function (response) {
                            console.log(queryURLconditions);
                            console.log(response);
                            console.log(response.current_observation.wind_dir);
                            console.log(response.current_observation.wind_mph);
                            console.log(response.current_observation.weather);
                            console.log(response.current_observation.temp_f);
                        }
                        )
                    // HERE WE RUN OUR AJAX CALL TO THE wUNDERGROUND api TO FIND HOURLY FORECAST FOR THE NEXT FIVE HOURS BASED ON SAME NEAREST CITY AND STATE WEATHER STATION
                    $.ajax({
                        url: queryURLhourly,
                        method: "GET"
                    })
                        .then(function (response) {
                            // LOGGING TO TEST RESPONSES
                            console.log(queryURLhourly);
                            console.log(response);
                            console.log(response.hourly_forecast[0].condition, response.hourly_forecast[0].wdir.dir, response.hourly_forecast[0].wspd.english, response.hourly_forecast[0].temp.english);
                            console.log(response)
                            // THIS FOR LOOP IS FOR APPENDING HTML DATA FOR HOURLY FORECAST
                            for (i = 0; i < 5; i++) {
                                console.log(response.hourly_forecast[i].condition, response.hourly_forecast[i].wdir.dir, response.hourly_forecast[i].wspd.english, response.hourly_forecast[i].temp.english);
                                var forCondition = "";
                                var forWdir = "";
                                var forWspd = "";
                                var forTemp = "";



                            }

                        })


                        $.ajax({
                            url: queryAlerts,
                            method: "GET"
                        })

                        .then(function (response) {
                            console.log(response);
                            console.log(response.alerts[0].description);

                        })


                });

        });

// <!-- END WEATHER API'S ABOVE -->

