// function to populate races

var d3 = require('d3');
var formatthousands = d3.format("0,000");

module.exports = {

  populateMeasure: function(measureID,measurevar) {
    var total = +measurevar["Yes"] + +measurevar["No"];
    if (total == 0) { total = 0.1;}
    if (measurevar.d) {
      if (measurevar.d == "Yes") {
        var html_str ="<div class='measure-group'><div class='result yes'><span class='yesresult'><i class='fa fa-check-circle-o' aria-hidden='true'></i> Yes: "+Math.round(+measurevar["Yes"]/total*1000)/10+"%</span><span class='no-class'>No: "+Math.round(+measurevar["No"]/total*1000)/10+"%</span></div>";
      } else {
        var html_str ="<div class='measure-group'><div class='result no'>Yes: "+Math.round(+measurevar["Yes"]/total*1000)/10+"% <span class='noresult'><i class='fa fa-check-circle-o' aria-hidden='true'></i><span class='no-class'>No: "+Math.round(+measurevar["No"]/total*1000)/10+"%</span></span></div>";
      }
    } else {
      var html_str ="<div class='measure-group'><div class='result'>Yes: "+Math.round(+measurevar["Yes"]/total*1000)/10+"%<span class='no-class'>No: "+Math.round(+measurevar["No"]/total*1000)/10+"%</span></div>";
    }
    html_str = html_str+"<div class='precincts-nums'>"+formatthousands(measurevar.p)+"/"+formatthousands(measurevar.pt)+" precincts reporting</div>";
    if (measurevar.a && measurevar.a != "50% + 1") {
      if (measurevar.a == "Advisory") {
        html_str = html_str + "<div class='votes-req'>Advisory vote</div>"
      } else {
        html_str = html_str + "<div class='votes-req'>Vote requirement: "+measurevar.a+"</div>"
      }
    }
    html_str = html_str + "</div>";
    measureID.innerHTML = html_str;
  }
}
