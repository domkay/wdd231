// Toggle the navigation menu on mobile
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector("nav");

hamburger.addEventListener("click", () => {
  // Toggle the active class on the hamburger button
  hamburger.classList.toggle("active");

  // Toggle the active class on the navigation menu
  nav.classList.toggle("active");
});
