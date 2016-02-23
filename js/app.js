$(document).foundation();

function loadVirgin() {
  window.location.href = 'http://uk.virginmoneygiving.com/fundraiser-web/fundraiser/showFundraiserPage.action;jsessionid=Zp3HBmKvofOJyhDAiDzbc5EG.lgvappprod1:server-one?userUrl=demonmedia&faId=665073&isTeam=true';
}

function listenLive() {
  window.location.href = 'http://www.demonfm.co.uk/listen';
}

var deadline = new Date('2016-02-23T11:00:00');

function getTimeRemaining(deadline) {
  var t = Date.parse(deadline) - Date.parse(new Date());

  var seconds = Math.floor((t/1000) % 60);
  var minutes = Math.floor((t/1000/60) % 60);
  var hours = Math.floor((t/(1000*60*60)) % 24);
  var days = Math.floor( t/(1000*60*60*24) );

  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function updateTime() {
  var data = getTimeRemaining(deadline);

  $("#counterDays").html(data.days);
  $("#counterHours").html(data.hours);
  $("#counterMinutes").html(data.minutes);
  $("#counterSeconds").html(data.seconds);

  if ((data.hours == 0 && data.minutes <= 15) && $('#trasmission-title').html() != 'Transmission incoming...') {
    $('#tranmission-title').html("Transmission incoming...");
  }
}

updateTime();

setInterval(updateTime, 1000);
