const emailEntered = document.getElementById('email');
const passwordEntered = document.getElementById('password');
function signin(){
    fetch("http://localhost:3000/user",{
        method:'GET',
    })
    .then((result)=>result.json())
    .then((data)=>{
        console.log(data);
        const user = data.find((element)=>element.email===emailEntered.value && element.password===passwordEntered.value);
        console.log("User:",user);
        if(user){
            const token=Date.now();
            localStorage.setItem('token',token);
            alert("Logged in Successfully");
            window.location.href='./index.html';
        }
        // if (email.value != element.value || password.value != element.password) {
            // }
            else{
                alert(" Invalid Email or Password ");
                window.location.href='./signin.html';
                //     alert("You are not a member");
                // window.location.href='./signup.html';
            }
        }
    )
}