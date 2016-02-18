Parse.initialize("Vpxoii1PVC5UN5TtB3tCo74L5aBKJ2QN52bvxKHr", "UWzLmztcGnF1JjuBkz8WW0UYnY02M5PTDgtAFIka");

  if (Parse.User.current()) {
    console.log("User authorised");
  } else {
    window.location.replace("../index.html");
  }

$(document).ready(function() {
  $('#adminUserName').html(Parse.User.current().getUsername());
});

var Teams = Parse.Object.extend("Teams");
var query = new Parse.Query(Teams);

query.descending("eventTotal");

query.find({
  success: function(data) {
    output = "";
    currentPosition = 1;

    for (var i = 0; i < data.length; i++) {
      output += "<tr><td>" + currentPosition + "</td><td>" + data[i].get("teamName") + '</td><td>' + data[i].get("eventTotal") + '</td></td>';

      currentPosition++;
    }

    $("#teamOutput").html(output);
    $('#teamCounter').html(data.length + " teams remaining");
  },
  error: function() {
    console.log("Couldn't get teams");
  }
})
