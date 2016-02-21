Parse.initialize("Vpxoii1PVC5UN5TtB3tCo74L5aBKJ2QN52bvxKHr", "UWzLmztcGnF1JjuBkz8WW0UYnY02M5PTDgtAFIka");

var IPAddress;
votingEnabled = false;

$(document).ready(function() {
  $.ajax({
    url: "https://api.ipify.org?format=json",
    success: function(result) {
      IPAddress = result.ip;

      if (IPAddress === undefined) {
        votingEnabled = false;
        console.log("Failed to obtain IP Address. Voting disabled.")
      }
    },
    error: function() {
      console.log("Failed to retrieve IP. Voting disabled.");
      votingEnabled = false;
    }
  });
});

function addVote(teamName) {
  var Team = Parse.Object.extend("Teams");
  var Vote = Parse.Object.extend("Votes");

  var vote = new Vote();

  var query = new Parse.Query(Team);
  var teamId;
  var d = new Date();

  query.equalTo("teamName", teamName);

  query.find({
    success: function(results) {
      teamId = results[0].id;

      vote.set("teamName", results[0]);
      vote.set("expirationDate", d);
      vote.set("requestIP", IPAddress);

      if (votingEnabled) {
        votingEnabled = false;

        vote.save(null, {
          success: function(vote) {
            swal("Success!", "Your vote has been counted!", "success");
          },
          error: function(error) {
            swal("Woah there!", "You can only vote once every 15 minutes. Come back soon!", "error");
          }
        });
      } else {
        swal("Oh no!", "Voting is currently disabled. Please wait until the start of the event.", "error");
      }
    },
    error: function(error) {
      swal("Internal Error", "Please contact the administrator at dan-wildman@demon-media.net", "error");
    }
  });
};

$(document).ready(function() {
  $('form').submit(function(e) {

    // e.preventDefault();

    console.log("default prevented");

    // var loginInfo = $(this).serializeArray();
    // var username = loginInfo[0].value;
    // var password = loginInfo[1].value;
    //
    // console.log("Logging in with credentials " + username + " and " + password);

    // Parse.User.logIn(username, password, {
    //   success: function(user) {
    //     console.log("Logged in " + user + "successfully");
    //     window.location.replace("dashboard/index.html");
    //   },
    //   error: function() {
    //     console.log("Login failed.");
    //   }
    // })
  });
});

function performLogin(loginInfo) {
  var username = loginInfo[0].value;
  var password = loginInfo[1].value;

  console.log("Logging in with credentials " + username + " and " + password);

  Parse.User.logIn(username, password, {
    success: function(user) {
      console.log("Logged in " + user + "successfully");
      window.location.replace("dashboard/index.html");
    },
    error: function() {
      console.log("Login failed.");
    }
  })
}

function newHistoryPhase(phaseName) {
  var phaseData = [];
  var Teams = Parse.Object.extend("Teams");

  var teamQuery = new Parse.Query(Teams);

  teamQuery.descending("eventTotal");

  teamQuery.find({
    success: function(data) {
      for (var i = 0; i < data.length; i++) {
        var singleTeam = {
          'teamName': data[i].get("teamName"),
          'rank': i + 1
        }

        phaseData[i] = singleTeam;
      }

      saveHistoryBlock(phaseData, phaseName);
    },
    error: function() {
      console.log("Could not retrieve team data.");
    }
  })
}

function saveHistoryBlock(phaseData, phaseName) {
  var HistoryBlock = Parse.Object.extend("HistoryBlock");

  var historyBlock = new HistoryBlock;

  historyBlock.set("historyData", phaseData);
  historyBlock.set("phaseName", phaseName);

  historyBlock.save(null, {
    success: function(data) {
      console.log("Saved history info");
    },
    error: function() {
      console.log("Failed to save");
    }
  });
}

function getPhaseHistory(phaseName) {
  var HistoryBlock = Parse.Object.extend("HistoryBlock");

  var query = new Parse.Query(HistoryBlock);

  query.equalTo("phaseName", phaseName);

  query.find({
    success: function(data) {
      var history = data[0].get("historyData");
      output = "";

      for (var i = 0; i < history.length; i++) {
        output += '<tr><td class="v-align-middle "><p>' + history[i].rank + '</p></td><td class="v-align-middle"><p>' + history[i].teamName + '</p></td></tr>'
      }

      $('#votingTableBody').html(output);
    },
    error: function() {
      console.log("An error has occurred whilst finding history");
    }
  })
}
