

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import defaultDp from '../assets/default-dp.jpg';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
        const token = localStorage.getItem("token");
        // console.log("tken parsed",token)
        if (!token) {
            console.log("No token in localStorage");
            return;
          }
      try {
        const res = await axios.get('http://localhost:5000/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("User fetched:", res.data);
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (!user) return <div className="loading">Loading...</div>;

  return (
    <div className="profile-page">
      <div className="profile-card">
        <img src={defaultDp}  alt="Default DP" className="profile-pic" />
        <h2>{user.name}</h2>
        <p>{user.email}</p>

        <div className="profile-section">
          <h3>Saved Address</h3>
          <p>{user.address || "No address saved."}</p>
        </div>

        <div className="profile-section">
          <h3>My Orders</h3>
          {user.orders && user.orders.length > 0 ? (
            <ul>
              {user.orders.map((order, index) => (
                <li key={index}>#{order._id} – ₹{order.totalAmount}</li>
              ))}
            </ul>
          ) : (
            <p>No orders placed yet.</p>
          )}
        </div>

        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default ProfilePage;
