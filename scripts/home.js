document.addEventListener("DOMContentLoaded", () => {
  const hamburgerIcon = document.getElementById("hamburger-icon");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu a");

  const toggleMenu = () => {
    hamburgerIcon.classList.toggle("open");
    mobileMenu.classList.toggle("active");
  };

  const closeMenu = () => {
    hamburgerIcon.classList.remove("open");
    mobileMenu.classList.remove("active");
  };

  const handleResize = () => {
    if (window.innerWidth > 600) {
      closeMenu();
      hamburgerIcon.style.display = "none";
    } else {
      hamburgerIcon.style.display = "block";
    }
  };

  hamburgerIcon.addEventListener("click", toggleMenu);

  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (
      !hamburgerIcon.contains(event.target) &&
      !mobileMenu.contains(event.target)
    ) {
      closeMenu();
    }
  });

  window.addEventListener("resize", handleResize);

  // Initial check
  handleResize();
});

const currentYear = new Date().getFullYear();
document.getElementById("currentYear").textContent = currentYear;
// Get the last modified date of the HTML document
const lastModified = document.lastModified;

// Display the last modified date in the paragraph
document.getElementById("lastModified").textContent += lastModified;
