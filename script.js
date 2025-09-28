// Данные товаров
const products = [
    { id: 1, name: "Футболка хлопковая", price: 1990, category: "Футболки" },
    { id: 2, name: "Джинсы скинни", price: 4990, category: "Джинсы" },
    { id: 3, name: "Платье коктейльное", price: 7990, category: "Платья" },
    { id: 4, name: "Рубашка офисная", price: 3590, category: "Рубашки" },
    { id: 5, name: "Куртка джинсовая", price: 8990, category: "Верхняя одежда" },
    { id: 6, name: "Юбка миди", price: 4290, category: "Юбки" },
    { id: 7, name: "Свитшот oversize", price: 4590, category: "Свитшоты" },
    { id: 8, name: "Брюки классические", price: 5590, category: "Брюки" },
    { id: 9, name: "Толстовка с капюшоном", price: 5290, category: "Толстовки" },
    { id: 10, name: "Шорты льняные", price: 3290, category: "Шорты" },
    { id: 11, name: "Пиджак строгий", price: 8990, category: "Пиджаки" },
    { id: 12, name: "Блузка шелковая", price: 6590, category: "Блузки" },
    { id: 13, name: "Кардиган вязаный", price: 5890, category: "Кардиганы" },
    { id: 14, name: "Бомбер спортивный", price: 7590, category: "Куртки" },
    { id: 15, name: "Комбинезон летний", price: 6990, category: "Комбинезоны" },
    { id: 16, name: "Жилет утепленный", price: 8290, category: "Верхняя одежда" },
    { id: 17, name: "Платье макси", price: 8990, category: "Платья" },
    { id: 18, name: "Футболка поло", price: 2990, category: "Футболки" },
    { id: 19, name: "Джинсы бойфренды", price: 5390, category: "Джинсы" },
    { id: 20, name: "Рубашка фланелевая", price: 4190, category: "Рубашки" },
    { id: 21, name: "Юбка-карандаш", price: 4790, category: "Юбки" },
    { id: 22, name: "Свитер кашемировый", price: 12990, category: "Свитера" },
    { id: 23, name: "Брюки зауженные", price: 4890, category: "Брюки" },
    { id: 24, name: "Толстовка с принтом", price: 4590, category: "Толстовки" },
    { id: 25, name: "Платье-рубашка", price: 5690, category: "Платья" },
    { id: 26, name: "Куртка кожаная", price: 15990, category: "Куртки" },
    { id: 27, name: "Блузка с жабо", price: 7290, category: "Блузки" },
    { id: 28, name: "Кардиган длинный", price: 7890, category: "Кардиганы" },
    { id: 29, name: "Жакет приталенный", price: 9590, category: "Пиджаки" },
    { id: 30, name: "Комплект домашний", price: 3890, category: "Домашняя одежда" }
];

// Корзина
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    updateCartCount();
    renderCart();
});

// Рендер товаров
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                ${product.name}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">${product.price} руб.</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    В корзину
                </button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Добавление в корзину
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    renderCart();
    saveCartToLocalStorage();
    
    // Анимация добавления
    showAddToCartAnimation();
}

// Показать анимацию добавления
function showAddToCartAnimation() {
    const animation = document.createElement('div');
    animation.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #4834d4;
        color: white;
        padding: 10px 20px;
        border-radius: 25px;
        z-index: 3000;
        animation: fadeOut 1s ease-in-out;
    `;
    animation.textContent = 'Товар добавлен в корзину!';
    document.body.appendChild(animation);
    
    setTimeout(() => {
        document.body.removeChild(animation);
    }, 1000);
}

// Обновление счетчика корзины
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Рендер корзины
function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; padding: 20px;">Корзина пуста</p>';
        cartTotal.textContent = '0';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image"></div>
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="cart-item-price">${item.price} руб. × ${item.quantity}</div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartItems.appendChild(cartItem);
    });
    
