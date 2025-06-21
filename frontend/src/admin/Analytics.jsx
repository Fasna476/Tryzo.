import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Analytics.css';

const Analytics = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchAnalytics = async () => {
        try {
          const res = await axios.get("http://localhost:5000/admin/analytics");
          setStats(res.data);
        } catch (err) {
          console.error("Error fetching analytics:", err.message);
        }
      };
  
      fetchAnalytics();
    }, []);
    // if (loading) return <div className="analytics"><p>Loading analytics...</p></div>;
    if (!stats) return <div className="analytics"><p>No analytics data available.</p></div>;

  return (
    <div className="analytics">
      <h2>Site Analytics</h2>
      <div className="stats-grid">
        <div className="stat-card"><h3>{stats.totalUsers}</h3><p>Total Users</p></div>
        <div className="stat-card"><h3>₹{stats.totalSales}</h3><p>Total Sales</p></div>
        <div className="stat-card"><h3>{stats.activeOrders}</h3><p>Active Orders</p></div>
        <div className="stat-card"><h3>{stats.newUsers}</h3><p>New Users</p></div>
      </div>
    </div>
  );
};

export default Analytics;
