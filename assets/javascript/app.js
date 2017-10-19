$(document).ready(function() {

  var desserts = ["cake","pie","cupcakes","oreos","chocolate pudding","donuts","cookies"];
  var ajaxResult = null;
  createButtons();

  function createButtons() {

    $("#dessertBtns").empty();

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

    var dessert = $(this).attr("data-dessert");

    if (dessert !== undefined) {

      $("#gifs").empty();
      
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        dessert + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
          url: queryURL,
          method: "GET"
      })
        .done(function(response) {
          var results = response.data;
          ajaxResult = results;
          console.log(response);
          for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var dessertDiv = $("<div>");
            dessertDiv.addClass("dessert");

            var p = $("<p>").text("Rating: " + results[i].rating);

            var dessertImage = $("<img>");
    
            dessertImage.attr("src", results[i].images.fixed_height.url);
            dessertImage.attr("stillAnimate","animate");
            dessertImage.addClass("gif");
            dessertImage.attr("id",i);

            dessertDiv.append(p);
            dessertDiv.append(dessertImage);

            $("#gifs").prepend(dessertDiv);
          } //close for loop
        }); //close ajax .done
    } //close if !== undefined
  }); //close click button

  $(document).on("click","img", function() {
    var idVal = $(this).attr("id");
    if ($(this).attr("stillAnimate") == "animate") {
      $(this).attr("src", ajaxResult[idVal].images.fixed_height_still.url); // need to be in ajax to call
      $(this).attr("stillAnimate", "still"); 
    }
    else if ($(this).attr("stillAnimate") == "still") {
      $(this).attr("src", ajaxResult[idVal].images.fixed_height.url);
      $(this).attr("stillAnimate", "animate"); 
    }
  }); //close click img

});