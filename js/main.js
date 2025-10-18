// Main JavaScript file for product page functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initTabs();
    initQuantitySelector();
    initWishlist();
    
    // Load saved preferences
    loadSavedPreferences();
});

// Tab functionality
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all tabs and contents
            tabBtns.forEach(tab => tab.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Quantity selector functionality
function initQuantitySelector() {
    const quantityInput = document.getElementById('quantity');
    const decreaseBtn = document.getElementById('decrease-qty');
    const increaseBtn = document.getElementById('increase-qty');
    
    decreaseBtn.addEventListener('click', function() {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });
    
    increaseBtn.addEventListener('click', function() {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue < 10) {
            quantityInput.value = currentValue + 1;
        }
    });
    
    quantityInput.addEventListener('change', function() {
        let value = parseInt(this.value);
        if (isNaN(value) || value < 1) {
            this.value = 1;
        } else if (value > 10) {
            this.value = 10;
        }
    });
}

// Wishlist functionality
function initWishlist() {
    const wishlistBtn = document.querySelector('.wishlist-btn');
    const wishlistIcon = wishlistBtn.querySelector('i');
    
    wishlistBtn.addEventListener('click', function() {
        wishlistIcon.classList.toggle('far');
        wishlistIcon.classList.toggle('fas');
        
        if (wishlistIcon.classList.contains('fas')) {
            showNotification('Product added to wishlist!', 'success');
        } else {
            showNotification('Product removed from wishlist!', 'info');
        }
    });
}

// Load saved preferences from localStorage
function loadSavedPreferences() {
    const savedColor = localStorage.getItem('selectedColor');
    const savedSize = localStorage.getItem('selectedSize');
    
    if (savedColor) {
        const colorOption = document.querySelector(`.color-option[data-color="${savedColor}"]`);
        if (colorOption) {
            // Remove active class from all color options
            document.querySelectorAll('.color-option').forEach(option => {
                option.classList.remove('active');
            });
            
            // Add active class to saved color
            colorOption.classList.add('active');
            
            // Update selected color text
            document.getElementById('selected-color').textContent = savedColor;
        }
    }
    
    if (savedSize) {
        const sizeOption = document.querySelector(`.size-option[data-size="${savedSize}"]`);
        if (sizeOption) {
            // Remove active class from all size options
            document.querySelectorAll('.size-option').forEach(option => {
                option.classList.remove('active');
            });
            
            // Add active class to saved size
            sizeOption.classList.add('active');
            
            // Update selected size text
            document.getElementById('selected-size').textContent = savedSize;
        }
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        document.querySelector('.nav').classList.toggle('active');
    });
}