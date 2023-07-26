// document.addEventListener("DOMContentLoaded", function() {
//     const form = document.getElementById("signin-form");
//     form.addEventListener("submit", function(event) {
//         event.preventDefault();

//         // Get the values from the form
//         const Email = document.getElementById("Email").value;
//         const password = document.getElementById("password").value;

//         // Perform basic validation (you can customize this based on your needs)
//         if (Email.trim() === "") {
//             alert("Please enter a valid Email Id.");
//         } else if (password.trim() === "") {
//             alert("Please enter your password.");
//         } else {
//             // If validation passes, you can proceed with authentication or further actions
//             alert("Sign-in successful!");
//             // You can add more logic here to redirect to another page, etc.
//         }
//     });
// });

const emailEntered = document.getElementById('email');
const passwordEntered = document.getElementById('password');

const signinForm = document.getElementById('signin-form');

signinForm.addEventListener('submit', () => {

    // if (!emailEntered) {
        
    // } else {
        
    // }

    fetch("http://localhost:3000/users",{
        method:'GET',
    })
    .then((result) => result.json())
    .then((data) => {
        console.log(data);
        const user = data.find((element)=>element.email===emailEntered.value && element.password===passwordEntered.value);
        console.log("User:",user);
        if(user){
            const token=Date.now();
            localStorage.setItem('token',token);
            alert("Logged in Successfully");
            window.location.href = "../jobs/job-search.html";
        }
        // if (email.value != element.value || password.value != element.password) {
            // }
            else{
                alert("Invalid credentials! Please try again.");
                window.location.href = './signin.html';
                //     alert("You are not a member");
                // window.location.href='./signup.html';
            }
        }
    )
})

function togglePasswordVisibility() {
    const passwordField = document.getElementById('password');
    // console.log(passwordField);
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
    } else {
        passwordField.type = 'password';
    }
}