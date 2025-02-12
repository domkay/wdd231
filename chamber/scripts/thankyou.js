// JavaScript to display submitted form data
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);

  document.getElementById("display-first-name").textContent =
    urlParams.get("first-name") || "N/A";
  document.getElementById("display-last-name").textContent =
    urlParams.get("last-name") || "N/A";
  document.getElementById("display-email").textContent =
    urlParams.get("email") || "N/A";
  document.getElementById("display-phone").textContent =
    urlParams.get("phone") || "N/A";
  document.getElementById("display-business").textContent =
    urlParams.get("business") || "N/A";
  document.getElementById("display-timestamp").textContent =
    urlParams.get("timestamp") || "N/A";
});
