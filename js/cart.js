// Cart functionality

document.addEventListener('DOMContentLoaded', function() {
    initAddToCart();
    initCartSidebar();
    
    // Update cart count if items exist in localStorage
    updateCartCount();
    renderCartItems();
});

// Add to cart functionality
function initAddToCart() {
    const addToCartBtn = document.querySelector('.add-to-cart');
    const buyNowBtn = document.querySelector('.buy-now');
    const addBundleBtn = document.querySelector('.add-bundle-btn');
    const pairAddToCartBtns = document.querySelectorAll('.pair-product .add-to-cart');
    const relatedAddToCartBtns = document.querySelectorAll('.product-card .add-to-cart');
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const productName = document.querySelector('.product-title').textContent;
            const price = parseInt(document.querySelector('.current-price').textContent.replace('₹', ''));
            const quantity = parseInt(document.getElementById('quantity').value);
            const color = document.getElementById('selected-color').textContent;
            const size = document.getElementById('selected-size').textContent;
            
            addToCart(productName, price, quantity, color, size);
        });
    }
    
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', function() {
            const productName = document.querySelector('.product-title').textContent;
            const price = parseInt(document.querySelector('.current-price').textContent.replace('₹', ''));
            const quantity = parseInt(document.getElementById('quantity').value);
            const color = document.getElementById('selected-color').textContent;
            const size = document.getElementById('selected-size').textContent;
            
            addToCart(productName, price, quantity, color, size);
            // In a real implementation, this would redirect to checkout
            showNotification('Proceeding to checkout!', 'success');
            openCartSidebar();
        });
    }
    
    if (addBundleBtn) {
        addBundleBtn.addEventListener('click', function() {
            addToCart('Complete Traditional Look Bundle', 3596, 1);
        });
    }
    
    pairAddToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.pair-product');
            const productName = productCard.querySelector('.product-name').textContent;
            const productPrice = parseInt(productCard.querySelector('.product-price').textContent.replace('₹', ''));
            
            addToCart(productName, productPrice, 1);
        });
    });
    
    relatedAddToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const productPrice = parseInt(productCard.querySelector('.current-price').textContent.replace('₹', ''));
            
            addToCart(productName, productPrice, 1);
        });
    });
}

// Add product to cart
function addToCart(productName, price, quantity, color = '', size = '') {
    // Get existing cart from localStorage or initialize empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Create product ID based on name, color and size
    const productId = `${productName}-${color}-${size}`.toLowerCase().replace(/\s+/g, '-');
    
    // Check if product already exists in cart
    const existingProductIndex = cart.findIndex(item => item.id === productId);
    
    if (existingProductIndex > -1) {
        // Update quantity if product exists
        cart[existingProductIndex].quantity += parseInt(quantity);
    } else {
        // Add new product to cart
        cart.push({
            id: productId,
            name: productName,
            price: price,
            quantity: parseInt(quantity),
            color: color,
            size: size,
            image: 'assets/images/kurta-blue.jpg'
        });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Render cart items
    renderCartItems();
    
    // Show success notification
    showNotification(`${productName} added to cart!`, 'success');
    
    // Open cart sidebar
    openCartSidebar();
}

// Update cart count in header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.querySelector('.cart-count');
    
    if (cartCount) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Show/hide cart count badge
        if (totalItems > 0) {
            cartCount.style.display = 'flex';
        } else {
            cartCount.style.display = 'none';
        }
    }
}

// Render cart items in sidebar
function renderCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total span:last-child');
    const emptyCart = document.querySelector('.empty-cart');
    
    if (cartItemsContainer) {
        // Clear existing items
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            // Show empty cart message
            if (emptyCart) {
                cartItemsContainer.appendChild(emptyCart);
            }
            if (cartTotal) {
                cartTotal.textContent = '₹0';
            }
            return;
        }
        
        // Calculate total
        let total = 0;
        
        // Render each cart item
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    ${item.color ? `<div class="cart-item-color">Color: ${item.color}</div>` : ''}
                    ${item.size ? `<div class="cart-item-size">Size: ${item.size}</div>` : ''}
                    <div class="cart-item-price">₹${item.price}</div>
                    <div class="cart-item-quantity">
                        <button class="decrease-quantity" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase-quantity" data-id="${item.id}">+</button>
                        <button class="remove-item" data-id="${item.id}" style="margin-left: auto; color: #ff3f6c; background: none; border: none; cursor: pointer;">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItem);
        });
        
        // Update total
        if (cartTotal) {
            cartTotal.textContent = `₹${total}`;
        }
        
        // Add event listeners to quantity buttons
        document.querySelectorAll('.decrease-quantity').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                updateCartItemQuantity(productId, -1);
            });
        });
        
        document.querySelectorAll('.increase-quantity').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                updateCartItemQuantity(productId, 1);
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                removeCartItem(productId);
            });
        });
    }
}

// Update cart item quantity
function updateCartItemQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;
        
        // Remove item if quantity is 0 or less
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
            showNotification('Item removed from cart!', 'info');
        } else {
            showNotification('Cart updated!', 'success');
        }
        
        // Save updated cart
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update UI
        updateCartCount();
        renderCartItems();
    }
}

// Remove cart item
function removeCartItem(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    
    // Save updated cart
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update UI
    updateCartCount();
    renderCartItems();
    
    showNotification('Item removed from cart!', 'info');
}

// Cart sidebar functionality
function initCartSidebar() {
    const cartIcon = document.querySelector('.cart-icon');
    const closeCartBtn = document.querySelector('.close-cart');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const overlay = document.querySelector('.overlay');
    const continueShoppingBtn = document.querySelector('.cart-actions .btn-outline');
    
    if (cartIcon) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            openCartSidebar();
        });
    }
    
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', closeCartSidebar);
    }
    
    if (overlay) {
        overlay.addEventListener('click', closeCartSidebar);
    }
    
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', closeCartSidebar);
    }
    
    // Close cart with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeCartSidebar();
        }
    });
}

// Open cart sidebar
function openCartSidebar() {
    const cartSidebar = document.querySelector('.cart-sidebar');
    const overlay = document.querySelector('.overlay');
    
    if (cartSidebar && overlay) {
        cartSidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Close cart sidebar
function closeCartSidebar() {
    const cartSidebar = document.querySelector('.cart-sidebar');
    const overlay = document.querySelector('.overlay');
    
    if (cartSidebar && overlay) {
        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}