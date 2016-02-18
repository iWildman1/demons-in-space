Parse.initialize("Vpxoii1PVC5UN5TtB3tCo74L5aBKJ2QN52bvxKHr", "UWzLmztcGnF1JjuBkz8WW0UYnY02M5PTDgtAFIka");

  if (Parse.User.current()) {
    window.location.replace("dashboard/index.html");
  } else {
    console.log("No user currently logged in");
  }
