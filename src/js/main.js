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

// CA propositions
var ca_props_lib_boxes = require("./CAprops_boxes.js");
ca_props_lib_boxes.CAPropsBoxes(propsCAURL);

// SF measures
var sf_measures_lib_boxes = require("./SFmeasures_boxes.js");
sf_measures_lib_boxes.SFmeasuresBoxes(localDataURL);
