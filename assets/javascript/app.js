console.log("AHSOGHASOGHASOGHAS");
$('#weather-conditions').hide();
$('#log-in').hide();


// Initialize Firebase
var config = {
    apiKey: "AIzaSyDMltNrRLk5fYmzKHj3hZc0FjgeUx2EgnA",
    authDomain: "viasol-1521141281865.firebaseapp.com",
    databaseURL: "https://viasol-1521141281865.firebaseio.com",
    projectId: "viasol-1521141281865",
    storageBucket: "viasol-1521141281865.appspot.com",
    messagingSenderId: "591795845182"
};
firebase.initializeApp(config);
// This is the email and password account creation function that will take the data, validate it and then store it under "Authentication" in the Firebase Database
function signUpActivation(e) {
    e.preventDefault();
    console.log("code ran");
    var email = $("#emailCreate").val().trim();
    var password = $("#passwordCreate").val().trim();
    if (validateEmail(email) === false) {
        // Alert that the email is not valid.
        console.log("email invalid");
    } else {
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(error, "hello");
        });
    }
}
// This is the login function that will check if the account exists and if the credentials match
function logInActivation(f) {
    f.preventDefault();
    var email = $("#email").val().trim();
    var password = $("#password").val().trim();
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        console.log(error, "error", error.code);
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
}
// This button allows the user to signout of their account
$("#signOut").click(function (e) {
    e.preventDefault();
    firebase.auth().signOut().catch(function (error) {
        console.log(error, "error", error.code, error.message);
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
}); // this detects the state change and reports if they are logged in out out...
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        console.log(user.email, "logged in");
        // ...
    } else {
        console.log("logged out")
        // User is signed out.
        // ...
    }
});

// These are the two submit buttons for the pages
$("#createAccount").submit(signUpActivation);
$("#login").submit(logInActivation);

// This is an algorithm that will validate email addresses
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}






// This is the Line between the Maps Code and the Firebase account creation and login (User Authentication)

console.log("AHSOGHASOGHASOGHAS");

var map;
var directionsDisplay;
var directionsService;
function initMap() {
    console.log("initmap is running")
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

function calcRoute() {
    var start = $("#start-location").val().trim();
    var end = $("#end-location").val().trim();
    var departureDate = $("#date").val().trim();
    console.log(departureDate);
    var departureTime = $("#time").val().trim();
    console.log(departureTime);
    var departure = departureDate + " " + departureTime;
    console.log(departure);
    var dateFormat = 'YYYY-MM-DD hh:mm';
    var currentTime = moment().format(dateFormat);
    var diffTime = moment(currentTime, dateFormat).diff(moment(departure), "seconds");
    var N = (diffTime * 1000) * -1;
    console.log(N);
    var date = new Date(Date.now() + N);
    var DrivingOptions = {
        departureTime: date,
    };
    var request = {
        origin: start,
        destination: end,
        travelMode: 'DRIVING',
        drivingOptions: DrivingOptions
    };
    console.log(directionsService);
    directionsService.route(request, function (response, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(response);
            showSteps(response);
        } else {
            location.reload();
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
    var tripTime = tripDuration.split(" ");
    var timeArray = [];
    timeArray = timeArray.concat(tripTime);
    var tripHours = parseInt(timeArray[0]);
    var tripMinutes = parseInt(timeArray[2])
    var hoursAway = 0;
    if (tripMinutes >= 30) {
        hoursAway = tripHours + 1;
    } else {
        hoursAway = tripHours;
    }
    // console.log(hoursAway);
    // group of code to store lat longs along the route
    var polyline = directionsDisplay.directions.routes["0"].overview_path
    var verticesCount = polyline.length;
    console.log(verticesCount);
    var stepCounter = verticesCount / 4
    console.log(stepCounter);
    var increment1 = Math.round(stepCounter);
    var increment2 = Math.round(stepCounter * 2);
    var increment3 = Math.round(stepCounter * 3);
    var tripStep1lat = polyline[0 + increment1].lat();
    var tripStep1lng = polyline[0 + increment1].lng();
    var tripStep2lat = polyline[0 + increment2].lat();
    var tripStep2lng = polyline[0 + increment2].lng();
    var tripStep3lat = polyline[0 + increment3].lat();
    var tripStep3lng = polyline[0 + increment3].lng();
    // console.log("Location 1: " + tripStep1lat + ", " + tripStep1lng + " " +
        // "Location 2: " + tripStep2lat + ", " + tripStep2lng + " " +
        // "Location 3: " + tripStep3lat + ", " + tripStep3lng);

    // TO FIND NEAREST CITY AND STATE FROM GEOCODE LAT LONG (COMMENTED OUT UNTIL WE PLUGIN MAP DATA)
    var startCityStateURL = "https://cors-anywhere.herokuapp.com/http://api.wunderground.com/api/" + APIKey + "/geolookup/q/" + startLat + "," + startLng + ".json";
    var endCityStateURL = "https://cors-anywhere.herokuapp.com/http://api.wunderground.com/api/" + APIKey + "/geolookup/q/" + endLat + "," + endLng + ".json";

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
            var queryURLconditions = "https://cors-anywhere.herokuapp.com/http://api.wunderground.com/api/" + APIKey + "/conditions/q/" + startState + "/" + cityReplaced + ".json";
            var queryURLhourly = "https://cors-anywhere.herokuapp.com/http://api.wunderground.com/api/" + APIKey + "/hourly/q/" + state + "/" + cityReplaced + ".json";

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
                    console.log(curTemp);
                    var curObservationLower = curObservation.toLowerCase();
                    console.log(curObservation);
                    switch (curObservationLower) {

                        case "haze":
                            curObservationLower = "hazy";
                            break;

                        case "freezingrain":
                            curObservationLower = "sleet";
                            break;

                        case "overcast":
                            curObservationLower = "cloudy";
                            break;

                        case "thunderstorms":
                            curObservationLower = "tstorms";
                            break;

                        case "thunderstorm":
                            curObservationLower = "tstorms";
                            break;

                        case "scatteredclouds":
                            curObservationLower = "partlycloudy";
                            break;

                        case "lightdrizzle":
                            curObservationLower = "flurries";
                            break;

                        case "heavydrizzle":
                            curObservationLower = "flurries";
                            break;

                        case "lightrain":
                            curObservationLower = "rain";
                            break;

                        case "heavyrain":
                            curObservationLower = "rain";
                            break;

                        case "rain":
                            curObservationLower = "rain"
                            break;

                        case "lightsnow":
                            curObservationLower = "snow";
                            break;

                        case "heavysnow":
                            curObservationLower = "snow";
                            break;

                        case "lightsnowgrains":
                            curObservationLower = "snow";
                            break;

                        case "heavysnowgrains":
                            curObservationLower = "snow";
                            break;

                        case "snowgrains":
                            curObservationLower = "snow";
                            break;

                        case "lighticecrystals":
                            curObservationLower = "snow";
                            break;

                        case "heavyicecrystals":
                            curObservationLower = "snow";
                            break;

                        case "icecrystals":
                            curObservationLower = "snow";
                            break;

                        case "lighticepellets":
                            curObservationLower = "snow";
                            break;

                        case "heavyicepellets":
                            curObservationLower = "snow";
                            break;

                        case "icepellets":
                            curObservationLower = "snow";
                            break;

                        case "lighthail":
                            curObservationLower = "snow";
                            break;

                        case "heavyhail":
                            curObservationLower = "snow";
                            break;

                        case "hail":
                            curObservationLower = "snow";
                            break;

                        case "lightmist":
                            curObservationLower = "cloudy";
                            break;

                        case "heavymist":
                            curObservationLower = "cloudy";
                            break;

                        case "mist":
                            curObservationLower = "cloudy";
                            break;

                        case "lightfog":
                            curObservationLower = "foggy";
                            break;

                        case "heavyfog":
                            curObservationLower = "foggy";
                            break;

                        case "fog":
                            curObservationLower = "foggy";
                            break;

                        case "lightfogpatches":
                            curObservationLower = "foggy";
                            break;

                        case "heavyfogpatches":
                            curObservationLower = "foggy";
                            break;

                        case "fogpatches":
                            curObservationLower = "foggy";
                            break;

                        case "lightsmoke":
                            curObservationLower = "foggy";
                            break;

                        case "heavysmoke":
                            curObservationLower = "foggy";
                            break;

                        case "smoke":
                            curObservationLower = "foggy";
                            break;

                        case "lightwidespreaddust":
                            curObservationLower = "foggy";
                            break;

                        case "heavywidespreaddust":
                            curObservationLower = "foggy";
                            break;

                        case "widespreaddust":
                            curObservationLower = "foggy";
                            break;

                        case "lightwidespreaddust":
                            curObservationLower = "foggy";
                            break;

                        case "lightsand":
                            curObservationLower = "hazy";
                            break;

                        case "heavysand":
                            curObservationLower = "hazy";
                            break;

                        case "sand":
                            curObservationLower = "hazy";
                            break;

                        case "lighthaze":
                            curObservationLower = "hazy";
                            break;

                        case "heavyhaze":
                            curObservationLower = "hazy";
                            break;

                        case "lightsand":
                            curObservationLower = "hazy";
                            break;

                        case "heavysand":
                            curObservationLower = "hazy";
                            break;

                        case "sand":
                            curObservationLower = "hazy";
                            break;

                        case "blowingsnow":
                            curObservationLower = "snow";
                            break;

                        case "rainmist":
                            curObservationLower = "rain";
                            break;

                        case "lightrainshowers":
                            curObservationLower = "rain";
                            break;

                        case "heavyrainshowers":
                            curObservationLower = "rain";
                            break;

                        case "rainshowers":
                            curObservationLower = "rain";
                            break;

                        case "snowshowers":
                            curObservationLower = "rain";
                            break;

                        case "freezingrain":
                            curObservationLower = "rain";
                            break;

                        case "mostlycloudy":
                            curObservationLower = "cloudy";
                            break;
                    }









                    $("#weather-conditions").append("<div>"+startCity +"," + startState + "  Current Weather </div><br/>") 
                    $("#weather-conditions").append("<div> Temperature:" + curTemp + "°</div><br/>")
                    $("#weather-conditions").append("<div> <img src=https://icons.wxug.com/i/c/k/" + curObservationLower + ".gif>" + curObservationLower)
                    $("#weather-conditions").append("<div> Wind: " + curWinSpd + "mph  Direction: " + curWind + "</div><br/><div></div><br/>")



                })

        })

         





    $.ajax({
        url: endCityStateURL,
        method: "GET"
    })
        .then(function (response) {
            var APIKey = "1a7471eee44adb74";
            console.log(response);
            console.log(response);
            console.log(response.location.state);
            endState = response.location.state;
            endCity = response.location.city;
            cityReplaced = endCity.split(' ').join('_');
            console.log(response.location.city);

            // TO FIND CONDITIONS FROM NEAREST CITY AND STATE(WILL BE USED BOTH FOR START AND END LOCATIONS)
            var queryURLconditions = "https://cors-anywhere.herokuapp.com/http://api.wunderground.com/api/" + APIKey + "/conditions/q/" + endState + "/" + cityReplaced + ".json";
            var queryURLhourly = "https://cors-anywhere.herokuapp.com/http://api.wunderground.com/api/" + APIKey + "/hourly/q/" + endState + "/" + cityReplaced + ".json";
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

                    console.log(response.hourly_forecast[hoursAway].condition, response.hourly_forecast[hoursAway].wdir.dir, response.hourly_forecast[hoursAway].wspd.english, response.hourly_forecast[hoursAway].temp.english);
                    var forCondition = response.hourly_forecast[hoursAway].condition;
                    var forWdir = response.hourly_forecast[hoursAway].wdir.dir;
                    var forWspd = response.hourly_forecast[hoursAway].wspd.english;
                    var forTemp = response.hourly_forecast[hoursAway].temp.english;
                    var forObservationLower = response.hourly_forecast[hoursAway].condition.toLowerCase().split(' ').join('');
                    console.log(forCondition);
                    console.log(forWdir);
                    console.log(forWspd);
                    console.log(forTemp);

                    switch (forObservationLower) {
                        case "chanceofrain":
                            forObservationLower = "chancerain"
                            break;

                        case "chanceoflurries":
                            forObservationLower = "chanceflurries"
                            break;

                        case "chanceoffreezingrain":
                            forObservationLower = "chancesleet";
                            break;

                        case "chanceoflsleet":
                            forObservationLower = "chancesleet";
                            break;

                        case "chanceofsnow":
                            forObservationLower = "chancesnow";
                            break;

                        case "chanceofthunderstorms":
                            forObservationLower = "chancetstorms"
                            break;

                        case "haze":
                            forObservationLower = "hazy";
                            break;

                        case "freezingrain":
                            forObservationLower = "sleet";
                            break;

                        case "overcast":
                            forObservationLower = "cloudy";
                            break;

                        case "thunderstorms":
                            forObservationLower = "tstorms";
                            break;

                        case "thunderstorm":
                            forObservationLower = "tstorms";
                            break;

                        case "scatteredclouds":
                            forObservationLower = "partlycloudy";
                            break;

                        case "fog":
                            forObservationLower = "foggy";
                            break;

                      
                    }


                    $("#weather-conditions").append("<div>"+endCity +"," + endState + "   weather upon arrival in " + hoursAway + " hours </div><br/>") 
                    $("#weather-conditions").append("<div> Temperature:" + forTemp + "°</div><br/>")
                    $("#weather-conditions").append("<div> <img src=https://icons.wxug.com/i/c/k/" + forObservationLower + ".gif>" + forObservationLower)
                    $("#weather-conditions").append("<div> Wind: " + forWspd + "mph  Direction: " + forWdir + "</div>")
                   


                })


        })






}











$(document).on("click", "#search", function calculateAndDisplayRoute() {
    console.log("This button works")
    event.preventDefault();
    calcRoute();
    $("#input").hide();
    $("#weather-conditions").show();

})

// <!--START WEATHER API'S BELOW  -->



