// CLICK HANDLER 
$ (document).ready(function(){

$(function () {
    // FUNCTION THAT LISTENS FOR THE EAT BURGER CLICK 
    $(".eat-burger").on("click", function (){
        console.log("Your ready to eat.")
        var id = $(this).data("id"); 
        var burger_name = $(this).data("burger_name");
        var devoured = $(this).data("devoured"); 

        var newDevouredState = {
            burger: burger_name,
            devoured: devoured, 
        }; 
        console.log(newDevouredState); 
    
        $.ajax ("/api/burgers/" + id, {
            type: "PUT", 
            data: newDevouredState
        }).then (
            function() {
                console.log("changed devoured property to " + devoured); 
                location.reload(); 
            }
        );
    }); 


  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBurger = {
      burger_name: $("#newBurger").val().trim(),
      devoured: $("[devoured=yes]:checked").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        console.log("created new burger");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

    // CLICK HANDLER FOR ADDING A NEW BURGER 
    $(".add-new").on("click", function (event) {
        // event.preventdefault(); 

        var newBurger = {
            name: $(".add-new").val(), 
            devoured: false 
        }
        console.log(newBurger); 

        $.ajax ("api/burgers", {
            type: "POST", 
            data: newBurger
        })

        .then(
            function (){ 
                console.log("new burger added"); 
                location.reload()
            }
        )
    
    });
})

});