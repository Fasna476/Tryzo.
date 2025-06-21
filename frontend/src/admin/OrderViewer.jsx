// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './OrderViewer.css';

// const OrderViewer = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/orders/');
//         setOrders(res.data);
//       } catch (error) {
//         console.error("Error fetching orders:", error.message);
//       }
//     };
//     fetchOrders();
//   }, []);

//   return (
//     <div className="order-viewer">
//       <h2>Order Viewer</h2>
//       {orders.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//         orders.map(order => (
//           <div key={order._id} className="order-card">
//             <p><strong>Order ID:</strong> {order._id}</p>
//             <p><strong>User:</strong> {order.user?.name || "Guest"}</p>
//             <p><strong>Status:</strong> {order.status || "Processing"}</p>
//             <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
//             <p><strong>Items:</strong></p>
//             <ul>
//               {(order.orderItems || []).map((item, idx) => (
//                 <li key={idx}>
//                   {item.product?.name || "Unnamed Product"} × {item.quantity}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default OrderViewer;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OrderViewer.css';

const OrderViewer = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:5000/orders/');
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      }
    };
    fetchOrders();
  }, []);

  const handleReturnRequest = (orderId) => {
    // Simulated return logic
    alert(`Return requested for order ${orderId}`);
  };

  return (
    <div className="order-viewer">
      <h2>Order Management</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="order-table-wrapper">
          <table className="order-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Status</th>
                <th>Items</th>
                <th>Total</th>
                <th>Shipment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user?.name || 'Guest'}</td>
                  <td>
                    <span className={`status ${order.status?.toLowerCase() || 'processing'}`}>
                      {order.status || 'Processing'}
                    </span>
                  </td>
                  <td>
                    <ul>
                      {(order.orderItems || []).map((item, idx) => (
                        <li key={idx}>
                          {item.product?.name || 'Unnamed Product'} × {item.quantity}
                          {item.product?.stock < 5 && (
                            <span className="low-stock">Low stock</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>₹{order.totalAmount}</td>
                  <td>
                    📦 {order.shipmentTracking || 'Tracking not available'}
                  </td>
                  <td>
                    <button onClick={() => handleReturnRequest(order._id)}>Request Return</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderViewer;
