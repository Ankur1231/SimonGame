var colors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var gameStart = false;
var level = 0;

//userClickPattern needs to be reset so that previous click are not registered
function nextSequence() {
  userClickPattern = [];
  level++;
  $("#level-title").text("level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = colors[randomNumber];
  gamePattern.push(randomColor);
  setTimeout(function () {
    $("#" + randomColor)
      .fadeOut(100)
      .fadeIn(100);
    playSound(randomColor);
  }, 1000);

  console.log(gamePattern);
}
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animationPress(currentColor) {
  $("#" + currentColor)
    .fadeOut(100)
    .fadeIn(100);
}
// this will work for each click you do
$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickPattern.push(userChosenColor);

  playSound(userChosenColor);
  animationPress(userChosenColor);

  checkAnswer(userClickPattern.length - 1);
});

$(document).on("keypress", function () {
  if (gameStart === false) {
    $("#level-title").text("level " + level);
    nextSequence();
    gameStart = true;
  }
});
//check answer will check when each click happens not the whole array for each correct color the first
// if statement passes to second if the length does not match that means that user need to click more buttons to complete the sequence
function checkAnswer(currentLevel) {
  if (userClickPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    $("body").addClass("game-over");

    $("h1").text("Game Over, Press Any Key To Restart");
    playSound("wrong");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 1000);
    startOver();
    // $(document).on("keypress", function (event) {
    //   if (event.key === "r") {
    //     startOver();
    //   }
    // });
  }
}
function startOver() {
  level = 0;
  gameStart = false;
  gamePattern = [];
  // location.reload();
}
