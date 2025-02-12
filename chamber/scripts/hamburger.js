const hamburgerElement = document.querySelector("#myButton");
const navElements = document.querySelector(".menuAnime");

hamburgerElement.addEventListener("click", () => {
  navElements.classList.toggle("open");
  hamburgerElement.classList.toggle("open");
});

// const hamburgerElement = document.querySelector("#myButton"); // Use the correct ID!
// const navElements = document.querySelector(".menuAnime");

// hamburgerElement.addEventListener("click", () => {
//   navElements.classList.toggle("open");
//   hamburgerElement.classList.toggle("open");
// });
