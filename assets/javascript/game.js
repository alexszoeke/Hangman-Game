//These are my variables
//User starts off with 0 wins
var wins = 0;
//User starts off with 0 losses
var losses = 0;
//the user has 12 attempts to guess the correct letters
var guessesLeft = 12;
var wrongLetters = [];
//number of blanks
var blanks = 0;
//letters after the word is split
var correctLetters = [];
//Variable that stores if letter is correct
var letterCorrect = [];
//random word
var newWord = "";
//hidden answers
var answers = [];
//Array of words to guess
var words = ["guard", "forward", "center", "basketball", "foul","referee", "rockets", "clutch", "fans", "rowdies"];
var imgNumber = "";
console.log(imgNumber);

//Functions
function startGame() {

//computer needs to randomly generate a new word
    newWord = words[Math.floor(Math.random() * words.length)];
console.log(newWord);
//correct letters
    correctLetters = newWord.split("");
//the word needs to appear blank
    blanks = correctLetters.length;
console.log(correctLetters);

//Reset
guessesLeft = 12;
wrongLetters = [];
answers = [];

for (var i=0; i<blanks; i++) {
    answers.push("_");
}

console.log(newWord);
console.log(correctLetters);
console.log(blanks);
console.log(answers);

//DOM manipulation
document.getElementById("newword").innerHTML = answers.join(" ");
document.getElementById("numGuesses").innerHTML = guessesLeft;
document.getElementById("wrong").innerHTML = "You've already guessed: "
document.getElementById("wincount").innerHTML = wins;
document.getElementById("losscount").innerHTML = losses;

}
//Everything here to check letter function is my attempt to generate a new photo every time a new word is generated.
function randomImg() {
    var index = words.indexOf(newWord);
    imgNumber = ("img_" + index);
    document.getElementById("imgid").src = "../images/" + imgNumber;
    console.log(index);
}

//computer needs to recognize when letters are correct
function checkLetter(letter) {

    letterCorrect = false;

    for (var i=0; i<blanks; i++) {
        if (newWord[i] == letter) {
            letterCorrect = true;
        }
    }

    //Find where the letter exists in the word
    if (letterCorrect) {
        for (var i=0; i<blanks; i++) {
            if (newWord[i] == letter) {
                answers[i] = letter;
            }
        }
    }
    else {
//for every wrong letter it will appear in the "wrong letters" section
        wrongLetters.push(letter);
        guessesLeft--;
    }

    console.log(answers);
    console.log(guessesLeft);
}




function completed() {
    console.log("Win Count: " + wins + " | Loss Count: " + losses + " | Guesses Left: " + guessesLeft);


document.getElementById("newword").innerHTML = answers.join(" ");
document.getElementById("numGuesses").innerHTML = guessesLeft;
document.getElementById("wrong").innerHTML = "You've already guessed: " + wrongLetters.join(" ");   
document.getElementById("imgid").src = url("../images/" + imgNumber);

//check if user wins or loses
//once the word has been completed or the number of guesses has reached 0 a new word will be generated.
    if (correctLetters.toString() == answers.toString()) {
        wins++;
        setTimeout(function () {
            alert("Clutch would be proud! You can't teach that!");
        }, 200);
        document.getElementById("wincount").innerHTML = "Number of wins: " + wins;
        window.setTimeout(startGame, 400);
        
    } else if (guessesLeft == 0) {
        losses++;
        setTimeout(function () {
        alert("Where's the foul?! You lost!");
        }, 200);
        document.getElementById("losscount").innerHTML = losses;
        window.setTimeout(startGame, 400);
    }
}

    

startGame();
//users guess
document.onkeyup = function (event) {
var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
checkLetter(userGuess);
completed();
randomImg();

console.log(userGuess);
}
