document.addEventListener('DOMContentLoaded', function() {
    // Инициализация корзины
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartButton = document.getElementById('cart-button');
    const cartModal = document.getElementById('cart-modal');
    const cartItemsContainer = cartModal.querySelector('.cart-items');
    const totalPriceElement = cartModal.querySelector('.total-price');
    const cartCounters = document.querySelectorAll('.cart-counter');

    // Функция обновления счетчика
    function updateCartCounter() {
        const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
        cartCounters.forEach(counter => {
            counter.textContent = totalItems;
        });
    }

    // Функция обновления модального окна
    function updateCartModal() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        
        cart.forEach((item, index) => {
            const price = parseInt(item.price) || 0;
            total += price * (item.quantity || 1);
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.dataset.index = index;
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" width="80">
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p>${price} руб.</p>
                    <button class="remove-item">Удалить</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        
        totalPriceElement.textContent = total;
        
        // Добавляем обработчики для кнопок удаления
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = this.closest('.cart-item').dataset.index;
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCounter();
                updateCartModal();
            });
        });
    }

    // Обработчик добавления в корзину
    document.querySelectorAll('.cloth__button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const productCard = this.closest('.clothes__main');
            const product = {
                id: this.dataset.id,
                name: productCard.querySelector('.cloth__name h1').textContent,
                price: productCard.querySelector('.cloth__price p').textContent.replace('rub', '').trim(),
                image: productCard.querySelector('.clothes__img').src,
                quantity: 1
            };
            
            // Проверяем, есть ли уже такой товар в корзине
            const existingItem = cart.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity = (existingItem.quantity || 1) + 1;
            } else {
                cart.push(product);
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCounter();
            
            // Анимация добавления
            const originalText = this.textContent;
            this.textContent = 'Добавлено!';
            setTimeout(() => {
                this.textContent = originalText;
            }, 1000);
        });
    });

    // Обработчик открытия корзины
    cartButton.addEventListener('click', function(e) {
        e.preventDefault();
        cartModal.style.display = 'block';
        updateCartModal();
    });

    // Закрытие модального окна
    cartModal.querySelector('.close-cart').addEventListener('click', function() {
        cartModal.style.display = 'none';
    });

    // Закрытие при клике вне окна
    window.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Инициализация
    updateCartCounter();
});