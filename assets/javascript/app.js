$(document).ready(function() {

  var desserts = [];

  function createButtons() {

        // Deleting the buttons prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#dessertBtns").empty();

        // Looping through the array of movies
        for (var i = 0; i < desserts.length; i++) {
          var a = $("<button>");
          a.addClass("dessert");
          a.attr("data-dessert", desserts[i]);
          a.text(desserts[i]);
          $("#dessertBtns").append(a);
        }
      }

  $("#addDessert").on("click", function() {
    event.preventDefault();
    var dessertVal = $("#dessert-input").val().trim();
    if (dessertVal !== "") {
      desserts.push(dessertVal);
      createButtons();
      $("#dessert-input").val("");
    }
  });

  $(document).on("click", ".dessert", function() {
    // Grabbing and storing the data-dessert property value from the button
    var dessert = $(this).attr("data-dessert");

    if (dessert !== undefined) {

      $("#gifs").empty();
      
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        dessert + "&api_key=dc6zaTOxFJmzC&limit=10";

      // Performing an AJAX request with the queryURL
      $.ajax({
          url: queryURL,
          method: "GET"
      })
        .done(function(response) {
          var results = response.data;
          console.log(queryURL);
          for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var dessertDiv = $("<div>");
            dessertDiv.addClass("dessert");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var dessertImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            dessertImage.attr("src", results[i].images.fixed_height.url);

            // Appending the paragraph and image tag to the dessertDiv
            dessertDiv.append(p);
            dessertDiv.append(dessertImage);

            $("#gifs").prepend(dessertDiv);
          }
        });
    }
  });
});