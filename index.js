const isEmailFilled = document.getElementById('emailFilled');
isEmailFilled.addEventListener('click', () => {
    const emailEntered = document.getElementById('email');
    // console.log(emailEntered.value);
    if (!emailEntered.value) {
        emailEntered.style.border = "1px solid #dc3545";
        emailEntered.style.borderRadius = "3px";
        emailEntered.style.backgroundColor = "#f8d7da";
        emailEntered.style.outlineColor = "#dc3545"
        const emailStatus = document.getElementById('email-status');
        emailStatus.innerHTML = "Enter valid email";
        emailStatus.style.color = "#dc3545";
    }
    
    if (emailEntered.value) {

        let indexOfAt = emailEntered.value.indexOf("@");
        if (indexOfAt > 3) {
            const emailCard = document.getElementById('email-card');
        emailCard.style.display = 'none';

        const passwordCard = document.getElementById('password-card');
        passwordCard.style.display = 'flex';

        fetch("http://localhost:3000/users", {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((data) => {
            const user = data.find((element) => element.email === emailEntered.value);

            if (user) {
                const signinUser = document.getElementById('user-signin');
                signinUser.style.display = "block";
                const signupUser = document.getElementById('user-signup');
                signupUser.style.display = "none";
                const emailVerify = document.getElementById('signin-email-goes-here');
                emailVerify.innerHTML = emailEntered.value;
            } else {
                const signinUser = document.getElementById('user-signin');
                signinUser.style.display = "none";
                const signupUser = document.getElementById('user-signup');
                signupUser.style.display = "block";
                const emailVerify = document.getElementById('signup-email-goes-here');
                emailVerify.innerHTML = emailEntered.value;
            }
        })

        } else {
            emailEntered.style.border = "1px solid #dc3545";
            emailEntered.style.borderRadius = "3px";
            emailEntered.style.backgroundColor = "#f8d7da";
            emailEntered.style.outlineColor = "#dc3545"
            const emailStatus = document.getElementById('email-status');
            emailStatus.innerHTML = "Enter valid email";
            emailStatus.style.color = "#dc3545";
        }
    }
})

function goToEmail() {
    
    const passwordCard = document.getElementById('password-card');
    passwordCard.style.display = 'none';

    const emailCard = document.getElementById('email-card');
    emailCard.style.display = 'flex';

}

function togglePasswordVisibility(event, targetPasswordField) {
    // const passwordField = document.querySelector('.password');
    const passwordField = document.getElementById(targetPasswordField);
    // const targetPasswordField = event.currentTarget.id;
    // console.log(passwordField);
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
    } else {
        passwordField.type = 'password';
    }
}

const signinBtn = document.getElementById('sign-in-button');
signinBtn.addEventListener('click', () => {
    const emailEntered = document.getElementById('email').value;
    const passwordEntered = document.getElementById('password-signin').value;
    
    if (emailEntered && passwordEntered) {
        signin(emailEntered, passwordEntered);
    } else {
        alert("enter valid password");
    }
})

function signin(emailEntered, passwordEntered) {
    fetch("http://localhost:3000/users",{
        method:'GET',
    })
    .then((result) => result.json())
    .then((data) => {
        console.log(data);
        const user = data.find((element)=>element.email===emailEntered && element.password===passwordEntered);
        console.log("User:",user);
        if(user){
            const token=Date.now();
            localStorage.setItem('token',token);
            alert("Logged in Successfully");
            window.location.href = "../index.html";
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
}

const signupBtn = document.getElementById('sign-up-button');
signupBtn.addEventListener('click', () => {
    const emailEntered = document.getElementById('email').value;
    const passwordEntered = document.getElementById('password-signup').value;
    
    if (emailEntered && passwordEntered) {
        const newUser = {
            email: emailEntered,
            password: passwordEntered
        }
    
        fetch("http://localhost:3000/users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(response => response.json())
        .then(data => {
            console.log("New User: ", newUser);
        })
    } else {
        alert("enter valid password");
    }
})

const jobSearchBtn = document.getElementById('search-job');
jobSearchBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const searchWhat = document.getElementById('job-title').value;
    const searchWhere = document.getElementById('job-location').value;

    localStorage.setItem('searchWhat', searchWhat);
    localStorage.setItem('searchWhere', searchWhere);

    const token = localStorage.getItem('token');

    if (!token) {
        alert("You are not logged in! Login to search jobs.");
        window.location.href = "./signin/signin.html";
    } else {
        window.location.href = "./jobs/job-search.html";
    }
})