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
const editCompanyDetailsBtn = document.getElementById('edit-company-profile');
editCompanyDetailsBtn.addEventListener('click', (event) => {
    event.preventDefault();

    companyGridItems = document.getElementsByClassName('company-grid-item');
    console.log(companyGridItems);
    for (let index = 0; index < companyGridItems.length; index++) {
        const element = companyGridItems[index].firstElementChild;
        element.className = element.className.replace("input-no-border-outline", "");
        // element.attributes.readonly = "false";
        // console.log(element.attributes.readonly);
        element.removeAttribute("readonly");
    }
    updateCompanyDetailsBtn.style.display = 'block';
    editCompanyDetailsBtn.style.display = 'none';
});

const updateCompanyDetailsBtn = document.getElementById('update-company-profile');
updateCompanyDetailsBtn.addEventListener('click', (event) => {
    event.preventDefault();

    companyGridItems = document.getElementsByClassName('company-grid-item');
    console.log(companyGridItems);
    for (let index = 0; index < companyGridItems.length; index++) {
        const element = companyGridItems[index].firstElementChild;
        element.className = element.className.replace("", "input-no-border-outline");
        element.setAttribute("readonly", true);
    }

    editCompanyDetailsBtn.style.display = 'block';
    updateCompanyDetailsBtn.style.display = 'none';
});

const logoutBtn = document.getElementById('logout-button');
logoutBtn.addEventListener('click', (event) => {
    event.preventDefault();
    localStorage.clear();
    window.location.href = "./employers-signin.html";
});

const id = localStorage.getItem('id');

fetch(`http://localhost:3000/employers/${id}`, {
    method: 'GET'
})
.then(response => response.json())
.then(data => {
    const companyIDPlaceholder = document.getElementById('company-id');
    companyIDPlaceholder.value = data.id;
    const companyNamePlaceholder = document.getElementById('company-name');
    companyNamePlaceholder.value = data.companyName;
    // const companyLocationPlaceholder ;
})