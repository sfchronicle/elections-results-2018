// -----------------------------------------------------------------------------
// populating SF supes
// -----------------------------------------------------------------------------

var d3 = require('d3');
var formatthousands = d3.format("0,000");

// populate race information
var populate_race_function = require("./populate_race.js");

module.exports = {

  StateRaces: function(stateDataURL,sectionID,racekey,raceName){

    d3.json(stateDataURL, function(stateData){

        var cat = stateData[racekey]["state"];
        var sectionIDelem = document.getElementById(sectionID);
        if (raceName == "State superintendent of public instruction"){
          sectionIDelem.insertAdjacentHTML("beforeend","<div class='race-block'><h4 class='race sup'>"+raceName+"</h4><div class='instructions left'>Any candidate who gets a majority wins. Otherwise, the top two candidates advance to the general election in November.</div><div id='"+sectionID+"0'></div>")
        } else {
          sectionIDelem.insertAdjacentHTML("beforeend","<div class='race-block'><h4 class='race sup'>"+raceName+"</h4><div class='instructions left'>Top two candidates advance to general election in November.</div><div id='"+sectionID+"0'></div>")
        }
        var raceID = document.getElementById(sectionID+"0");
        populate_race_function.populateRace(raceID,cat,10000);

    });

  }
}
