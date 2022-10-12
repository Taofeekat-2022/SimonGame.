// Arrays of the button-colours
var buttonColours = ["red","blue", "green", "yellow"];

// Game Pattern
var gamePattern = [];

var userClickedPattern = [];

// checking if the game has started
var started = false;

// level of the game when starting afresh
var level = 0;

// when a keypress occur
$(document).keydown(function() {
if (!started) {

// The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
  $("#level-title").text("Level " + level);
  nextSequence();
  started = true;
}
});


// When a user click, the function that will be trigger
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);


checkAnswer(userClickedPattern.length-1);
});

  function checkAnswer(currentLevel) {

      if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
      } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

          setTimeout(function() {
            $("body").removeClass("game-over");
          }, 200);

          startOver();
      }
  }


// When the color is sequence/seleecting randomly

  function nextSequence() {

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

  // adding to the empty array of "gamePattern" that is at the top of the file
    gamePattern.push(randomChosenColour);

  // adding flash to the buttonColours
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  // playing sound to the ramdomly chosen color
    playSound(randomChosenColour);


  }



// function that plays sound related to the buttonColours
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// function that animate according to the userChosenColour
function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
