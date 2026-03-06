// ============================
// Load Cart
// ============================
const loadCart = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  displayCart(cart);
};

// Show Product Details
const displayCart = (cart) => {
  const container = document.getElementById("cart-container");
  container.innerHTML = "";

  let total = 0;

  cart.forEach((product) => {

    total += product.price * product.quantity;

    const div = document.createElement("div");

    div.className =
      "bg-white p-4 rounded-lg shadow flex items-center justify-between";

    div.innerHTML = `
        <div class="flex items-center gap-4">
          <img src="${product.image}" class="w-20 h-20 object-contain">

          <div>
            <h3 class="font-semibold">${product.title}</h3>
            <p class="text-gray-500">$${product.price}</p>
          </div>
        </div>

        <div class="flex items-center gap-3">

          <button onclick="decreaseQty(${product.id})"
            class="px-3 py-1 bg-gray-200 rounded">-</button>

          <span class="font-semibold">${product.quantity}</span>

          <button onclick="increaseQty(${product.id})"
            class="px-3 py-1 bg-gray-200 rounded">+</button>

          <button onclick="removeItem(${product.id})"
            class="ml-4 text-red-500">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
    `;

    container.append(div);
  });

  document.getElementById("total-price").innerText =
    "$" + total.toFixed(2);
};

// Increase Quantity
const increaseQty = (id) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const item = cart.find(p => p.id === id);
  item.quantity += 1;

  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart(cart);
};

// Decrease Quantity
const decreaseQty = (id) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const item = cart.find(p => p.id === id);

  if (item.quantity > 1) {
    item.quantity -= 1;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart(cart);
};

// Remove Item
const removeItem = (id) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart = cart.filter(item => item.id !== id);

  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart(cart);
};


loadCart();