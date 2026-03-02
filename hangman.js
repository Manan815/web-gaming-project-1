const words = ["javascript","hangman","memory","tictactoe","funzone"];
const wordDisplay = document.getElementById("wordDisplay");
const wrongLettersEl = document.getElementById("wrongLetters");
const attemptsLeftEl = document.getElementById("attemptsLeft");
const letterInput = document.getElementById("letterInput");
const guessBtn = document.getElementById("guessBtn");
const hangmanWins = document.getElementById("hangmanWins");
const hangmanTimer = document.getElementById("hangmanTimer");
const saveScoreBtn = document.getElementById("saveScoreBtn");

let selectedWord, correctLetters=[], wrongLetters=[], attempts=6;
let wins = 0, seconds = 0;

// Timer
setInterval(()=>{
    seconds++;
    hangmanTimer.textContent = seconds + "s";
},1000);

function startGame(){
    selectedWord = words[Math.floor(Math.random()*words.length)];
    correctLetters=[];
    wrongLetters=[];
    attempts=6;
    updateDisplay();
}

function updateDisplay(){
    wordDisplay.textContent = selectedWord.split("").map(l=>correctLetters.includes(l)?l:"_").join(" ");
    wrongLettersEl.textContent = wrongLetters.join(", ");
    attemptsLeftEl.textContent = attempts;

    if(!wordDisplay.textContent.includes("_")){
        alert("You won! The word was: "+selectedWord);
        wins++;
        hangmanWins.textContent = wins;
        startGame();
    } else if(attempts<=0){
        alert("You lost! The word was: "+selectedWord);
        startGame();
    }
}

function guessLetter(){
    const letter = letterInput.value.toLowerCase();
    letterInput.value="";
    if(!letter || correctLetters.includes(letter)||wrongLetters.includes(letter)) return;
    if(selectedWord.includes(letter)) correctLetters.push(letter);
    else { wrongLetters.push(letter); attempts--; }
    updateDisplay();
}

guessBtn.addEventListener("click", guessLetter);

// Save Score
saveScoreBtn.addEventListener("click",()=>{
    const stats = JSON.parse(localStorage.getItem('gameStats')) || { ttt:{played:0,high:0}, hangman:{played:0,high:0}, memory:{played:0,high:0} };
    stats.hangman.played +=1;
    stats.hangman.high = Math.max(stats.hangman.high, wins);
    localStorage.setItem('gameStats', JSON.stringify(stats));
    alert("Score saved!");
});

startGame();