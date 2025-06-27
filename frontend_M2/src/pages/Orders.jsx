import { useState, useEffect } from 'react';
import apiService from '../services/api';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await apiService.getOrders();
      setOrders(data);
    } catch (err) {
      setError(err.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) {
      return;
    }

    try {
      await apiService.deleteOrder(orderId);
      setOrders(orders.filter(order => order.id !== orderId));
      alert('Order deleted successfully!');
    } catch (err) {
      alert(err.message || 'Failed to delete order');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Orders</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No orders found.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Order #{order.id}</h3>
                  <p className="text-gray-600">
                    Date: {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteOrder(order.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete Order
                </button>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Items:</h4>
                {order.items && order.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center pl-4 py-2 border-l-4 border-blue-200">
                    <div>
                      <span className="font-medium">{item.productName}</span>
                      <span className="text-gray-600 ml-2">x{item.quantity}</span>
                    </div>
                    <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Total:</span>
                  <span className="text-lg font-bold text-blue-600">
                    ${order.items ? order.items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2) : '0.00'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}