
// -----------------------------------------------------------------------------
// STATE MAP ------------------------------------------------------------
// -----------------------------------------------------------------------------

var d3 = require('d3');
var topojson = require('topojson');

var formatthousands = d3.format("0,000");
var timer5minutes = 300000;

var lightest_gray = "#D8D8D8";

var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

// tooltip
var tooltip_function = require("./tooltip.js");

// colors
var colors_function = require("./mapcolors.js");

module.exports = {

  CASenate: function(senateCAURL,senateID){

      d3.json(senateCAURL, function(senateCA){

          var path = d3.geo.path()
            .projection(null);

          function camap_insets_function(active_map,active_data,flag) {

            d3.select("#"+senateID).select("svg").remove();
            d3.select("#"+senateID).select(".svg-container").remove();

            var zoom = 0;
            var width = 860;
            var height = 530;

            // CA map by county
            var svgCACounties = d3.select("#"+senateID)
              .append("div")
              .classed("svg-container", true) //container class to make it responsive
              .attr("id",senateID)
              .append("svg")
              //responsive SVG needs these 2 attributes and no width and height attr
              .attr("preserveAspectRatio", "xMinYMin slice")
              .attr("viewBox", "50 0 860 530")
              //class to make it responsive
              .classed("svg-content-responsive", true);

            d3.json(active_map, function(error, us) {
              if (error) throw error;

              var features = topojson.feature(us,us.objects.features).features;
              svgCACounties.selectAll(".states")
              .data(topojson.feature(us, us.objects.features).features).enter()
              .append("path")
              .attr("class", "states")
              .attr("d",path)
              .attr("id",function(d) {
                return "statesenate_id"+d.id;
              })
              .style("fill", function(d) {
                var location = d.id;
                if (d.id == 0) {
                  return "#fff";
                } else if (active_data[String(location)]) {
                  var tempvar = active_data[String(location)];
                  if (tempvar.r || tempvar.d) {
                    var new_color = colors_function.codeMap(tempvar,d.properties);
                    return new_color;
                  } else if (flag == 1) {
                    var new_color = code_county(tempvar,d.properties);
                    return new_color;
                  } else {
                    var new_color = colors_function.colorPartialResults(tempvar,d.properties);
                    return new_color;
                  }
                } else {
                  return lightest_gray;//fill(path.area(d));
                }
              })
              .attr("d", path)
              .on("click",function(d,index){
                var sidebarinfo = "scrollystatesenate"+this.id.split("id")[1];
                if (document.getElementById(sidebarinfo) !== null){
                  // this.classList.toggle("unzoomed");
                  var k,x,y;
                  if (zoom == 1) {
                    k = 1, x = width / 2, y = height / 2, zoom = 0;
                  } else {
                    k = 2;
                    var centroid = path.centroid(d);
                    x = centroid[0]/k;
                    y = centroid[1]/k;
                    zoom = 1;
                  }
                  $(".states").removeClass("active");
                  $(".map-entry").removeClass("active");
                  this.classList.add("active");
                  document.getElementById(sidebarinfo).classList.add("active");
                  document.getElementById("scrolly-statesenate-map").scrollTop = document.getElementById(sidebarinfo).offsetTop-document.getElementById("scrolly-statesenate-map").offsetTop;
                  if (!is_safari) {
                    svgCACounties.transition().duration(750).attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")");
                  } else {
                    var str = "translate(" + width / 2 + "px, " + height / 2 + "px) scale(" + k + ") translate(" + -x + "px, " + -y + "px)";
                    document.getElementById("svgID").classList.add("easing-class");
                    document.getElementById("svgID").style.webkitTransform = str;
                  }
                }
              })

            });


          };

          camap_insets_function("./assets/maps/ca_statesenate_insets.json",senateCA,0);
          catimer_races = setInterval(function() {
            camap_insets_function("./assets/maps/ca_statesenate_insets.json",senateCA,0);
            console.log("refresh ca insets map");
          }, timer5minutes);

      });

  }
}
