// Function to lazy load images
function lazyLoadImages() {
  const images = document.querySelectorAll(".lazyload");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src; // Replace placeholder with actual image
        img.classList.remove("lazyload"); // Remove lazy-load class
        observer.unobserve(img); // Stop observing the image
      }
    });
  });

  images.forEach((img) => {
    observer.observe(img);
  });
}

// Call the function to lazy load images
document.addEventListener("DOMContentLoaded", lazyLoadImages);
