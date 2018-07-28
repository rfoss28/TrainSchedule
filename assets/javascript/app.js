$(document).ready(function() { 
 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyBGK1oImcXbAL8d3tk4OuL9Pp_zh9cIkQc",
    authDomain: "trainschedule-c2912.firebaseapp.com",
    databaseURL: "https://trainschedule-c2912.firebaseio.com",
    projectId: "trainschedule-c2912",
    storageBucket: "",
    messagingSenderId: "332431472571"
  };
  firebase.initializeApp(config);


  // Create a variable to reference the database
var database = firebase.database();


$("#addTrain").on("click", function (event) {
  event.preventDefault();

//captures input from form
var trainName= $("#train-name-input").val().trim();
var destination= $("#destination-input").val().trim();
var firstTrainTime= $("#train-time-input").val().trim();
var frequency= $("#frequency-input").val().trim();


console.log(trainName);
console.log(destination);
console.log(firstTrainTime);
console.log(frequency);

database.ref.push()({
  name: trainName,
  destination: destination,
  firstTrainTime: firstTrainTime,
  frequency: frequency

});
});

database.ref().on("child_added", function(snapshot) {

  
console.log(snapshot.val().trainName);
console.log(snapshot.val().destination);
console.log(snapshot.val().firstTrainTime);
console.log(snapshot.val().frequency);


});


  //end of document.ready
});