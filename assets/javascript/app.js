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
  database.ref().on("child_added", function(childSnapshot) {
      console.log(childSnapshot.val().trainName);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().nextArrival);
      console.log(childSnapshot.val().frequency);
      // nametd = '<td>' + childSnapshot.val().name + '</td>';
  });

  function onSubmit() {
          var trainName = $('#train-name').val().trim();
          var destination = $('#destination').val().trim();
          var nextArrival = $('#next-arrival').val().trim();
          var frequency = $('#frequency').val().trim();
          event.preventDefault();
          database.ref().push({
              trainName: trainName,
              destination: destination,
              nextArrival: nextArrival,
              frequency: frequency
          })
          var row = $('tbody').append('<tr class="table-info">');
          var arr = [trainName, destination, nextArrival, frequency];
          for (var i = 0; i < arr.length; i++) {
              var column = $('<td>').attr('scope', 'col').html(arr[i]);
              row.append(column);
          }
  };

$(document).on('click', '#submit-button', onSubmit);
  // $('#submit-button').on('click', onSubmit);

