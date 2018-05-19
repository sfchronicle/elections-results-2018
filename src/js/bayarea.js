var d3 = require('d3');
var formatthousands = d3.format("0,000");

// populate race information
var populate_race_function = require("./populate_race.js");

// populate measure information
var populate_measure_function = require("./populate_measure.js");

module.exports = {

  regionalSection: function(localDataURL){

    d3.json(localDataURL, function(localData){

      var localareas = Object.keys(localData);

      localareas.forEach(function(locality,lidx){

        if ((locality != "Special Districts") && (locality != "San Francisco")){

          var this_name = locality;
          var regionkey = locality.replace(/ /g,'');

          var sectionID = document.getElementById("regional-results");
          sectionID.insertAdjacentHTML("afterend","<h2 class='regionalhed active' id='region"+regionkey+"'><span class='regionhedname'>"+this_name+"</span></h2>");
          var regionID = document.getElementById("region"+regionkey);
          var results_types = Object.keys(localData[this_name]);
          if (this_name == "San Francisco") {
            var index = results_types.indexOf("Measures");
            results_types.splice(index,1);
            var index2 = results_types.indexOf("Supervisors");
            results_types.splice(index2,1);
          }
          results_types.forEach(function(d2,idx2) {
            var racekey = d2.toLowerCase().replace(/ /g,'').replace(".","").replace("'","");
            regionID.insertAdjacentHTML("beforeend","<h5 class='regionalhed' id='regionalhed"+regionkey+racekey+"'><i class='fa fa-caret-right' id='caret-"+regionkey+racekey+"' aria-hidden='true'></i>  "+d2+"</h5>");
            regionID.insertAdjacentHTML("beforeend","<div class='section-div "+racekey+"' id='race"+regionkey+racekey+"'></div>");
            var raceID = document.getElementById("race"+regionkey+racekey);
            var hedID = document.getElementById("regionalhed"+regionkey+racekey);
            var caretID = document.getElementById("caret-"+regionkey+racekey);
            raceID.style.display = "none";
            // event listeners for expanding/collapsing regional sections
            hedID.addEventListener("click",function(){
              if (raceID.style.display == "block") {
                raceID.style.display = "none";
                caretID.classList.remove('fa-caret-down');
                caretID.classList.add('fa-caret-right');
              }
              else {
                raceID.style.display = "block";
                caretID.classList.remove('fa-caret-right');
                caretID.classList.add('fa-caret-down');
              }
            });
            localData[this_name][d2].forEach(function(d4,idx3){
              var key = d4.name.toLowerCase().replace(/ /g,'').replace(".","").replace("'","");
              if(d4["n"]) {
                var h4_html = "<div class='block'><h4 class='race sup'>"+d4.name+" ("+d4["n"]+" seats)</h4><div id='key"+regionkey+racekey+ key + "'</div>";
              } else {
                if(d4["desc"]){
                  var h4_html = "<div class='block'><h4 class='race sup'>"+d4.name+"<div class='race desc'>"+d4.desc+"</div></h4><div id='key"+regionkey+racekey+ key + "'</div>";
                } else {
                  var h4_html = "<div class='block'><h4 class='race sup'>"+d4.name+"</h4><div id='key"+regionkey+racekey+ key + "'</div>";
                }
              }
              raceID.insertAdjacentHTML("beforeend",h4_html)
              var finalID = document.getElementById("key"+regionkey+racekey+key);
              // need to do a different thing for measures here
              if (racekey == "measures") {
                populate_measure_function.populateMeasure(finalID,d4);
              } else {
                populate_race_function.populateRace(finalID,d4,0);
              }
            });
          });

        }

      });

    });
  }
}
