// Добавление товара в корзину
document.querySelector('.add-to-cart').addEventListener('click', function() {
    const productId = this.getAttribute('data-id');
    const product = {
        id: productId,
        name: document.querySelector('.product-title').textContent,
        price: document.querySelector('.product-price').textContent.replace(' руб.', ''),
        image: document.querySelector('.main-image').src,
        size: document.querySelector('.size-selector select').value
    };
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Обновляем счетчик во всех окнах
    const counters = document.querySelectorAll('.cart-counter');
    counters.forEach(counter => {
        counter.textContent = cart.length;
    });
    
    // Анимация кнопки
    this.textContent = 'Добавлено в корзину!';
    setTimeout(() => {
        this.textContent = 'Добавить в корзину';
    }, 2000);
});

// Обновляем счетчик при загрузке
document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.querySelector('.cart-counter').textContent = cart.length;
});
document.addEventListener('DOMContentLoaded', function() {
    const mainImage = document.querySelector('.main-image');
    const thumbnails = document.querySelectorAll('.thumbnails img');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Удаляем активный класс у всех миниатюр
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Добавляем активный класс текущей миниатюре
            this.classList.add('active');
            
            // Обновляем основное изображение
            mainImage.src = this.src;
            mainImage.alt = this.alt;
        });
    });
    
    // Помечаем первую миниатюру как активную
    if (thumbnails.length > 0) {
        thumbnails[0].classList.add('active');
    }
});