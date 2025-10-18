// Modal functionality

document.addEventListener('DOMContentLoaded', function() {
    initModals();
});

// Initialize all modals
function initModals() {
    // Size Chart Modal
    const sizeChartBtn = document.getElementById('size-chart-btn');
    const sizeChartModal = document.getElementById('size-chart-modal');
    
    if (sizeChartBtn && sizeChartModal) {
        sizeChartBtn.addEventListener('click', function() {
            openModal(sizeChartModal);
        });
    }
    
    // Compare Colors Modal
    const compareColorsBtn = document.getElementById('compare-colors-btn');
    const compareColorsModal = document.getElementById('compare-colors-modal');
    
    if (compareColorsBtn && compareColorsModal) {
        compareColorsBtn.addEventListener('click', function() {
            openModal(compareColorsModal);
        });
        
        // Initialize color comparison functionality
        initColorComparison();
    }
    
    // Close modals when clicking on close button or outside
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const modals = document.querySelectorAll('.modal');
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });
    
    // Close modals with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                closeModal(modal);
            });
        }
    });
    
    // Variant selection
    initVariantSelection();
}

// Open modal
function openModal(modal) {
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// Close modal
function closeModal(modal) {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Initialize color comparison functionality
function initColorComparison() {
    const compareColorOptions = document.querySelectorAll('.compare-color-option');
    
    compareColorOptions.forEach(option => {
        option.addEventListener('click', function() {
            this.classList.toggle('selected');
            
            // Limit selection to 2 colors
            const selectedColors = document.querySelectorAll('.compare-color-option.selected');
            if (selectedColors.length > 2) {
                // Deselect the first selected color if more than 2 are selected
                selectedColors[0].classList.remove('selected');
            }
        });
    });
}

// Initialize variant selection with localStorage persistence
function initVariantSelection() {
    // Color Selection
    const colorOptions = document.querySelectorAll('.color-option');
    const selectedColor = document.getElementById('selected-color');
    
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all color options
            colorOptions.forEach(color => color.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Update selected color text
            const colorName = this.getAttribute('data-color');
            if (selectedColor) {
                selectedColor.textContent = colorName;
            }
            
            // Store selected color in localStorage
            localStorage.setItem('selectedColor', colorName);
            
            // Update product image based on color (in a real implementation)
            updateProductImageByColor(colorName);
        });
    });
    
    // Size Selection
    const sizeOptions = document.querySelectorAll('.size-option');
    const selectedSize = document.getElementById('selected-size');
    
    sizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all size options
            sizeOptions.forEach(size => size.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Update selected size text
            const sizeValue = this.getAttribute('data-size');
            if (selectedSize) {
                selectedSize.textContent = sizeValue;
            }
            
            // Store selected size in localStorage
            localStorage.setItem('selectedSize', sizeValue);
        });
    });
}

// Update product image based on selected color
function updateProductImageByColor(color) {
    const mainImage = document.getElementById('main-product-img');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    // In a real implementation, this would fetch the correct image based on color
    // For this demo, we'll just change the main image
    const colorMap = {
        'Blue': 'assets/images/kurta-blue.jpg',
        'Red': 'assets/images/kurta-red.jpg',
        'Green': 'assets/images/kurta-green.jpg',
        'Yellow': 'assets/images/kurta-yellow.jpg',
        'Purple': 'assets/images/kurta-purple.jpg'
    };
    
    if (colorMap[color] && mainImage) {
        mainImage.src = colorMap[color];
        mainImage.alt = `Traditional Indian Cotton Kurta - ${color}`;
        
        // Update thumbnails as well (in a real implementation)
        thumbnails.forEach((thumb, index) => {
            if (index === 0) {
                thumb.querySelector('img').src = colorMap[color];
            }
        });
    }
}