 // Initialize Firebase
var config = {
  apiKey: "AIzaSyBlxA6q9NNNEYyrekDbDUIhiJ_012BbNMs",
  authDomain: "train-schedule-4cf1d.firebaseapp.com",
  databaseURL: "https://train-schedule-4cf1d.firebaseio.com",
   projectId: "train-schedule-4cf1d",
  storageBucket: "train-schedule-4cf1d.appspot.com",
  messagingSenderId: "316732467680"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();
  //button to add a train
  $('#submit-button').on('click', function(event){
    event.preventDefault();
    //gets train info input
    var newTrainName = $('#train-name').val().trim();
    var destination = $('#destination').val().trim();
    var nextArrival = moment($('#next-arrival').val().trim(), "HH:mm").format();
    var frequency = $('#frequency').val().trim();

  //local holder for new train info
    var newTrainInfo = {
      name: newTrainName,
      destination: destination,
      nextArrival: nextArrival,
      frequency: frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP,
  }

  //checks that inputs are present
  if(newTrainName === "" || destination === "" || nextArrival === "" || frequency === ""){
    $('#train-name').val("");
    $('#destination').val("");
    $('#next-arrival').val("");
    $('#frequency').val("");
    alert("Please fill in all fields");
  }
  else{database.ref().push(newTrainInfo);

   //alert the train was added
   alert("New train has been successfully added");

   //returns placeholder to the text boxes
  $('#train-name').val("");
  $('#destination').val("");
  $('#next-arrival').val("");
  $('#frequency').val("");
  }
});

//listener for new child added to database
database.ref().on("child_added", function(childSnapshot){
  var newTrainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var nextArrival = childSnapshot.val().nextArrival;
  var frequency = childSnapshot.val().frequency;

  //convert first time (push back 1 year to make sure it comes before current time)
  var nextArrivalConverted = moment(nextArrival, "HH:mm").subtract(1, "years");
 
  //current time
  var currentTime = moment();

  //difference between the times
  var diffTime = moment().diff(moment(nextArrivalConverted), "minutes");
 
  //time apart (remainder)
  var tRemainder = diffTime % frequency;
  
  //minute until train
  var tMinutesTillTrain = frequency - tRemainder;
  
  //next train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  var nextTrainConverted = moment(nextTrain).format("hh:mm a");
 
  //add each trains data into the table
  $("#trainList > tbody").append("<tr><td>" + newTrainName + "</td><td>" + destination + "</td><td>" + "Every " + frequency + " minutes" + "</td><td>" + nextTrainConverted + "</td><td>" + tMinutesTillTrain + "</td></tr>");

});



 