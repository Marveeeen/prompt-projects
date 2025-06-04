// === Select DOM elements ===
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let currentIndex = 0;
let slideInterval;

// === Function to show slide by index ===
function showSlide(index) {
  // Hide all slides and remove 'active' from dots
  clearInterval(slideInterval); // Clear existing interval
  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  // Show selected slide and activate corresponding dot
  slides[index].classList.add("active");
  dots[index].classList.add("active");

  slideInterval = setInterval(showSlidAutomatic, 3000);
}

// === Add click event to each dot ===
dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const slideIndex = parseInt(dot.getAttribute("data-slide"));
    currentIndex = slideIndex;
    showSlide(slideIndex);
  });
});

function showSlidAutomatic() {
  if (currentIndex === 2) {
    currentIndex = 0; // Reset to first slide
  } else {
    currentIndex++; // Move to next slide
  }
  showSlide(currentIndex);
}

slideInterval = setInterval(showSlidAutomatic, 3000);
