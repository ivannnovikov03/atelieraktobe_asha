let cart = [];

function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
}

function updateCart() {
  const itemsEl = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  const countEl = document.getElementById('cart-count');

  itemsEl.innerHTML = '';
  let total = 0;
  cart.forEach((it, i) => {
    total += it.price;
    const li = document.createElement('li');
    li.textContent = `${it.name} — ${it.price} ₸`;
    itemsEl.appendChild(li);
  });

  totalEl.textContent = total;
  countEl.textContent = cart.length;
}

function checkout() {
  if (cart.length === 0) { alert('Корзина пуста'); return; }
  document.getElementById('order-form').style.display = 'block';
  window.scrollTo(0, document.body.scrollHeight);
}

function sendOrder(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const comment = document.getElementById('comment').value.trim();

  // Пока простой alert — позже можно отправлять в Telegram/email
  alert(`Спасибо ${name}! Заказ принят. Мы свяжемся по ${phone}.`);
  cart = [];
  updateCart();
  document.getElementById('order-form').style.display = 'none';
}
