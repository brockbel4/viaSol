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