// Tabs JS
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

// Functionality Scripts
// const editCompanyDetailsBtn = document.getElementById('edit-company-profile');
// editCompanyDetailsBtn.addEventListener('click', (event) => {
//     event.preventDefault();

//     companyGridItems = document.getElementsByClassName('company-grid-item');
//     console.log(companyGridItems);
//     for (let index = 0; index < companyGridItems.length; index++) {
//         const element = companyGridItems[index].firstElementChild;
//         element.className = element.className.replace("input-no-border-outline", "");
//         // element.attributes.readonly = "false";
//         // console.log(element.attributes.readonly);
//         element.removeAttribute("readonly");
//     }
//     updateCompanyDetailsBtn.style.display = 'block';
//     editCompanyDetailsBtn.style.display = 'none';
// });

// const updateCompanyDetailsBtn = document.getElementById('update-company-profile');
// updateCompanyDetailsBtn.addEventListener('click', (event) => {
//     event.preventDefault();

//     companyGridItems = document.getElementsByClassName('company-grid-item');
//     console.log(companyGridItems);
//     for (let index = 0; index < companyGridItems.length; index++) {
//         const element = companyGridItems[index].firstElementChild;
//         element.className = element.className.replace("", "input-no-border-outline");
//         element.setAttribute("readonly", true);
//     }

//     editCompanyDetailsBtn.style.display = 'block';
//     updateCompanyDetailsBtn.style.display = 'none';
// });

const logoutBtn = document.getElementById('logout-button');
logoutBtn.addEventListener('click', (event) => {
    event.preventDefault();
    localStorage.clear();
    window.location.href = "./employers-signin.html";
});

const id = localStorage.getItem('id');

// fetch(`http://localhost:3000/employers/${id}`, {
//     method: 'GET'
// })
// .then(response => response.json())
// .then(data => {
//     const companyIDPlaceholder = document.getElementById('company-id');
//     companyIDPlaceholder.value = data.id;
//     const companyNamePlaceholder = document.getElementById('company-name');
//     companyNamePlaceholder.value = data.companyName;
//     // const companyLocationPlaceholder ;
// });

fetch(`http://localhost:3000/jobs`, {
    method: 'GET'
})
.then(response => response.json())
.then(data => {
    const jobsByUser = data.filter((element) => element.employerID == id);
    document.getElementById('job-post-numbers').innerText = jobsByUser.length;
    if(jobsByUser.length === 0) {
        const jobPostedGrid = document.getElementById('job-posted-grid');
        const noSearchText = document.createElement('p');
        noSearchText.innerHTML = "No jobs found.";
        const italics = document.createElement('i');
        italics.appendChild(noSearchText);
        jobPostedGrid.appendChild(italics);
    } else {
        jobsByUser.forEach(element => {
            const jobPostedGrid = document.getElementById('job-posted-grid');
            const job = document.createElement('div');
            job.className = 'job';
            const jobTitle = document.createElement('h2');
            const jobLocation = document.createElement('p');
            const jobDescription = document.createElement('p');
            const br = document.createElement('br');
            const deleteBtn = document.createElement('button');

            deleteBtn.innerHTML = "Delete";
            deleteBtn.style.float = "right";
            deleteBtn.addEventListener('click', (event) => {
                event.preventDefault();
                deleteJob(element.id);
            })

            jobTitle.innerText = element.jobTitle;
            jobLocation.innerText = element.jobLocation;
            jobDescription.innerText = element.jobDescription.substr(0, 100) + "...";

            job.style.border = "1px solid black";
            job.style.padding = "2%";
            job.style.borderRadius = "5px";
            job.style.margin = "4%";

            job.append(jobTitle, jobLocation, jobDescription, deleteBtn);
            jobPostedGrid.appendChild(job);
            jobPostedGrid.appendChild(br);
        });
    }
});

function deleteJob(id) {
    fetch(`http://localhost:3000/jobs/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert(`Job deleted.`);
        } else {
            throw new Error("Error deleting the job");
        }
    })
    .catch(error => console.error(error));
}

const modal = document.getElementById('new-job');

const createJobBtn = document.getElementById('create-job');
createJobBtn.addEventListener('click', (event) => {
    event.preventDefault();

    modal.style.display = 'block';
})

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }    
}

const newJobForm = document.getElementById('new-job');
newJobForm.addEventListener('submit', () => {

    const jobTitle = document.getElementById('job-title').value;
    const jobDescription = document.getElementById('job-description').value;
    const jobLocation = document.getElementById('job-location').value;
    const salaryExpected = document.getElementById('salary-expected').value;
    const applicantIds = [];
    const employerID = parseFloat(localStorage.getItem('id'));

    const newJob = {
        jobTitle: jobTitle,
        jobDescription: jobDescription,
        employerID: employerID,
        jobLocation: jobLocation,
        salaryExpected: salaryExpected,
        applicantIds: applicantIds
    };

    fetch(`http://localhost:3000/jobs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newJob)
    })
    .then(response => response.json())
    .then(data => console.log(data))

})