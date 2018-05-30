// -----------------------------------------------------------------------------
// populating SF supes
// -----------------------------------------------------------------------------

var d3 = require('d3');
var formatthousands = d3.format("0,000");

// populate race information
var populate_race_function = require("./populate_race.js");

module.exports = {

  SFRaces: function(localDataURL){

    d3.json(localDataURL, function(localData){

        var sectionID = document.getElementById("sf-section");

        var SFCatList = Object.keys(localData["San Francisco"]);

        for (var idx=0; idx<SFCatList.length; idx++){

          var cat = localData["San Francisco"][SFCatList[idx]];
          if (SFCatList[idx] != "Measures"){

            localData["San Francisco"][SFCatList[idx]].forEach(function(d,idx) {
              var name = d.name;
              var districtNum = name.substr(name.indexOf("District ") + 9);
              sectionID.insertAdjacentHTML("beforeend","<div class='race-block'><h4 class='race sup'>"+d.name+"</h4><div class='instructions left'>The candidate who gets a majority of votes wins.</div><div id='district"+districtNum+"'></div>")
              var supeID = document.getElementById("district"+districtNum);
              var racevar = d;
              populate_race_function.populateRace(supeID,racevar,0,1);
            });

          }

        };

    });

  }
}
