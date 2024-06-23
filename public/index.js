// Function to display success message
function showSuccessMessage() {
  const successMessage = document.getElementById("successMessage");
  successMessage.style.display = "block";

  setTimeout(() => {
    successMessage.style.display = "none";
  }, 5000); // 5000 milliseconds = 5 seconds
}

// Function to handle form submission
function handleFormSubmission(event) {
  event.preventDefault(); // Prevent default form submission behavior
  

  // Convert FormData object to json
  function formDataToJson(formData) {
    const json = {};
    formData.forEach((value, key) => {
      json[key] = value;
    });
    return JSON.stringify(json);
  }
  
  // Usage example
  const formData = new FormData(event.target);
  const jsonData = formDataToJson(formData);

  // Submit the form using fetch
  fetch(event.target.action, {
    method: event.target.method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: jsonData
  })
    .then((response) => {
      if (response.ok) {
        showSuccessMessage(); // Display success message
      } else {
        throw new Error("Failed to submit form"); // Throw error if response is not ok
      }
    })
    .catch((error) => {
      console.error("Error submitting form:", error); // Log any fetch errors
    });
}

// Attach the form submission handler to the form
document
  .getElementById("birthdayForm")
  .addEventListener("submit", handleFormSubmission);
