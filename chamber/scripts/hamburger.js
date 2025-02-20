const hamburgerElement = document.querySelector("#myButton");
const navElements = document.querySelector(".menuAnime");

hamburgerElement.addEventListener("click", () => {
  navElements.classList.toggle("open");
  hamburgerElement.classList.toggle("open");
  hamburgerElement.innerText = "X";
  hamburgerElement.innerText = "☰";
});
