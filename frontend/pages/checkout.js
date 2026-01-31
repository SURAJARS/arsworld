import Head from 'next/head';
import { useI18n } from '../utils/i18n/context';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../utils/CartContext';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';

export default function Checkout() {
  const { t, language } = useI18n();
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      alert('Please fill in all required fields');
      return;
    }

    console.log('📝 Starting order placement...');
    setLoading(true);
    try {
      // Step 1: Create order on backend
      console.log('🔄 Creating order on backend...');
      const createOrderResponse = await fetch('http://localhost:5000/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          products: cart.map((item) => ({
            product: item._id,
            quantity: item.quantity,
            price: item.price,
          })),
          totalAmount: total,
          customerDetails: formData,
        }),
      });

      if (!createOrderResponse.ok) {
        const errorData = await createOrderResponse.json();
        console.error('❌ Order creation failed:', errorData);
        throw new Error(errorData.message || 'Failed to create order');
      }

      const orderResponse = await createOrderResponse.json();
      console.log('✅ Order created:', orderResponse);
      const { orderId, razorpayOrderId, amount, key } = orderResponse;

      if (!key) {
        console.error('❌ Missing Razorpay key');
        throw new Error('Razorpay key not found');
      }

      // Step 2: Initialize Razorpay payment
      const options = {
        key,
        amount: Math.round(amount * 100), // Convert to paise and ensure integer
        currency: 'INR',
        name: 'ARS Electronics World',
        description: 'Electronics Purchase',
        order_id: razorpayOrderId,
        customer_notification: 1,
        handler: async (response) => {
          console.log('✅ Payment successful from user:', response);
          try {
            // Step 3: Verify payment
            const verifyResponse = await fetch('http://localhost:5000/api/orders/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId,
              }),
            });

            if (verifyResponse.ok) {
              const verifyData = await verifyResponse.json();
              console.log('✅ Payment verified on backend:', verifyData);
              alert('✓ Payment successful! Order confirmed. We will contact you shortly.');
              clearCart();
              setLoading(false);
              router.push('/');
            } else {
              const errorData = await verifyResponse.json();
              console.error('❌ Verification failed:', errorData);
              alert('Payment verification failed. Please contact support.');
              setLoading(false);
            }
          } catch (error) {
            console.error('❌ Verification error:', error);
            alert('Payment verification failed. Please contact support.');
            setLoading(false);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#FBBF24',
        },
      };

      // Load Razorpay script dynamically
      const loadRazorpay = () => {
        return new Promise((resolve, reject) => {
          // If Razorpay is already loaded, use it directly
          if (window.Razorpay) {
            console.log('✅ Razorpay already loaded');
            resolve();
            return;
          }

          console.log('🔄 Loading Razorpay script...');
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.async = true;
          script.onerror = () => {
            console.error('❌ Failed to load Razorpay script');
            reject(new Error('Failed to load Razorpay'));
          };
          script.onload = () => {
            console.log('✅ Razorpay script loaded successfully');
            resolve();
          };
          document.body.appendChild(script);
        });
      };

      // Load Razorpay and open payment modal
      try {
        await loadRazorpay();
      } catch (loadError) {
        throw new Error('Could not load Razorpay: ' + loadError.message);
      }
      
      console.log('🔄 Opening Razorpay with options:', options);
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (response) => {
        console.error('❌ Payment failed:', response.error);
        alert(`Payment failed: ${response.error.description}`);
        setLoading(false);
      });
      console.log('🎯 Calling rzp.open()...');
      rzp.open();
    } catch (error) {
      console.error('❌ Error placing order:', error);
      alert('Error placing order. ' + (error.message || 'Please try again.'));
      setLoading(false);
    }
  };

  if (cart.length === 0 && !loading) {
    return (
      <>
        <Head>
          <title>Checkout - ARS Electronics World</title>
        </Head>
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-6">Shopping Cart</h1>
            <p className="text-gray-600 text-lg mb-8">Your cart is empty</p>
            <Link
              href="/products"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const subtotal = getCartTotal();
  const tax = subtotal * 0.18; // 18% GST
  const shipping = subtotal > 5000 ? 0 : 200;
  const total = subtotal + tax + shipping;

  return (
    <>
      <Head>
        <title>Checkout - ARS Electronics World</title>
      </Head>
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-primary mb-12 text-center">🛒 Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-primary">Order Summary</h2>

              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item._id} className="border-b pb-4 last:border-b-0">
                    <div className="flex gap-4">
                      {item.images && item.images[0] && (
                        <img
                          src={item.images[0]}
                          alt={typeof item.name === 'object' ? item.name[language] : item.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">
                          {typeof item.name === 'object' ? item.name[language] : item.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          ₹{item.price.toLocaleString('en-IN')} × {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg mb-2">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            −
                          </button>
                          <span className="px-3">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="px-3 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 ml-4"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6 text-primary">📍 Delivery Address</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your phone"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Address *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your delivery address"
                    rows="3"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your city"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter postal code"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg shadow-lg p-6 sticky top-20">
              <h2 className="text-2xl font-bold mb-6 text-primary">💰 Price Summary</h2>

              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex justify-between">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">GST (18%)</span>
                  <span className="font-semibold">₹{tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `₹${shipping}`
                    )}
                  </span>
                </div>
              </div>

              <div className="bg-blue-600 text-white p-4 rounded-lg mb-6">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {shipping > 0 && (
                <p className="text-sm text-gray-600 mb-4 bg-green-50 p-2 rounded">
                  ✓ Free shipping on orders above ₹5,000!
                </p>
              )}

              <button
                onClick={handlePlaceOrder}
                disabled={loading || cart.length === 0}
                className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50 mb-3"
              >
                {loading ? '⏳ Processing...' : '✓ Place Order'}
              </button>

              <Link
                href="/products"
                className="block w-full bg-gray-200 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-300 transition text-center"
              >
                Continue Shopping
              </Link>

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> We'll confirm your order via phone and email. Installation support available for all major brands.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
