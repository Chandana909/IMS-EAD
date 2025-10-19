// backend/utils/helpers.js

// Example helper functions for inventory system
module.exports = {
    calculateStockValue: (quantity, price) => {
        return quantity * price;
    },
    formatProductName: (name) => {
        return name.trim().toLowerCase();
    },
    // Add more helpers as needed
};
