// -----------------------------------------------------------------------------
// filling in state propositions results ---------------------------------------
// -----------------------------------------------------------------------------

module.exports = {

  CAPropsBoxes: function(propsCA){
    console.log("CAprops boxes");

    for (var propidx=68; propidx<73; propidx++) {
      var propID = document.getElementById("prop"+propidx);
      // FIX THIS WHEN WE HAVE REAL DATA NOT FAKE DATA!-----------------------------------------------
      var propResult = propsCA[propidx-5]["state"];
      // FIX THIS WHEN WE HAVE REAL DATA NOT FAKE DATA!-----------------------------------------------
      var total = +propResult.r["Yes"]+ +propResult.r["No"];
      if (total == 0) { total = 0.1;}
      if (propResult.d == "Yes") {
        var htmlresult = "<span class='propyes yesresult'><i class='fa fa-check-circle-o' aria-hidden='true'></i>Yes: "+Math.round(propResult.r["Yes"]/total*1000)/10+"%</span><span class='propno'>No: "+Math.round(propResult.r["No"]/total*1000)/10+"%</span>"
      } else if (propResult.d == "No") {
        var htmlresult = "<span class='propyes'>Yes: "+Math.round(propResult.r["Yes"]/total*1000)/10+"%</span><span class='propno noresult'><i class='fa fa-times-circle-o' aria-hidden='true'></i>No: "+Math.round(propResult.r["No"]/total*1000)/10+"%</span>"
      } else {
        var htmlresult = "<span class='propyes'>Yes: "+Math.round(propResult.r["Yes"]/total*1000)/10+"%</span><span class='propno'>No: "+Math.round(propResult.r["No"]/total*1000)/10+"%</span>"
      }
      var htmlresult = htmlresult+ "<div class='prop-precincts'>"+formatthousands(propResult.p)+" / 24,849 precincts reporting</div>"
      propID.innerHTML = htmlresult;
    }

  }

}
