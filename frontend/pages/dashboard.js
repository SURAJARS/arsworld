import Head from 'next/head';
import { useI18n } from '../utils/i18n/context';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../utils/AuthContext';
import { useCart } from '../utils/CartContext';
import { authAPI, orderAPI, productAPI } from '../utils/api';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Dashboard() {
  const { t, language } = useI18n();
  const router = useRouter();
  const { user, token, isAuthenticated, isLoading, logout } = useAuth();
  const { addToCart } = useCart();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [repeatLoading, setRepeatLoading] = useState(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
      return;
    }

    if (isAuthenticated && user) {
      loadUserData();
    }
  }, [isAuthenticated, isLoading, user, router]);

  const loadUserData = async () => {
    try {
      const ordersRes = await orderAPI.getUserOrders();
      setOrders(ordersRes.data || []);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRepeatOrder = async (order) => {
    setRepeatLoading(order._id);
    try {
      // Fetch product details for each item in the order
      for (const item of order.products) {
        const productRes = await productAPI.getById(item.product._id || item.product);
        const product = productRes.data || productRes;
        addToCart(product, item.quantity);
      }
      alert('✅ Order items added to cart!');
      router.push('/checkout');
    } catch (error) {
      console.error('Error repeating order:', error);
      alert('Error adding items to cart');
    } finally {
      setRepeatLoading(null);
    }
  };

  const handleLogout = async () => {
    logout();
    // Wait for state update then navigate
    setTimeout(() => {
      router.push('/');
    }, 100);
  };

  if (isLoading || loading || !user || !isAuthenticated) {
    return (
      <>
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">{t('common.loading')}</div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{t('dashboard.profile')} - ARS Electronics World</title>
      </Head>

      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-bold text-lg mb-4">👤 {user?.name}</h3>
              <p className="text-gray-600 text-sm mb-6">{user?.email}</p>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`block w-full text-left px-4 py-2 rounded transition ${
                    activeTab === 'profile'
                      ? 'bg-accent text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {t('dashboard.profile')}
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`block w-full text-left px-4 py-2 rounded transition ${
                    activeTab === 'orders'
                      ? 'bg-accent text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {t('dashboard.orders')}
                </button>

                <hr className="my-4" />
                
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 rounded transition text-red-600 hover:bg-red-50 font-semibold"
                >
                  🚪 Logout
                </button>
              </nav>
            </div>
          </div>

          <div className="md:col-span-3">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow p-8">
                <h2 className="text-2xl font-bold mb-6">{t('dashboard.editProfile')}</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      {t('auth.name')}
                    </label>
                    <p className="px-4 py-2 bg-gray-100 rounded">{user.name}</p>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      {t('auth.email')}
                    </label>
                    <p className="px-4 py-2 bg-gray-100 rounded">{user.email}</p>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      {t('auth.phone')}
                    </label>
                    <p className="px-4 py-2 bg-gray-100 rounded">{user.phone}</p>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Language Preference
                    </label>
                    <p className="px-4 py-2 bg-gray-100 rounded">
                      {language === 'en' ? 'English' : 'Tamil'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow p-8">
                <h2 className="text-2xl font-bold mb-6">{t('dashboard.orderHistory')}</h2>

                {orders.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">{t('dashboard.noOrders')}</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 text-left">Order ID</th>
                          <th className="px-4 py-2 text-left">Amount</th>
                          <th className="px-4 py-2 text-left">Status</th>
                          <th className="px-4 py-2 text-left">Date</th>
                          <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order._id} className="border-t hover:bg-gray-50">
                            <td className="px-4 py-2 font-mono text-sm">{order.orderId}</td>
                            <td className="px-4 py-2 font-bold text-secondary">
                              ₹{order.totalAmount.toLocaleString('en-IN')}
                            </td>
                            <td className="px-4 py-2">
                              <span className={`px-3 py-1 rounded text-sm capitalize font-semibold ${
                                order.paymentStatus === 'success' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {order.paymentStatus}
                              </span>
                            </td>
                            <td className="px-4 py-2 text-sm">
                              {new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                            </td>
                            <td className="px-4 py-2 space-x-2">
                              <button
                                onClick={() => handleRepeatOrder(order)}
                                disabled={repeatLoading === order._id}
                                className="text-blue-600 hover:text-blue-800 font-semibold hover:underline disabled:opacity-50"
                              >
                                {repeatLoading === order._id ? '⏳' : '🔁'} Repeat
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
