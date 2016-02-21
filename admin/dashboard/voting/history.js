$(document).ready(function() {
  changeTitle();

  $("#phaseSelector").change(function() {
    changeTitle();
  });
});

function changeTitle() {
  var phaseName = $("#phaseSelector").val();

  if (phaseName === "nodata") {
    $("#votingTableTitle").html("There is no current history session.");
    clearTable();
  } else {
    $("#votingTableTitle").html("Showing voting history from " + phaseName);
    getPhaseHistory(phaseName);
  };
}

function clearTable() {
  $("#votingRank").html("");
  $("#votingName").html("");
}
