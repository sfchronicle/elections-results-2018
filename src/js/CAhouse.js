
// -----------------------------------------------------------------------------
// STATE MAP ------------------------------------------------------------
// -----------------------------------------------------------------------------

var d3 = require('d3');
var topojson = require('topojson');

var maxZoom = 7;

var formatthousands = d3.format("0,000");
var timer5minutes = 300000;

// initialize color
var lightest_gray = "#D8D8D8";


var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

// colors
var colors_function = require("./mapcolors.js");

// tooltip
var tooltip_function = require("./tooltip.js");

module.exports = {

  CAHouse: function(houseCAURL,houseID){

      d3.json(houseCAURL, function(houseCA){

          var path = d3.geo.path()
            .projection(null);

          function camap_insets_function(active_map,active_data,flag) {

            d3.select("#"+houseID).select("svg").remove();
            d3.select("#"+houseID).select(".svg-container").remove();

            var zoom = 0;
            var dont_unzoom = 0;
            var width = 860;
            var height = 530;

            // CA map by county
            var svgCACounties = d3.select("#"+houseID)
              .append("div")
              .classed("svg-container", true) //container class to make it responsive
              .attr("house-id",houseID)
              .append("svg")
                .attr("id","svgIDhouse")
              //responsive SVG needs these 2 attributes and no width and height attr
              .attr("preserveAspectRatio", "xMinYMin slice")
              .attr("viewBox", "50 0 860 530")
              //class to make it responsive
              .classed("svg-content-responsive", true);

            var containerwidth = document.getElementById("svgIDhouse").getBoundingClientRect().width;
            var scale2 = containerwidth/width;

            d3.json(active_map, function(error, us) {
              if (error) throw error;

              var features = topojson.feature(us,us.objects.features).features;
              svgCACounties.selectAll(".states")
                .data(topojson.feature(us, us.objects.features).features).enter()
                .append("path")
                .attr("class", "states unzoomed")
                .attr("d",path)
                .attr("id",function(d) {
                  return "house_id"+d.id;
                })
                .style("fill", function(d) {
                  var location = d.id;
                  if (d.id == 0) {
                    return "#fff";
                  } else if (active_data[String(location)]) {
                    if (location == "0604" || location == "0610" || location == "0621" || location == "0625" || location == "0639" || location == "0645" || location == "0648" || location == "0649" || location == "0650"){
                      return "#BC1826";
                    } else if (location == "0607"){
                      return "#265B9B";
                    }
                    return "#93A5A0";
                  } else {
                    return lightest_gray;//fill(path.area(d));
                  }
                })
                .attr("d", path)
                .on("click",function(d,index){

                  var sidebarinfo = "scrollyhouse"+this.id.split("id0")[1];
                  dontzoom = 0;

                  var bounds = path.bounds(d),
                       dx = bounds[1][0] - bounds[0][0],
                       dy = bounds[1][1] - bounds[0][1],
                       scale = Math.min(.6 / Math.max(dx / width, dy / height),maxZoom),
                       centroid = path.centroid(d),
                       x = centroid[0],
                       y = centroid[1];

                  var translate = [scale2*(width/2 - x + 50)*scale, scale2*(height/2 - y)*scale];

                  if (!is_safari){
                      svgCACounties.transition()
                      // .duration(0)
                      // .attr("transform","scale(1)translate(0,0)")
                      // .transition()
                      .duration(750)
                      .attr("transform","translate("+translate+")scale("+scale+")");
                   } else {
                      document.getElementById("svgIDhouse").classList.add("easing-class");
                      document.getElementById("svgIDhouse").style.webkitTransform = "translate("+translate[0]+"px,"+translate[1]+"px) scale("+scale+")";
                   }

                  $(".states").removeClass("active");
                  $(".map-entry").removeClass("active");
                  this.classList.add("active");
                  document.getElementById(sidebarinfo).classList.add("active");
                  document.getElementById("scrolly-house-map").scrollTop = document.getElementById(sidebarinfo).offsetTop-document.getElementById("scrolly-house-map").offsetTop;

                  zoom = 1;
                  dont_unzoom = 1;
                })

            });

            function unZoomMap(){
              console.log("unzoom function");
              console.log(zoom);
              console.log(dont_unzoom);
              if (zoom === 1 && dont_unzoom === 0){
                $(".states").removeClass("active");
                $(".map-entry").removeClass("active");
                if (!is_safari) {
                  svgCACounties.transition()
                  .duration(750)
                  .attr("transform","scale(1)translate(0,0)")
                } else {
                  var str = "translate(0px,0px) scale(1)";
                  document.getElementById("svgIDhouse").classList.add("easing-class");
                  document.getElementById("svgIDhouse").style.webkitTransform = str;
                }
                zoom = 0;
              }
              dont_unzoom = 0;
            }

            document.getElementById("svgIDhouse").addEventListener("click",function(){
              unZoomMap();
            });
            document.getElementById("resethousemap").addEventListener("click",function(){
              zoom = 1;
              dont_unzoom = 0;
              unZoomMap();
            });

          };

          camap_insets_function("./assets/maps/ca_house_insets.json",houseCA,0);
          // catimer_races = setInterval(function() {
          //   camap_insets_function("./assets/maps/ca_house_insets.json",houseCA,0);
          //   console.log("refresh ca insets map");
          // }, timer5minutes);

      });

  }
}
