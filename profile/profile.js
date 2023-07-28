
  // function openprofile(evt, cityName) {
    
  //   const tabContents = document.querySelectorAll(".tabcontent");
  //   tabContents.forEach(content => {
  //     content.style.display = "none";
  //   });

   
  //   const tabLinks = document.querySelectorAll(".tablinks");
  //   tabLinks.forEach(link => {
  //     link.classList.remove("active");
  //   });

    
  //   const selectedTabContent = document.getElementById(cityName);
  //   const selectedTabLink = evt.currentTarget;
  //   if (selectedTabContent) {
  //     selectedTabContent.style.display = "block";
  //     selectedTabLink.classList.add("active");
  //   }
  // }

  
  // document.getElementById("defaultOpen").click();

  // function handleFormSubmission(event) {
  //   event.preventDefault(); 

    
  //   const name = document.getElementById("name").value;
  //   const email = document.getElementById("email").value;
  //   const gender = document.getElementById("gender-select").value;
  //   const dob = document.getElementById("dob").value;
  //   const father = document.getElementById("father").value;
  //   const mother = document.getElementById("mother").value;
  //   const place = document.getElementById("place").value;
  //   const state = document.getElementById("state").value;

  //   const BasicDiv = document.getElementById("Basic");
  //   BasicDiv.innerHTML = `
  //     <h3>Basic Details</h3>
  //     <p><strong>Name:</strong> ${name}</p>
  //     <p><strong>Email:</strong> ${email}</p>
  //     <p><strong>Gender:</strong> ${gender}</p>
  //     <p><strong>Date of Birth:</strong> ${dob}</p>
  //     <p><strong>Father's Name:</strong> ${father}</p>
  //     <p><strong>Mother's Name:</strong> ${mother}</p>
  //     <p><strong>Place:</strong> ${place}</p>
  //     <p><strong>State:</strong> ${state}</p>
  //   `;

  //   // Qualification Information
  //   const matriculationBoard = document.getElementById('board').value;
  //   const matriculationInstitute = document.getElementById('institute').value;
  //   const matriculationYear = document.getElementById('year').value;
  //   const matriculationPercentage = document.getElementById('marks').value;
  //   const intermediateBoard = document.getElementById('Inter-board').value;
  //   const intermediateInstitute = document.getElementById('Inter-institute').value;
  //   const intermediateYear = document.getElementById('Inter-year').value;
  //   const intermediatePercentage = document.getElementById('Inter-marks').value;
  //   const graduationInstitute = document.getElementById('college').value;
  //   const graduationYear = document.getElementById('grad-year').value;
  //   const cgpa = document.getElementById('cgpa').value;

  //   const QualificationDiv = document.getElementById("Qualification");
  //   QualificationDiv.innerHTML = `
  //   <h3>Qualification Details</h3>
  //     <table border="1">
  //       <tr>
  //         <th colspan="2">Matriculation</th>
  //       </tr>
  //       <tr>
  //         <td>Board:</td>
  //         <td>${matriculationBoard}</td>
  //       </tr>
  //       <tr>
  //         <td>Institute Name:</td>
  //         <td>${matriculationInstitute}</td>
  //       </tr>
  //       <tr>
  //         <td>Year of Passing:</td>
  //         <td>${matriculationYear}</td>
  //       </tr>
  //       <tr>
  //         <td>Percentage:</td>
  //         <td>${matriculationPercentage}%</td>
  //       </tr>
  //       <tr>
  //         <th colspan="2">Intermediate</th>
  //       </tr>
  //       <tr>
  //         <td>Board:</td>
  //         <td>${intermediateBoard}</td>
  //       </tr>
  //       <tr>
  //         <td>Institute Name:</td>
  //         <td>${intermediateInstitute}</td>
  //       </tr>
  //       <tr>
  //         <td>Year of Passing:</td>
  //         <td>${intermediateYear}</td>
  //       </tr>
  //       <tr>
  //         <td>Percentage:</td>
  //         <td>${intermediatePercentage}%</td>
  //       </tr>
  //       <tr>
  //         <th colspan="2">Graduation</th>
  //       </tr>
  //       <tr>
  //         <td>Institute Name:</td>
  //         <td>${graduationInstitute}</td>
  //       </tr>
  //       <tr>
  //         <td>Year of Graduation:</td>
  //         <td>${graduationYear}</td>
  //       </tr>
  //       <tr>
  //         <td>CGPA:</td>
  //         <td>${cgpa}</td>
  //       </tr>
  //     </table>
  //   `;
  //   alert("Profile Updated Successfully!");
  // }

  // const profileForm = document.getElementById("profile");
  // profileForm.addEventListener("submit", handleFormSubmission);


  function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  const currentUserID = parseFloat(localStorage.getItem('user'));

  fetch(`http://localhost:3000/users/${currentUserID}`, {
        method: 'GET'
  })
  .then(response => response.json())
  .then(data => {
    // console.log(data);
    document.getElementById('show-id').value = data.id;
    document.getElementById('show-name').value = data.name;
    document.getElementById('show-email').value = data.email;
    document.getElementById('show-gender').value = data.gender;

    document.getElementById('id').value = data.id;
    document.getElementById('name').value = data.name;
    document.getElementById('email').value = data.email;
    // document.querySelector('input[name="gender"]:checked').value = data.gender;
  })

  const editDetailsBtn = document.getElementById('edit-profile');
  editDetailsBtn.addEventListener('click', (event) => {
      event.preventDefault();
      
      document.getElementById('show-details').style.display = 'none';
      document.getElementById('edit-details').style.display = 'block';
  });
  
  const updateDetailsBtn = document.getElementById('update-profile');
  updateDetailsBtn.addEventListener('click', (event) => {
      event.preventDefault();

      const userID = document.getElementById('id').value;
      const newName = document.getElementById('name').value;
      const newEmail = document.getElementById('email').value;
      const newGender = document.querySelector('input[name="gender"]:checked').value;

      const updatedValues = {
        id: userID,
        name: newName,
        email: newEmail,
        gender: newGender
      }

      // console.log(updatedValues);

      fetch(`http://localhost:3000/users/${userID}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedValues)
      })
      .then(response => response.json())
      .then(data => console.log(data));
  
      document.getElementById('edit-details').style.display = 'none';
      document.getElementById('show-details').style.display = 'block';
  });

  const logoutBtn = document.getElementById('logout-button');
  logoutBtn.addEventListener('click', (event) => {
      event.preventDefault();
      localStorage.clear();
      window.location.href = "../index.html";
  });