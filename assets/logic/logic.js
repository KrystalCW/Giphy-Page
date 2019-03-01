var topics = [
    "rain",
    "snow",
    "sunshine",
    "fog",
    "monsoon",
    "hurricane"
]

renderButtons();

function renderButtons() {
    $("#button-array").empty();
    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>");
        button.addClass("weather");
        button.attr("data-name", topics[i]);
        button.text(topics[i]);
        $("#button-array").append(button);
    }
}

function weatherGifs() {
    var weather = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + weather + "&api_key=pUpYuVe3td58u23oogHLM1T2pHFENVTJ&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");
            var rating = results[i].rating;
            var stillURL = results[i].images.fixed_height_still.url;
            var p = $("<p>").text("Rating: " + rating);
            var weatherGif = $("<img>");
            weatherGif.attr("src", stillURL).attr("data-still", results[i].images.fixed_height_still.url)
            .attr("data-active", results[i].images.fixed_height.url)
            .attr("data-state", "still")
            .addClass("gif");
            gifDiv.prepend(p);
            gifDiv.prepend(weatherGif);
            $("#gif-array").prepend(gifDiv);
        }
    });
}; 

function animateGifs() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-active"));
        $(this).attr("data-state", "animate");
    } else if (state === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
};

function addWeather() {
    event.preventDefault();
    var userInput = $("#weather-input").val();
    topics.push(userInput);
    renderButtons();
    $("#weather-input").val("");
}

$(document).on("click", ".weather", weatherGifs);
$(document).on("click", ".gif", animateGifs);
$(document).on("click", "#add-weather", addWeather);

