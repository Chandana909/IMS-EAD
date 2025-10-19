// backend/utils/helpers.js

/**
 * Helpers for Inventory Management System
 */

module.exports = {

    // Calculate total stock value of a product
    calculateStockValue: (quantity, price) => {
        if (!quantity || !price) return 0;
        return quantity * price;
    },

    // Format product names (trim + lowercase)
    formatProductName: (name) => {
        if (!name) return '';
        return name.trim().toLowerCase();
    },

    // Validate if a number is positive integer
    isPositiveInteger: (value) => {
        return Number.isInteger(value) && value >= 0;
    },

    // Generate a unique ID (simple)
    generateId: () => {
        return 'id-' + Math.random().toString(36).substr(2, 9);
    },

    // Check if stock is below minimum threshold
    isBelowThreshold: (quantity, minThreshold) => {
        if (quantity === undefined || minThreshold === undefined) return false;
        return quantity < minThreshold;
    },

    // Format price to 2 decimal points
    formatPrice: (price) => {
        if (!price) return '0.00';
        return parseFloat(price).toFixed(2);
    },

    // Basic logging helper
    logAction: (action, details) => {
        console.log(`[Inventory Log] ${action}:`, details);
    }

};
