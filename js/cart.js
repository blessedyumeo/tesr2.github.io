// cart.js - финальная рабочая версия
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация корзины
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // 1. Функции работы с корзиной
    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCounter();
        renderCartModal();
    }
    
    function updateCartCounter() {
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        document.querySelectorAll('.cart-counter').forEach(el => {
            el.textContent = totalItems;
        });
    }
    
    function renderCartModal() {
        const container = document.querySelector('.cart-items');
        const totalEl = document.querySelector('.total-price');
        
        if (!container || !totalEl) return;
        
        container.innerHTML = '';
        let total = 0;
        
        if (cart.length === 0) {
            container.innerHTML = '<p>Корзина пуста</p>';
            totalEl.textContent = '0';
            return;
        }
        
        cart.forEach((item, index) => {
            const price = parseInt(item.price) || 0;
            total += price * (item.quantity || 1);
            
            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <img src="${item.image}" alt="${item.name}" width="80">
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p>${price} руб. × ${item.quantity || 1}</p>
                    <button class="remove-item" data-index="${index}">Удалить</button>
                </div>
            `;
            container.appendChild(itemEl);
        });
        
        totalEl.textContent = total;
        
        // Обработчики удаления
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                if (!isNaN(index)) {
                    cart.splice(index, 1);
                    updateCart();
                }
            });
        });
    }

    // 2. Обработчики добавления товаров
    document.addEventListener('click', function(e) {
        // Для shop.html
        if (e.target.classList.contains('cloth__button')) {
            e.preventDefault();
            const card = e.target.closest('.clothes__main');
            if (!card) return;
            
            const product = {
                id: e.target.getAttribute('data-id'),
                name: card.querySelector('.cloth__name h1').textContent,
                price: card.querySelector('.cloth__price p').textContent.replace('rub', ''),
                image: card.querySelector('.clothes__img').src,
                quantity: 1
            };
            
            const existingItem = cart.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push(product);
            }
            
            updateCart();
            e.target.textContent = 'Добавлено!';
            setTimeout(() => e.target.textContent = 'Купить', 1500);
        }
        
        // Для product.html
        if (e.target.classList.contains('add-to-cart')) {
            e.preventDefault();
            const product = {
                id: e.target.getAttribute('data-id'),
                name: document.querySelector('.product-title').textContent,
                price: document.querySelector('.product-price').textContent.replace(' руб.', ''),
                image: document.querySelector('.main-image').src,
                size: document.querySelector('.size-selector select')?.value,
                quantity: 1
            };
            
            const existingItem = cart.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push(product);
            }
            
            updateCart();
            e.target.textContent = 'Добавлено!';
            setTimeout(() => e.target.textContent = 'Добавить в корзину', 1500);
        }
    });

    // 3. Управление модальным окном
    const cartModal = document.getElementById('cart-modal');
    if (cartModal) {
        document.getElementById('cart-button').addEventListener('click', function(e) {
            e.preventDefault();
            cartModal.style.display = 'block';
            renderCartModal();
        });
        
        document.querySelector('.close-cart').addEventListener('click', function() {
            cartModal.style.display = 'none';
        });
        
        window.addEventListener('click', function(e) {
            if (e.target === cartModal) {
                cartModal.style.display = 'none';
            }
        });
        
        document.querySelector('.checkout-btn').addEventListener('click', function() {
            if (cart.length === 0) {
                alert('Корзина пуста!');
                return;
            }
            alert(`Заказ оформлен! Сумма: ${document.querySelector('.total-price').textContent} руб.`);
            cart = [];
            updateCart();
            cartModal.style.display = 'none';
        });
    }

    // Инициализация
    updateCartCounter();
    if (cartModal && cartModal.style.display === 'block') {
        renderCartModal();
    }
    
    console.log('Корзина инициализирована. Товаров:', cart.length);
});