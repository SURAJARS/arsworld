import Head from 'next/head';
import { useI18n } from '../utils/i18n/context';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { authAPI, orderAPI } from '../utils/api';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const { t, language } = useI18n();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const [userRes, ordersRes] = await Promise.all([
        authAPI.getProfile(),
        orderAPI.getUserOrders(),
      ]);
      setUser(userRes.data);
      setOrders(ordersRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">{t('common.loading')}</div>;
  }

  if (!user) {
    return <div>{t('common.error')}</div>;
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
              <h3 className="font-bold text-lg mb-4">{user.name}</h3>
              <p className="text-gray-600 text-sm mb-6">{user.email}</p>

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
                          <th className="px-4 py-2 text-left">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order._id} className="border-t hover:bg-gray-50">
                            <td className="px-4 py-2">{order.orderId}</td>
                            <td className="px-4 py-2 font-bold text-secondary">
                              ₹{order.totalAmount.toLocaleString('en-IN')}
                            </td>
                            <td className="px-4 py-2">
                              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm capitalize">
                                {order.orderStatus}
                              </span>
                            </td>
                            <td className="px-4 py-2">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-2">
                              <Link href={`/orders/${order._id}`} className="text-accent hover:underline">
                                {t('common.view')}
                              </Link>
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
