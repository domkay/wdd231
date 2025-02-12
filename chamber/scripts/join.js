// script.js

// Auto-populate the timestamp
document.addEventListener("DOMContentLoaded", function () {
  const timestampField = document.getElementById("timestamp");
  if (timestampField) {
    timestampField.value = new Date().toISOString();
  }
});

// Modal functionality
document.addEventListener("DOMContentLoaded", function () {
  // Get all modal links
  const modalLinks = document.querySelectorAll(".learn-more");
  const modals = document.querySelectorAll(".modal");
  const closeButtons = document.querySelectorAll(".modal .close");

  // Open modal when a "Learn More" link is clicked
  modalLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent default link behavior
      const targetModalId = link.getAttribute("href"); // Get the modal ID from the link
      const targetModal = document.querySelector(targetModalId); // Find the modal
      if (targetModal) {
        targetModal.style.display = "flex"; // Show the modal
      }
    });
  });

  // Close modal when the close button is clicked
  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const modal = button.closest(".modal"); // Find the parent modal
      if (modal) {
        modal.style.display = "none"; // Hide the modal
      }
    });
  });

  // Close modal when clicking outside the modal content
  modals.forEach((modal) => {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        // Check if the click is outside the modal content
        modal.style.display = "none"; // Hide the modal
      }
    });
  });
});
