import React, { useState } from 'react';
import './AddItem.css';

const AddItem = () => {
  const [product, setProduct] = useState({ name: '', category: '', quantity: '', price: '' });
  const [msg, setMsg] = useState('');

  const handleChange = (e) => setProduct({ ...product, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally call your backend API
    setMsg(`Product "${product.name}" added successfully!`);
    setProduct({ name: '', category: '', quantity: '', price: '' });
  };

  return (
    <div className="add-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Product Name" required />
        <input type="text" name="category" value={product.category} onChange={handleChange} placeholder="Category" required />
        <input type="number" name="quantity" value={product.quantity} onChange={handleChange} placeholder="Quantity" required />
        <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price" required />
        <button type="submit">Add Product</button>
      </form>
      {msg && <div className="msg">{msg}</div>}
    </div>
  );
};

export default AddItem;
