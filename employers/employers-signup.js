// employers-signup.js

document.getElementById('employer-signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Get form data
    const hrRep = document.getElementById('name').value;
    const companyName = document.getElementById('company').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const newEmployer = {
      companyName: companyName,
      email: email,
      password: password,
      hrRep: hrRep,
    }
  
    // Send the data to the JSON server
    const jsonServerURL = 'http://localhost:3000/employers';
    fetch(jsonServerURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEmployer),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      
      console.log('Employer data sent successfully:', data);
    })
    .catch(error => {
      console.error('Error sending employer data:', error);
    });
  });
  