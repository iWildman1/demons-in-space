var currentUser = Parse.User.current();

if (currentUser) {
  console.log("User logged in.");
} else {
  window.location.replace("../index.html");
}

$(document).ready(function() {
  $("#adminUserName").html(currentUser.getUsername());
  $("#profilePicture").html('<img src="' + currentUser.get("profilePicture") + '" alt="" data-src="' + currentUser.get("profilePicture") + '" width="32" height="32">');

  getVotes();
});

function getVotes() {
  var Teams = Parse.Object.extend("Teams");
  var query = new Parse.Query(Teams);

  query.descending("eventTotal");

  query.find({
    success: function(data) {
      output = "";
      currentPosition = 1;

      for (var i = 0; i < data.length; i++) {
        output += '<tr><td class="v-align-middle"><div class="checkbox "><input type="checkbox" value="3" id="checkbox1"><label for="checkbox1"></label></div></td>';
        output += '<td class="v-align-middle"><p>' + currentPosition + '</p></td>';
        output += '<td class="v-align-middle"><p>' + data[i].get("teamName")  + '</td>';
        output += '<td class="v-align-middle"><p>' + data[i].get("sessionTotal") + '</p></td>';
        output += '<td class="v-align-middle"><p>' + data[i].get("eventTotal") + '</p></td></tr>';

        currentPosition++;
      }

      $("#dataContainer").html(output);
    },
    error: function() {
      console.log("Couldn't get teams");
    }
  })
}

function logOut() {
  Parse.User.logOut();

  window.location.replace("../index.html");
}
