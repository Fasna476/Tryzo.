import React, { useState } from 'react';
import '../styles/CheckoutPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const CheckoutPage = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    state: '',
    payment: 'cod'
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async() => {
    try {
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?._id;
      
      const orderData = {
        user: userId,  // make sure user is stored
        orderItems: cartItems.map(item => ({
          product: item._id,
          quantity: item.quantity,
        })),
        totalAmount: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
        address: {
          name: form.name,
          phone: form.phone,
          address: form.address,
          city: form.city,
          pincode: form.pincode,
          state: form.state,
        },
        paymentMethod: form.payment,
      };
  
      
  
      const res = await axios.post('http://localhost:5000/orders/add', orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
  
      alert("Order placed successfully!");
      localStorage.removeItem("cart");
      navigate('/');
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  
  
    
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <div className="checkout-form">
        <h3>Delivery Address</h3>
        <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
        <textarea name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" value={form.city} onChange={handleChange} required />
        <input type="text" name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} required />
        <input type="text" name="state" placeholder="State" value={form.state} onChange={handleChange} required />

        <h3>Payment Method</h3>
        <label>
          <input type="radio" name="payment" value="cod" checked={form.payment === 'cod'} onChange={handleChange} />
          Cash on Delivery
        </label>
        <label>
          <input type="radio" name="payment" value="online" disabled />
          Online Payment (coming soon)
        </label>

        <button className="place-order-btn" onClick={handlePlaceOrder}>Place Order</button>
      </div>
    </div>
  );
};

export default CheckoutPage;
