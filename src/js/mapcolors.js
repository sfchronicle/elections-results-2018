// function for tooltip
var d3 = require('d3');
var formatthousands = d3.format("0,000");

// initialize colors
var red = "#BC1826";//"#BE3434";//"#D91E36";//"#A41A1A";//"#8A0000";//"#F04646";
var blue = "#265B9B";//"#194E8E";//"#315A8C";//"#004366";//"#62A9CC";
var light_blue = "#598ECE";
var green = "#487F75";//"#2E655B";
var purple = "#69586B";
var orange = "#DE8067";
var yellow = "#FFCC32";//"#6790B7";//"#EB8F6A";//"#FFFF65";//"#FFCC32";
var yes_map = '#61988E';//"#705A91";//"#1D75AF";//"#6C85A5";//"#FFE599";
var no_map = '#EB8F6A';//"#FFDB89";//"#EAE667";//"#D13D59";//"#6790B7";
var undecided_map = "#8C8C8C";//"#b2b2b2";//"#EB8F6A";//"#FFFF65";
var dark_gray = "#8C8C8C";
var light_gray = "#b2b2b2";
var lightest_gray = "#D8D8D8";

// function for shading colors
function shadeColor2(color, percent) {
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}

module.exports = {

  // function for shading colors
  ShadeColor: function(color, percent) {
      var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
      return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
  },

  colorPartialResults: function(tempvar,properties){

      Array.prototype.max = function() {
        return Math.max.apply(null, this);
      };
      var count = 1; var sum = 0;
      var list = [];
      while (tempvar["c"+count]) {
        var element = +tempvar["c"+count];
        sum += element;
        list.push(+tempvar["c"+count]);
        count++;
      }
      var winner = list.max();
      if (winner == 0) {
        return dark_gray;
      } else {
        var count = 1;
        while (tempvar["c"+count]) {
          if (+tempvar["c"+count] == winner){
            if (tempvar["c"+count+"_party"] == "Dem"){
              return shadeColor2(blue,0.5);
              // return "green";
            } else if (tempvar["c"+count+"_party"] == "GOP") {
              return shadeColor2(red,0.5);
              // return red;
              // return "green";
            } else {
              return shadeColor2(yellow,0.5);
              // return "green";;
            }
          }
          count++;
        }
      }
    },

    // function for coloring map
    codeMap: function(tempvar,properties){
      if (tempvar.r) {
        if (+tempvar.r["Yes"] > +tempvar.r["No"]) {
          return yes_map;
        } else if (+tempvar.r["Yes"] < +tempvar.r["No"]){
          return no_map;
        } else {
          return undecided_map;
        }
      }
      var count = 1;
      while (tempvar["c"+count]) {
        if (tempvar["c"+count+"_name"] == tempvar.d) {
          if (tempvar["c"+count+"_party"] == "Dem") {
            return blue;
          } else if (tempvar["c"+count+"_party"] == "GOP") {
            return red;
          } else {
            return yellow;
          }
        }
        count++;
      }
    },

    // color counties on map
    codeCounty: function(tempvar,properties){
      Array.prototype.max = function() {
        return Math.max.apply(null, this);
      };
      var count = 1; var sum = 0;
      var list = [];
      while (tempvar["c"+count]) {
        var element = +tempvar["c"+count];
        sum += element;
        list.push(+tempvar["c"+count]);
        count++;
      }
      var winner = list.max();
      if (winner == 0) {
        return dark_gray;
      } else {
        var count = 1;
        while (tempvar["c"+count]) {
          if (+tempvar["c"+count] == winner){
            if (tempvar["c"+count+"_party"] == "Dem"){
              if (tempvar["c"+count+"_name"] == "Loretta Sanchez") {
                return light_blue;
              } else {
                return blue;
              }
            } else if (tempvar["c"+count+"_party"] == "GOP") {
              return red;
            } else {
              return yellow;
            }
          }
          count++;
        }
      }
    }

}
