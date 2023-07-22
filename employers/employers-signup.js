// employers-signup.js

document.getElementById('employer-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Get form data
    const formData = new FormData(event.target);
    const employerData = {};
    formData.forEach((value, key) => {
      employerData[key] = value;
    });
  
    // Send the data to the JSON server
    const jsonServerURL = ''; // add the json server url
    fetch(jsonServerURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employerData),
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
  