import React from 'react';
import { useParams } from 'react-router-dom';
import './ItemDetails.css';

const ItemDetails = () => {
  const { id } = useParams();
  // In real app, fetch product by ID from backend
  const product = { id, name: 'Laptop', category: 'Electronics', quantity: 10, price: 50000 };

  return (
    <div className="details-container">
      <h2>Product Details</h2>
      <p><strong>ID:</strong> {product.id}</p>
      <p><strong>Name:</strong> {product.name}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Quantity:</strong> {product.quantity}</p>
      <p><strong>Price:</strong> {product.price}</p>
    </div>
  );
};

export default ItemDetails;
