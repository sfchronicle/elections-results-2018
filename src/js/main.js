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
var propsCAURL = "https://extras.sfgate.com/editorial/election2018primary/live/props_county_ca.json";
var localDataURL = "https://extras.sfgate.com/editorial/election2018primary/live/localresults.json";

// more data sources
var houseCAURL = "https://extras.sfgate.com/editorial/election2018primary/live/emma_house_district_ca.json";
var assemblyCAURL = "https://extras.sfgate.com/editorial/election2018primary/live/emma_assembly_district_id.json";
var senateCAURL = "https://extras.sfgate.com/editorial/election2018primary/live/emma_statesenate_district_ca.json";

// still needs integration
var senatecountiesURL = "https://extras.sfgate.com/editorial/election2018primary/live/emma_senate_county_ca.json";
var govURL = "https://extras.sfgate.com/editorial/election2018primary/live/governor_county_ca.json";
var caURL = "https://extras.sfgate.com/editorial/election2018primary/live/ca_summary.json";
var senateURL = "https://extras.sfgate.com/editorial/election2018primary/live/emma_statesenate_district_ca.json";

// state races
var state_lib = require("./staterace.js");
state_lib.StateRaces(caURL,"governor-race","governor","Governor");
state_lib.StateRaces(caURL,"lt-governor-race","ltgovernor","Lt. Governor");
state_lib.StateRaces(caURL,"sec-state-race","secstate","Secretary of State");
state_lib.StateRaces(caURL,"controller-race","controller","Controller");
state_lib.StateRaces(caURL,"treasurer-race","treasurer","Treasurer");
state_lib.StateRaces(caURL,"attorney-general-race","attygeneral","Attorney General");
state_lib.StateRaces(caURL,"insurance-commissioner-race","inscommisioner","Insurance Commissioner");
state_lib.StateRaces(caURL,"superintendent-race","superintendent","State superintendent of public instruction");
state_lib.StateRaces(caURL,"board-2-race","bofe2","Board of Equalization, District 2");
state_lib.StateRaces(caURL,"senate-race","senate","U.S. Senate");

// CA propositions map
var ca_props_lib_map = require("./CAprops_map.js");
ca_props_lib_map.CAPropsMap(propsCAURL);

// CA house map
var house_lib = require("./CAhouse.js");
house_lib.CAHouse(houseCAURL,"house-CA-map");

// CA assembly map
var assembly_lib = require("./CAassembly.js");
assembly_lib.CAAssembly(assemblyCAURL,"assembly-CA-map");

// CA senate map
var senate_lib = require("./CAsenate.js");
senate_lib.CASenate(senateCAURL,"senate-CA-map");

// SF mayor and races
var sf_lib = require("./sf.js");
sf_lib.SFRaces(localDataURL);

// CA propositions
var ca_props_lib_boxes = require("./CAprops_boxes.js");
ca_props_lib_boxes.CAPropsBoxes(propsCAURL);

// SF measures
var sf_measures_lib_boxes = require("./SFmeasures_boxes.js");
sf_measures_lib_boxes.SFmeasuresBoxes(localDataURL);

// Regional section
var regional_lib = require("./bayarea.js");
regional_lib.regionalSection(localDataURL);

// add sidebars to maps
var house_info = require("./populate_house.js");
house_info.CAmapList(houseCAURL,"scrolly-house-map");
house_info.CAmapList(senateCAURL,"scrolly-statesenate-map");
house_info.CAmapList(assemblyCAURL,"scrolly-assembly-map");

// -----------------------------------------------------------------------------
// filling in regional RR Prop
// -----------------------------------------------------------------------------
d3.json(localDataURL, function(localData){
  var RRPropData = localData["Special Districts"]["Measures"][0];
  var RRPropYes = localData["Special Districts"]["Measures"][0]['Yes'];
  var RRPropNo = localData["Special Districts"]["Measures"][0]['No'];

  var propID = document.getElementById('regionalpropR3');
  var total = +RRPropYes + +RRPropNo;
  var propResult = RRPropData;

  if (total == 0) { total = 0.1;}
  if (propResult.d == "Yes") {
    var htmlresult = "<span class='propyes small'><i class='fa fa-check-circle-o' aria-hidden='true'></i>Yes: "+Math.round(propResult["Yes"]/total*1000)/10+"%</span><span class='propno small'>No: "+Math.round(propResult["No"]/total*1000)/10+"%</span>"
  } else if (propResult.d == "No") {
    var htmlresult = "<span class='propyes small'>Yes: "+Math.round(propResult["Yes"]/total*1000)/10+"%</span><span class='propno small'><i class='fa fa-check-circle-o' aria-hidden='true'>No: "+Math.round(propResult["No"]/total*1000)/10+"%</i></span>"
  } else {
    var htmlresult = "<span class='propyes small'>Yes: "+Math.round(propResult["Yes"]/total*1000)/10+"%</span><span class='propno small'>No: "+Math.round(propResult["No"]/total*1000)/10+"%</span>"
  }
  var htmlresult = htmlresult+ "<div class='prop-precincts'>"+formatthousands(propResult.p)+" / "+formatthousands(propResult.pt)+" precincts reporting</div>"
  propID.innerHTML = htmlresult;
});

// -----------------------------------------------------------------------------
// filling in Persky Recall
// -----------------------------------------------------------------------------

d3.json(localDataURL, function(localData){
  var PerskyRecallData = localData["Santa Clara"]["County"][5];
  var PerskyRecallYes = localData["Santa Clara"]["County"][5]["Yes"];
  var PerskyRecallNo = localData["Santa Clara"]["County"][5]["No"];

  var propID = document.getElementById('perskyrecall');
  var total = +PerskyRecallYes + +PerskyRecallNo;
  var propResult = PerskyRecallData;

  if (total == 0) { total = 0.1;}
  if (propResult.d == "Yes") {
    var htmlresult = "<span class='propyes small'><i class='fa fa-check-circle-o' aria-hidden='true'></i>Yes: "+Math.round(propResult["Yes"]/total*1000)/10+"%</span><span class='propno small'>No: "+Math.round(propResult["No"]/total*1000)/10+"%</span>"
  } else if (propResult.d == "No") {
    var htmlresult = "<span class='propyes small'>Yes: "+Math.round(propResult["Yes"]/total*1000)/10+"%</span><span class='propno small'><i class='fa fa-check-circle-o' aria-hidden='true'>No: "+Math.round(propResult["No"]/total*1000)/10+"%</i></span>"
  } else {
    var htmlresult = "<span class='propyes small'>Yes: "+Math.round(propResult["Yes"]/total*1000)/10+"%</span><span class='propno small'>No: "+Math.round(propResult["No"]/total*1000)/10+"%</span>"
  }
  var htmlresult = htmlresult+ "<div class='prop-precincts'>"+formatthousands(propResult.p)+" / "+formatthousands(propResult.pt)+" precincts reporting</div>"
  propID.innerHTML = htmlresult;
});


// -----------------------------------------------------------------------------
// sticky nav
// -----------------------------------------------------------------------------

window.onscroll = function() {activate()};
var f = document.getElementById('f'),
  s = document.getElementById('s'),
  l = document.getElementById('l'),
  r = document.getElementById('r');
var scroll = [f, s, l, r]

function activate() {
  var sticker = document.getElementById('stick-me');
  var sticker_ph = document.getElementById('stick-ph');
  var window_top = document.body.scrollTop;
  var div_top = document.getElementById('stick-here').getBoundingClientRect().top + window_top;
  var ba_link = document.getElementById('r');

  if (window_top > div_top) {
      sticker.classList.add('fixed');
      sticker_ph.style.display = 'block'; // puts in a placeholder for where sticky used to be for smooth scrolling
      ba_link.classList.add('showme');

  } else {
      sticker.classList.remove('fixed');
      sticker_ph.style.display = 'none'; // removes placeholder
      ba_link.classList.remove('showme');
  }

  var fsec = document.getElementById('federal');
  var ssec = document.getElementById('state');
  var lsec = document.getElementById('sf');
  var rsec = document.getElementById('bayarea');

  var f_top = fsec.getBoundingClientRect().top + window_top - 40;
  var s_top = ssec.getBoundingClientRect().top + window_top - 40;
  var l_top = lsec.getBoundingClientRect().top + window_top - 40;
  var r_top = rsec.getBoundingClientRect().top + window_top - 40;

  var f_btm = fsec.getBoundingClientRect().bottom + window_top - 40;
  var s_btm = ssec.getBoundingClientRect().bottom + window_top - 40;
  var l_btm = lsec.getBoundingClientRect().bottom + window_top - 40;
  var r_btm = rsec.getBoundingClientRect().bottom + window_top - 40;

  var top = [f_top, s_top, l_top, r_top];
  var btm = [f_btm, s_btm, l_btm, r_btm];

  for (var i = 0; i < top.length; i++) {
    if ((top[i] < window_top) && (btm[i] > window_top)) {
      scroll[i].classList.add('activelink');
    }
    else {
      scroll[i].classList.remove('activelink');
    }
  }
}

if (screen.width <= 480){
  scrolloffsetvar = 30;
} else {
  scrolloffsetvar = 40;
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
    var pos = $(id).offset().top-scrolloffsetvar;
    // animated top scrolling
    $('body, html').animate({scrollTop: pos});
});

if (screen.width <= 480){
  document.getElementById("slink").innerHTML = "CA";
}
