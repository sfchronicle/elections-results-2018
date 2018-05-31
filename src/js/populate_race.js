// function to populate races

var d3 = require('d3');
var formatthousands = d3.format("0,000");

// size of text for bar charts
if (screen.width < 480){
  var text_len = 185;
} else {
  var text_len = 321;
}



module.exports = {

  populateRace: function(raceID,racevar,p,expandflag,secondaryflag) {

    var count = 1; var sum = 0;
    while (racevar["c"+count]) {
      var element = +racevar["c"+count];
      sum += element;
      count++;
    }
    // this is a hack for when there are no reported results yet
    if (sum == 0) { sum = 0.1; }
    var count = 1;
    if (racevar.pt && racevar.p) {
      var html = "<div class='candidate-precincts'>"+formatthousands(racevar.p)+" / "+formatthousands(racevar.pt)+" precincts reporting</div>";
    } else {
      var html = "<div class='candidate-precincts'>"+formatthousands(racevar.p)+" / "+formatthousands(p)+" precincts reporting</div>";
    }
    while (racevar["c"+count]) {
      if (secondaryflag){
        var namekey = racevar["c"+count+"_name"].toLowerCase().replace(/ /g,'').replace(/\./g,"").replace("'","");
        namekey = namekey+"second";
      } else {
        var namekey = racevar["c"+count+"_name"].toLowerCase().replace(/ /g,'').replace(/\./g,"").replace("'","");
      }
      if (racevar["c"+count+"_party"]){
        if (racevar["d"]) {
          if ((racevar["c"+count+"_name"] == racevar["d"]) && (racevar["c"+count+"_i"] == 1)) {
            html = html+"<div class='entry'><h3 class='name'><i class='fa fa-check-circle-o' aria-hidden='true'></i>"+racevar["c"+count+"_name"]+" <span class='"+racevar["c"+count+"_party"]+"party party'>" + racevar["c"+count+"_party"] + "</span><i class='fa fa-star' aria-hidden='true'></i></h3><div class='bar' id='"+namekey+"'></div><div class='bar-label'>"+Math.round(racevar["c"+count]/sum*100)+"%</div></div>";
          } else if (racevar["c"+count+"_name"] == racevar["d"]) {
            html = html+"<div class='entry'><h3 class='name'><i class='fa fa-check-circle-o' aria-hidden='true'></i>"+racevar["c"+count+"_name"]+" <span class='"+racevar["c"+count+"_party"]+"party party'>" + racevar["c"+count+"_party"] + "</span></h3><div class='bar' id='"+namekey+"'></div><div class='bar-label'>"+Math.round(racevar["c"+count]/sum*100)+"%</div></div>";
          } else if (racevar["c"+count+"_i"] == 1) {
            html = html+"<div class='entry'><h3 class='name'>"+racevar["c"+count+"_name"]+" <span class='"+racevar["c"+count+"_party"]+"party party'>" + racevar["c"+count+"_party"] + "</span><i class='fa fa-star' aria-hidden='true'></i></h3><div class='bar' id='"+namekey+"'></div><div class='bar-label'>"+Math.round(racevar["c"+count]/sum*100)+"%</div></div>";
          } else {
            html = html+"<div class='entry'><h3 class='name'>"+racevar["c"+count+"_name"]+" <span class='"+racevar["c"+count+"_party"]+"party party'>" + racevar["c"+count+"_party"] + "</span></h3><div class='bar' id='"+namekey+"'></div><div class='bar-label'>"+Math.round(racevar["c"+count]/sum*100)+"%</div></div>";
          }
        } else if (racevar["c"+count+"_i"] == 1) {
          html = html+"<div class='entry'><h3 class='name'>"+racevar["c"+count+"_name"]+" <span class='"+racevar["c"+count+"_party"]+"party party'>" + racevar["c"+count+"_party"] + "</span><i class='fa fa-star' aria-hidden='true'></i></h3><div class='bar' id='"+namekey+"'></div><div class='bar-label'>"+Math.round(racevar["c"+count]/sum*100)+"%</div></div>";
        } else {
          html = html+"<div class='entry'><h3 class='name'>"+racevar["c"+count+"_name"]+" <span class='"+racevar["c"+count+"_party"]+"party party'>" + racevar["c"+count+"_party"] + "</span></h3><div class='bar' id='"+namekey+"'></div><div class='bar-label'>"+Math.round(racevar["c"+count]/sum*100)+"%</div></div>";
        }
      } else {
        if ((racevar["c"+count+"_d"] == 1) && (racevar["c"+count+"_i"] == 1)) {
          html = html+"<div class='entry'><h3 class='name'><i class='fa fa-check-circle-o' aria-hidden='true'></i>"+racevar["c"+count+"_name"]+ "<i class='fa fa-star' aria-hidden='true'></i></span></h3><div class='bar' id='"+namekey+"'></div><div class='bar-label' id='barlabel-"+namekey+"'>"+Math.round(racevar["c"+count]/sum*100)+"%</div></div>";
        } else if (racevar["c"+count+"_d"] == 1) {
          html = html+"<div class='entry'><h3 class='name'><i class='fa fa-check-circle-o' aria-hidden='true'></i>"+racevar["c"+count+"_name"]+ "</span></h3><div class='bar' id='"+namekey+"'></div><div class='bar-label' id='barlabel-"+namekey+"'>"+Math.round(racevar["c"+count]/sum*100)+"%</div></div>";
        } else if (racevar["c"+count+"_i"] == 1){
          html = html+"<div class='entry'><h3 class='name'>"+racevar["c"+count+"_name"]+ "<i class='fa fa-star' aria-hidden='true'></i></span></h3><div class='bar' id='"+namekey+"'></div><div class='bar-label' id='barlabel-"+namekey+"'>"+Math.round(racevar["c"+count]/sum*100)+"%</div></div>";
        } else {
          html = html+"<div class='entry'><h3 class='name'>"+racevar["c"+count+"_name"]+ "</span></h3><div class='bar' id='"+namekey+"'></div><div class='bar-label' id='barlabel-"+namekey+"'>"+Math.round(racevar["c"+count]/sum*100)+"%</div></div>";
        }
      }
      if ((count === 5) && (racevar["c6"] !== undefined) && (expandflag == 1)){
        html = html+"<div class='expand-button' id='expandbutton"+raceID.id+"'>Additional candidates</div><div class='expanded-races' id='expandsection"+raceID.id+"'>";
      }
      count ++;
    }
    if ((count > 5) && (expandflag == 1)){
      var closeDiv = html + "</div></div>";
    } else {
      var closeDiv = html + "</div>";
    }
    raceID.innerHTML = closeDiv;
    count2 = 1;
    while (racevar["c"+count2]) {
      if (secondaryflag){
        var namekey = racevar["c"+count2+"_name"].toLowerCase().replace(/ /g,'').replace(/\./g,"").replace("'","");
        namekey = namekey+"second";
      } else {
        var namekey = racevar["c"+count2+"_name"].toLowerCase().replace(/ /g,'').replace(/\./g,"").replace("'","");
      }
      // var namekey = racevar["c"+count2+"_name"].toLowerCase().replace(/ /g,'').replace(/\./g,"").replace("'","");
      if (sum == 0.1) {
        document.getElementById(String(namekey)).style.width = "0px";
      } else {
        if (secondaryflag){
          var width = document.getElementById("top-races-container").getBoundingClientRect().width-80;
          text_len = 170;
          if (screen.width > 480){
            width = width/2;
          }
        } else {
          var width = document.getElementById("bayarea").getBoundingClientRect().width-80;
        }
        var percent = Math.round(racevar["c"+count2]/sum*100);
        var pixels = (width-text_len)*(percent/100);
        pixels = Math.max(pixels,0);
        document.getElementById(String(namekey)).style.width = String(pixels)+"px";
      }
      count2++;
    }
    if ((count > 6) && (expandflag == 1)){
      // add event listener to expand collapsed sections
      document.getElementById("expandbutton"+raceID.id).addEventListener("click",function(){
        document.getElementById("expandsection"+raceID.id).classList.toggle("displayraces");
        if (document.getElementById("expandsection"+raceID.id).classList.contains("displayraces")){
          this.innerHTML = "Fewer candidates";
        } else {
          this.innerHTML = "Additional candidates";
        }

      });
    }


  }
}
