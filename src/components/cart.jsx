import React from 'react';
import { X, Minus, Plus } from 'lucide-react';

export default function Cart({ cartItems, onRemove, onQuantityChange, onCheckout }) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white p-4 rounded-xl shadow"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.brand}</p>
                  <p className="text-sm text-purple-600 font-medium">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded px-2 py-1">
                  <button
                    onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="text-gray-500 hover:text-gray-800"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-3">{item.quantity}</span>
                  <button
                    onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                    className="text-gray-500 hover:text-gray-800"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="mt-8 text-right">
          <p className="text-xl font-semibold">
            Total: <span className="text-purple-600">${total.toFixed(2)}</span>
          </p>
          <button
            onClick={onCheckout}
            className="mt-4 px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
