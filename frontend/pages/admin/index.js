import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { productAPI, orderAPI, settingsAPI, enquiryAPI } from '../../utils/api';
import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [settings, setSettings] = useState(null);
  const [settingsForm, setSettingsForm] = useState({ festivalBannerEnabled: false, festivalBannerText: { en: '', ta: '' } });
  const [settingsSaving, setSettingsSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Re-enable authentication after admin user is properly set up
    // const token = localStorage.getItem('token');
    // const user = JSON.parse(localStorage.getItem('user') || '{}');
    // 
    // if (!token || user.role !== 'admin') {
    //   window.location.href = '/';
    //   return;
    // }

    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [prodRes, ordRes, enqRes, setRes] = await Promise.all([
        productAPI.getAllAdmin({}), // Use admin endpoint to get all products including disabled
        orderAPI.getAllOrders(),
        enquiryAPI.getAll(),
        settingsAPI.get(),
      ]);

      // Extract data from axios response, then unwrap if needed
      const extractData = (res) => {
        const data = res.data || res;
        // If data has a .data property and it's an array, use that (for wrapped responses)
        if (data?.data && Array.isArray(data.data)) {
          return data.data;
        }
        // If data is an array, use it directly
        if (Array.isArray(data)) {
          return data;
        }
        // Otherwise return empty array
        return [];
      };

      const productsData = extractData(prodRes);
      const ordersData = extractData(ordRes);
      const enquiriesData = extractData(enqRes);
      
      console.log('📦 Loaded products:', productsData.length);
      console.log('📦 Loaded orders:', ordersData.length);
      console.log('📦 Loaded enquiries:', enquiriesData.length);
      
      setProducts(productsData);
      setOrders(ordersData);
      setEnquiries(enquiriesData);
      const settingsData = setRes.data || null;
      setSettings(settingsData);
      
      // Initialize settings form
      if (settingsData) {
        setSettingsForm({
          festivalBannerEnabled: settingsData.festivalBannerEnabled || false,
          festivalBannerText: settingsData.festivalBannerText || { en: '', ta: '' }
        });
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleProductStatus = async (productId, currentStatus) => {
    try {
      console.log('🔄 Toggling product status:', productId, !currentStatus);
      await productAPI.update(productId, { isEnabled: !currentStatus });
      console.log('✅ Product status updated');
      // Reload products using admin endpoint
      const prodRes = await productAPI.getAllAdmin({});
      const data = prodRes.data || prodRes;
      const productsData = (data?.data && Array.isArray(data.data)) ? data.data : (Array.isArray(data) ? data : []);
      setProducts(productsData);
      alert(`✅ Product ${!currentStatus ? 'enabled' : 'disabled'} successfully!`);
    } catch (error) {
      console.error('❌ Error toggling product status:', error);
      alert('Error updating product status');
    }
  };

  const deleteProduct = async (productId, productName) => {
    if (!confirm(`Are you sure you want to delete "${productName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      console.log('🗑️ Deleting product:', productId);
      await productAPI.delete(productId);
      console.log('✅ Product deleted successfully');
      // Reload products using admin endpoint
      const prodRes = await productAPI.getAllAdmin({});
      const data = prodRes.data || prodRes;
      const productsData = (data?.data && Array.isArray(data.data)) ? data.data : (Array.isArray(data) ? data : []);
      setProducts(productsData);
      alert(`✅ Product "${productName}" deleted successfully!`);
    } catch (error) {
      console.error('❌ Error deleting product:', error);
      alert('Error deleting product: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleSettingsChange = (field, value) => {
    if (field === 'festivalBannerEnabled') {
      setSettingsForm({ ...settingsForm, festivalBannerEnabled: value });
    } else if (field.startsWith('festivalBannerText.')) {
      const lang = field.split('.')[1];
      setSettingsForm({
        ...settingsForm,
        festivalBannerText: {
          ...settingsForm.festivalBannerText,
          [lang]: value
        }
      });
    }
  };

  const saveSettings = async () => {
    try {
      setSettingsSaving(true);
      console.log('💾 Saving settings:', settingsForm);
      await settingsAPI.update(settingsForm);
      console.log('✅ Settings saved successfully');
      alert('✅ Settings saved successfully!');
    } catch (error) {
      console.error('❌ Error saving settings:', error);
      alert('Error saving settings: ' + (error.response?.data?.message || error.message));
    } finally {
      setSettingsSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard - ARS Electronics World</title>
      </Head>

      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-2 rounded font-semibold transition ${
              activeTab === 'products'
                ? 'bg-accent text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-2 rounded font-semibold transition ${
              activeTab === 'orders'
                ? 'bg-accent text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`px-6 py-2 rounded font-semibold transition ${
              activeTab === 'enquiries'
                ? 'bg-accent text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Enquiries ({enquiries.length})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-6 py-2 rounded font-semibold transition ${
              activeTab === 'settings'
                ? 'bg-accent text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Settings
          </button>
        </div>

        {activeTab === 'products' && (
          <div className="bg-white rounded-lg shadow p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Product Management</h2>
              <a href="/admin/add-product" className="px-4 py-2 bg-accent text-white rounded hover:bg-accent/90">
                + Add Product
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Price</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="border-t">
                      <td className="px-4 py-2">{product.name.en}</td>
                      <td className="px-4 py-2">₹{product.price.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-2">
                        <span className={`px-3 py-1 rounded text-sm ${product.isEnabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {product.isEnabled ? 'Enabled' : 'Disabled'}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <a href={`/admin/edit-product?id=${product._id}`} className="text-blue-600 hover:underline mr-3">
                          ✏️ Edit
                        </a>
                        <button
                          onClick={() => toggleProductStatus(product._id, product.isEnabled)}
                          className={`px-3 py-1 rounded text-sm font-semibold mr-3 transition ${
                            product.isEnabled
                              ? 'bg-yellow-200 text-yellow-900 hover:bg-yellow-300'
                              : 'bg-green-200 text-green-900 hover:bg-green-300'
                          }`}
                        >
                          {product.isEnabled ? '👁️ Hide' : '👁️‍🗨️ Show'}
                        </button>
                        <button 
                          onClick={() => deleteProduct(product._id, product.name.en)}
                          className="text-red-600 hover:underline font-semibold hover:text-red-800 transition"
                        >
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold mb-6">Order Management</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Order ID</th>
                    <th className="px-4 py-2 text-left">Customer</th>
                    <th className="px-4 py-2 text-left">Amount</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-t">
                      <td className="px-4 py-2">{order.orderId}</td>
                      <td className="px-4 py-2">{order.customerDetails?.name}</td>
                      <td className="px-4 py-2 font-bold">₹{order.totalAmount.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm capitalize">
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <span className={`px-3 py-1 rounded text-sm ${order.paymentStatus === 'success' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'enquiries' && (
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold mb-6">Enquiries</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Phone</th>
                    <th className="px-4 py-2 text-left">Type</th>
                    <th className="px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((enquiry) => (
                    <tr key={enquiry._id} className="border-t">
                      <td className="px-4 py-2">{enquiry.name}</td>
                      <td className="px-4 py-2">{enquiry.email}</td>
                      <td className="px-4 py-2">{enquiry.phone}</td>
                      <td className="px-4 py-2">{enquiry.enquiryType}</td>
                      <td className="px-4 py-2">
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded text-sm capitalize">
                          {enquiry.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold mb-6">Settings</h2>
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settingsForm.festivalBannerEnabled}
                    onChange={(e) => handleSettingsChange('festivalBannerEnabled', e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="font-semibold">Enable Festival Greeting Banner</span>
                </label>
              </div>
              <div>
                <label className="block font-semibold mb-2">Festival Banner Text (EN)</label>
                <input
                  type="text"
                  value={settingsForm.festivalBannerText?.en || ''}
                  onChange={(e) => handleSettingsChange('festivalBannerText.en', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Enter festival greeting in English"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Festival Banner Text (TA)</label>
                <input
                  type="text"
                  value={settingsForm.festivalBannerText?.ta || ''}
                  onChange={(e) => handleSettingsChange('festivalBannerText.ta', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Enter festival greeting in Tamil"
                />
              </div>
              <button 
                onClick={saveSettings}
                disabled={settingsSaving}
                className="px-6 py-2 bg-accent text-white rounded hover:bg-accent/90 disabled:opacity-50 font-semibold"
              >
                {settingsSaving ? '⏳ Saving...' : '💾 Save Settings'}
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
