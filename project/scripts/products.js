// Fetch and display products with filters and search functionality
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

// Function to get query parameters from the URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Pagination variables
let currentPage = 1;
const productsPerPage = 8; // Number of products per page

// Display products dynamically
function displayProducts(products, page = 1) {
  const productGrid = document.querySelector(".product-grid");
  productGrid.innerHTML = "";

  if (products.length === 0) {
    productGrid.innerHTML = `<p class="no-products">No products found.</p>`;
    return;
  }

  // Calculate the range of products to display
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);

  // Display the products for the current page
  paginatedProducts.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    // Add a class if the product name matches the search query
    const searchQuery = getQueryParam("search")?.toLowerCase();
    if (searchQuery && product.name.toLowerCase().includes(searchQuery)) {
      productCard.classList.add("highlighted-product");
    }

    productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='images/placeholder.png';">
            <h3>${product.name}</h3>
            <p><strong>Price:</strong> $${product.price}</p>
            <p><strong>Rating:</strong> ${product.rating}</p>
            <button class="view-details" data-id="${product.id}">View Details</button>
        `;
    productGrid.appendChild(productCard);
  });

  // Attach modal functionality to "View Details" buttons
  document.querySelectorAll(".view-details").forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = e.target.dataset.id;
      const product = products.find((p) => p.id == productId);
      if (product) {
        openProductModal(product);
      }
    });
  });

  // Update pagination controls
  updatePaginationControls(products.length, page);
}

// Update pagination controls
function updatePaginationControls(totalProducts, currentPage) {
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const prevButton = document.getElementById("prev-page");
  const nextButton = document.getElementById("next-page");
  const pageInfo = document.getElementById("page-info");

  // Update page info
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

  // Enable/disable previous button
  prevButton.disabled = currentPage === 1;

  // Enable/disable next button
  nextButton.disabled = currentPage === totalPages;
}

// Handle pagination button clicks
function setupPagination(products) {
  const prevButton = document.getElementById("prev-page");
  const nextButton = document.getElementById("next-page");

  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayProducts(products, currentPage);
    }
  });

  nextButton.addEventListener("click", () => {
    const totalPages = Math.ceil(products.length / productsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      displayProducts(products, currentPage);
    }
  });
}

// Open Modal View
function openProductModal(product) {
  const modal = document.querySelector(".modal");
  modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <h2>${product.name}</h2>
            <p><strong>Price:</strong> $${product.price}</p>
            <p><strong>Rating:</strong> ${product.rating}</p>
            <p>${product.description}</p>
        </div>
    `;
  modal.classList.add("active");

  // Close modal when the close button is clicked
  modal
    .querySelector(".close-modal")
    .addEventListener("click", () => closeProductModal());

  // Close modal when clicking outside the modal content
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeProductModal();
    }
  });
}

// Close Modal View
function closeProductModal() {
  const modal = document.querySelector(".modal");
  modal.classList.remove("active");
}

// Apply filters and search functionality
function applyFilters(products) {
  const category = document.getElementById("category-filter").value;
  const price = document.getElementById("price-filter").value;
  const searchQuery = document.getElementById("search-bar").value.toLowerCase();

  let filteredProducts = products.filter(
    (product) =>
      (category === "all" ||
        product.category.toLowerCase() === category.toLowerCase()) &&
      (price === "all" || checkPriceRange(product.price, price)) &&
      (searchQuery === "" || product.name.toLowerCase().includes(searchQuery))
  );

  // Reset to the first page when filters are applied
  currentPage = 1;
  displayProducts(filteredProducts, currentPage);
}

function checkPriceRange(price, range) {
  if (range === "1000+") return price >= 1000;
  if (range === "0-500") return price >= 0 && price <= 500;
  if (range === "500-1000") return price > 500 && price <= 1000;
  return true; // "all" or no price filter
}

// Grid and List View Toggle
function updateView() {
  const productGrid = document.querySelector(".product-grid");
  const gridViewBtn = document.getElementById("grid-view-btn");
  const listViewBtn = document.getElementById("list-view-btn");

  if (window.innerWidth <= 600) {
    productGrid.classList.add("list-view");
    gridViewBtn.disabled = true;
    listViewBtn.disabled = true;
  } else {
    productGrid.classList.remove("list-view");
    gridViewBtn.disabled = false;
    listViewBtn.disabled = false;
  }
}

// Handle grid and list view buttons
function setupViewToggle() {
  const productGrid = document.querySelector(".product-grid");
  const gridViewBtn = document.getElementById("grid-view-btn");
  const listViewBtn = document.getElementById("list-view-btn");

  gridViewBtn.addEventListener("click", () => {
    productGrid.classList.remove("list-view"); // Switch to grid view
  });

  listViewBtn.addEventListener("click", () => {
    productGrid.classList.add("list-view"); // Switch to list view
  });

  window.addEventListener("resize", updateView);
  updateView(); // Initialize on page load
}

// Reset all filters (category, price, and search) without affecting the grid/list view
function resetFilters(products) {
  // Reset the category filter to "all"
  document.getElementById("category-filter").value = "all";

  // Reset the price filter to "all"
  document.getElementById("price-filter").value = "all";

  // Clear the search bar
  document.getElementById("search-bar").value = "";

  // Reapply filters to display all products
  applyFilters(products);
}

// Load products and apply filters on change
document.addEventListener("DOMContentLoaded", async () => {
  const products = await fetchProducts();
  displayProducts(products, currentPage);
  setupViewToggle();
  setupPagination(products);

  // Get the search query from the URL
  const searchQuery = getQueryParam("search");

  // If a search query exists, populate the search bar and apply the filter
  if (searchQuery) {
    const searchBar = document.getElementById("search-bar");
    searchBar.value = decodeURIComponent(searchQuery); // Decode the query parameter
    applyFilters(products); // Apply the filter automatically
  }

  // Add event listeners for filters and search
  document
    .getElementById("category-filter")
    .addEventListener("change", () => applyFilters(products));
  document
    .getElementById("price-filter")
    .addEventListener("change", () => applyFilters(products));
  document
    .getElementById("search-bar")
    .addEventListener("input", () => applyFilters(products));

  // Add event listener for the Reset Filters button
  document
    .getElementById("reset-filters")
    .addEventListener("click", () => resetFilters(products));
});
