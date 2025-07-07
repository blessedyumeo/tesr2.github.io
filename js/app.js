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
    loadShow(); 
};
function autoSlide() {
    active = (active + 1) % items.length; 
}

let autoSlideInterval = setInterval(autoSlide, 5000);
////////////////////////////////////
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.clothes__img');

    images.forEach(img => {
        const originalSrc = img.src; 
        const hoverSrc = img.getAttribute('data-hover'); 

        img.addEventListener('mouseenter', () => {
            img.src = hoverSrc; 
        });

        img.addEventListener('mouseleave', () => {
            img.src = originalSrc;
        });
    });
});
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    
    
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500); 
    }, 1000);
});