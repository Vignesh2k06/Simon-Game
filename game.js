
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = new Array();

var userClickedPattern = new Array();

var count = 0;
var level = 1;

$(document).keydown(function(){
    if(count===0){
        count=1;
        handler();
        nextSequence();
    }
});


function nextSequence()
{
    var newLevel=level++;
    $("h1").text("Level "+newLevel);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    makeSound(randomChosenColour);
}

function handler()
{
    $(".btn").click(function(){
        var userChosenColour = $(this).attr("id");
        makeSound(userChosenColour);
        userClickedPattern.push(userChosenColour);
        checkAnswer(userClickedPattern.length-1);
    });
}

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("succes");
        if(gamePattern.length===userClickedPattern.length){
            userClickedPattern = [];
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("wrong");
        var wrongSound = new Audio('sounds/wrong.mp3');
        wrongSound.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
            }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    count = 0;
    level = 1;
    gamePattern = [];
}

function makeSound(key)
{
    switch (key) {
        case "red":
            var redSound = new Audio('sounds/red.mp3');
            redSound.play();
            break;
        case "blue":
            var blueSound = new Audio('sounds/blue.mp3');
            blueSound.play();
            break;        
        case "green":
            var greenSound = new Audio('sounds/green.mp3');
            greenSound.play();
            break;
        case "yellow":
            var yellowSound = new Audio('sounds/yellow.mp3');
            yellowSound.play();
            break;
        default:
            console.log("Error");
            break;
    }
}

function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");
    setTimeout(function () {
        $(".btn").removeClass("pressed");
        }, 100);
}








