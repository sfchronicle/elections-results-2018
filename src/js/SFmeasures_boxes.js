// -----------------------------------------------------------------------------
// filling in sf measures results ---------------------------------------
// -----------------------------------------------------------------------------

var d3 = require('d3');
var formatthousands = d3.format("0,000");

module.exports = {

  SFmeasuresBoxes: function(localDataURL){

    d3.json(localDataURL, function(localData){

      for (var propidx=0; propidx<9; propidx++) {
        var propID = document.getElementById("sfprop"+propidx);
        var propResult = localData["San Francisco"]["Measures"][propidx];
        var htmlresult = "";
        var total = +propResult["Yes"]+ +propResult["No"];
        if (total == 0) { total = 0.1;}
        if (propResult.d == "Yes") {
          var htmlresult = "<span class='propyes yesresult'><i class='fa fa-check-circle-o' aria-hidden='true'></i>Yes: "+Math.round(propResult["Yes"]/total*1000)/10+"%</span><span class='propno'>No: "+Math.round(propResult["No"]/total*1000)/10+"%</span>"
        } else if (propResult.d == "No") {
          var htmlresult = "<span class='propyes'>Yes: "+Math.round(propResult["Yes"]/total*1000)/10+"%</span><span class='propno noresult'><i class='fa fa-times-circle-o' aria-hidden='true'></i>No: "+Math.round(propResult["No"]/total*1000)/10+"%</span>"
        } else {
          var htmlresult = "<span class='propyes'>Yes: "+Math.round(propResult["Yes"]/total*1000)/10+"%</span><span class='propno'>No: "+Math.round(propResult["No"]/total*1000)/10+"%</span>"
        }
        var htmlresult = htmlresult+ "<div class='prop-precincts'>"+formatthousands(propResult.p)+" / "+formatthousands(propResult.pt)+" precincts reporting</div>"
        if (propResult.a != "50% + 1"){
          htmlresult = htmlresult + "<div class='prop-precincts'>Vote requirement: "+propResult.a+"</div>";
        }

        propID.innerHTML = htmlresult;
      }
    });

  }

}
