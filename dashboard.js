const user = JSON.parse(localStorage.getItem('user'));

const userDisplay = document.getElementById('userDisplay');
const profilePicDisplay = document.getElementById('profilePicDisplay');
const ageDisplay = document.getElementById('ageDisplay');
const emailDisplay = document.getElementById('emailDisplay');

if(user){
    userDisplay.textContent = user.username;
    if(user.profilePic) profilePicDisplay.src = user.profilePic;
    if(user.age) ageDisplay.textContent = `Age: ${user.age}`;
    if(user.email) emailDisplay.textContent = `Email: ${user.email}`;
} else {
    window.location.href = 'index.html';
}

// Example Game Stats stored in localStorage
// Structure: { ttt: {played:3, high:2}, hangman:{played:5, high:3}, memory:{played:2, high:4} }
const stats = JSON.parse(localStorage.getItem('gameStats')) || {
    ttt:{played:0, high:0},
    hangman:{played:0, high:0},
    memory:{played:0, high:0}
};

// Populate table
document.getElementById('tttPlayed').textContent = stats.ttt.played;
document.getElementById('tttHigh').textContent = stats.ttt.high;

document.getElementById('hangmanPlayed').textContent = stats.hangman.played;
document.getElementById('hangmanHigh').textContent = stats.hangman.high;

document.getElementById('memoryPlayed').textContent = stats.memory.played;
document.getElementById('memoryHigh').textContent = stats.memory.high;

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('darkTheme', document.body.classList.contains('dark-theme'));
});

// Apply saved theme on load
if(localStorage.getItem('darkTheme') === 'true'){
    document.body.classList.add('dark-theme');
}