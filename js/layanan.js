// Services page specific functionality

// DOM elements
const categoryButtons = document.querySelectorAll('.category-btn');
const serviceItems = document.querySelectorAll('.service-item');

// Initialize service filtering
function initServiceFiltering() {
  // Show all services initially
  showServices('all');
  
  // Add click event to category buttons
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove 'active' class from all buttons
      categoryButtons.forEach(btn => {
        btn.classList.remove('active');
      });
      
      // Add 'active' class to clicked button
      button.classList.add('active');
      
      // Get the category value
      const category = button.getAttribute('data-category');
      
      // Show services for selected category
      showServices(category);
    });
  });
}

// Show services based on selected category
function showServices(category) {
  serviceItems.forEach(item => {
    if (category === 'all') {
      item.style.display = 'grid';
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, 10);
    } else {
      const itemCategory = item.getAttribute('data-category');
      
      if (itemCategory === category) {
        item.style.display = 'grid';
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, 10);
      } else {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    }
  });
}

// Initialize service filtering on page load
document.addEventListener('DOMContentLoaded', () => {
  if (categoryButtons.length > 0 && serviceItems.length > 0) {
    initServiceFiltering();
  }
});

// Handle anchor links for services
window.addEventListener('load', () => {
  // If there's a hash in the URL, scroll to that service
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Find the category of the target service
      const category = targetElement.getAttribute('data-category');
      
      // Activate the corresponding category button
      categoryButtons.forEach(button => {
        if (button.getAttribute('data-category') === category || button.getAttribute('data-category') === 'all') {
          button.click();
        }
      });
      
      // Scroll to the target service after a short delay to allow filtering
      setTimeout(() => {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 500);
    }
  }
});