

var timer5minutes = 300000;
var state_lib = require("./staterace.js");
var caURL = "https://extras.sfgate.com/editorial/election2018primary/live/ca_summary.json";
var sf_lib = require("./sf.js");
var localDataURL = "https://extras.sfgate.com/editorial/election2018primary/live/localresults.json";

// filling out top races sections
sf_lib.SFMayorRace(localDataURL,"sfmayor-race-topraces","Cities","SF mayor");

// refresh top races
var topraces_timer = setInterval(function(){
  sf_lib.SFMayorRace(localDataURL,"sfmayor-race-topraces","Cities","SF mayor");
},timer5minutes)

