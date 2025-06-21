import React, { useEffect, useState } from 'react';
import './Navbar.css';


const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
  };

  updateCartCount();

  window.addEventListener("storage", updateCartCount); // If cart is modified from other tabs
  const interval = setInterval(updateCartCount, 500); // Check every 0.5s

  return () => {
    window.removeEventListener("storage", updateCartCount);
    clearInterval(interval);
  };
}, []);
  return (
    <nav className="navbar">
      <div className="logo">Tryzo</div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/products">Shop</a></li>
        {/* <li><a href="/tryon">Virtual Try-On</a></li> */}
        <li><a href="/login">Login</a></li>
        <li><a href="/profile">Profile</a></li>
        
        <li>
        <a href="/cart" className="cart-icon" aria-label="Cart">
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" height="24" 
    fill="currentColor" 
    viewBox="0 0 24 24"
  >
    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 
             0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 
             2-.9 2-2-.9-2-2-2zM7.16 14h9.68c.75 
             0 1.41-.41 1.75-1.03l3.58-6.49a.996.996 
             0 00-.87-1.48H5.21L4.27 2H1v2h2l3.6 
             7.59-1.35 2.44C4.52 14.37 5.48 16 
             7 16h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63z"/>
  </svg>
  <span className="cart-count">{cartCount}</span>
</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
