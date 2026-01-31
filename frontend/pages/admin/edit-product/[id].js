import Head from 'next/head';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { productAPI } from '../../../utils/api';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      console.log('📝 Loading product:', id);
      const res = await productAPI.getById(id);
      console.log('✅ Product loaded:', res.data);
      setFormData(res.data);
    } catch (err) {
      console.error('❌ Error loading product:', err);
      setError('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNestedChange = (parent, child, value) => {
    setFormData({
      ...formData,
      [parent]: {
        ...formData[parent],
        [child]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      console.log('📝 Updating product:', formData);
      await productAPI.update(id, formData);
      console.log('✅ Product updated successfully');
      alert('✅ Product updated successfully!');
      router.push('/admin');
    } catch (err) {
      console.error('❌ Error updating product:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Error updating product';
      setError(errorMessage);
      alert('Error: ' + errorMessage);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-12">
          <p className="text-center">Loading product...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!formData) {
    return (
      <>
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-12">
          <p className="text-center text-red-600">Product not found</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Edit Product - Admin</title>
      </Head>

      <Header />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Edit Product</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <p className="font-semibold">❌ Error: {error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8 space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold mb-2">Product Name (EN)</label>
              <input
                type="text"
                value={formData.name?.en || ''}
                onChange={(e) => handleNestedChange('name', 'en', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Product Name (TA)</label>
              <input
                type="text"
                value={formData.name?.ta || ''}
                onChange={(e) => handleNestedChange('name', 'ta', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold mb-2">Description (EN)</label>
              <textarea
                value={formData.description?.en || ''}
                onChange={(e) => handleNestedChange('description', 'en', e.target.value)}
                rows="4"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Description (TA)</label>
              <textarea
                value={formData.description?.ta || ''}
                onChange={(e) => handleNestedChange('description', 'ta', e.target.value)}
                rows="4"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-2">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={formData.price || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
            <h3 className="text-lg font-bold mb-4">🔧 Product Status</h3>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer p-3 bg-white rounded border hover:bg-blue-50 transition">
                <input
                  type="checkbox"
                  name="isEnabled"
                  checked={formData.isEnabled || false}
                  onChange={handleChange}
                  className="w-5 h-5 cursor-pointer"
                />
                <div>
                  <p className="font-semibold">Enable Product</p>
                  <p className="text-sm text-gray-600">
                    {formData.isEnabled ? '✅ Product is VISIBLE on store' : '❌ Product is HIDDEN from store'}
                  </p>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer p-3 bg-white rounded border hover:bg-blue-50 transition">
                <input
                  type="checkbox"
                  name="isPopular"
                  checked={formData.isPopular || false}
                  onChange={handleChange}
                  className="w-5 h-5 cursor-pointer"
                />
                <div>
                  <p className="font-semibold">Mark as Popular</p>
                  <p className="text-sm text-gray-600">
                    {formData.isPopular ? '⭐ Shows as popular in store' : 'Not marked as popular'}
                  </p>
                </div>
              </label>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
            <p className="text-sm text-gray-700">
              <strong>💡 Tip:</strong> Enable/Disable allows you to hide products from customers without deleting them. Perfect for temporary removal or seasonal products.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 bg-accent text-white rounded-lg font-bold hover:bg-accent/90 disabled:opacity-50"
            >
              {saving ? '⏳ Saving...' : '✅ Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/admin')}
              className="px-8 py-3 bg-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </>
  );
}
