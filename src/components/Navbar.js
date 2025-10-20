import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>Inventory Management System</h2>
      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/add">Add Product</Link>
        <Link to="/products">Products</Link>
        <Link to="/reports">Reports</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
};

export default Navbar;
