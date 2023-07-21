let currentStep = 1;

function showStep(step) {
  const stepPages = document.getElementsByClassName("step-page");
  for (const page of stepPages) {
    page.classList.remove("active");
  }

  const stepButtons = document.getElementsByClassName("step-btn");
  for (const button of stepButtons) {
    button.classList.remove("active");
  }

  document.getElementById(`step-${step}`).classList.add("active");
  document.querySelector(`.step-btn:nth-child(${step})`).classList.add("active");

  currentStep = step;
}

function nextStep(nextStep) {
  if (nextStep > currentStep && nextStep <= 3) {
    showStep(nextStep);
  }
}

function submitForm() {
  // Here, you would typically handle the form submission on the server-side
  alert("Form submitted successfully!");
}
