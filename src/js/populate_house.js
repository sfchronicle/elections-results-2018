// -----------------------------------------------------------------------------
// populating map scrolly sidebar
// -----------------------------------------------------------------------------

var d3 = require('d3');
var formatthousands = d3.format("0,000");
var timer5minutes = 300000;

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

    var loadSidebar = function(){

      return new Promise(function(ok, fail) {

        d3.json(DataURL, function(Data){

          d3.json("https://extras.sfgate.com/editorial/election2018primary/live/ca_summary.json",function(stateData){

            var section = document.getElementById(sectionID);
            section.innerHTML = "";

            if (sectionID.includes("house")){
              var codeData = houseCodes;
            } else if (sectionID.includes("assembly")) {
              var codeData = assemblyCodes;
            } else if (sectionID.includes("senate")) {
              var codeData = statesenateCodes;
              newmanRecall = stateData["newmanrecall"]["state"];
              newmantotal = +newmanRecall["c1"]+ +newmanRecall["c2"];
              newmanNo = +newmanRecall["c2"];
              newmanYes = +newmanRecall["c1"];
              if (newmantotal == 0){ newmantotal = 0.1;}
            }

            Object.keys(codeData).forEach(function(key){
              var tempvar = Data["0"+key];
              var properties = codeData[key];
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
                  var count = 1;
                  if ((key == "6029") && (sectionID.includes("senate"))) {
                    var html_str = "<div class='map-entry map-entry-"+scrollKey+"' id='scrolly"+scrollKey+key+"'><div class='state-name'>"+properties.name+"</div>";
                    html_str = html_str + "<div class='extra-explanation'>Voters are deciding a recall vote of Sen. Josh Newman. If the recall is successful, the top vote-getter is elected.</div>";
                    if (newmanRecall.d == " Yes"){
                      html_str = html_str + "<div class='result-map'><span class='yesresult'><i class='fa fa-check-circle-o' aria-hidden='true'></i> Yes: "+Math.round(newmanYes/newmantotal*1000)/10+"%</span><span class='no-class'>No: "+Math.round(newmanNo/newmantotal*1000)/10+"%</span></div>"
                    } else if (newmanRecall.d == "No"){
                      html_str = html_str + "<div class='result-map'>Yes: "+Math.round(newmanYes/newmantotal*1000)/10+"%<span class='no-class noresult'><i class='fa fa-times-circle-o' aria-hidden='true'></i> No: "+Math.round(newmanNo/newmantotal*1000)/10+"%</span></div>"
                    } else {
                      html_str = html_str + "<div class='result-map'>Yes: "+Math.round(newmanYes/newmantotal*1000)/10+"%<span class='no-class'>No: "+Math.round(newmanNo/newmantotal*1000)/10+"%</span></div>";
                    }
                    html_str = html_str + "<div class='cand-container'>";
                  } else {
                    var html_str = "<div class='map-entry map-entry-"+scrollKey+"' id='scrolly"+scrollKey+key+"'><div class='state-name'>"+properties.name+"</div><div class='cand-container'>";
                  }
                  while (tempvar["c"+count]) {
                    var party = tempvar["c"+count+"_party"];
                    var key = tempvar["c"+count+"_name"].toLowerCase().replace(/ /g,'').replace("'","");
                    if (((tempvar["c"+count+"_name"] == tempvar["d"]) || (tempvar["c"+count+"_name"] == tempvar["d1"])) && (tempvar["c"+count+"_i"] == 1)) {
                      html_str = html_str + "<div class='cand-line'><i class='fa fa-check-circle-o' aria-hidden='true'></i>"+tempvar["c"+count+"_name"]+" <span class='party "+key+" "+party+"party'>"+tempvar["c"+count+"_party"]+"</span><i class='fa fa-star' aria-hidden='true'></i> "+Math.round(tempvar["c"+count]/sum*1000)/10+"%</div>";
                    } else if ((tempvar["c"+count+"_name"] == tempvar["d"]) || (tempvar["c"+count+"_name"] == tempvar["d1"])) {
                        html_str = html_str + "<div class='cand-line'><i class='fa fa-check-circle-o' aria-hidden='true'></i>"+tempvar["c"+count+"_name"]+" <span class='party "+key+" "+party+"party'>"+tempvar["c"+count+"_party"]+"</span> "+Math.round(tempvar["c"+count]/sum*1000)/10+"%</div>";
                    } else if (tempvar["c"+count+"_i"] == 1) {
                      html_str = html_str + "<div class='cand-line'><i class='fa fa-check-circle-o' aria-hidden='true'></i>"+tempvar["c"+count+"_name"]+" <span class='party "+key+" "+party+"party'>"+tempvar["c"+count+"_party"]+"</span><i class='fa fa-star' aria-hidden='true'></i> "+Math.round(tempvar["c"+count]/sum*1000)/10+"%</div>";
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
                section.insertAdjacentHTML("beforeend",html_str);
                ok();
              }

            });
          });

        });

      });

    }

    var scale2 = 0;

    var sidebarEvents = function(){
      var cname = "map-entry-"+scrollKey;
      var mapEntries = document.getElementsByClassName(cname);
      console.log(mapEntries.length);

      var width = 600;
      var height = 530;
      var containerwidth = document.getElementById("svgID"+shortKey).getBoundingClientRect().width;
      if (scale2 === 0){
        scale2 = containerwidth/width;
      }

      for (var idx=0; idx<mapEntries.length; idx++){
        var tempEntry = mapEntries[idx];
        mapEntries[idx].addEventListener("click",function(d){
          $(".map-entry-"+scrollKey).removeClass("active");
          this.classList.add("active");
          $(".states"+shortKey).removeClass("active");
          $(".states"+shortKey).addClass("faded");
          mapID = document.getElementById(scrollKey+"_id0"+this.id.split(scrollKey)[1]);
          mapID.classList.add("active");

          var bounds = mapID.getBBox();
            dx = bounds.width,
            dy = bounds.height,
            scale = Math.min(.6 / Math.max(dx / width, dy / height),6);
            x = bounds.x+bounds.width/2,
            y = bounds.y+bounds.height/2;

          var translate = [scale2*(width / 2 - x)*scale, scale2*(height / 2 - y)*scale];

          var svgCACounties = d3.select("#svgID"+shortKey);
          if (!is_safari){
              svgCACounties.transition()
               .duration(750)
               .attr("transform","translate("+translate+")scale("+scale+")");
           } else {
              document.getElementById("svgID"+shortKey).classList.add("easing-class");
              document.getElementById("svgID"+shortKey).style.webkitTransform = "translate("+translate[0]+"px,"+translate[1]+"px) scale("+scale+")";
           }
           zoom = 1;
        })
      }
    }

    sidebartimer = setInterval(function() {

      var svgCACounties = d3.select("#svgID"+shortKey);
      if (!is_safari){
          svgCACounties.transition()
           .duration(750)
           .attr("transform","translate(0,0)scale(1)");
       } else {
          document.getElementById("svgID"+shortKey).classList.add("easing-class");
          document.getElementById("svgID"+shortKey).style.webkitTransform = "translate(0px,0px) scale(1)";
       }
       $(".states").removeClass("active");
       $(".map-entry").removeClass("active");
       loadSidebar().then(()=>sidebarEvents());
      console.log("refresh sidebar"+scrollKey);
    }, timer5minutes);

    loadSidebar().then(()=>sidebarEvents());

  }

}
