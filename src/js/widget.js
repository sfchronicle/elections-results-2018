var d3 = require('d3');

// var pollsTimer = setInterval(function () {

  var today = new Date(), //gets the browser's current time
  	electionDay = new Date("Jun 05 2018 20:00:00 GMT-0700"), //sets the countdown at 5pm
  	timeLeft = (electionDay.getTime() - today.getTime()),
  	hrsLeft = Math.floor((timeLeft / (1000 * 60 * 60)) % 24),
  	minsLeft = Math.floor((timeLeft / 1000 / 60) % 60),
  	secsLeft = Math.floor((timeLeft / 1000) % 60);

  if (Math.floor(electionDay.getTime()/1000) <= Math.floor(today.getTime()/1000)){
    clearInterval(pollsTimer);
    if(document.getElementById("links")){
      document.getElementById("links").innerHTML = (
        '<div class="link"><a href="https://projects.sfchronicle.com/2018/election-results" target="_blank" title="">Live Results</a></div>' +
        '<div class="link"><a href="https://www.sfchronicle.com/elections" target="_blank" title="">Live Chat</a></div>' +
        '<div class="link"><a href="https://www.sfchronicle.com/elections" target="_blank" title="">Election Coverage</a></div>'
      );
    }
    if(document.getElementById("page-links")){
      document.getElementById("page-links").innerHTML = (
        '<div class="link"><a href="https://projects.sfchronicle.com/2018/election-results" target="_blank" title="">Live Results</a></div>' +
        '<div class="link"><a href="https://www.sfchronicle.com/elections" target="_blank" title="">Live Chat</a></div>'
      );
    }

  }else{
    document.getElementById('countdown').style.display = "block";
    document.getElementById("countdown-header").innerHTML = (
    "<div class='time'><div class='hours'>"   +  hrsLeft   + "</div><div class='text'>HOURS</span></div></div>" + 
    "<div class='time'><div class='minutes'>" +  minsLeft  + "</div><div class='text'>MINUTES</span></div></div>" +
    "<div class='time'><div class='seconds'>" +  secsLeft  + "</div><div class='text'>SECONDS</span></div></div>"
    );
  }

// }, 1000);

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
  console.log("refresh top races section");
},timer5minutes)

function fillRegionalHighlights(){
  d3.json(localDataURL, function(localData){

    // -----------------------------------------------------------------------------
    // filling in regional RR Prop
    // -----------------------------------------------------------------------------
    var RRPropData = localData["Special Districts"]["Measures"][0];
    var RRPropYes = localData["Special Districts"]["Measures"][0]['Yes'];
    var RRPropNo = localData["Special Districts"]["Measures"][0]['No'];

    // var propID = document.getElementById('regionalpropR3');
    var propID2 = document.getElementById('regionalpropR3-topraces');
    var total = +RRPropYes + +RRPropNo;
    var propResult = RRPropData;

    if (total == 0) { total = 0.1;}
    if (propResult.d == "Yes") {
      var htmlresult = "<span class='propyes small'><i class='fa fa-check-circle-o' aria-hidden='true'></i>Yes: "+Math.round(propResult["Yes"]/total*1000)/10+"%</span><span class='propno small'>No: "+Math.round(propResult["No"]/total*1000)/10+"%</span>"
    } else if (propResult.d == "No") {
      var htmlresult = "<span class='propyes small'>Yes: "+Math.round(propResult["Yes"]/total*1000)/10+"%</span><span class='propno small'><i class='fa fa-check-circle-o' aria-hidden='true'>No: "+Math.round(propResult["No"]/total*1000)/10+"%</i></span>"
    } else {
      var htmlresult = "<span class='propyes small'>Yes: "+Math.round(propResult["Yes"]/total*1000)/10+"%</span><span class='propno small'>No: "+Math.round(propResult["No"]/total*1000)/10+"%</span>"
    }
    var htmlresult = htmlresult+ "<div class='prop-precincts'>"+formatthousands(propResult.p)+" / "+formatthousands(propResult.pt)+" precincts reporting</div>"
    // propID.innerHTML = htmlresult;
    propID2.innerHTML = htmlresult;

    
  });
}
