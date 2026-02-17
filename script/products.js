// Load Categories
const loadCategories = () => {
  fetch("https://fakestoreapi.com/products/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data));
};

// Display Categories
const displayCategories = (categories) => {
  const container = document.getElementById("category-container");

  container.innerHTML = "";

  // remove active from all
  const removeActive = () => {
    const buttons = container.querySelectorAll("button");
    buttons.forEach((btn) => {
      btn.classList.remove("btn-primary");
      btn.classList.add("btn-outline");
    });
  };

  // All button
  const allBtn = document.createElement("button");
  allBtn.className = "btn btn-primary btn-sm";
  allBtn.innerText = "All";
  loadAllProducts();

  allBtn.onclick = () => {
    removeActive();
    allBtn.classList.remove("btn-outline");
    allBtn.classList.add("btn-primary");
    loadAllProducts();
  };

  container.append(allBtn);

  // Dynamic category buttons
  for (const category of categories) {
    const btn = document.createElement("button");

    btn.className = "btn btn-outline btn-sm";
    btn.innerText = category;

    btn.onclick = () => {
      removeActive();
      btn.classList.remove("btn-outline");
      btn.classList.add("btn-primary");
      loadCategoryProducts(category);
    };

    container.append(btn);
  }
};

// Load Category Products
loadCategories();

const showLoader = () => {
  document.getElementById("loader").classList.remove("hidden");
};

const hideLoader = () => {
  document.getElementById("loader").classList.add("hidden");
};

// Load ALL Products
const loadAllProducts = () => {
  showLoader();

  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      displayAllProducts(data);
      hideLoader();
    });
};

// Load Category Products
const loadCategoryProducts = (category) => {
  showLoader();

  fetch(`https://fakestoreapi.com/products/category/${category}`)
    .then((res) => res.json())
    .then((data) => {
      displayAllProducts(data);
      hideLoader();
    });
};

// Display ALL Products
const displayAllProducts = (products) => {
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
            ${product.title.length > 25 ? product.title.slice(0, 25) + "..." : product.title}
          </h3>

          <!-- Price -->
          <p class="font-bold text-lg mt-2">$${product.price}</p>

          <!-- Buttons -->
          <div class="flex gap-3 mt-4">
            <button onclick="loadProductDetails(${product.id})"
              class="cursor-pointer flex-1 border border-gray-300 rounded-lg py-2 text-sm hover:bg-gray-100 transition">
              <i class="fa-regular fa-eye"></i> Details
            </button>

            <button
              class="flex-1 bg-indigo-600 text-white rounded-lg py-2 text-sm hover:bg-indigo-700 transition">
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
  showLoader();
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((data) => {
      showProductModal(data);
      hideLoader();
    });
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
