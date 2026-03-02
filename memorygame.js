const memoryBoard = document.getElementById("memoryBoard");
const memoryWins = document.getElementById("memoryWins");
const memoryTimer = document.getElementById("memoryTimer");
const saveScoreBtn = document.getElementById("saveScoreBtn");

const images = ["🍎","🍌","🍇","🍓","🍒","🍑"];
let cards=[], firstCard=null, secondCard=null, lockBoard=false;
let wins = 0, seconds = 0;

// Timer
setInterval(()=>{ seconds++; memoryTimer.textContent = seconds + "s"; }, 1000);

function createBoard(){
    memoryBoard.innerHTML="";
    cards=[...images,...images].sort(()=>Math.random()-0.5);
    cards.forEach(emoji=>{
        const card = document.createElement("div");
        card.classList.add("memory-card");
        card.textContent="?";
        card.dataset.emoji=emoji;
        card.addEventListener("click", flipCard);
        memoryBoard.appendChild(card);
    });
}

function flipCard(){
    if(lockBoard || this===firstCard) return;
    this.textContent=this.dataset.emoji;
    if(!firstCard) firstCard=this;
    else{ secondCard=this; checkMatch(); }
}

function checkMatch(){
    if(firstCard.dataset.emoji===secondCard.dataset.emoji){
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        resetBoard();
        checkWinMemory();
    } else{
        lockBoard=true;
        setTimeout(()=>{ firstCard.textContent="?"; secondCard.textContent="?"; resetBoard(); },1000);
    }
}

function resetBoard(){ [firstCard,secondCard]=[null,null]; lockBoard=false; }

function checkWinMemory(){
    const allCards = document.querySelectorAll('.memory-card');
    const won = [...allCards].every(c=>c.textContent !== "?");
    if(won){
        alert("You matched all cards!");
        wins++;
        memoryWins.textContent = wins;
        createBoard();
    }
}

// Save Score
saveScoreBtn.addEventListener("click",()=>{
    const stats = JSON.parse(localStorage.getItem('gameStats')) || { ttt:{played:0,high:0}, hangman:{played:0,high:0}, memory:{played:0,high:0} };
    stats.memory.played +=1;
    stats.memory.high = Math.max(stats.memory.high, wins);
    localStorage.setItem('gameStats', JSON.stringify(stats));
    alert("Score saved!");
});

createBoard();