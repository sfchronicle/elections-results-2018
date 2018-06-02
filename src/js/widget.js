var pollsTimer = setInterval(function () {

  var today = new Date(), //gets the browser's current time
  	electionDay = new Date("Jun 05 2018 20:00:00 GMT-0700"), //sets the countdown at 5pm
  	timeLeft = (electionDay.getTime() - today.getTime()),
  	hrsLeft = Math.floor((timeLeft / (1000 * 60 * 60)) % 24),
  	minsLeft = Math.floor((timeLeft / 1000 / 60) % 60),
  	secsLeft = Math.floor((timeLeft / 1000) % 60);

  if (Math.floor(electionDay.getTime()/1000) <= Math.floor(today.getTime()/1000)){
    clearInterval(pollsTimer);
    if(document.getElementById("links")){
      document.getElementById("links").innerHTML = (
        '<div class="link"><a href="https://projects.sfchronicle.com/2018/election-results" target="_blank" title="">Live Results</a></div>' +
        '<div class="link"><a href="https://www.sfchronicle.com/elections" target="_blank" title="">Live Chat</a></div>' +
        '<div class="link"><a href="https://www.sfchronicle.com/elections" target="_blank" title="">Election Coverage</a></div>'
      );
    }
    if(document.getElementById("page-links")){
      document.getElementById("page-links").innerHTML = (
        '<div class="link"><a href="https://projects.sfchronicle.com/2018/election-results" target="_blank" title="">Live Results</a></div>' +
        '<div class="link"><a href="https://www.sfchronicle.com/elections" target="_blank" title="">Live Chat</a></div>'
      );
    }

  }else{
    document.getElementById('countdown').style.display = "block";
    document.getElementById("countdown-header").innerHTML = (
    "<div class='time'><div class='hours'>"   +  hrsLeft   + "</div><div class='text'>HOURS</span></div></div>" + 
    "<div class='time'><div class='minutes'>" +  minsLeft  + "</div><div class='text'>MINUTES</span></div></div>" +
    "<div class='time'><div class='seconds'>" +  secsLeft  + "</div><div class='text'>SECONDS</span></div></div>"
    );
  }

}, 1000);