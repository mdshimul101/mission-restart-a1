let allProducts = [];

// Load Products
const loadProducts = () => {
  fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(data => {
      allProducts = data; // store globally
      displayProducts(data.slice(0, 3));
    });
};

// Display Products
const displayProducts = (products) => {
  // 1. get container & empty
  const container = document.getElementById("product-container");
  container.innerHTML = "";

  // 2. loop products
  for (const product of products) {
    // 3. create element
    const card = document.createElement("div");

    card.classList =
      "bg-white rounded-xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden";

    // 4. append design
    card.innerHTML = `
        <!-- Image -->
        <div class="bg-gray-200 p-8 flex justify-center">
          <img src="${product.image}"
               class="h-56 object-contain" />
        </div>

        <!-- Content -->
        <div class="p-5">

          <!-- Category + Rating -->
          <div class="flex justify-between items-center text-sm mb-2">
            <span class="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-xs">
              ${product.category}
            </span>

            <span class="text-gray-500 flex items-center gap-1">
              <i class="fa-solid fa-star text-yellow-500"></i>
              ${product.rating.rate} (${product.rating.count})
            </span>
          </div>

          <!-- Title -->
          <h3 class="font-semibold text-gray-800 line-clamp-2">
            ${product.title}
          </h3>

          <!-- Price -->
          <p class="font-bold text-lg mt-2">$${product.price}</p>

          <!-- Buttons -->
          <div class="flex gap-3 mt-4">
            <button onclick="loadProductDetails(${product.id})"
              class="cursor-pointer flex-1 border border-gray-300 rounded-lg py-2 text-sm hover:bg-gray-100 transition">
              <i class="fa-regular fa-eye"></i> Details
            </button>

            <button onclick="addToCart(${product.id})"
              class="cursor-pointer flex-1 bg-indigo-600 text-white rounded-lg py-2 text-sm hover:bg-indigo-700 transition">
              <i class="fa-solid fa-cart-shopping"></i> Add
            </button>
          </div>

        </div>
    `;

    // 5. append into container
    container.append(card);
  }
};




// Load Product Details
const loadProductDetails = (id) => {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((data) => showProductModal(data));
};

// Show Product Modal
const showProductModal = (product) => {
  const modalContent = document.getElementById("modal-content");

  modalContent.innerHTML = `
    <div class="grid md:grid-cols-2 gap-6 items-center">

      <!-- Image -->
      <div class="bg-gray-100 p-6 rounded-lg flex justify-center">
        <img src="${product.image}" class="h-64 object-contain">
      </div>

      <!-- Info -->
      <div>

        <span class="badge badge-primary mb-2">
          ${product.category}
        </span>

        <h2 class="text-xl font-bold mb-2">
          ${product.title}
        </h2>

        <p class="text-gray-600 text-sm mb-4">
          ${product.description}
        </p>

        <div class="flex items-center gap-3 mb-4">
          <span class="text-2xl font-bold text-indigo-600">
            $${product.price}
          </span>

          <span class="text-sm text-gray-500">
            <i class="fa-solid fa-star text-yellow-500"></i> ${product.rating.rate} (${product.rating.count})
          </span>
        </div>

        <!-- Actions -->
        <div class="flex gap-3">
          <button class="btn btn-primary flex-1">
            <i class="fa-solid fa-cart-shopping"></i>
            Add to Cart
          </button>

          <button class="btn btn-outline flex-1">
            Buy Now
          </button>
        </div>

      </div>
    </div>
  `;

  // open modal
  document.getElementById("productModal").showModal();
};



// Add To Cart
const addToCart = (id) => {

  // find clicked product
  const product = allProducts.find(p => p.id === id);

  // get existing cart
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // check if product already exists
  const existingProduct = cart.find(item => item.id === id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  // save again
  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();

  // alert("Product Added to Cart ✅");
};


// Update Cart Count
const updateCartCount = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const totalQuantity = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  document.getElementById("cart-count").innerText = totalQuantity;
};

// Open Cart Modal
const openCartModal = () => {
  document.getElementById("cart_modal").showModal();
  loadCartItems();
};

// Display Cart Items
const loadCartItems = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  displayCartItems(cart);
};

// Display Cart Items
const displayCartItems = (cart) => {
  const container = document.getElementById("cart-items");
  container.innerHTML = "";

  let total = 0;

  cart.forEach(product => {

    total += product.price * product.quantity;

    const div = document.createElement("div");

    div.className =
      "flex justify-between items-center bg-base-200 p-3 rounded-lg";

    div.innerHTML = `
      <div class="flex items-center gap-3">
        <img src="${product.image}" class="w-14 h-14 object-contain">

        <div>
          <h4 class="font-semibold text-sm line-clamp-1">
            ${product.title}
          </h4>
          <p class="text-xs text-gray-500">$${product.price}</p>
        </div>
      </div>

      <div class="flex items-center gap-2">

        <button onclick="decreaseQty(${product.id})"
          class="btn btn-xs">-</button>

        <span>${product.quantity}</span>

        <button onclick="increaseQty(${product.id})"
          class="btn btn-xs">+</button>

        <button onclick="removeItem(${product.id})"
          class="btn btn-xs btn-error text-white">
          <i class="fa-solid fa-trash"></i>
        </button>

      </div>
    `;

    container.append(div);
  });

  document.getElementById("cart-total").innerText =
    "$" + total.toFixed(2);
};

// Increase Quantity
const increaseQty = (id) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.find(p => p.id === id).quantity++;

  localStorage.setItem("cart", JSON.stringify(cart));

  loadCartItems();
  updateCartCount();
};

// Decrease Quantity
const decreaseQty = (id) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const item = cart.find(p => p.id === id);

  if (item.quantity > 1) item.quantity--;

  localStorage.setItem("cart", JSON.stringify(cart));

  loadCartItems();
  updateCartCount();
};

// Remove Item
const removeItem = (id) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart = cart.filter(item => item.id !== id);

  localStorage.setItem("cart", JSON.stringify(cart));

  loadCartItems();
  updateCartCount();
};

// clear cart
const clearCart = () => {
  localStorage.removeItem("cart");
  loadCartItems();
  updateCartCount();
};

// Call loadProducts
loadProducts();
updateCartCount(); // Initialize cart count on page load