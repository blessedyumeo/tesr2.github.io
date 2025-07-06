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
/********************** */
document.addEventListener('DOMContentLoaded', function() {
    // Получаем ID товара из URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    // Здесь должен быть код, который загружает данные товара
    // в зависимости от productId (например, из массива или API)
    loadProductData(productId);
});

function loadProductData(productId) {
    // Пример данных товаров (замените на свои реальные данные)
    const products = {
        '1': {
            title: "DEFUNT LONGLEEVE",
            price: "3800",
            images: ["cloth1.png", "cloth2.png,cloth3.jpg,cloth4.png,cloth5.png,cloth6.png,cloth7.png,cloth8.png,cloth9.png,cloth10.png"],
            description: "Лонгслив премиум-качества из 100% хлопка...",
            composition: "100% хлопок",
            care: "Стирка при 30°C, не отбеливать..."
        },
        '2': {
            title: "HOODIE DARTS",
            price: "4100",
            images: ["cloth2.png"],
            description: "Описание худи...",
            composition: "Состав худи...",
            care: "Уход за худи..."
        },
        '3': {
            title: "HOODIE HEAVEN",
            price: "4100",
            images: ["cloth3.jpg"],
            description: "Описание худи...",
            composition: "Состав худи...",
            care: "Уход за худи..."
        },
        '4': {
            title: "HOODIE M",
            price: "4100",
            images: ["cloth4.png"],
            description: "Описание худи...",
            composition: "Состав худи...",
            care: "Уход за худи..."
        },
        '5': {
            title: "HOODEIE OVER",
            price: "4100",
            images: ["cloth5.png"],
            description: "Описание худи...",
            composition: "Состав худи...",
            care: "Уход за худи..."
        },
        '6': {
            title: "BAG",
            price: "2700",
            images: ["cloth6.png"],
            description: "Описание худи...",
            composition: "Состав худи...",
            care: "Уход за худи..."
        },
        '7': {
            title: "SHIRT",
            price: "2700",
            images: ["cloth7.png"],
            description: "Описание худи...",
            composition: "Состав худи...",
            care: "Уход за худи..."
        },
        '8': {
            title: "HOODIE",
            price: "4100",
            images: ["cloth8.png"],
            description: "Описание худи...",
            composition: "Состав худи...",
            care: "Уход за худи..."
        },
        '9': {
            title: "HOODIE DARTS",
            price: "4500",
            images: ["cloth9.png"],
            description: "Описание худи...",
            composition: "Состав худи...",
            care: "Уход за худи..."
        },
        '10': {
            title: "T-SHIRT CROSS",
            price: "2500",
            images: ["cloth10.png"],
            description: "Описание худи...",
            composition: "Состав худи...",
            care: "Уход за худи..."
        },
        
    };
    
    const product = products[productId];
    if (product) {
        // Заполняем данные на странице
        document.querySelector('.product-title').textContent = product.title;
        document.querySelector('.product-price').textContent = product.price + ' руб.';
        
        // Обновляем галерею изображений
        const gallery = document.querySelector('.product-gallery');
        gallery.innerHTML = `
            <img src="images/${product.images[0]}" alt="${product.title}" class="main-image">
            <div class="thumbnails">
                ${product.images.map(img => 
                    `<img src="images/${img}" alt="${product.title}">`
                ).join('')}
            </div>
        `;
        
        // Заполняем описание
        document.querySelector('.product-description').innerHTML = `
            <h3>Описание</h3>
            <p>${product.description}</p>
            <h3>Состав</h3>
            <p>${product.composition}</p>
            <h3>Уход</h3>
            <p>${product.care}</p>
        `;
        
        // Обновляем ID товара в кнопке добавления в корзину
        document.querySelector('.add-to-cart').dataset.id = productId;
    } else {
        // Если товар не найден, можно сделать редирект или показать сообщение
        alert('Товар не найден');
        window.location.href = 'shop.html';
    }
}