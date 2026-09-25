let cart = [];


// ======================
// CART
// ======================

function addToCart(name, price) {

  const existing = cart.find(
    item => item.name === name
  );

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1
    });
  }

  updateCart();

  alert("✅ " + name + " បានបន្ថែមទៅកន្ត្រក");
}


function updateCart() {

  const cartCount =
    document.getElementById("cartCount");

  const cartItems =
    document.getElementById("cartItems");

  const cartTotal =
    document.getElementById("cartTotal");

  let totalQuantity = 0;
  let totalPrice = 0;

  cartItems.innerHTML = "";


  cart.forEach((item, index) => {

    totalQuantity += item.quantity;

    totalPrice +=
      item.price * item.quantity;


    const div =
      document.createElement("div");

    div.className = "cart-item";


    div.innerHTML = `
      <div>
        <strong>${item.name}</strong>
        <br>
        $${item.price.toFixed(2)}
        × ${item.quantity}
      </div>

      <button onclick="removeFromCart(${index})">
        លុប
      </button>
    `;


    cartItems.appendChild(div);

  });


  cartCount.textContent =
    totalQuantity;

  cartTotal.textContent =
    totalPrice.toFixed(2);


  document.getElementById("checkoutTotal")
    .textContent =
    totalPrice.toFixed(2);
}


function removeFromCart(index) {

  cart.splice(index, 1);

  updateCart();
}


function openCart() {

  updateCart();

  document.getElementById("cartModal")
    .style.display = "flex";
}


function closeCart() {

  document.getElementById("cartModal")
    .style.display = "none";
}


// ======================
// CHECKOUT
// ======================

function openCheckout() {

  if (cart.length === 0) {

    alert("🛒 កន្ត្រករបស់អ្នកទទេ!");

    return;
  }


  closeCart();

  updateCart();

  document.getElementById("checkoutModal")
    .style.display = "flex";
}


function closeCheckout() {

  document.getElementById("checkoutModal")
    .style.display = "none";
}


// ======================
// PLACE ORDER
// ======================

document.getElementById("checkoutForm")
  .addEventListener("submit", function(event) {

    event.preventDefault();


    const name =
      document.getElementById("customerName").value;

    const phone =
      document.getElementById("customerPhone").value;

    const address =
      document.getElementById("customerAddress").value;

    const payment =
      document.getElementById("paymentMethod").value;


    let total = 0;

    cart.forEach(item => {

      total +=
        item.price * item.quantity;

    });


    let orderText = "";


    cart.forEach(item => {

      orderText +=
        `${item.name} x ${item.quantity}\n`;

    });


    alert(
      "✅ បញ្ជាទិញបានជោគជ័យ!\n\n" +

      "👤 ឈ្មោះ: " + name + "\n" +

      "📞 ទូរស័ព្ទ: " + phone + "\n" +

      "📍 អាសយដ្ឋាន: " + address + "\n\n" +

      "☕ Order:\n" +
      orderText +

      "\n💰 សរុប: $" +
      total.toFixed(2) +

      "\n💳 ការទូទាត់: " +
      payment
    );


    // Clear cart

    cart = [];

    updateCart();

    closeCheckout();

    document.getElementById("checkoutForm")
      .reset();

  });


// ======================
// HERO
// ======================

function scrollToMenu() {

  document.getElementById("menu")
    .scrollIntoView({
      behavior: "smooth"
    });
}


// ======================
// CHAT
// ======================

function toggleChat() {

  const chat =
    document.getElementById("chatBox");


  if (chat.style.display === "flex") {

    chat.style.display = "none";

  } else {

    chat.style.display = "flex";

  }
}


function handleChatKey(event) {

  if (event.key === "Enter") {

    sendMessage();

  }
}


function sendMessage() {

  const input =
    document.getElementById("chatInput");

  const message =
    input.value.trim();


  if (!message) return;


  addMessage(message, "user");

  input.value = "";


  setTimeout(() => {

    const response =
      getBotResponse(message);

    addMessage(response, "bot");

  }, 500);
}


function addMessage(message, type) {

  const messages =
    document.getElementById("chatMessages");


  const div =
    document.createElement("div");


  div.className =
    type === "user"
      ? "user-message"
      : "bot-message";


  div.textContent = message;


  messages.appendChild(div);


  messages.scrollTop =
    messages.scrollHeight;
}


function getBotResponse(message) {

  message =
    message.toLowerCase();


  if (
    message.includes("សួស្តី") ||
    message.includes("hello") ||
    message.includes("hi")
  ) {

    return "សួស្តី 👋 សូមស្វាគមន៍មកកាន់ Bean & Brew!";
  }


  if (
    message.includes("menu") ||
    message.includes("ម៉ឺនុយ")
  ) {

    return "☕ យើងមាន Espresso $3, Cappuccino $4.50, Iced Coffee $4 និង Latte $4.50។";
  }


  if (
    message.includes("price") ||
    message.includes("តម្លៃ")
  ) {

    return "💰 កាហ្វេរបស់យើងចាប់ពី $3.00។";
  }


  if (
    message.includes("order") ||
    message.includes("ទិញ")
  ) {

    return "🛒 ជ្រើសកាហ្វេ → បន្ថែមទៅកន្ត្រក → Checkout → បញ្ចូលព័ត៌មានដឹកជញ្ជូន។";
  }


  return "☕ អរគុណសម្រាប់សារ! អ្នកអាចសួរអំពី ម៉ឺនុយ តម្លៃ ឬការបញ្ជាទិញ។";
}
// ABA QR Payment

function showQR() {
  const method =
    document.getElementById("paymentMethod").value;

  const qr =
    document.getElementById("qrPayment");

  if (method === "QR Payment") {
    qr.style.display = "block";
  } else {
    qr.style.display = "none";
  }
}

