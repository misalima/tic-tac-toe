var started = false;
var playerOneSquares = [];
var playerTwoSquares = [];
var player = 1;
var numberOfUsedSquares = 0;


$(".start-button").click(start);

function start() {
    started = true;
    playerOne();
    $(".start-button").addClass("vanish");
}

function playerOne() {
    $(".player-1").addClass("turn");
    $(".sq").click(function() {
        
        if (!$(this).hasClass("usedSquare") && player == 1) {
            var clickedSquare = $(this).attr("class").slice(3, 10);
            var clickAudio = new Audio("audio/pop1.wav");
            clickAudio.play();
            $("."+clickedSquare).addClass("x-square");
            playerOneSquares.push(clickedSquare[clickedSquare.length - 1])
            playerOneSquares.sort((a,b) => a-b)
           
            $(this).addClass("usedSquare");
            numberOfUsedSquares++;
            if(checkWin(playerOneSquares)) {
                $(".title").text("Player 1 is the Winner!")
                var audio = new Audio ("audio/win.wav");
                audio.play();
                stop();
            } else if (numberOfUsedSquares == 9){
                $(".title").addClass("turn").text("Tied!")
                var audio = new Audio ("audio/draw.wav");
                audio.play();
                stop();
    
            } else {
                $(".player-1").removeClass("turn");
                player = 2;
                playerTwo();
            }
           
        }
        
        
    })
}
function playerTwo() {
    $(".player-2").addClass("turn");
    $(".sq").click(function() {
        if (!$(this).hasClass("usedSquare") && player == 2) {
            var clickedSquare = $(this).attr("class").slice(3, 10);
            var clickAudio = new Audio("audio/pop2.wav");
            clickAudio.play();
            $("."+clickedSquare).addClass("circle-square");
            playerTwoSquares.push(clickedSquare[clickedSquare.length - 1])
            playerTwoSquares.sort((a,b) => a-b)
            $(this).addClass("usedSquare");
            numberOfUsedSquares++;
            if(checkWin(playerTwoSquares)) {
                $(".title").text("Player 2 is the Winner!")
                var audio = new Audio ("audio/win.wav");
                audio.play();
                stop();
            } else if (numberOfUsedSquares == 9){
                $(".title").addClass("turn").text("Tied!")
                var audio = new Audio ("audio/draw.wav");
                audio.play();
                stop();
            }  else {
                $(".player-2").removeClass("turn");
                player = 1;
                playerOne();
            }
            
            console.log(playerTwoSquares);
        }
       
        
    })
}
function checkWin(array) {
    if( (array.includes("1") && array.includes("4") && array.includes("7")) ||
        (array.includes("2") && array.includes("5") && array.includes("8")) ||
        (array.includes("3") && array.includes("6") && array.includes("9")) ||
        (array.includes("1") && array.includes("2") && array.includes("3")) ||
        (array.includes("4") && array.includes("5") && array.includes("6")) ||
        (array.includes("7") && array.includes("8") && array.includes("9")) ||
        (array.includes("1") && array.includes("5") && array.includes("9")) ||
        (array.includes("7") && array.includes("5") && array.includes("3")) ) {
            
            return true;
            
        } else {
           return false;
        }
}
function stop() {
    $(".sq").addClass("usedSquare");
    started = false;
    $(".start-button").text("Restart").removeClass("vanish").click(function() {
        reset();
        start();
    });
}

function reset() {
    $(".sq").removeClass("x-square circle-square usedSquare");
    $(".title").text("Tic Tac Toe Online");
    $(".player-2").removeClass("turn");
    playerOneSquares = [];
    playerTwoSquares = [];
    player = 1;
    numberOfUsedSquares = 0;
}

