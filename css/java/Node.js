// STEP 1: Define Products
// Create products with name, price, quantity (initially 0), productId, and image URL

const products = [
    {
      name: "Cherry",
      price: 5,
      quantity: 0,
      productId: 100,
      image: "./images/cherry.jpg"
    },
    {
      name: "Orange",
      price: 3,
      quantity: 0,
      productId: 101,
      image: "./images/orange.jpg"
    },
    {
      name: "Strawberry",
      price: 4,
      quantity: 0,
      productId: 102,
      image: "./images/strawberry.jpg"
    }
  ];
  
  // STEP 2: Cart Functionality
  let cart = []; // Initialize empty cart array
  let totalPaid = 0; // Global variable to track total cash received
  
  // Add product to cart
  function addProductToCart(productId) {
    const product = products.find(p => p.productId === productId); // Find product by ID
    if (product) {
      const cartItem = cart.find(item => item.productId === productId); // Check if item is already in cart
      if (cartItem) {
        cartItem.quantity++; // Increase quantity if already in cart
      } else {
        cart.push({ ...product, quantity: 1 }); // Add new product to cart with quantity 1
      }
      renderCart(); // Update the cart display after changes
    }
  }
  
  // Increase the quantity of a product in the cart
  function increaseQuantity(productId) {
    const cartItem = cart.find(item => item.productId === productId);
    if (cartItem) {
      cartItem.quantity++;
      renderCart(); // Update cart UI
    }
  }
  
  // Decrease the quantity of a product in the cart, and remove it if quantity reaches 0
  function decreaseQuantity(productId) {
    const cartItem = cart.find(item => item.productId === productId);
    if (cartItem) {
      cartItem.quantity--;
      if (cartItem.quantity === 0) {
        removeProductFromCart(productId);
      } else {
        renderCart(); // Update cart UI
      }
    }
  }
  
  // Remove product from cart
  function removeProductFromCart(productId) {
    cart = cart.filter(item => item.productId !== productId); // Remove item from cart
    renderCart(); // Update cart UI
  }
  
  // STEP 3: Checkout Functionality
  
  // Calculate total cart value
  function cartTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }
  
  // Function to handle payments and return the change or remaining balance
  function pay(amount) {
    totalPaid += amount; // Add the amount paid
    const total = cartTotal(); // Get total from cart
    const balance = totalPaid - total; // Calculate balance
  
    if (balance >= 0) {
      totalPaid = 0; // Reset totalPaid after successful payment
      cart = []; // Empty the cart after payment
      renderCart(); // Update cart UI
    }
  
    return balance; // Return balance (positive if overpaid, negative if underpaid)
  }
  
  // STEP 4: Rendering the Cart and Product List to the UI
  
  // Function to display products in the storefront
  function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear previous content
  
    products.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product');
  
      productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>Price: $${product.price}</p>
        <button onclick="addProductToCart(${product.productId})">Add to Cart</button>
      `;
  
      productList.appendChild(productDiv);
    });
  }
  
  // Function to display cart items
  function renderCart() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = ''; // Clear previous cart content
  
    cart.forEach(item => {
      const cartItemDiv = document.createElement('div');
      cartItemDiv.classList.add('cart-item');
  
      cartItemDiv.innerHTML = `
        <h4>${item.name}</h4>
        <p>Price: $${item.price}</p>
        <p>Quantity: ${item.quantity}</p>
        <button onclick="increaseQuantity(${item.productId})">+</button>
        <button onclick="decreaseQuantity(${item.productId})">-</button>
        <button onclick="removeProductFromCart(${item.productId})">Remove</button>
      `;
  
      cartList.appendChild(cartItemDiv);
    });
  
    // Show the cart total
    const cartTotalDiv = document.getElementById('cart-total');
    cartTotalDiv.innerHTML = `Total: $${cartTotal()}`;
  }
  
  // Function to handle cash payment form submission
  function handlePayment() {
    const paymentInput = document.getElementById('payment-input').value;
    const paymentAmount = parseFloat(paymentInput);
  
    const balance = pay(paymentAmount); // Call the pay function
  
    const receiptDiv = document.getElementById('receipt');
    if (balance > 0) {
      receiptDiv.innerHTML = `Change to be returned: $${balance}. Thank you for your purchase!`;
    } else if (balance < 0) {
      receiptDiv.innerHTML = `Remaining balance: $${Math.abs(balance)}. Please provide more cash.`;
    } else {
      receiptDiv.innerHTML = `Exact amount paid. Thank you for your purchase!`;
    }
  }
  
  // Initial rendering
  renderProducts();
  renderCart();