const currentYear = new Date().getFullYear();
document.getElementById("currentYear").textContent = currentYear;
// Get the last modified date of the HTML document
const lastModified = document.lastModified;

// Display the last modified date in the paragraph
document.getElementById("lastModified").textContent += lastModified;

// Hmaburger menu
const hamMenu = document.querySelector(".ham-menu");

const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});
