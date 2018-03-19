geocoder = new google.maps.Geocoder();

function getCoordinates (address, callback){
    var coordinates;
    geocoder.geocode({address: address}, function (results, status)
        coords_obj = results[0].geometry.location;
        coordinates = [coords_obj.nb,coords_obj.ob];
        callback(coordinates);
    })