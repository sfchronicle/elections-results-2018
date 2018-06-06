var pollsTimer = setInterval(function () {

  var today = new Date(), //gets the browser's current time
  	electionDay = new Date("Jun 05 2018 17:29:00 GMT-0700"), //sets the countdown at 5pm
  	timeLeft = (electionDay.getTime() - today.getTime()),
  	hrsLeft = Math.floor((timeLeft / (1000 * 60 * 60)) % 24),
  	minsLeft = Math.floor((timeLeft / 1000 / 60) % 60),
  	secsLeft = Math.floor((timeLeft / 1000) % 60);

  if (Math.floor(electionDay.getTime()/1000) <= Math.floor(today.getTime()/1000)){
    clearInterval(pollsTimer);
  
    document.getElementById("w-voterguide").innerHTML = (
      '<img src="./assets/graphics/rankedchoice_GR.png"><a href="https://projects.sfchronicle.com/2018/voter-guide/" target="_blank"> Live Results</a>'
    );
  
    document.getElementById("liveresults").style.display="block";
    document.getElementById("w-races").style.display="none";

  }else{
    document.getElementById('countdown').style.display = "block";
    document.getElementById("countdown-header").innerHTML = (
    "<div class='time'><div class='hours'>"   +  hrsLeft   + "</div><div class='text'>HOURS</span></div></div>" + 
    "<div class='time'><div class='minutes'>" +  minsLeft  + "</div><div class='text'>MINUTES</span></div></div>" +
    "<div class='time'><div class='seconds'>" +  secsLeft  + "</div><div class='text'>SECONDS</span></div></div>"
    );
  }

}, 1000);

var timer5minutes = 300000;
var state_lib = require("./staterace.js");
var caURL = "https://extras.sfgate.com/editorial/election2018primary/live/ca_summary.json";
var sf_lib = require("./sf.js");
var localDataURL = "https://extras.sfgate.com/editorial/election2018primary/live/localresults.json";

// filling out top races sections
state_lib.StateRaces(caURL,"governor-race-topraces","governor","CA governor",1);
sf_lib.SFMayorRace(localDataURL,"sfmayor-race-topraces","Cities","SF mayor");

// refresh top races
var topraces_timer = setInterval(function(){
  state_lib.StateRaces(caURL,"governor-race-topraces","governor","CA governor",1);
  sf_lib.SFMayorRace(localDataURL,"sfmayor-race-topraces","Cities","SF mayor");
},timer5minutes)

