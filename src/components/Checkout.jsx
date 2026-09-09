import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, CreditCard, Smartphone, Wallet } from 'lucide-react';

const paymentMethods = [
  { id: 'bkash', label: 'bKash', description: 'Pay securely with bKash', icon: Smartphone },
  { id: 'cash', label: 'Cash on Delivery', description: 'Pay when your order arrives', icon: Wallet },
  { id: 'card', label: 'Card', description: 'Pay with your debit or credit card', icon: CreditCard }
];

export default function Checkout({ cartItems, onBack, onPurchaseComplete }) {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({
    accountNumber: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [error, setError] = useState('');
  const [isSuccessful, setIsSuccessful] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayment = (event) => {
    event.preventDefault();
    setError('');

    if (!paymentMethod) {
      setError('Please select a payment method.');
      return;
    }

    if (paymentMethod === 'bkash' && !paymentDetails.accountNumber.trim()) {
      setError('Please enter your bKash number.');
      return;
    }

    if (paymentMethod === 'card' && (!paymentDetails.cardNumber.trim() || !paymentDetails.expiry.trim() || !paymentDetails.cvv.trim())) {
      setError('Please complete your card details.');
      return;
    }

    setIsSuccessful(true);
    onPurchaseComplete();
  };

  if (isSuccessful) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <CheckCircle className="mx-auto h-20 w-20 text-green-500" />
        <h1 className="mt-6 text-3xl font-bold text-gray-900">Purchase Successful!</h1>
        <p className="mt-3 text-gray-600">Thank you for your purchase. Your perfume order has been confirmed.</p>
        <button
          type="button"
          onClick={onBack}
          className="mt-8 rounded bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <button
        type="button"
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-gray-600 hover:text-purple-600"
      >
        <ArrowLeft className="h-4 w-4" /> Back to perfumes
      </button>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <section className="rounded-xl bg-white p-6 shadow-lg">
          <h1 className="text-2xl font-bold text-gray-900">Payment Method</h1>
          <p className="mt-2 text-gray-600">Choose how you would like to pay.</p>

          <form onSubmit={handlePayment} className="mt-6 space-y-4">
            {paymentMethods.map(({ id, label, description, icon: Icon }) => (
              <label
                key={id}
                className={`flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition ${paymentMethod === id ? 'border-purple-600 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={id}
                  checked={paymentMethod === id}
                  onChange={(event) => setPaymentMethod(event.target.value)}
                  className="h-4 w-4 text-purple-600"
                />
                <Icon className="h-6 w-6 text-purple-600" />
                <span>
                  <span className="block font-semibold text-gray-900">{label}</span>
                  <span className="block text-sm text-gray-500">{description}</span>
                </span>
              </label>
            ))}

            {paymentMethod === 'bkash' && (
              <input
                value={paymentDetails.accountNumber}
                onChange={(event) => setPaymentDetails({ ...paymentDetails, accountNumber: event.target.value })}
                placeholder="bKash number"
                inputMode="tel"
                className="w-full rounded border px-3 py-2"
              />
            )}

            {paymentMethod === 'card' && (
              <div className="space-y-3">
                <input
                  value={paymentDetails.cardNumber}
                  onChange={(event) => setPaymentDetails({ ...paymentDetails, cardNumber: event.target.value })}
                  placeholder="Card number"
                  inputMode="numeric"
                  className="w-full rounded border px-3 py-2"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    value={paymentDetails.expiry}
                    onChange={(event) => setPaymentDetails({ ...paymentDetails, expiry: event.target.value })}
                    placeholder="MM/YY"
                    className="rounded border px-3 py-2"
                  />
                  <input
                    value={paymentDetails.cvv}
                    onChange={(event) => setPaymentDetails({ ...paymentDetails, cvv: event.target.value })}
                    placeholder="CVV"
                    inputMode="numeric"
                    className="rounded border px-3 py-2"
                  />
                </div>
              </div>
            )}

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button type="submit" className="w-full rounded bg-purple-600 px-4 py-3 font-semibold text-white hover:bg-purple-700">
              {paymentMethod === 'cash' ? 'Place Order' : 'Pay Now'}
            </button>
          </form>
        </section>

        <aside className="h-fit rounded-xl bg-white p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
          <div className="mt-5 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-3 border-b pb-4">
                <img src={item.image_url} alt={item.name} className="h-16 w-16 rounded object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  <p className="text-sm font-medium text-purple-600">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-purple-600">${total.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}