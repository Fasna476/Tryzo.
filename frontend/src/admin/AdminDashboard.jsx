import React, { useState } from 'react';
import ProductManager from './ProductManager';
// import UserManager from './UserManager';
import OrderViewer from './OrderViewer';
import Analytics from './Analytics';
import './Admin.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');

  const renderContent = () => {
    switch (activeTab) {
      case 'products': return <ProductManager />;
    //   case 'users': return <UserManager />;
      case 'orders': return <OrderViewer />;
      case 'analytics': return <Analytics />;
      default: return <ProductManager />;
    }
  };

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <button onClick={() => setActiveTab('products')}>Products</button>
          {/* <button onClick={() => setActiveTab('users')}>Users</button> */}
          <button onClick={() => setActiveTab('orders')}>Orders</button>
          <button onClick={() => setActiveTab('analytics')}>Analytics</button>
        </nav>
      </aside>
      <main className="admin-main">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
