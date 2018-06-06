var propsCAURL = "https://extras.sfgate.com/editorial/election2018primary/live/props_county_ca.json";

var ca_props_lib_map = require("./CAprops_map.js");
ca_props_lib_map.CAPropsMap(propsCAURL);

var timer5minutes = 500000;

// refresh top races
var update_timer = setInterval(function(){
  // refresh CA props and SF measures
  ca_props_lib_map.CAPropsMap(propsCAURL);

},timer5minutes);
