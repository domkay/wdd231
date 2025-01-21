const currentYear = new Date().getFullYear();
document.getElementById("currentYear").textContent = currentYear;
// Get the last modified date of the HTML document
const lastModified = document.lastModified;

// Display the last modified date in the paragraph
document.getElementById("lastModified").textContent += lastModified;

// Hmaburger menu
const mainnav = document.querySelector(".navigation");

const hambutton = document.querySelector("#menu");

hambutton.addEventListener("click", () => {
  mainnav.classList.toggle("show");
  hambutton.classList.toggle("show");
});
