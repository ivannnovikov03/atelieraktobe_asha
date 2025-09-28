let cart = [];

function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
}

function updateCart() {
  let cartItems = document.getElementById("cart-items");
  let cartTotal = document.getElementById("cart-total");
  let cartCount = document.getElementById("cart-count");
  
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    let li = document.createElement("li");
    li.textContent = `${item.name} - ${item.price} ₸`;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = total;
  cartCount.textContent = cart.length;
}

function checkout() {
  document.getElementById("order-form").style.display = "block";
  window.scrollTo(0, document.body.scrollHeight);
}

function sendOrder(event) {
  event.preventDefault();
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let comment = document.getElementById("comment").value;

  alert(`Спасибо за заказ, ${name}! Мы свяжемся с вами по телефону ${phone}.`);
  cart = [];
  updateCart();
  document.getElementById("order-form").style.display = "none";
}
