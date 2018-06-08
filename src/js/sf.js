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
        sectionID.innerHTML = "";

        var SFCatList = Object.keys(localData["San Francisco"]);

        for (var idx=0; idx<SFCatList.length; idx++){

          var cat = localData["San Francisco"][SFCatList[idx]];
          if (SFCatList[idx] != "Measures"){

            localData["San Francisco"][SFCatList[idx]].forEach(function(d,idx) {
              var name = d.name;
              var districtNum = name.substr(name.indexOf("District ") + 9);
              if (name == "Mayor"){
                sectionID.insertAdjacentHTML("beforeend","<div class='race-block'><h4 class='race sup'>"+d.name+"<span id='mayor-link' class='related-story-link'></span></h4><div class='instructions left'>Winner to be determined by ranked-choice voting.</div><div id='district"+districtNum+"'></div>");
              } else if (name == "Supervisor, District 8"){
                sectionID.insertAdjacentHTML("beforeend","<div class='race-block'><h4 class='race sup'>"+d.name+"<span id='sup8-link' class='related-story-link'></span></h4><div class='instructions left'>Winner to be determined by ranked-choice voting.</div><div id='district"+districtNum+"'></div>");
              } else {
                sectionID.insertAdjacentHTML("beforeend","<div class='race-block'><h4 class='race sup'>"+d.name+"<span id='"+d.name.toLowerCase().replace(',','').replace(/ /g,'')+"-link' class='related-story-link'></span></h4><div class='instructions left'>The candidate who gets a majority of votes wins.</div><div id='district"+districtNum+"'></div>");
              }
              var supeID = document.getElementById("district"+districtNum);
              var racevar = d;
              populate_race_function.populateRace(supeID,racevar,0,1);
            });

          }

        };

    });

  },

  // this is for filling in the mayor race
  SFMayorRace: function(localDataURL,sectionID,raceKey,raceName,secondaryflag){

    d3.json(localDataURL, function(localData){
      var sectionIDelem = document.getElementById(sectionID);
      var cat = localData["San Francisco"]["Cities"][0];
      sectionIDelem.innerHTML = "<div class='race-block'><h4 class='race sup'>"+raceName+"<span id='mayor-link0' class='related-story-link'></span></h4><div class='instructions left'>Winner to be determined by ranked-choice voting.</div><div id='"+sectionID+"0'></div>";
      var supeID = document.getElementById(sectionID+"0");
      populate_race_function.populateRace(supeID,cat,0,1,1);

    });

  }
}
