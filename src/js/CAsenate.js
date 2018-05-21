
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
              // .attr("id",function(d) {
              //   return "id"+parseInt(d.id);
              // })
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
              .attr("d", path);
              // .on('mouseover', function(d,index) {
              //   if (d.id != 0) {
              //     var html_str = tooltip_function.tooltipGenerator(d.id,active_data,d.properties);
              //     state_tooltip.html(html_str);
              //     if (!iOS){
              //       state_tooltip.style("visibility", "visible");
              //     }
              //   }
              // })
              // .on("mousemove", function() {
              //   if (screen.width <= 480) {
              //     return state_tooltip
              //       .style("top",(d3.event.pageY+10)+"px")//(d3.event.pageY+40)+"px")
              //       .style("left",((d3.event.pageX)/3+40)+"px");
              //   } else if (screen.width <= 670) {
              //     return state_tooltip
              //       .style("top",(d3.event.pageY+10)+"px")//(d3.event.pageY+40)+"px")
              //       .style("left",((d3.event.pageX)/2+50)+"px");
              //   } else {
              //     return state_tooltip
              //       .style("top", (d3.event.pageY+20)+"px")
              //       .style("left",(d3.event.pageX-80)+"px");
              //   }
              // })
              // .on("mouseout", function(){
              //   return state_tooltip.style("visibility", "hidden");
              // });

            });

            // show tooltip
            // var state_tooltip = d3.select("#"+senateID)
            //   .append("div")
            //   .attr("class","tooltip")
            //   .style("position", "absolute")
            //   .style("z-index", "10")
            //   .style("visibility", "hidden");

          };

          camap_insets_function("./assets/maps/ca_statesenate_insets.json",senateCA,0);
          catimer_races = setInterval(function() {
            camap_insets_function("./assets/maps/ca_statesenate_insets.json",senateCA,0);
            console.log("refresh ca insets map");
          }, timer5minutes);

      });

  }
}
