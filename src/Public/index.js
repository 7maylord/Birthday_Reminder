// Function to display success message
function showSuccessMessage() {
    document.getElementById('successMessage').style.display = 'block';
  }
  
  // Function to handle form submission
  function handleFormSubmission(event) {
    event.preventDefault(); // Prevent default form submission behavior
    // Submit the form using fetch or XMLHttpRequest
    fetch(event.target.action, {
      method: event.target.method,
      body: new FormData(event.target)
    })
    .then(response => {
      if (response.ok) {
        showSuccessMessage(); // Display success message
      } else {
        throw new Error('Failed to submit form');
      }
    })
    .catch(error => {
      console.error('Error submitting form:', error);
    });
  }
  