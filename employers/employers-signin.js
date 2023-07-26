const emailEntered = document.getElementById('email');
const passwordEntered = document.getElementById('password');

// const signinForm = document.getElementById('signin-form');

signinForm.addEventListener('submit', () => {

    // if (!emailEntered) {
        
    // } else {
        
    // }

    fetch("http://localhost:3000/Employer",{
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