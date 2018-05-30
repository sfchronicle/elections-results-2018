// -----------------------------------------------------------------------------
// STATE MAP PROPOSITIONS ------------------------------------------------------
// -----------------------------------------------------------------------------

var d3 = require('d3');
var topojson = require('topojson');

var formatthousands = d3.format("0,000");
var timer5minutes = 300000;
var yes_map = '#61988E';
var no_map = '#EB8F6A';
var undecided_map = "#8C8C8C";

var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

// function for coloring map
function code_map_variable(tempvar,properties){
  if (tempvar.r) {
    if (+tempvar.r["Yes"] > +tempvar.r["No"]) {
      return yes_map;
    } else if (+tempvar.r["Yes"] < +tempvar.r["No"]){
      return no_map;
    } else {
      return undecided_map;
    }
  }
}

// tooltip
var tooltip_function = require("./tooltip.js");

module.exports = {

  CAPropsMap: function(propsCAURL){

    d3.json(propsCAURL, function(propsCA){

      var inner_tooltip = d3.select("#camap-props-inner-tooltip");
      var tooltip = document.getElementById("camap-props-tooltip");
      var d3tooltip = d3.select("#camap-props-tooltip");
      var map_body = document.getElementById("map-container-state-props");

      var select_race = document.getElementById("select-race");
      select_race.addEventListener("change",function(){
        d3.selectAll(".camap").classed("active",false);
        this.classList.add("active");
        var active_data = propsCA[select_race.value];
        camap_function("./assets/maps/ca_county_new.json",active_data.counties);
      });

      var path = d3.geo.path()
        .projection(null);

      // event listeners for props
      var qsa = s => Array.prototype.slice.call(document.querySelectorAll(s));
      qsa(".camapprop").forEach(function(group,index) {
        group.addEventListener("click", function(e) {
          d3.selectAll(".camap").classed("active",false);
          this.classList.add("active");
          var active_data = propsCA[68+index];
          camap_function("./assets/maps/ca_county_new.json",active_data.counties);
          clearTimeout(catimer_props);
          catimer_props = setInterval(function() {
            camap_function("./assets/maps/ca_county_new.json",active_data.counties);
            console.log("refresh ca map");
          }, timer5minutes);
        });
      });

      function camap_function(active_map,active_data,flag) {

        d3.select("#map-container-state-props").select("svg").remove();
        d3.select("#map-container-state-props").select(".svg-container").remove();

        // CA map by county
        var svgCACounties = d3.select("#map-container-state-props")
          .append("div")
          .classed("svg-container", true) //container class to make it responsive
          .attr("id","map-container-state-props")
          .append("svg")
          //responsive SVG needs these 2 attributes and no width and height attr
          .attr("preserveAspectRatio", "xMinYMin slice")
          .attr("viewBox", "245 0 475 530")
          //class to make it responsive
          .classed("svg-content-responsive", true);
          // .attr("id","states-props-svg");

        d3.json(active_map, function(error, us) {
          if (error) throw error;

          var features = topojson.feature(us,us.objects.features).features;
          svgCACounties.selectAll(".states")
          .data(topojson.feature(us, us.objects.features).features).enter()
          .append("path")
          .attr("class", "states")
          .attr("d",path)
          .style("fill", function(d) {
            var location = d.id;
            if (active_data[String(location)]) {
              var tempvar = active_data[String(location)];
              var new_color = code_map_variable(tempvar,d.properties);
              return new_color;
            }
          })
          .attr("d", path)
          .on('mouseover', function(d,index) {
            var html_str = tooltip_function.tooltipGenerator(d.id,active_data,d.properties);
            inner_tooltip.html(html_str);
            tooltip.classList.remove("hidden");
          })
          .on('click', function(d,index) {
            var html_str = tooltip_function.tooltipGenerator(d.id,active_data,d.properties);
            inner_tooltip.html(html_str);
            tooltip.classList.remove("hidden");
          })
          .on("mousemove", function() {
            // this is me being very clever
            // "offsetLeft" is the position of the mouse relative to the container div, aka "map-container-state"
            // "containerSize" is the size of the container div
            // the division is supposed to tell you if the mouse is on the right half or the left so you can flip the tooltip if needed
            var offsetLeft = d3.event.pageX - (document.getElementById("map-container-state-props").getBoundingClientRect().left + document.body.scrollLeft);
            var containerSize = document.getElementById("map-container-state-props").offsetWidth
            if (offsetLeft/containerSize > 0.5){
              return d3tooltip
                .style("top",(d3.event.pageY+10)+"px")//(d3.event.pageY+40)+"px")
                .style("left",((d3.event.pageX)-140)+"px");
            } else {
              return d3tooltip
                .style("top",(d3.event.pageY+10)+"px")//(d3.event.pageY+40)+"px")
                .style("left",((d3.event.pageX)-10)+"px");
            }
          })
          .on("mouseout", function(){
            // only mouseout on desktop
            if (screen.width >= 480){
              map_body.classList.remove("noclick");
              tooltip.classList.add("hidden");
            };
          });
        });

      };

      // close tooltip for mobile
      document.getElementById("camap-props-close-tooltip").addEventListener("click",function(){
        tooltip.classList.add("hidden");
        map_body.classList.remove("noclick");
      });

      // ERROR: CHANGE THIS WHEN THE DATA IS REAL----------------------------------
      var active_data = propsCA[68];
      // ERROR: CHANGE THIS WHEN THE DATA IS REAL----------------------------------
      camap_function("./assets/maps/ca_county_new.json",active_data.counties);
      catimer_props = setInterval(function() {
        camap_function("./assets/maps/ca_county_new.json",active_data.counties);
        console.log("refresh ca map");
      }, timer5minutes);

    });

  }
}
