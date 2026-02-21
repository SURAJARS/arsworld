import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../utils/CartContext';
import { useAuth } from '../utils/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Cart() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { isAuthenticated, isLoading } = useAuth();

  // Calculate totals correctly using BASE price (without GST)
  const subtotal = cart.reduce((total, item) => {
    const basePrice = item.basePrice || item.price;
    return total + basePrice * item.quantity;
  }, 0);

  // Tax is calculated FROM the base price
  const tax = cart.reduce((total, item) => {
    const basePrice = item.basePrice || item.price;
    const gstPercentage = item.gstPercentage || 18;
    const itemTax = (basePrice * item.quantity * gstPercentage) / 100;
    return total + itemTax;
  }, 0);
  const shipping = 0; // Will be calculated on checkout
  const total = subtotal + tax + shipping;

  const handlePlaceOrder = () => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/checkout');
      return;
    }
    router.push('/checkout');
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold mb-6">Loading...</h1>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Shopping Cart - ARS Electronics World</title>
      </Head>
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12">🛒 Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-xl mb-6">Your cart is empty</p>
            <Link href="/products" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* CART ITEMS */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6 border-b pb-4">Cart Items</h2>

                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item._id} className="flex gap-4 border rounded-lg p-4 hover:shadow-md transition">
                      {/* Product Image */}
                      <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {item.images && item.images[0] ? (
                          <img
                            src={item.images[0]}
                            alt={item.name?.en}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            📦
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{item.name?.en || item.name}</h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {item.description?.en || item.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold">Qty:</span>
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity - 1)}
                              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                            >
                              −
                            </button>
                            <span className="px-3 py-1 bg-gray-100 rounded w-12 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity + 1)}
                              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="text-red-600 hover:text-red-800 font-semibold text-sm"
                          >
                            🗑️ Remove
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right flex flex-col justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Base Price</p>
                          <p className="font-bold text-lg">₹{(item.basePrice || item.price).toLocaleString('en-IN')}</p>
                          <p className="text-xs text-gray-500">+{item.gstPercentage || 18}% GST</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Subtotal (inc. GST)</p>
                          <p className="font-bold text-lg text-blue-600">
                            ₹{((item.basePrice || item.price) * (1 + (item.gstPercentage || 18) / 100) * item.quantity).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t flex gap-3">
                  <Link
                    href="/products"
                    className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition text-center"
                  >
                    Continue Shopping
                  </Link>
                  <button
                    onClick={clearCart}
                    className="flex-1 px-6 py-3 bg-red-100 text-red-600 rounded-lg font-semibold hover:bg-red-200 transition"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>

            {/* PRICE SUMMARY */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg shadow-lg p-6 sticky top-24">
                <h2 className="text-2xl font-bold mb-6 text-center border-b pb-4">💰 Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal (Base)</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex justify-between text-gray-700">
                    <span>GST (Per Product)</span>
                    <span>₹{tax.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>

                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span className="text-green-600 font-semibold">Calculated at checkout</span>
                  </div>

                  <hr className="my-3" />

                  <div className="flex justify-between text-xl font-bold text-blue-900">
                    <span>Estimated Total</span>
                    <span>≈ ₹{(subtotal + tax).toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {!isAuthenticated ? (
                  <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 mb-4">
                    <p className="text-sm text-yellow-700 font-semibold mb-3">
                      🔐 Login required to complete order
                    </p>
                    <Link
                      href="/login?redirect=/checkout"
                      className="block w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-bold text-center hover:bg-blue-700 transition"
                    >
                      🔑 Login to Checkout
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={handlePlaceOrder}
                    className="w-full px-4 py-3 bg-green-600 text-white rounded-lg font-bold text-lg hover:bg-green-700 transition mb-3"
                  >
                    ✅ Place Order
                  </button>
                )}

                <button
                  onClick={handlePlaceOrder}
                  className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Continue as {isAuthenticated ? 'Logged In User' : 'Guest'}
                </button>

                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-600">
                    ✓ Final shipping cost calculated at checkout
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
