console.log("AHSOGHASOGHASOGHAS");
$('#weather-conditions').hide();
$('#log-in').hide();

var map;
var directionsDisplay;
var directionsService;
function initMap() {
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();
    var centerUS = new google.maps.LatLng(39.83333, -98.585522);
    var mapOptions = {
        zoom: 4,
        center: centerUS
    }
    console.log("wasaaaaap");
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('directionsPanel'));
}

// jQuery(document).ready(function ($) {

//     // initMap();

// });



function calcRoute() {
    var start = $("#start-location").val().trim();
    var end = $("#end-location").val().trim();
    var request = {
        origin: start,
        destination: end,
        travelMode: 'DRIVING'
    };
    console.log(directionsService);
    directionsService.route(request, function (response, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(response);
            showSteps(response);
        }
    });

}
//this object will contain all data relevant to the requested route
function showSteps(directionResult) {

    var myRoute = directionResult.routes[0].legs[0];
    console.log(myRoute)
    console.log("Starting Lat: " + myRoute.start_location.lat());
    console.log("Starting Long: " + myRoute.start_location.lng());
    console.log("Ending Lat: " + myRoute.end_location.lat());
    console.log("Ending Long: " + myRoute.end_location.lng());
    console.log("Trip Duration" + myRoute.duration.text);
    var APIKey = "1a7471eee44adb74";
    var startLat = myRoute.start_location.lat();
    var startLng = myRoute.start_location.lng();
    var startCurTemp = "";
    var startCurConditions = "";
    var startCurWndDir = "";
    var startCurWndSpd = "";
    var startState = "";
    var startCity = "";
    var endState = "";
    var endCity = "";
    var state = "";
    var cityReplaced = "";
    var endLat = myRoute.end_location.lat();
    var endLng = myRoute.end_location.lng();
    var tripDuration = myRoute.duration.text;
    var tripDuration2 = tripDuration.match(/[0-23]/g);

    console.log(tripDuration2);










    // TO FIND NEAREST CITY AND STATE FROM GEOCODE LAT LONG (COMMENTED OUT UNTIL WE PLUGIN MAP DATA)
    var startCityStateURL = "http://api.wunderground.com/api/" + APIKey + "/geolookup/q/" + startLat + "," + startLng + ".json";
    var endCityStateURL = "http://api.wunderground.com/api/" + APIKey + "/geolookup/q/" + endLat + "," + endLng + ".json";


    // Here we run our AJAX call to the Wunderground API TO CONVERT GEOCODE LAT LONG TO NEAREST CITY AND STATE WEATHER STATION
    $.ajax({
        url: startCityStateURL,
        method: "GET"
    })
        .then(function (response) {

            console.log(response);
            console.log(response.location.state);
            startState = response.location.state;
            startCity = response.location.city;
            cityReplaced = startCity.split(' ').join('_');
            console.log(response.location.city);


            console.log(cityReplaced);
            // TO FIND CONDITIONS FROM NEAREST CITY AND STATE(WILL BE USED BOTH FOR START AND END LOCATIONS)
            var queryURLconditions = "http://api.wunderground.com/api/" + APIKey + "/conditions/q/" + startState + "/" + cityReplaced + ".json";

            $.ajax({
                url: queryURLconditions,
                method: "GET"
            })
                .then(function (response) {

                    console.log(response);
                    curWind = response.current_observation.wind_dir;
                    curWinSpd = response.current_observation.wind_mph;
                    console.log(response.current_observation.weather);
                    console.log(response.current_observation.temp_f);
                    curObservation = response.current_observation.weather.split(' ').join('');
                    console.log(curObservation);
                    curTemp = Math.round(response.current_observation.temp_f);
                    var curObservationLower = curObservation.toLowerCase();


                })

        })







    $.ajax({
        url: endCityStateURL,
        method: "GET"
    })
        .then(function (response) {

            console.log(response);
            console.log(response);
            console.log(response.location.state);
            endState = response.location.state;
            endCity = response.location.city;
            cityReplaced = endCity.split(' ').join('_');
            console.log(response.location.city);

            // TO FIND CONDITIONS FROM NEAREST CITY AND STATE(WILL BE USED BOTH FOR START AND END LOCATIONS)
            var queryURLconditions = "http://api.wunderground.com/api/" + APIKey + "/conditions/q/" + endState + "/" + cityReplaced + ".json";

            $.ajax({
                url: queryURLconditions,
                method: "GET"
            })
                .then(function (response) {

                    console.log(response);


                })




        })






}











$(document).on("click", "#search", function calculateAndDisplayRoute() {
    console.log("This button works")
    event.preventDefault();
    calcRoute();
    $('#input').hide();
    $('#weather-conditions').show();
})

// <!--START WEATHER API'S BELOW  -->



