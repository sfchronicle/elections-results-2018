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



// CA propositions
var ca_props_lib_boxes = require("./CAprops_boxes.js");
ca_props_lib_boxes.CAPropsBoxes(propsCAURL);

// CA propositions map
var ca_props_lib_map = require("./CAprops_map.js");
ca_props_lib_map.CAPropsMap(propsCAURL);

// SF measures
var sf_measures_lib_boxes = require("./SFmeasures_boxes.js");
sf_measures_lib_boxes.SFmeasuresBoxes(localDataURL);

// Regional section
var regional_lib = require("./bayarea.js");
regional_lib.regionalSection(localDataURL);


// sticky nav
window.onscroll = function() {activate()};
var s = document.getElementById('s'),
  l = document.getElementById('l'),
  r = document.getElementById('r');
var scroll = [s, l, r]

function activate() {
  var sticker = document.getElementById('stick-me');
  var sticker_ph = document.getElementById('stick-ph');
  var window_top = document.body.scrollTop;
  var div_top = document.getElementById('stick-here').getBoundingClientRect().top + window_top;

  if (window_top > div_top) {
      sticker.classList.add('fixed');
      sticker_ph.style.display = 'block'; // puts in a placeholder for where sticky used to be for smooth scrolling
  } else {
      sticker.classList.remove('fixed');
      sticker_ph.style.display = 'none'; // removes placeholder
  }

  var ssec = document.getElementById('state');
  var lsec = document.getElementById('sf');
  var rsec = document.getElementById('bayarea');

  var s_top = ssec.getBoundingClientRect().top + window_top - 40;
  var l_top = lsec.getBoundingClientRect().top + window_top - 40;
  var r_top = rsec.getBoundingClientRect().top + window_top - 40;

  var s_btm = ssec.getBoundingClientRect().bottom + window_top - 40;
  var l_btm = lsec.getBoundingClientRect().bottom + window_top - 40;
  var r_btm = rsec.getBoundingClientRect().bottom + window_top - 40;

  var top = [s_top, l_top, r_top];
  var btm = [s_btm, l_btm, r_btm];

  for (var i = 0; i < top.length; i++) {
    if ((top[i] < window_top) && (btm[i] > window_top)) {
      scroll[i].classList.add('activelink');
    }
    else {
      scroll[i].classList.remove('activelink');
    }
  }
}

// make sticky nav do smooth scrolling
$(document).on('click', 'a[href^="#"]', function(e) {
    // target element id
    var id = $(this).attr('href');
    // target element
    var $id = $(id);
    if ($id.length === 0) {
        return;
    }
    // prevent standard hash navigation (avoid blinking in IE)
    e.preventDefault();
    // top position relative to the document
    var pos = $(id).offset().top-30;
    // animated top scrolling
    $('body, html').animate({scrollTop: pos});
});
