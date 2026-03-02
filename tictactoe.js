const cells = document.querySelectorAll('[data-cell]');
const tttWins = document.getElementById('tttWins');
const tttTimer = document.getElementById('tttTimer');
const saveScoreBtn = document.getElementById('saveScoreBtn');

let xTurn = true;
let wins = 0;
let seconds = 0;

// Start timer
setInterval(()=> {
    seconds++;
    tttTimer.textContent = seconds + 's';
}, 1000);

// Game logic
function handleClick(e){
    const cell = e.target;
    if(cell.textContent) return;
    cell.textContent = xTurn ? 'X' : 'O';
    xTurn = !xTurn;
    checkWin();
}

function checkWin(){
    const combos = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    combos.forEach(([a,b,c])=>{
        if(cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent){
            alert(cells[a].textContent + " Wins!");
            wins++;
            tttWins.textContent = wins;
            cells.forEach(cell => cell.textContent = '');
        }
    });
}

cells.forEach(cell => cell.addEventListener('click', handleClick));

// Save score to localStorage
saveScoreBtn.addEventListener('click', () => {
    const gameStats = JSON.parse(localStorage.getItem('gameStats')) || {
        ttt:{played:0,high:0},
        hangman:{played:0,high:0},
        memory:{played:0,high:0}
    };
    gameStats.ttt.played += 1;
    gameStats.ttt.high = Math.max(gameStats.ttt.high, wins);
    localStorage.setItem('gameStats', JSON.stringify(gameStats));
    alert('Score saved!');
});