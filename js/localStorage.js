// localStorage utility functions

// Save data to localStorage
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
}

// Get data from localStorage
function getFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
    }
}

// Remove data from localStorage
function removeFromLocalStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('Error removing from localStorage:', error);
        return false;
    }
}

// Clear all localStorage
function clearLocalStorage() {
    try {
        localStorage.clear();
        return true;
    } catch (error) {
        console.error('Error clearing localStorage:', error);
        return false;
    }
}

// Check if localStorage is available
function isLocalStorageAvailable() {
    try {
        const test = 'test';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (error) {
        return false;
    }
}

// Get cart from localStorage
function getCart() {
    return getFromLocalStorage('cart') || [];
}

// Save cart to localStorage
function saveCart(cart) {
    return saveToLocalStorage('cart', cart);
}

// Get user preferences from localStorage
function getUserPreferences() {
    return getFromLocalStorage('userPreferences') || {};
}

// Save user preferences to localStorage
function saveUserPreferences(preferences) {
    return saveToLocalStorage('userPreferences', preferences);
}