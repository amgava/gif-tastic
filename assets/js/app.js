// Topic Array
var flowers = ["daisy", "rose", "hibiscus", "peony", "tulip"]

// GIPHY API
var API = "3RrVsWqf9bS4HYeNUWPGyA57HP7xuMLr";

// Wait for page load
$(document).ready(function() {

    // Create default topic buttons
    function topicButton() {

        $("#default-buttons").empty();

        for (var i = 0; i < flowers.length; i++) {

            $("#default-buttons")
            .append($("<button>")
            .addClass("btn topic")
            .attr("data-name", flowers[i])
            .text(flowers[i]));
        }
    }

    // Show default topic buttons
    topicButton();

    // Accept new topics, make button
     $("#new").on("click", function(event) {

        event.preventDefault();

        var userInput  = $("#newTopic").val().trim();

        flowers.push(userInput);

        $("#newTopic").empty();

        topicButton();

    });


    // Load GIFs when topic button is pressed
    $(document).on("click", ".topic", display);

    function display() {

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=" + API + "&limit=10";

        var searchTerm = $(this).attr("data-name");

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var rating = results[i].rating;
                var stillIMG = results[i].images.fixed_height_still.url;
                var movingIMG = results[i].images.fixed_height.url;


                var gif = $("<img>").attr("src", stillIMG);
                $(gif).attr("data-state", "still")
                      .attr("data-still", stillIMG)
                      .attr("data-animate", movingIMG)
                      .addClass("gif");

                $("#gifs").append("<div class='current'>" + gif + "<p>Rating: " + rating + "</p>");

            }
        });
    }

    // Animate GIFs on click
    $(document).on("click", ".gif", function () {
        var status = $(this).attr("data-state");

        if (status === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
  });



















});