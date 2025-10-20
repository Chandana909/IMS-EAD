import React, { useState } from 'react';
import './InventoryList.css';
import { Link } from 'react-router-dom';

const InventoryList = () => {
  const [products] = useState([
    { id: 1, name: 'Laptop', category: 'Electronics', quantity: 10, price: 50000 },
    { id: 2, name: 'Chair', category: 'Furniture', quantity: 20, price: 1200 },
  ]);
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="inventory-container">
      <h2>Product Inventory</h2>
      <input
        className="search-box"
        type="text"
        placeholder="Search Products..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{p.quantity}</td>
              <td>{p.price}</td>
              <td>
                <Link to={`/products/${p.id}`}><button>View</button></Link>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryList;
