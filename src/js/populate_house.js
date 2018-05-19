// -----------------------------------------------------------------------------
// populating map scrolly sidebar
// -----------------------------------------------------------------------------

var d3 = require('d3');
var formatthousands = d3.format("0,000");

// populate race information
var populate_race_function = require("./populate_race.js");

module.exports = {

  CAmapList: function(DataURL,sectionID){

    d3.json(DataURL, function(Data){

      var section = document.getElementById(sectionID);

      Object.keys(Data).forEach(function(key) {
        var d = Data[key];
        var name = d.name;
        var districtNum = "house"+key;//.substr(name.indexOf("District ") + 9);
        section.insertAdjacentHTML("beforeend","<div class='race-block'><h4 class='race sup'>"+d.name+"</h4><div id='district"+districtNum+"'></div>")
        var supeID = document.getElementById("district"+districtNum);
        var racevar = d;
        populate_race_function.populateRace(supeID,racevar,0);
      });

    });

  }
}
