// Register
let emailInputRegister = document.querySelector('.email-input-register');
let passwordInputRegister = document.querySelector('.password-input-register');
let userNameInputRegister = document.querySelector('.userName-input-register')
let repeatPasswordInputRegister = document.querySelector('.repeat-password-input-register')
let buttonRegister = document.querySelector('.button-register')
let firstName = document.querySelector('.firstName-input-register');
let lastName = document.querySelector('.lastName-input-register');
let age = document.querySelector('.age-input-register');

let lowerCase = /[a-z]/g
let upperCase = /[A-Z]/g
let numbers = /[1-9]/g
var validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function saveToLocalStorage() {
    if (!emailInputRegister.value.match(validEmail)) {
        alert("Email in incorrect format");
    } else if (userNameInputRegister.value.length < 6) {
        alert("Username must contain at least 6 characters");
    } else if (passwordInputRegister.value.length < 6) {
        alert("Password must contain at least 6 characters");
    } else if (!passwordInputRegister.value.match(numbers)) {
        alert("Password must contain at least one DIGIT");
    } else if (!passwordInputRegister.value.match(lowerCase)) {
        alert("Password must contain at least one LOWERCASE letter");
    } else if (!passwordInputRegister.value.match(upperCase)) {
        alert("Password must contain at least one UPPERCASE letter");
    } else if (repeatPasswordInputRegister.value !== passwordInputRegister.value) {
        alert("Passwords do not match. Please repeat the password again");
    } else if (firstName.value.length <= 2) {
        alert("First name too short");
    } else if (lastName.value.length <= 2) {
        alert("Last name too short");
    } else if (age.value == "") {
        alert("Please fill your age");
    } else if (age.value < 18) {
        alert("You're under 18 - Please clean the milk from your lips...");
    } else {
        // Check if the users array already exists in local storage
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Add the new user to the users array
        users.push({
            email: emailInputRegister.value,
            userName: userNameInputRegister.value,
            password: passwordInputRegister.value,
            firstName: firstName.value,
            lastName: lastName.value,
            age: age.value,
            shifts: [] // Initialize an empty array for shifts
        });

        // Save the updated users array back to local storage
        localStorage.setItem("users", JSON.stringify(users));

        alert("Your details have been saved!");
        window.location.href = 'http://127.0.0.1:5500/login-page.html';
    }
}

buttonRegister.addEventListener("click", saveToLocalStorage);
