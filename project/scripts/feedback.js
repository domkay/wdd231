// Fetch products to populate the product dropdown
async function fetchProducts() {
  try {
    const response = await fetch("data/products.json");
    if (!response.ok) throw new Error("Failed to fetch product data");
    return await response.json();
  } catch (error) {
    console.error("Error fetching product data:", error);
    return [];
  }
}

// Populate the product dropdown based on the selected category
async function populateProductDropdown(category = "all") {
  const products = await fetchProducts();
  const productDropdown = document.getElementById("product");

  // Clear existing options
  productDropdown.innerHTML =
    "<option value=''>-- Select a Product --</option>";

  // Filter products by category
  const filteredProducts =
    category === "all"
      ? products
      : products.filter(
          (product) => product.category.toLowerCase() === category.toLowerCase()
        );

  // Add filtered products to the dropdown
  filteredProducts.forEach((product) => {
    const option = document.createElement("option");
    option.value = product.name;
    option.textContent = product.name;
    productDropdown.appendChild(option);
  });
}

// Save feedback to localStorage
function saveFeedback(feedback) {
  let feedbackList = JSON.parse(localStorage.getItem("feedback")) || [];
  feedbackList.push(feedback);
  localStorage.setItem("feedback", JSON.stringify(feedbackList));
}

// Display submitted feedback
function displayFeedback() {
  const feedbackList = JSON.parse(localStorage.getItem("feedback")) || [];
  const feedbackListContainer = document.getElementById("feedbackList");

  feedbackListContainer.innerHTML = "";

  feedbackList.forEach((feedback) => {
    const feedbackItem = document.createElement("div");
    feedbackItem.classList.add("feedback-item");
    feedbackItem.innerHTML = `
            <h3>${feedback.product}</h3>
            <p><strong>Rating:</strong> ${feedback.rating}</p>
            <p><strong>Review:</strong> ${feedback.review}</p>
            ${
              feedback.name
                ? `<p><strong>Name:</strong> ${feedback.name}</p>`
                : ""
            }
            ${
              feedback.email
                ? `<p><strong>Email:</strong> ${feedback.email}</p>`
                : ""
            }
        `;
    feedbackListContainer.appendChild(feedbackItem);
  });
}

// Handle form submission and category filter
document.addEventListener("DOMContentLoaded", () => {
  const categoryFilter = document.getElementById("category");
  const productDropdown = document.getElementById("product");
  const clearFiltersButton = document.getElementById("clearFilters");

  // Populate the product dropdown with all products initially
  populateProductDropdown();

  // Update the product dropdown when the category filter changes
  categoryFilter.addEventListener("change", () => {
    const selectedCategory = categoryFilter.value;
    populateProductDropdown(selectedCategory);
  });

  // Clear filters and show all products
  clearFiltersButton.addEventListener("click", () => {
    categoryFilter.value = "all";
    populateProductDropdown();
  });

  // Display submitted feedback
  displayFeedback();

  const feedbackForm = document.getElementById("feedbackForm");
  const confirmationMessage = document.getElementById("confirmationMessage");

  feedbackForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const product = productDropdown.value;
    const rating = document.getElementById("rating").value;
    const review = document.getElementById("review").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    const feedback = {
      product,
      rating,
      review,
      name,
      email,
      timestamp: new Date().toLocaleString(),
    };

    saveFeedback(feedback);
    displayFeedback();

    // Show confirmation message
    confirmationMessage.classList.remove("hidden");
    setTimeout(() => {
      confirmationMessage.classList.add("hidden");
    }, 3000);

    // Reset the form
    feedbackForm.reset();
  });
});
