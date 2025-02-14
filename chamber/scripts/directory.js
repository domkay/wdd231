// Wait for the DOM to load before executing
document.addEventListener("DOMContentLoaded", () => {
  const url = "data/members.json";
  const cards = document.querySelector("#cards");
  const gridViewButton = document.getElementById("grid-view");
  const listViewButton = document.getElementById("list-view");

  // Fetch company data from JSON
  async function getCompanyData() {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to load company data");
      const data = await response.json();
      displayCompanies(data);
    } catch (error) {
      console.error("Error fetching company data:", error);
      cards.innerHTML =
        "<p>Error loading company directory. Please try again later.</p>";
    }
  }

  // Display companies in the directory
  function displayCompanies(companies) {
    cards.innerHTML = ""; // Clear existing content
    companies.forEach((company) => {
      const card = document.createElement("section");
      card.classList.add("card");

      const fullName = document.createElement("h2");
      fullName.textContent = company.name;

      const address = document.createElement("p");
      address.textContent = `📍 Address: ${company.address}`;

      const phone = document.createElement("p");
      phone.textContent = `📞 Phone: ${company.phone}`;

      const website = document.createElement("a");
      website.textContent = company.website;
      website.href = company.website;
      website.target = "_blank"; // Open link in new tab
      website.rel = "noopener noreferrer"; // Security best practice

      const description = document.createElement("p");
      description.textContent = company.description;

      const portrait = document.createElement("img");
      portrait.setAttribute("src", `images/${company.image}`); // Assuming images are stored in "images" folder
      portrait.setAttribute("alt", `Logo of ${company.name}`);
      portrait.setAttribute("loading", "lazy");
      portrait.setAttribute("width", "100");
      portrait.setAttribute("height", "100");

      // Append elements to the card
      card.append(fullName, portrait, description, address, phone, website);
      cards.appendChild(card);
    });
  }

  // View mode toggle
  gridViewButton.addEventListener("click", () => {
    cards.classList.add("grid-view");
    cards.classList.remove("list-view");
  });

  listViewButton.addEventListener("click", () => {
    cards.classList.add("list-view");
    cards.classList.remove("grid-view");
  });

  // Load company data on page load
  getCompanyData();
});
