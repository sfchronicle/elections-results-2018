// function for tooltip
var d3 = require('d3');
var formatthousands = d3.format("0,000");

module.exports = {

  tooltipGenerator: function(abbrev,races,properties) {

    if (races[String(abbrev)]) {
      var tempvar = races[String(abbrev)];
      if (tempvar.r) {
        var total = +tempvar.r["Yes"] + +tempvar.r["No"];
        if (total > 0) {
          var html_str = "<div class='state-name'>"+properties.name+"</div>";
          html_str = html_str+"<div class='result-map'>Yes: "+Math.round(+tempvar.r["Yes"]/total*1000)/10+"%<span class='no-class'>No: "+Math.round(+tempvar.r["No"]/total*1000)/10+"%</span></div>";
          html_str = html_str+"<div class='precincts-info'>"+formatthousands(tempvar.p)+"/"+formatthousands(properties.precincts)+" precincts reporting</div>";
        } else {
          var html_str = "<div class='state-name'>"+properties.name+"<span class='close-tooltip'><i class='fa fa-times' aria-hidden='true'></i></span></div>";
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
        var count = 1; var html_str = "<div class='state-name'>"+properties.name+"</div>";
        while (tempvar["c"+count]) {
          var party = tempvar["c"+count+"_party"];
          var key = tempvar["c"+count+"_name"].toLowerCase().replace(/ /g,'').replace("'","");
          if (tempvar["c"+count+"_name"] == tempvar.d) {
            html_str = html_str + "<div><i class='fa fa-check-circle-o' aria-hidden='true'></i>"+tempvar["c"+count+"_name"]+" <span class='party "+key+" "+party+"party'>"+tempvar["c"+count+"_party"]+"</span> "+Math.round(tempvar["c"+count]/sum*1000)/10+"%</div>";
          } else {
            html_str = html_str + "<div>"+tempvar["c"+count+"_name"]+" <span class='party "+key+" "+party+"party'>"+tempvar["c"+count+"_party"]+"</span> "+Math.round(tempvar["c"+count]/sum*1000)/10+"%</div>";
          }
          count ++;
        }
        if (tempvar["o"]) {
          html_str = html_str + "<div>Other: "+Math.round(tempvar["o"]/sum*1000)/10+"%</div>";
        }
        html_str = html_str+"<div class='precincts-info'>"+formatthousands(tempvar.p)+"/"+formatthousands(properties.precincts)+" precincts reporting</div>";
      }
    } else {
      var html_str = "<div class='state-name'>"+properties.name+"</div><div>No race.</div>";
    }
    return html_str;
  }

}
