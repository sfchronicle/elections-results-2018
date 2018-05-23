// -----------------------------------------------------------------------------
// populating map scrolly sidebar
// -----------------------------------------------------------------------------

var d3 = require('d3');
var formatthousands = d3.format("0,000");

// populate race information
var populate_race_function = require("./populate_race.js");

var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

module.exports = {

  CAmapList: function(DataURL,sectionID){

    if (sectionID.includes("house")){
      var scrollKey = "house";
      var shortKey = "house";
    } else if (sectionID.includes("assembly")) {
      var scrollKey = "assembly";
      var shortKey = "assembly";
    } else if (sectionID.includes("senate")) {
      var scrollKey = "statesenate";
      var shortKey = "ss";
    }

    d3.json(DataURL, function(Data){

      var section = document.getElementById(sectionID);

      Object.keys(Data).forEach(function(key) {
        var tempvar = Data[key];
        if (sectionID.includes("house")){
          var properties = houseCodes[+key];
        } else if (sectionID.includes("assembly")) {
          var properties = assemblyCodes[+key];
        } else if (sectionID.includes("senate")) {
          var properties = statesenateCodes[+key];
        }
        if (properties){
          if (tempvar.r) {
            var total = +tempvar.r["Yes"] + +tempvar.r["No"];
            if (total > 0) {
              var html_str = "<div class='map-entry'><div class='state-name'>"+properties.name+"</div>";
              html_str = html_str+"<div class='result-map'>Yes: "+Math.round(+tempvar.r["Yes"]/total*1000)/10+"%<span class='no-class'>No: "+Math.round(+tempvar.r["No"]/total*1000)/10+"%</span></div>";
              html_str = html_str+"<div class='precincts-info'>"+formatthousands(tempvar.p)+"/"+formatthousands(properties.precincts)+" precincts reporting</div>";
            } else {
              var html_str = "<div class='state-name'>"+properties.name+"</div>";
              html_str = html_str+"<div class='precincts-info'>"+formatthousands(tempvar.p)+"/"+formatthousands(properties.precincts)+" precincts reporting</div>";
            }
          } else {
            var count = 1; var sum = 0;
            while (tempvar["c"+count]) {
              var element = +tempvar["c"+count];
              sum += element;
              count++;
            }
            if (tempvar["o"]) {
              sum += +tempvar["o"];
            }
            if (sum == 0) { sum = 0.1; } // this is a hack for when there are no reported results yet
            var count = 1; var html_str = "<div class='map-entry map-entry-"+scrollKey+"' id='scrolly"+scrollKey+key+"'><div class='state-name'>"+properties.name+"</div><div class='cand-container'>";
            while (tempvar["c"+count]) {
              var party = tempvar["c"+count+"_party"];
              var key = tempvar["c"+count+"_name"].toLowerCase().replace(/ /g,'').replace("'","");
              if (tempvar["c"+count+"_name"] == tempvar.d) {
                html_str = html_str + "<div class='cand-line'><i class='fa fa-check-circle-o' aria-hidden='true'></i>"+tempvar["c"+count+"_name"]+" <span class='party "+key+" "+party+"party'>"+tempvar["c"+count+"_party"]+"</span> "+Math.round(tempvar["c"+count]/sum*1000)/10+"%</div>";
              } else {
                html_str = html_str + "<div class='cand-line'>"+tempvar["c"+count+"_name"]+" <span class='party "+key+" "+party+"party'>"+tempvar["c"+count+"_party"]+"</span> "+Math.round(tempvar["c"+count]/sum*1000)/10+"%</div>";
              }
              count ++;
            }
            if (tempvar["o"]) {
              html_str = html_str + "<div>Other: "+Math.round(tempvar["o"]/sum*1000)/10+"%</div>";
            }
            html_str = html_str+"</div><div class='precincts-info'>"+formatthousands(tempvar.p)+"/"+formatthousands(properties.precincts)+" precincts reporting</div>";
          }
          html_str = html_str +"</div>";
          // console.log(html_str);
          section.insertAdjacentHTML("beforeend",html_str);
        }

      });

    });

    // THIS NEEDS TO BE WRITTEN BETTER, TIMEOUT IS NOT NECESSARILY THE WAY TO GO ==============
    setTimeout(function(){
      var cname = "map-entry-"+scrollKey;
      var mapEntries = document.getElementsByClassName(cname);
      console.log(mapEntries.length);
      for (var idx=0; idx<mapEntries.length; idx++){
        var tempEntry = mapEntries[idx];
        mapEntries[idx].addEventListener("click",function(d){
          $(".map-entry").removeClass("active");
          this.classList.add("active");
          $(".states").removeClass("active");
          $(".states").addClass("faded");
          mapID = document.getElementById(scrollKey+"_id"+this.id.split(scrollKey)[1]);
          mapID.classList.add("active");
          var k,x,y;
          k = 2;
          var centroid = mapID.getBBox();
          x = centroid.x/k;
          y = centroid.y/k;
          var width = 860;
          var height = 530;
          var svgCACounties = d3.select("#svgID"+shortKey);
          if (!is_safari) {
            svgCACounties.transition().duration(750).attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")");
          } else {
            var str = "translate(" + width / 2 + "px, " + height / 2 + "px) scale(" + k + ") translate(" + -x + "px, " + -y + "px)";
            document.getElementById("svgIDss").classList.add("easing-class");
            document.getElementById("svgIDss").style.webkitTransform = str;
          }
        })
      }
    }, 400);
    // FIX ==================================================================================

  }
}
