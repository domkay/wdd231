// Display the members

document.addEventListener("DOMContentLoaded", () => {
  const url = "data/members.json";
  const cards = document.querySelector("#cards");
  const gridViewButton = document.getElementById("grid-view");
  const listViewButton = document.getElementById("list-view");

  async function getCompanyData() {
    const response = await fetch(url);
    const data = await response.json();
    displayCompanies(data);
  }

  const displayCompanies = (companies) => {
    cards.innerHTML = ""; // Clear existing content
    companies.forEach((company) => {
      let card = document.createElement("section");
      card.classList.add("card");
      let fullName = document.createElement("h2");
      let address = document.createElement("p");
      let phone = document.createElement("p");
      let website = document.createElement("a");
      let description = document.createElement("p");
      let portrait = document.createElement("img");

      fullName.textContent = company.name;
      address.textContent = `Address: ${company.address}`;
      phone.textContent = `Phone: ${company.phone}`;
      website.textContent = company.website;
      website.href = company.website;
      website.target = "_blank"; // Open link in new tab
      description.textContent = company.description;

      portrait.setAttribute("src", `images/${company.image}`); // Assuming images are stored in an "images" folder
      portrait.setAttribute("alt", `Logo of ${company.name}`);
      portrait.setAttribute("loading", "lazy");
      portrait.setAttribute("width", "100");
      portrait.setAttribute("height", "100");

      card.appendChild(fullName);
      card.appendChild(address);
      card.appendChild(phone);
      card.appendChild(website);
      card.appendChild(description);
      card.appendChild(portrait);

      cards.appendChild(card);
    });
  };

  gridViewButton.addEventListener("click", () => {
    cards.classList.add("grid-view");
    cards.classList.remove("list-view");
  });

  listViewButton.addEventListener("click", () => {
    cards.classList.add("list-view");
    cards.classList.remove("grid-view");
  });

  getCompanyData();
});
