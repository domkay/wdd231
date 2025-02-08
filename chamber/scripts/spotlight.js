// Function to fetch and display spotlight members
async function fetchSpotlightMembers() {
  try {
    const response = await fetch("data/members.json");
    const data = await response.json();

    const spotlightContainer = document.getElementById("spotlight-container");

    if (!data || data.length === 0) {
      console.error("No member data found.");
      spotlightContainer.innerHTML = "<p>No spotlight businesses found.</p>";
      return;
    }

    const eligibleMembers = data.filter(
      (member) => member.membershipLevel === 2 || member.membershipLevel === 3
    );

    if (eligibleMembers.length === 0) {
      spotlightContainer.innerHTML =
        "<p>No eligible spotlight businesses found.</p>";
      return;
    }

    const spotlightMembers = [];
    while (spotlightMembers.length < 3 && eligibleMembers.length > 0) {
      const randomIndex = Math.floor(Math.random() * eligibleMembers.length);
      spotlightMembers.push(eligibleMembers.splice(randomIndex, 1)[0]);
    }

    if (spotlightMembers.length === 0) {
      // If no members where eligible
      spotlightContainer.innerHTML =
        "<p>No eligible spotlight businesses found.</p>";
      return;
    }

    spotlightContainer.innerHTML = ""; // Clear loading message

    spotlightMembers.forEach((member) => {
      const memberCard = document.createElement("div");
      memberCard.classList.add("spotlight-card");

      // Add error handling for images
      const img = document.createElement("img");
      img.src = `images/${member.image}`;
      img.dataset.src = `images/${member.image}`; // For lazy loading
      img.alt = `${member.name} logo`; // More descriptive alt text
      img.width = 100;
      img.loading = "lazy";

      img.onerror = () => {
        console.error(`Error loading image for ${member.name}`);
        img.src = "images/missing.png"; // Or a default placeholder image
      };

      memberCard.innerHTML = `
                <div class="member-info">
                  <h3>${member.name}</h3>
                  <p>${member.category}</p>
                </div>
                <div class="member-details">
                  <div>
                    ${img.outerHTML}
                  </div>
                  <div>
                    
                    <p>${member.address}</p>
                    <p>Phone: ${member.phone}</p>
                    <p><a href="${member.website}" target="_blank">Visit Website</a></p>
                  </div>
                </div>
                
                
            `;

      spotlightContainer.appendChild(memberCard);
    });
  } catch (error) {
    console.error("Error fetching or displaying spotlight members:", error);
    const spotlightContainer = document.getElementById("spotlight-container");
    spotlightContainer.innerHTML =
      "<p>Failed to load spotlight businesses. Please try again later.</p>";
  }
}

fetchSpotlightMembers();
