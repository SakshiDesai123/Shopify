// Product Gallery Functionality

document.addEventListener('DOMContentLoaded', function() {
    initProductGallery();
    initImageZoom();
    initThumbnailNavigation();
});

// Initialize product gallery
function initProductGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-product-img');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Update main image
            const imageSrc = this.getAttribute('data-image');
            mainImage.src = imageSrc;
            mainImage.alt = this.querySelector('img').alt;
            
            // Update image zoom background
            updateImageZoom(imageSrc);
        });
    });
}

// Initialize image zoom functionality
function initImageZoom() {
    const mainImageContainer = document.querySelector('.main-image');
    const mainImage = document.getElementById('main-product-img');
    const imageZoom = document.querySelector('.image-zoom');
    
    if (!mainImageContainer || !imageZoom) return;
    
    mainImageContainer.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;
        
        // Update zoom transform origin
        mainImage.style.transformOrigin = `${xPercent}% ${yPercent}%`;
        
        // Show zoom effect
        mainImage.style.transform = 'scale(1.5)';
        imageZoom.style.opacity = '1';
    });
    
    mainImageContainer.addEventListener('mouseleave', function() {
        // Reset zoom effect
        mainImage.style.transform = 'scale(1)';
        imageZoom.style.opacity = '0';
    });
}

// Update image zoom background
function updateImageZoom(imageSrc) {
    const imageZoom = document.querySelector('.image-zoom');
    if (imageZoom) {
        imageZoom.style.backgroundImage = `url(${imageSrc})`;
    }
}

// Initialize thumbnail navigation
function initThumbnailNavigation() {
    const thumbnailsContainer = document.querySelector('.thumbnails');
    const prevBtn = document.querySelector('.thumbnail-nav.prev');
    const nextBtn = document.querySelector('.thumbnail-nav.next');
    
    if (!thumbnailsContainer || !prevBtn || !nextBtn) return;
    
    const scrollAmount = 100;
    
    prevBtn.addEventListener('click', function() {
        thumbnailsContainer.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
    
    nextBtn.addEventListener('click', function() {
        thumbnailsContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
}