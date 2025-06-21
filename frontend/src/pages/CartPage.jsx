import React, { useEffect, useState } from 'react';
import '../styles/CartPage.css';
import { useNavigate } from 'react-router-dom';
import '../components/BackButton.jsx'
import BackButton from '../components/BackButton.jsx';

const CartPage = () => {
 
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Load cart from localStorage when component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  // Update quantity of item
  const onUpdateQty = (id, newQty, size) => {
    const updatedCart = cartItems.map(item => {
      if (item._id === id && item.selectedSize === size) {
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Remove item from cart
  const onRemove = (id, size) => {
    const updatedCart = cartItems.filter(item => !(item._id === id && item.selectedSize === size));
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate total price
  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };
  


  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
       <BackButton/>

      {cartItems.length === 0 ? (
  <div className="empty-cart">
    <img src="empty-cart.svg" alt="Empty Cart" className="empty-cart-img" />
    <h3>Oops! Your cart is feeling lonely 💔</h3>
    <p>Let’s fill it up with some awesome stuff!</p>
    <button onClick={() => navigate('/')} className="shop-now-btn">Shop Now</button>
  </div>
) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={`${item._id}-${item.selectedSize}`} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-info">
                  <h3>{item.name}</h3>
                  <p>Size: {item.selectedSize}</p>
                  <p>Price: ₹{item.price}</p>
                  <div className="quantity">
                    <button onClick={() => onUpdateQty(item._id, item.quantity - 1, item.selectedSize)} disabled={item.quantity === 1}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onUpdateQty(item._id, item.quantity + 1, item.selectedSize)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => onRemove(item._id, item.selectedSize)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total: ₹{getTotal()}</h3>
            <button className="checkout-btn" onClick={handleCheckout}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;


