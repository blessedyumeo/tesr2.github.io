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
