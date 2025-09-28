let cart = [];
const cartItems = document.getElementById("cart-items");

document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", (e) => {
    const product = e.target.parentElement.querySelector("h3").innerText;
    cart.push(product);
    renderCart();
  });
});

function renderCart() {
  cartItems.innerHTML = "";
  cart.forEach(item => {
    let li = document.createElement("li");
    li.innerText = item;
    cartItems.appendChild(li);
  });
}

document.getElementById("checkout").addEventListener("click", () => {
  alert("Ваш заказ оформлен! Оператор свяжется с вами.");
});

document.getElementById("contact-operator").addEventListener("click", () => {
  window.open("https://wa.me/77000000000", "_blank");
});
