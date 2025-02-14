// Function to calculate the difference in days between two dates
function getDaysDifference(previousDate, currentDate) {
  return Math.floor((currentDate - previousDate) / (1000 * 60 * 60 * 24)); // Convert to days
}

// Function to update the visit message
function updateVisitMessage() {
  const visitMessage = document.getElementById("visitMessage");
  const lastVisit = localStorage.getItem("lastVisit");
  const currentDate = Date.now();

  if (!lastVisit) {
    visitMessage.textContent =
      "Welcome! Let us know if you have any questions.";
  } else {
    const daysSinceLastVisit = getDaysDifference(
      Number(lastVisit),
      currentDate
    );
    visitMessage.textContent =
      daysSinceLastVisit < 1
        ? "Back so soon! Awesome!"
        : `You last visited ${daysSinceLastVisit} ${
            daysSinceLastVisit === 1 ? "day" : "days"
          } ago.`;
  }

  localStorage.setItem("lastVisit", currentDate); // Store current date
}

// Fetch and display activities
async function displayActivities() {
  const gridContainer = document.querySelector(".grid-container");

  try {
    const response = await fetch("data/activities.json");
    const activities = await response.json();

    gridContainer.innerHTML = ""; // Clear previous content

    activities.forEach((activity) => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h2>${activity.title}</h2>
        <figure>
            <img src="${activity.image}" alt="${activity.title}" loading="lazy">
        </figure>
        <address>${activity.address}</address>
        <p>${activity.description}</p>
        <button>Learn More</button>
      `;

      gridContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching activities:", error);
    gridContainer.innerHTML =
      "<p>Failed to load activities. Please try again later.</p>";
  }
}

// Run functions on page load
updateVisitMessage();
displayActivities();
