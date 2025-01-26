const hamburgerElement = document.querySelector("#myButton");
const navElements = document.querySelector("#animateMe");

hamburgerElement.addEventListener("click", () => {
  //code here
  navElements.classList.toggle("open");
  //code here
  hamburgerElement.classList.toggle("open");
});
