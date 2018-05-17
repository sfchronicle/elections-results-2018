var d3 = require('d3');
var topojson = require('topojson');
require("./lib/social");

// initialize colors
var red = "#BC1826";
var blue = "#265B9B";
var light_blue = "#598ECE";
var green = "#487F75";
var purple = "#69586B";
var orange = "#DE8067";
var yellow = "#FFCC32";
var yes_map = '#61988E';
var no_map = '#EB8F6A';
var undecided_map = "#8C8C8C";
var dark_gray = "#8C8C8C";
var light_gray = "#b2b2b2";
var lightest_gray = "#D8D8D8";

// helpful functions:
var formatthousands = d3.format("0,000");

// loading data sources
var propsCAURL = "http://extras.sfgate.com/editorial/election2016/live/props_county_ca.json";
var localDataURL = "http://extras.sfgate.com/editorial/election2018primary/live/localresults.json";

// this is a test function, pay no attention
// var testVar = require("./test.js");
// console.log(testVar.myFunc());

// this is a more complicated thing than the boxes, also pay no attention
// var catimer_props;
// var ca_props_lib = require("./CAprops.js");
// ca_props_lib.CAPropsLib;

// this is where I was trying to call the function to put in state propositions data in the boxes
var ca_props_lib_boxes = require("./CAprops_boxes.js");
d3.json(propsCAURL,ca_props_lib_boxes.CAPropsBoxes(propsCA));

// THIS IS THE FUNCTION I WAS TRYING TO CALL FROM "CAprops_boxes.js":
// d3.json(propsCAURL, function(propsCA){
//   for (var propidx=68; propidx<73; propidx++) {
//     var propID = document.getElementById("prop"+propidx);
//     // FIX THIS WHEN WE HAVE REAL DATA NOT FAKE DATA!-----------------------------------------------
//     var propResult = propsCA[propidx-5]["state"];
//     // FIX THIS WHEN WE HAVE REAL DATA NOT FAKE DATA!-----------------------------------------------
//     var total = +propResult.r["Yes"]+ +propResult.r["No"];
//     if (total == 0) { total = 0.1;}
//     if (propResult.d == "Yes") {
//       var htmlresult = "<span class='propyes yesresult'><i class='fa fa-check-circle-o' aria-hidden='true'></i>Yes: "+Math.round(propResult.r["Yes"]/total*1000)/10+"%</span><span class='propno'>No: "+Math.round(propResult.r["No"]/total*1000)/10+"%</span>"
//     } else if (propResult.d == "No") {
//       var htmlresult = "<span class='propyes'>Yes: "+Math.round(propResult.r["Yes"]/total*1000)/10+"%</span><span class='propno noresult'><i class='fa fa-times-circle-o' aria-hidden='true'></i>No: "+Math.round(propResult.r["No"]/total*1000)/10+"%</span>"
//     } else {
//       var htmlresult = "<span class='propyes'>Yes: "+Math.round(propResult.r["Yes"]/total*1000)/10+"%</span><span class='propno'>No: "+Math.round(propResult.r["No"]/total*1000)/10+"%</span>"
//     }
//     var htmlresult = htmlresult+ "<div class='prop-precincts'>"+formatthousands(propResult.p)+" / 24,849 precincts reporting</div>"
//     propID.innerHTML = htmlresult;
//   }
// });
