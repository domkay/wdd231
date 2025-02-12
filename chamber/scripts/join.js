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
  const modalLinks = document.querySelectorAll(".membership-cards .card a");
  const modals = document.querySelectorAll(".modal");
  const closeButtons = document.querySelectorAll(".modal .close");

  // Open modal when a "Learn More" link is clicked
  modalLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetModalId = link.getAttribute("href");
      const targetModal = document.querySelector(targetModalId);
      if (targetModal) {
        targetModal.style.display = "block";
      }
    });
  });

  // Close modal when the close button is clicked
  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const modal = button.closest(".modal");
      if (modal) {
        modal.style.display = "none";
      }
    });
  });

  // Close modal when clicking outside the modal content
  modals.forEach((modal) => {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  });
});
