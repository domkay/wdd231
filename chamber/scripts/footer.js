const currentYear = new Date().getFullYear();
document.getElementById("currentYear").textContent = currentYear;
// Get the last modified date of the HTML document
const lastModified = document.lastModified;

// Display the last modified date in the paragraph
document.getElementById("last-modified").textContent += lastModified;
