document.addEventListener('DOMContentLoaded', () => {
  const fname = document.getElementById('fname');
  const lname = document.getElementById('lname');
  const email = document.getElementById('email');
  const textArea = document.getElementById('subject');
  const form = document.getElementById('form');
  const btn = document.getElementById('submit-btn');
  const rstBtn = document.getElementById('reset-btn');

  // Validation functions
  function validateFirstName() {
    if (!fname.value) {
      fname.style.border = '3px solid red';
      fname.placeholder = 'Please fill out this field';
      return false;
    } else {
      fname.style.border = '';
      return true;
    }
  }

  function validateLastName() {
    if (!lname.value) {
      lname.style.border = '3px solid red';
      lname.placeholder = 'Please fill out this field';
      return false;
    } else {
      lname.style.border = '';
      return true;
    }
  }

  function validateEmail() {
    if (!email.value) {
      email.style.border = '3px solid red';
      email.placeholder = 'Please fill out this field';
      return false;
    } else {
      email.style.border = '';
      return true;
    }
  }

  function validateTextArea() {
    if (!textArea.value) {
      textArea.style.border = '3px solid red';
      textArea.placeholder = 'Please fill out this field';
      return false;
    } else {
      textArea.style.border = '';
      return true;
    }
  }

  // Event listener for form submission
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const isValidFirstName = validateFirstName();
    const isValidLastName = validateLastName();
    const isValidEmail = validateEmail();
    const isValidTextArea = validateTextArea();

    if (isValidFirstName && isValidLastName && isValidEmail && isValidTextArea) {
      form.submit();
    }
  });

  // Reload form
  rstBtn.addEventListener('click', () => {
    window.location.reload();
  });
});
