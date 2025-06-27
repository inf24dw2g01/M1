import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();
  const { } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const orderItems = cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price
      }));

      await apiService.createOrder({ items: orderItems });

      clearCart();
      alert('Order placed successfully!');
      navigate('/orders');
    } catch (err) {
      setError(err.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b border-gray-200 py-4 last:border-b-0">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                {item.description && (
                  <p className="text-gray-600 text-sm">{item.description}</p>
                )}
                <p className="text-blue-600 font-semibold">${item.price.toFixed(2)}</p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                <div className="text-lg font-semibold text-gray-900 min-w-[80px] text-right">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:text-red-800 ml-4"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total: ${getTotalPrice().toFixed(2)}</span>
              <div className="space-x-4">
                <button
                  onClick={() => navigate('/products')}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition duration-300"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300 disabled:opacity-50"
                >
                  {loading ? 'Placing Order...' : 'Checkout'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
