// Fetch and display featured products on the home page
async function fetchFeaturedProducts() {
  try {
    const response = await fetch("data/products.json");
    if (!response.ok) throw new Error("Failed to fetch product data");
    const products = await response.json();
    return getRandomProducts(products, 8); // Get 8 random products
  } catch (error) {
    console.error("Error fetching product data:", error);
    return [];
  }
}

// Function to get random products from the array
function getRandomProducts(products, count) {
  // Shuffle the products array
  const shuffledProducts = products.sort(() => 0.5 - Math.random());
  // Return the first `count` products
  return shuffledProducts.slice(0, count);
}

// Display featured products on the home page
function displayFeaturedProducts(products) {
  const productGrid = document.querySelector(".product-grid");
  productGrid.innerHTML = "";

  if (products.length === 0) {
    productGrid.innerHTML = `<p class="no-products">No products found.</p>`;
    return;
  }

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" 
      loading="lazy" onerror="this.src='images/placeholder.png';">
            <h3>${product.name}</h3>
            <p><strong>Price:</strong> $${product.price}</p>
            <p><strong>Rating:</strong> ${product.rating}</p>
            <a href="products.html?search=${encodeURIComponent(
              product.name
            )}" class="view-details">View Details</a>
        `;
    productGrid.appendChild(productCard);
  });
}

// Load featured products on the home page
document.addEventListener("DOMContentLoaded", async () => {
  const products = await fetchFeaturedProducts();
  displayFeaturedProducts(products);
});
