// Contact form validation and submission

// DOM elements
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');

// Validation error messages
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const phoneError = document.getElementById('phone-error');
const subjectError = document.getElementById('subject-error');
const messageError = document.getElementById('message-error');

// Form validation
function validateForm() {
  let isValid = true;
  
  // Reset previous error messages
  resetErrors();
  
  // Validate name
  if (!nameInput.value.trim()) {
    showError(nameInput, nameError, 'Nama tidak boleh kosong');
    isValid = false;
  } else if (nameInput.value.trim().length < 3) {
    showError(nameInput, nameError, 'Nama minimal 3 karakter');
    isValid = false;
  }
  
  // Validate email
  if (!emailInput.value.trim()) {
    showError(emailInput, emailError, 'Email tidak boleh kosong');
    isValid = false;
  } else if (!isValidEmail(emailInput.value.trim())) {
    showError(emailInput, emailError, 'Format email tidak valid');
    isValid = false;
  }
  
  // Validate phone
  if (!phoneInput.value.trim()) {
    showError(phoneInput, phoneError, 'Nomor telepon tidak boleh kosong');
    isValid = false;
  } else if (!isValidPhone(phoneInput.value.trim())) {
    showError(phoneInput, phoneError, 'Format nomor telepon tidak valid');
    isValid = false;
  }
  
  // Validate subject
  if (!subjectInput.value.trim()) {
    showError(subjectInput, subjectError, 'Subjek tidak boleh kosong');
    isValid = false;
  }
  
  // Validate message
  if (!messageInput.value.trim()) {
    showError(messageInput, messageError, 'Pesan tidak boleh kosong');
    isValid = false;
  } else if (messageInput.value.trim().length < 10) {
    showError(messageInput, messageError, 'Pesan minimal 10 karakter');
    isValid = false;
  }
  
  return isValid;
}

// Show error message
function showError(input, errorElement, message) {
  input.classList.add('error');
  errorElement.textContent = message;
  errorElement.style.display = 'block';
}

// Reset all error messages
function resetErrors() {
  const inputs = [nameInput, emailInput, phoneInput, subjectInput, messageInput];
  const errorElements = [nameError, emailError, phoneError, subjectError, messageError];
  
  inputs.forEach(input => {
    input.classList.remove('error');
  });
  
  errorElements.forEach(error => {
    error.textContent = '';
    error.style.display = 'none';
  });
  
  formStatus.className = 'form-status';
  formStatus.textContent = '';
  formStatus.style.display = 'none';
}

// Validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone format
function isValidPhone(phone) {
  // Simple phone validation: at least 10 digits
  const phoneRegex = /^[0-9+\-\s]{10,}$/;
  return phoneRegex.test(phone);
}

// Handle form submission
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate form
    if (validateForm()) {
      // In a real application, you would send the form data to a server here
      // For now, we'll simulate a successful submission
      
      // Display success message
      formStatus.className = 'form-status success';
      formStatus.textContent = 'Pesan Anda telah terkirim! Kami akan menghubungi Anda segera.';
      formStatus.style.display = 'block';
      
      // Reset form
      contactForm.reset();
      
      // Scroll to form status
      formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
  
  // Add input event listeners to clear errors on input
  [nameInput, emailInput, phoneInput, subjectInput, messageInput].forEach(input => {
    input.addEventListener('input', function() {
      this.classList.remove('error');
      const errorId = this.id + '-error';
      const errorElement = document.getElementById(errorId);
      if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
      }
    });
  });
}