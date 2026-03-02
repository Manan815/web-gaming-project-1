// localstorage.js

// DOM Elements
const registerForm = document.getElementById('registerForm');
const profilePicInput = document.getElementById('profilePic');
const profilePreview = document.getElementById('profilePreview');

// -----------------------------
// Profile Picture Preview
// -----------------------------
if(profilePicInput){
    profilePicInput.addEventListener('change', function(){
        if(this.files && this.files[0]){
            const reader = new FileReader();
            reader.onload = function(e){
                profilePreview.src = e.target.result;
                profilePreview.style.display = 'block';
            }
            reader.readAsDataURL(this.files[0]);
        }
    });
}

// -----------------------------
// Initialize gameStats if not present
// -----------------------------
if(!localStorage.getItem('gameStats')){
    const initialStats = {
        ttt: { played: 0, high: 0 },
        hangman: { played: 0, high: 0 },
        memory: { played: 0, high: 0 }
    };
    localStorage.setItem('gameStats', JSON.stringify(initialStats));
}

// -----------------------------
// Registration Form Submission
// -----------------------------
if(registerForm){
    registerForm.addEventListener('submit', function(e){
        e.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const birthdate = document.getElementById('birthdate').value;

        // Calculate age from birthdate
        const birth = new Date(birthdate);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;

        if(age < 15){
            alert('You must be at least 15 years old to register.');
            return;
        }

        // Handle Profile Picture
        if(profilePicInput.files.length > 0){
            const reader = new FileReader();
            reader.onload = function() {
                const profilePic = reader.result;
                saveUser(username, email, password, age, profilePic);
            }
            reader.readAsDataURL(profilePicInput.files[0]);
        } else {
            saveUser(username, email, password, age, null);
        }
    });
}

// -----------------------------
// Save User & Initialize Stats
// -----------------------------
function saveUser(username, email, password, age, profilePic){
    const user = { username, email, password, age, profilePic };
    localStorage.setItem('user', JSON.stringify(user));

    // Initialize gameStats for this user (if not exists)
    if(!localStorage.getItem('gameStats')){
        const initialStats = {
            ttt: { played: 0, high: 0 },
            hangman: { played: 0, high: 0 },
            memory: { played: 0, high: 0 }
        };
        localStorage.setItem('gameStats', JSON.stringify(initialStats));
    }

    alert('Registration successful!');
    window.location.href = 'dashboard.html';
}

// -----------------------------
// Display User Info on Dashboard
// -----------------------------
const userDisplay = document.getElementById('userDisplay');
if(userDisplay){
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
        userDisplay.textContent = user.username;

        const dashboard = document.querySelector('main');

        // Age
        if(user.age){
            const ageEl = document.createElement('p');
            ageEl.textContent = `Age: ${user.age}`;
            dashboard.appendChild(ageEl);
        }

        // Email
        if(user.email){
            const emailEl = document.createElement('p');
            emailEl.textContent = `Email: ${user.email}`;
            dashboard.appendChild(emailEl);
        }

        // Profile Picture
        if(user.profilePic){
            const img = document.createElement('img');
            img.src = user.profilePic;
            img.alt = 'Profile Picture';
            img.style.width = '120px';
            img.style.height = '120px';
            img.style.borderRadius = '50%';
            dashboard.appendChild(img);
        }
    } else {
        window.location.href = 'index.html';
    }
}