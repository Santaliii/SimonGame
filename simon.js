$(document).one("keydown", function() {
    startGame();
});

// Statically declaring game colors/options as an array
let options = ["green", "red", "yellow", "blue"];
// Declaring sequence in which the current ongoing pattern is to be stored
let sequence = [];
// Represents the index of the correct color to be chosen in the sequence array.
let clickNumber = 0;
// Function to start the game once a key is pressed, only called once.
function startGame() {
    // Begins the first level once the game is started.
    nextLevel();
    // Click listener for all four colors (buttons)
    $("button").on("click", function(event) {
        let colorClicked = event.target.classList[0];
        console.log(event.target.classList);
        $("." + colorClicked).addClass("pressed");
        setTimeout(function() {
            $("." + colorClicked).removeClass("pressed");
        }, 100);


        // Checks if the color that was clicked is on sequence
        if (checkIfOnSequence(colorClicked)) {
            playColorAudio(colorClicked);
            /* If the color is correctly chosen, the index of the next correct
            color in the sequence is incremented by 1*/
            clickNumber++;
            // Checks if the player has successfully finished the current level's sequence.
            if (clickNumber === sequence.length) {
                setTimeout(function() {
                    nextLevel();
                    clickNumber = 0;
                }, 1000);
            }
        } else {
            gameOver();
        }
    });
}

function gameOver() {
    playColorAudio("wrong");
    $("body").css("background-color", "red");
    setTimeout(function() {
        $("body").css("background-color", "#21094e");
    }, 100);
    sequence = [];
    clickNumber = 0;
    $("h1").text("Game Over. Refresh to restart.");
}

function checkIfOnSequence(pickedColor) {
    if (sequence[clickNumber] === pickedColor) {
        return true;
    }
    return false;
}

/* Function that progresses player to the next level, is called every
   time a player passes the current level.*/
function nextLevel() {
    addToSequence();
    $("h1").text("Level " + sequence.length);
    showNext();
}

// Pushes a random color from the 'options' array to the sequence for the next level
function addToSequence() {
    sequence.push(options[Math.floor(Math.random() * 4)]);
}

function playColorAudio(color) {
    let audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

// Gives visual and auditory feedback for the player showing which color is added to the sequence
function showNext() {
    let i = 0;
    setInterval(function() {
        if (i < sequence.length) {
            playColorAudio(sequence[i]);
            $("." + sequence[i])
                .animate({ opacity: 0 }, 100)
                .animate({ opacity: 1 }, 100);
        } else {
            clearInterval();
        }
        i++;
    }, 800);
}