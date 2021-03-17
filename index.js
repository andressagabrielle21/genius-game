var buttonColours = ["green", "red", "yellow", "blue"];

var userClickedPattern = [];

var gamePatterns = [];

var started = false;

var level = 0;

$(document).on("keydown", function(){
    if (!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});


$(".btn").on("click", function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
    
});

function checkAnswer(currentLevel) {
    if (gamePatterns[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePatterns.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
        }

    }
    else {
        playSound("wrong");
        $("h1").text("GAME OVER! Press any key to restart.");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over"); 
        }, 200);

        startOver();
    }
}


function nextSequence() {
    userClickedPattern = [];

    level++;

    $("h1").text("Level " + level);

    var randomNumb =  Math.floor(Math.random() * 4);

    var randomChosenColor = buttonColours[randomNumb]; 
    gamePatterns.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(200).fadeOut(200).fadeIn(200);

    playSound(randomChosenColor);
   
}

function playSound(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass('pressed');
    }, 100);
}

function startOver() {
    started = false;
    level = 0;
    gamePatterns = [];
}
