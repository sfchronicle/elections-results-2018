
// -----------------------------------------------------------------------------
// STATE MAP ------------------------------------------------------------
// -----------------------------------------------------------------------------

var d3 = require('d3');
var topojson = require('topojson');

var formatthousands = d3.format("0,000");
var timer5minutes = 300000;

// initialize colors

var lightest_gray = "#D8D8D8";


var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

// colors
var colors_function = require("./mapcolors.js");

// tooltip
var tooltip_function = require("./tooltip.js");

module.exports = {

  CAAssembly: function(assemblyCAURL,assemblyID){

      d3.json(assemblyCAURL, function(assemblyCA){

          var path = d3.geo.path()
            .projection(null);

          function camap_insets_function(active_map,active_data,flag) {

            d3.select("#"+assemblyID).select("svg").remove();
            d3.select("#"+assemblyID).select(".svg-container").remove();

            // CA map by county
            var svgCACounties = d3.select("#"+assemblyID)
              .append("div")
              .classed("svg-container", true) //container class to make it responsive
              .attr("id",assemblyID)
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
                return "assembly_id"+d.id;
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
                    var new_color = colors_function.codeCounty(tempvar,d.properties);
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
                $(".states").removeClass("active");
                $(".map-entry").removeClass("active");
                this.classList.add("active");
                var sidebarinfo = "scrollyassembly"+this.id.split("id")[1];
                document.getElementById(sidebarinfo).classList.add("active");
                document.getElementById("scrolly-assembly-map").scrollTop = document.getElementById(sidebarinfo).offsetTop-document.getElementById("scrolly-assembly-map").offsetTop;
              })

            });

          };

          camap_insets_function("./assets/maps/ca_assembly.json",assemblyCA,0);
          catimer_races = setInterval(function() {
            camap_insets_function("./assets/maps/ca_assembly.json",assemblyCA,0);
            console.log("refresh ca insets map");
          }, timer5minutes);

      });

  }
}
