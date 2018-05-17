// -----------------------------------------------------------------------------
// STATE MAP PROPOSITIONS ------------------------------------------------------
// -----------------------------------------------------------------------------

module.exports = {

  CAPropsLib: function(){
    console.log("test");

    d3.json(propsCAURL, function(propsCA){

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
          var active_data = propsCA[51+index];
          camap_function("./assets/maps/ca_county_new.json",active_data.counties);
          clearTimeout(catimer_props);
          catimer_props = setInterval(function() {
            camap_function("./assets/maps/ca_county_new.json",active_data.counties);
            console.log("refresh ca map");
          }, timer5minutes);
          // camap("./assets/maps/ca_county_new.json",active_data.counties);
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
            var html_str = tooltip_function(d.id,active_data,d.properties);
            prop_tooltip.html(html_str);
            if (!iOS){
              prop_tooltip.style("visibility", "visible");
            }
          })
          .on("mousemove", function() {
            if (screen.width <= 480) {
              return prop_tooltip
                .style("top",(d3.event.pageY+10)+"px")//(d3.event.pageY+40)+"px")
                .style("left",((d3.event.pageX)/3+40)+"px");
            } else if (screen.width <= 670) {
              return prop_tooltip
                .style("top",(d3.event.pageY+10)+"px")//(d3.event.pageY+40)+"px")
                .style("left",((d3.event.pageX)/2+50)+"px");
            } else {
              return prop_tooltip
                .style("top", (d3.event.pageY+20)+"px")
                .style("left",(d3.event.pageX-80)+"px");
            }
          })
          .on("mouseout", function(){
            return prop_tooltip.style("visibility", "hidden");
          });
        });

        // show tooltip
        var prop_tooltip = d3.select("#map-container-state-props")
        .append("div")
        .attr("class","tooltip")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
      };

      var active_data = propsCA[51];
      camap_function("./assets/maps/ca_county_new.json",active_data.counties);
      catimer_props = setInterval(function() {
        camap_function("./assets/maps/ca_county_new.json",active_data.counties);
        console.log("refresh ca map");
      }, timer5minutes);
      // camap("./assets/maps/ca_county_new.json",active_data.counties);

    });

  }
}
