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
  var trainName = $("#theTrainName").val().trim();
  var destination = $("#theDestination").val().trim();
  // var trainTime = moment($("#trainTime").val().trim(), "hh:mm").format("X");
  var frequency = $("#theFrequency").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    trainName: trainName,
    destination: destination,
    // trainTime: trainTime,
    frequency: frequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.trainName);
  console.log(newTrain.destination);
  // console.log(newTrain.trainTime);
  console.log(newTrain.frequency);


  // Clears all of the text-boxes
  $("#theTrainName").val("");
  $("#theDestination").val("");
  // $("#theTrainTime").val("");
  $("#theFrequency").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());
  console.log(prevChildKey);
  // Store everything into a variable.
  var trainName = childSnapshot.val().trainName;
  var destination = childSnapshot.val().destination;
  // var trainTime = childSnapshot.val().start;
  var frequency = childSnapshot.val().frequency;

  // train Info
  console.log(trainName);
  console.log(destination);
  // console.log(trainTime);
  console.log(frequency);

  
  // var empStartPretty = moment.unix(empStart).format("MM/DD/YY");

  
  // To calculate the time till next train 
  // var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
  // console.log(empMonths);

  // Calculate the total billed rate
  // var empBilled = empMonths * empRate;
  // console.log(empBilled);

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>");
});
