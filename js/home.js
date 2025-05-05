// Home page specific functionality

// DOM elements
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.querySelector('.lightbox .close');
const testimonialItems = document.querySelectorAll('.testimonial-item');
const prevButton = document.querySelector('.prev-btn');
const nextButton = document.querySelector('.next-btn');
const dots = document.querySelectorAll('.dot');

// Initialize current testimonial index
let currentTestimonialIndex = 0;

// Gallery lightbox functionality
if (galleryItems.length > 0) {
  galleryItems.forEach(item => {
    item.addEventListener('click', function() {
      const imgSrc = this.querySelector('img').src;
      const caption = this.querySelector('.gallery-overlay h4').textContent;
      
      lightboxImg.src = imgSrc;
      lightboxCaption.textContent = caption;
      lightbox.style.display = 'block';
    });
  });
}

// Close lightbox when clicking the close button
if (lightboxClose) {
  lightboxClose.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });
}

// Close lightbox when clicking outside the image
if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
    }
  });
}

// Testimonial carousel functionality
function showTestimonial(index) {
  // Hide all testimonials
  testimonialItems.forEach(item => {
    item.classList.remove('active');
  });
  
  // Deactivate all dots
  dots.forEach(dot => {
    dot.classList.remove('active');
  });
  
  // Show the selected testimonial
  testimonialItems[index].classList.add('active');
  
  // Activate the corresponding dot
  dots[index].classList.add('active');
  
  // Update current index
  currentTestimonialIndex = index;
}

// Previous testimonial
if (prevButton) {
  prevButton.addEventListener('click', () => {
    let index = currentTestimonialIndex - 1;
    if (index < 0) {
      index = testimonialItems.length - 1;
    }
    showTestimonial(index);
  });
}

// Next testimonial
if (nextButton) {
  nextButton.addEventListener('click', () => {
    let index = currentTestimonialIndex + 1;
    if (index >= testimonialItems.length) {
      index = 0;
    }
    showTestimonial(index);
  });
}

// Dot navigation
if (dots.length > 0) {
  dots.forEach(dot => {
    dot.addEventListener('click', function() {
      const index = parseInt(this.getAttribute('data-index'));
      showTestimonial(index);
    });
  });
}

// Auto-rotate testimonials every 5 seconds
let testimonialInterval;

function startTestimonialInterval() {
  testimonialInterval = setInterval(() => {
    let index = currentTestimonialIndex + 1;
    if (index >= testimonialItems.length) {
      index = 0;
    }
    showTestimonial(index);
  }, 5000);
}

// Stop auto-rotation when user interacts with testimonials
function stopTestimonialInterval() {
  clearInterval(testimonialInterval);
}

// Add event listeners to stop auto-rotation on user interaction
if (prevButton && nextButton && dots.length > 0) {
  prevButton.addEventListener('mouseenter', stopTestimonialInterval);
  nextButton.addEventListener('mouseenter', stopTestimonialInterval);
  dots.forEach(dot => {
    dot.addEventListener('mouseenter', stopTestimonialInterval);
  });
  
  // Restart auto-rotation when user leaves the controls
  document.querySelector('.testimonial-controls').addEventListener('mouseleave', startTestimonialInterval);
}

// Initialize testimonial carousel
if (testimonialItems.length > 0) {
  showTestimonial(0);
  startTestimonialInterval();
}

// Keyboard navigation for testimonials and lightbox
document.addEventListener('keydown', (e) => {
  // If lightbox is open
  if (lightbox && lightbox.style.display === 'block') {
    if (e.key === 'Escape') {
      lightbox.style.display = 'none';
    }
  } 
  // If lightbox is closed, navigate testimonials
  else {
    if (e.key === 'ArrowLeft') {
      prevButton.click();
    } else if (e.key === 'ArrowRight') {
      nextButton.click();
    }
  }
});