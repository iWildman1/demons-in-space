Parse.initialize("Vpxoii1PVC5UN5TtB3tCo74L5aBKJ2QN52bvxKHr", "UWzLmztcGnF1JjuBkz8WW0UYnY02M5PTDgtAFIka");

var IPAddress;
votingEnabled = false;

$(document).ready(function() {
  $.ajax({
    url: "https://api.ipify.org?format=json",
    success: function(result) {
      IPAddress = result.ip;
      votingEnabled = false;
    },
    error: function() {
      console.log("Failed to retrieve IP. Voting disabled.");
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
            swal("Something went wrong", "Either you have already voted, or an eviction is taking place. Please try again later", "error");
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
