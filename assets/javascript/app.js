$(document).ready(function() { 
 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyBGK1oImcXbAL8d3tk4OuL9Pp_zh9cIkQc",
  authDomain: "trainschedule-c2912.firebaseapp.com",
  databaseURL: "https://trainschedule-c2912.firebaseio.com",
  projectId: "trainschedule-c2912",
  storageBucket: "trainschedule-c2912.appspot.com",
  messagingSenderId: "332431472571"
  };
  firebase.initializeApp(config);


  // Create a variable to reference the database
var database = firebase.database();


$("#add-train").on("click", function (event) {
  event.preventDefault();

//captures input from form
var trainName= $("#train-name-input").val().trim();
var destination= $("#destination-input").val().trim();
var trainTime= $("#train-time-input").val().trim();
var frequency= $("#frequency-input").val().trim();



database.ref().push({
  name: trainName,
  destination: destination,
  firstTrainTime: trainTime,
  frequency: frequency,
  dateAdded: firebase.database.ServerValue.TIMESTAMP

});
});

database.ref().on("child_added", function(snapshot) {

  
var newTrainName = snapshot.val().name;
var newDestination = snapshot.val().destination;
var newTrainTime = snapshot.val().firstTrainTime;
var newFrequency= snapshot.val().frequency;

var currentTime= moment();


// First train time - a year is subtracted to make sure that the time is after the current time
var trainTimeConverted = moment(newTrainTime, "HH:mm").subtract(1, "years");

// Difference between the times
var timeDifference = moment().diff(moment(trainTimeConverted), "minutes");

// Time apart (remainder)
var timeRemainder = timeDifference % newFrequency;

// Minutes until next train
var minsAway = newFrequency - timeRemainder;

// Next Train Time
var nextTrain = moment().add(minsAway, "minutes");
nextTrain= moment(nextTrain).format("hh:mm");


$(".trainSchedule").append('<tr>\
<td>'+ newTrainName+'</td>\
<td>'+ newDestination + '</td>\
<td>' +newFrequency + '</td>\
<td>' + nextTrain + '</td>\
<td>' + minsAway + '</td\
</tr>');


// $(".trainSchedule").append('<td>' + newTrainName +'</td>');
  //Clears the input fields
  $("#train-name-input").val("");
	$("#destination-input").val("");
	$("#train-time-input").val("");
	$("#frequency-input").val("");
});


  //end of document.ready
});