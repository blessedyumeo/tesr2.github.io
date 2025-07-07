
document.addEventListener('DOMContentLoaded', function() {
    // Получаем ID товара из URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    // Загружаем данные товара
    if (productId) {
        loadProductData(productId);
    }

    // Галерея изображений
    const mainImage = document.querySelector('.main-image');
    const thumbnails = document.querySelectorAll('.thumbnails img');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            mainImage.src = this.src;
            mainImage.alt = this.alt;
        });
    });
    
    if (thumbnails.length > 0) {
        thumbnails[0].classList.add('active');
    }

    // Обработчик кнопки "Добавить в корзину"
    document.querySelector('.add-to-cart').addEventListener('click', function(e) {
        e.preventDefault(); // Предотвращаем переход по ссылке
        
        const product = {
            id: this.getAttribute('data-id'),
            name: document.querySelector('.product-title').textContent,
            price: document.querySelector('.product-price').textContent.replace(' руб.', ''),
            image: document.querySelector('.main-image').src,
            size: document.querySelector('.size-selector select').value
        };
        
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        
        updateCartCounter();
        
        // Анимация кнопки
        this.textContent = 'Добавлено в корзину!';
        setTimeout(() => {
            this.textContent = 'Добавить в корзину';
        }, 2000);
    });
});

function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.querySelectorAll('.cart-counter').forEach(counter => {
        counter.textContent = cart.length;
    });
}

function loadProductData(productId) {
    const products = {
        '1': {
            title: "DEFUNT LONGLEEVE",
            price: "3800",
            images: ["cloth1.png"],
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
            title: "T-SHIRT CROSS",
            price: "2500",
            images: ["cloth9.png"],
            description: "Описание худи...",
            composition: "Состав худи...",
            care: "Уход за худи..."
        },
        '10': {
            title: "HODDIE DARTS",
            price: "4100",
            images: ["cloth10.png"],
            description: "Описание худи...",
            composition: "Состав худи...",
            care: "Уход за худи..."
        },
    };
    
    const product = products[productId];
    if (product) {
        document.querySelector('.product-title').textContent = product.title;
        document.querySelector('.product-price').textContent = product.price + ' руб.';
        
        const gallery = document.querySelector('.product-gallery');
        gallery.innerHTML = `
            <img src="images/${product.images[0]}" alt="${product.title}" class="main-image">
            <div class="thumbnails">
                ${product.images.map(img => 
                    `<img src="images/${img}" alt="${product.title}">`
                ).join('')}
            </div>
        `;
        
        document.querySelector('.product-description').innerHTML = `
            <h3>Описание</h3>
            <p>${product.description}</p>
            <h3>Состав</h3>
            <p>${product.composition}</p>
            <h3>Уход</h3>
            <p>${product.care}</p>
        `;
        
        document.querySelector('.add-to-cart').dataset.id = productId;
    } else {
        alert('Товар не найден');
        window.location.href = 'shop.html';
    }
}