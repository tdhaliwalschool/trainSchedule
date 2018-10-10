// javascript file



// Steps to complete:



// 1. Initialize Firebase

// 2. Create button for adding new trains - then update the html + update the database

// 3. Create a way to retrieve trains from the train database.

// 4. Create a way to calculate the frequency worked. Using difference between first_train and current time.

//    Then use moment.js formatting to set difference in frequency.

// 5. Calculate Total billed



// 1. Initialize Firebase




// Initialize Firebase

var config = {

    apiKey: "AIzaSyBtWngpI_f8y3o8aHp03NKH6U8b79fV5Tw",
    authDomain: "train-time-d915a.firebaseapp.com",
    databaseURL: "https://train-time-d915a.firebaseio.com",
    storageBucket: "train-time-d915a.appspot.com",
 };

firebase.initializeApp(config);
var database = firebase.database();

// 2. Button for adding trains
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trnName = $("#train-name-input").val().trim();
    var trndestination = $("#destination-input").val().trim();
    var trnfirst_train = moment($("#first_train-input").val().trim(), "0000").format("X");
    var trnminutes = $("#minutes-input").val().trim();

    // Creates local "temporary" object for holding train data
    var newtrn = {
        name: trnName,
        destination: trndestination,
        first_train: trnfirst_train,
        minutes: trnminutes
    };


    // Uploads train data to the database
    database.ref().push(newtrn);

    // Logs everything to console
    console.log(newtrn.name);
    console.log(newtrn.destination);
    console.log(newtrn.first_train);
    console.log(newtrn.minutes);

    alert("train successfully added");

    // Clears all of the text-boxes
   $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first_train-input").val("");
    $("#minutes-input").val("");
});



// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry

database.ref().on("child_added", function (childSnapshot) {

    console.log(childSnapshot.val());



    // Store everything into a variable.

    var trnName = childSnapshot.val().name;

    var trndestination = childSnapshot.val().destination;

    var trnfirst_train = childSnapshot.val().first_train;

    var trnminutes = childSnapshot.val().minutes;



    // train Info

    console.log(trnName);

    console.log(trndestination);

    console.log(trnfirst_train);

    console.log(trnminutes);



    // Prettify the train first_train

    var trnfirst_trainPretty = moment.unix(trnfirst_train).format("0000");



    // Calculate the frequency worked using hardcore math

    // To calculate the frequency worked

    var trnfrequency = moment().diff(moment(trnfirst_train, "X"), "frequency");

    console.log(trnfrequency);



    // Calculate the total minutes

    // var trn = trnfrequency * trnminutes;

  



    // Create the new row

    var newRow = $("<tr>").append(

        $("<td>").text(trnName),

        $("<td>").text(trndestination),

        $("<td>").text(trnfirst_trainPretty),

        $("<td>").text(trnfrequency),

        $("<td>").text(trnminutes),

        $("<td>").text(trnBilled)

    );



    // Append the new row to the table

    $("#train-table > tbody").append(newRow);

});



                            // Example Time Math

                            // -----------------------------------------------------------------------------

                            // Assume train first_train date of January 1, 2015

                            // Assume current date is March 1, 2016



                            // We know that this is 15 frequency.

                            // Now we will create code in moment.js to confirm that any attempt we use meets this test case


