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

