let buttonColours=["red","blue","green","yellow"];
let gamePattern=[];
let userClickedPattern=[];
let started=false;

$(".btn").click(function(){
    let userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    play(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})
let level=1;
function nextSequence(){
    userClickedPattern=[];
    let randomNumber=Math.floor(Math.random()*4);
    let randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    play(randomChosenColour);
    $("h1").text(`Level ${level}`);
    level++;
}

function play(name){
    var audio=new Audio(`./sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColour){
    $("."+`${currentColour}`).addClass("pressed");
    setTimeout(function(){
        $("."+`${currentColour}`).removeClass("pressed");
    },100);
}

$(document).on('keydown touchstart',function(){
    if(!started){
        nextSequence();
        started=true;
    }
})


function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
        {
            console.log("Success");
            if(userClickedPattern.length===gamePattern.length)
            {
                setTimeout(function(){
                    nextSequence();
                },1000)
            }
        }
    else{
        let w="wrong";
        play(w);
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        $("h1").text("Game Over, Press Any Key to Restart");
        started=false;
        level=1;
        gamePattern=[];
    }    
}