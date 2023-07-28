// fetch("http://localhost:3000/jobs", {
//     method: 'GET'
// })
// .then(response => response.json())
// .then(data => {
//     data.forEach(element => {
//         const jobList = document.getElementById('job-list');
//         const job = document.createElement('div');
//         job.className = 'job';
//         const jobTitle = document.createElement('h2');
//         const jobLocation = document.createElement('p');
//         const jobDescription = document.createElement('p');
//         // const editBtn = document.createElement('button');
//         // const deleteBtn = document.createElement('button');
//         const br = document.createElement('br');

//         job.addEventListener('click', () => {
//             const jobViewLarge = document.getElementById('job-view');
//             const job = document.createElement('div');
//             const jobTitle = document.createElement('h2');
//             const jobLocation = document.createElement('p');
//             const jobDescription = document.createElement('p');
//             // const editBtn = document.createElement('button');
//             // const deleteBtn = document.createElement('button');
//             const br = document.createElement('br');

//             jobTitle.innerText = element.jobTitle;
//             jobLocation.innerText = element.jobLocation;
//             jobDescription.innerText = element.jobDescription;
            
//             jobLocation.style.fontWeight = "600";

//             job.style.border = "1px solid black";
//             job.style.margin = "10%"
//             job.style.padding = "2%";
//             job.style.borderRadius = "5px";

//             job.append(jobTitle, jobLocation, jobDescription);
//             jobViewLarge.appendChild(job);
//             jobViewLarge.appendChild(br);
//         });

//         jobTitle.innerText = element.jobTitle;
//         jobLocation.innerText = element.jobLocation;
//         jobDescription.innerText = element.jobDescription.substr(0, 100) + "...";
        
//         jobLocation.style.fontWeight = "600";

//         job.style.border = "1px solid black";
//         job.style.padding = "2%";
//         job.style.borderRadius = "5px";

//         job.append(jobTitle, jobLocation, jobDescription);
//         jobList.appendChild(job);
//         jobList.appendChild(br);
//     });
// })

document.body.addEventListener('load', () => {
    const searchWhat = localStorage.getItem('searchWhat');
    const searchWhere = localStorage.getItem('searchWhere');

    if (searchWhat && searchWhere) {
        document.getElementById('job-title').value = searchWhat;
        document.getElementById('job-location').value = searchWhere;
        const jobList = document.getElementById('job-list');
        jobList.innerHTML = '';
        searchJobs(searchWhat, searchWhere);
    }
});

const jobSearchBtn = document.getElementById('search-jobs');
jobSearchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const searchWhat = document.getElementById('job-title');
    const searchWhere = document.getElementById('job-location');

    // console.log(searchWhat.value, searchWhere.value);

    const jobList = document.getElementById('job-list');
    jobList.innerHTML = '';
    searchJobs(searchWhat, searchWhere);
})

function searchJobs(searchWhat, searchWhere) {
    fetch("http://localhost:3000/jobs", {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        // console.log(searchWhat.value, searchWhere.value);
        const jobs = data.filter((element) => element.jobTitle.includes(searchWhat.value) && element.jobLocation.includes(searchWhere.value));
        // console.log(jobs);
        if(jobs.length === 0) {
            const jobList = document.getElementById('job-list');
            const noSearchText = document.createElement('p');
            noSearchText.innerHTML = "No search found.";
            const italics = document.createElement('i');
            italics.appendChild(noSearchText);
            jobList.appendChild(italics);
        } else {
            jobs.forEach(element => {
                const jobList = document.getElementById('job-list');
                const job = document.createElement('div');
                job.className = 'job';
                const jobTitle = document.createElement('h2');
                const jobLocation = document.createElement('p');
                const jobDescription = document.createElement('p');
                const employer = document.createElement('p');
                
                // const editBtn = document.createElement('button');
                // const deleteBtn = document.createElement('button');
                const br = document.createElement('br');
        
                job.addEventListener('click', () => {
                    const jobViewLarge = document.getElementById('job-view');
                    jobViewLarge.innerHTML = '';
                    const job = document.createElement('div');
                    const jobTitle = document.createElement('h2');
                    const jobLocation = document.createElement('p');
                    const jobDescription = document.createElement('p');
                    const employer = document.createElement('a');
                    const applyBtn = document.createElement('button');
                    // const deleteBtn = document.createElement('button');
                    const br = document.createElement('br');

                    const jobTagsDiv = document.createElement('div');
                    const jobTags = element.jobTags;
                    // jobTagsDiv.style.border = "1px dashed black";
                    jobTagsDiv.append(jobTags);
                    // console.log(jobTags);
        
                    jobTitle.innerText = element.jobTitle;
                    const employerID = element.employerID;
                    
                    // employer.href = `http://localhost:3000/employers/${employerID}`;
                    fetch(`http://localhost:3000/employers/${employerID}`, {
                        method: 'GET'
                    })
                    .then(response => response.json())
                    .then(data => {
                        const companyName = data.companyName;
                        employer.innerText = companyName;
                        employer.href = `http://localhost:3000/employers/${employerID}`;
                    })

                    // employer.innerText = employer;

                    jobLocation.innerText = element.jobLocation;
                    jobDescription.innerText = element.jobDescription;
                    
                    jobLocation.style.fontWeight = "600";
        
                    job.style.border = "1px solid black";
                    job.style.margin = "10%"
                    job.style.padding = "2%";
                    job.style.borderRadius = "5px";

                    const currentUserID = parseFloat(localStorage.getItem('user'));
                    newApplicantIds = element.applicantIds.concat(currentUserID);
                    console.log(newApplicantIds);

                    const jobID = element.id;
                    applyBtn.innerHTML = "Apply";
                    applyBtn.addEventListener('click', (event) => {
                        event.preventDefault();
                        // console.log(jobID);

                        console.log(newApplicantIds);
                        fetch(`http://localhost:3000/jobs/${jobID}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                applicantIds: newApplicantIds
                            })
                        })
                        .then(response => response.json())
                        .then(data => {
                            alert('you have successfully applied!');
                        });
                    })
        
                    job.append(jobTitle, employer, jobTagsDiv, jobLocation, jobDescription, applyBtn);
                    jobViewLarge.appendChild(job);
                    jobViewLarge.appendChild(br);
                });
        
                jobTitle.innerText = element.jobTitle;
                employer.innerText = element.employer;
                jobLocation.innerText = element.jobLocation;
                jobDescription.innerText = element.jobDescription.substr(0, 100) + "...";
                
                jobLocation.style.fontWeight = "600";
        
                job.style.border = "1px solid black";
                job.style.padding = "2%";
                job.style.borderRadius = "5px";
        
                job.append(jobTitle, jobLocation, jobDescription);
                jobList.appendChild(job);
                jobList.appendChild(br);
            })
        }
    })
}

const user = localStorage.getItem('user');
if (user) {
    const welcomeUser = document.getElementById('user-welcome');
    welcomeUser.style.display = 'block';
    const signinBtnNav = document.getElementById('nav-signin-button');
    signinBtnNav.style.display = 'none';
    document.getElementById('user-name').innerHTML = user;
}

function signout() {
    localStorage.clear();
    window.location.href = "../index.html";
}