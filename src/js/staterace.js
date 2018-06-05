// -----------------------------------------------------------------------------
// populating SF supes
// -----------------------------------------------------------------------------

var d3 = require('d3');
var formatthousands = d3.format("0,000");

// populate race information
var populate_race_function = require("./populate_race.js");

module.exports = {

  StateRaces: function(stateDataURL,sectionID,racekey,raceName,secondaryflag){

    d3.json(stateDataURL, function(stateData){

        var cat = stateData[racekey]["state"];
        var sectionIDelem = document.getElementById(sectionID);
        if (raceName == "State superintendent of public instruction"){
          sectionIDelem.innerHTML = "<div class='race-block'><h4 class='race sup'>"+raceName+"</h4><div class='instructions left'>Any candidate who gets a majority wins. Otherwise, the top two candidates advance to the general election in November.</div><div id='"+sectionID+"0'></div>";
        } else if (raceName == "U.S. Senate"){
          sectionIDelem.innerHTML = "<div class='race-block'><h4 class='race sup'>"+raceName+"<span id='senate-link' class='related-story-link'></span></h4><div class='instructions left'>Top two candidates advance to general election in November.</div><div id='"+sectionID+"0'></div>";
        } else if (raceName == "Governor" && !secondaryflag){
          sectionIDelem.innerHTML = "<div class='race-block'><h4 class='race sup'>"+raceName+"<span id='governor-link' class='related-story-link'></span><span id='governor-link-second' class='related-story-link'></span></h4><div class='instructions left'>Top two candidates advance to general election in November.</div><div id='"+sectionID+"0'></div>";
        } else if (raceName == "Governor" && secondaryflag){
          sectionIDelem.innerHTML = "<div class='race-block'><h4 class='race sup'>"+raceName+"<span id='governor-link0' class='related-story-link'></span></h4><div class='instructions left'>Top two candidates advance to general election in November.</div><div id='"+sectionID+"0'></div>";
        } else {
          sectionIDelem.innerHTML = "<div class='race-block'><h4 class='race sup'>"+raceName+"</h4><div class='instructions left'>Top two candidates advance to general election in November.</div><div id='"+sectionID+"0'></div>";
        }
        var raceID = document.getElementById(sectionID+"0");
        populate_race_function.populateRace(raceID,cat,21486,1,secondaryflag);

    });

  }
}
