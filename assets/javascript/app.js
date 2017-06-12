  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBr3DcT-O1TWO6BVQEoGDBZiPsfMsFCsPI",
    authDomain: "train-time-schedule-4bc92.firebaseapp.com",
    databaseURL: "https://train-time-schedule-4bc92.firebaseio.com",
    projectId: "train-time-schedule-4bc92",
    storageBucket: "train-time-schedule-4bc92.appspot.com",
    messagingSenderId: "590660664366"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // 2. Button for adding Train info
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#trainName").val().trim();
  var destination = $("#destination").val().trim();
  // var trainTime = moment($("#trainTime").val().trim(), "hh:mm").format("X");
  var frequency = $("#frequency").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    trName: trainName,
    dest: destination,
    trTime: trainTime,
    freq: frequency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.trainName);
  console.log(newTrain.destination);
  console.log(newTrain.trainTime);
  console.log(newTrain.frequency);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#trainName").val("");
  $("#destination").val("");
  $("#trainTime").val("");
  $("#frequency").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().start;
  var frequency = childSnapshot.val().frequency;

  // Employee Info
  console.log(trainName);
  console.log(destination);
  console.log(trainName);
  console.log(frequency);

  // Prettify the employee start
  // var empStartPretty = moment.unix(empStart).format("MM/DD/YY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
  console.log(empMonths);

  // Calculate the total billed rate
  var empBilled = empMonths * empRate;
  console.log(empBilled);

  // Add each train's data into the table
  $("#employee-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  empStartPretty + "</td><td>" + empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");
});
