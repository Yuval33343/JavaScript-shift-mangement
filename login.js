// Login
let userNameInputLogin = document.querySelector('.userName-input-login');
let passwordInputLogin = document.querySelector('.password-input-login');
let buttonLogin = document.querySelector('.button-login');

function loginToSystem() {
    // Retrieve user credentials and users array from local storage
    let storedUserName = userNameInputLogin.value;
    let storedPassword = passwordInputLogin.value;
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Find the user with matching credentials
    let currentUser = users.find(user => user.userName === storedUserName && user.password === storedPassword);

    if (currentUser) {
        alert("Logged in successfully");

        // Store the current user details in local storage
        localStorage.setItem("currentUser", JSON.stringify(currentUser));

        window.location.href = 'http://127.0.0.1:5500/home-page.html';
    } else {
        alert("Invalid username or password");
    }
}

buttonLogin.addEventListener("click", loginToSystem);
