function openModal(imageSrc, captionText) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const caption = document.getElementById('caption');
    
    modal.style.display = "block";
    modalImg.src = imageSrc;
    caption.innerHTML = captionText;
    
    
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('imageModal').style.display = "none";
    
    document.body.style.overflow = 'auto';
}


window.onclick = function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target == modal) {
        closeModal();
    }
}


document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.key === 'Escape') {
        closeModal();
    }
};