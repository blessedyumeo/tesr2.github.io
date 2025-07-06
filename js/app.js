let items = document.querySelectorAll('.slider .slide img');
let next = document.getElementById('next')
let prev = document.getElementById('prev')
let active = 3;

function loadShow(){
    let stt = 0
    items[active].style.transform = `none`;
    items[active].style.zIndex = 1
    items[active].style.filter='none'
    items[active].style.opacity = 1
    for (var i = active +1; i<items.length;i++){
        stt++;
        items[i].style.transform = `translateX(${120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(-1deg)`;
        items[i].style.zIndex = -stt
        items[i].style.filter='blur(5px)'
        items[i].style.opacity = stt>2?0:0.6
    }
    stt=0
    for(var i = active -1;i>=0;i--){
        stt++
        items[i].style.transform = `translateX(${-120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(1deg)`;
        items[i].style.zIndex = -stt
        items[i].style.filter='blur(5px)'
        items[i].style.opacity = stt>2?0:0.6

    }
}
loadShow()
next.onclick = function(){
    active=active +1 < items.length?active+1:active;
    loadShow()
}
prev.onclick = function() {
    active = active - 1 >= 0 ? active - 1 : active;
    loadShow(); // Аналогично для кнопки "назад"
};
function autoSlide() {
    active = (active + 1) % items.length; // переходим к следующему слайду, если дойдем до последнего, вернемся к первому
    loadShow(); // обновляем отображение
}

// Запускаем авто-скроллинг каждые 3 секунды
let autoSlideInterval = setInterval(autoSlide, 5000);
////////////////////////////////////
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.clothes__img');

    images.forEach(img => {
        const originalSrc = img.src; // Сохраняем исходное изображение
        const hoverSrc = img.getAttribute('data-hover'); // Получаем изображение для hover

        img.addEventListener('mouseenter', () => {
            img.src = hoverSrc; // Меняем изображение при наведении
        });

        img.addEventListener('mouseleave', () => {
            img.src = originalSrc; // Возвращаем исходное изображение
        });
    });
});
// Корзина
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Элементы
const cartButton = document.getElementById('cart-button');
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = cartModal.querySelector('.cart-items');
const totalPriceElement = cartModal.querySelector('.total-price');

// Обновление счетчика корзины
function updateCartCounter() {
    const counters = document.querySelectorAll('.cart-counter');
    counters.forEach(counter => {
        counter.textContent = cart.length;
    });
}

// Обновление модального окна корзины
function updateCartModal() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        total += parseInt(item.price);
        cartItemsContainer.innerHTML += `
            <div class="cart-item" data-index="${index}">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p>${item.price} руб.</p>
                    <button class="remove-item">Удалить</button>
                </div>
            </div>
        `;
    });
    
    totalPriceElement.textContent = total;
    
    // Добавляем обработчики для кнопок удаления
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.closest('.cart-item').getAttribute('data-index');
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCounter();
            updateCartModal();
        });
    });
}

// Добавление в корзину
document.querySelectorAll('.cloth__button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const productCard = this.closest('.clothes__main');
        const product = {
            id: this.getAttribute('data-id'),
            name: productCard.querySelector('.cloth__name h1').textContent,
            price: productCard.querySelector('.cloth__price p').textContent.replace('rub', ''),
            image: productCard.querySelector('.clothes__img').src,
            size: 'M' // Можно добавить выбор размера
        };
        
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCounter();
        updateCartModal();
        
        // Анимация добавления
        this.textContent = 'Добавлено!';
        setTimeout(() => {
            this.textContent = 'Купить';
        }, 1000);
    });
});

// Управление модальным окном
cartButton.addEventListener('click', (e) => {
    e.preventDefault();
    cartModal.style.display = 'block';
});

cartModal.querySelector('.close-cart').addEventListener('click', () => {
    cartModal.style.display = 'none';
});

// Закрытие по клику вне окна
window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    updateCartCounter();
    updateCartModal();
});
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация корзины
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartButton = document.getElementById('cart-button');
    const cartModal = document.getElementById('cart-modal');
    
    // Функция обновления счетчика
    function updateCartCounter() {
        const counters = document.querySelectorAll('.cart-counter');
        counters.forEach(counter => {
            counter.textContent = cart.length;
        });
    }
    
    // Функция обновления модального окна
    function updateCartModal() {
        const cartItems = cartModal.querySelector('.cart-items');
        const totalPrice = cartModal.querySelector('.total-price');
        
        cartItems.innerHTML = '';
        let total = 0;
        
        cart.forEach((item, index) => {
            total += parseInt(item.price);
            cartItems.innerHTML += `
                <div class="cart-item" data-index="${index}">
                    <img src="${item.image}" alt="${item.name}" width="80">
                    <div>
                        <h3>${item.name}</h3>
                        <p>${item.price} руб.</p>
                        <button class="remove-item">Удалить</button>
                    </div>
                </div>
            `;
        });
        
        totalPrice.textContent = total;
        
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
document.querySelectorAll('.cloth__button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const productCard = this.closest('.clothes__main');
        const product = {
            id: this.dataset.id,
            name: productCard.querySelector('.cloth__name h1').textContent,
            price: productCard.querySelector('.cloth__price p').textContent.replace('rub', ''),
            image: productCard.querySelector('.clothes__img').src
        };
        
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Анимация добавления
        this.textContent = 'Добавлено!';
        setTimeout(() => {
            this.textContent = 'Купить';
        }, 1000);
        
        // Обновляем счетчик
        updateCartCounter();
    });
});