import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { productAPI } from '../../utils/api';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AddProduct() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: { en: '', ta: '' },
    description: { en: '', ta: '' },
    price: '',
    gstPercentage: 18,
    useCases: [],
    images: [''],
    specifications: {},
    isPopular: false,
    isEnabled: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (name === 'isPopular' || name === 'isEnabled') {
        setFormData({ ...formData, [name]: checked });
      } else {
        const useCases = formData.useCases.includes(value)
          ? formData.useCases.filter((u) => u !== value)
          : [...formData.useCases, value];
        setFormData({ ...formData, useCases });
      }
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
    setLoading(true);
    setError(null);

    // Validate required fields
    if (!formData.name.en || !formData.name.ta) {
      setError('Product name is required in both English and Tamil');
      setLoading(false);
      return;
    }

    if (!formData.description.en || !formData.description.ta) {
      setError('Product description is required in both English and Tamil');
      setLoading(false);
      return;
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      setError('Valid price is required');
      setLoading(false);
      return;
    }

    if (!formData.images || formData.images.length === 0 || !formData.images[0]) {
      setError('At least one image URL is required');
      setLoading(false);
      return;
    }

    try {
      console.log('📝 Submitting product:', formData);
      await productAPI.create(formData);
      alert('✅ Product created successfully!');
      router.push('/admin');
    } catch (error) {
      console.error('❌ Error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Error creating product';
      setError(errorMessage);
      alert('Error: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const useCaseOptions = [
    { value: 'small_families', label: 'Small Appliances' },
    { value: 'large_families', label: 'Large Appliances' },
    { value: 'energy_saving', label: 'Energy Saving' },
    { value: 'premium', label: 'Premium' },
    { value: 'popular', label: 'Popular' },
  ];

  return (
    <>
      <Head>
        <title>Add Product - Admin</title>
      </Head>

      <Header />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Add New Product</h1>

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
                value={formData.name.en}
                onChange={(e) => handleNestedChange('name', 'en', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Product Name (TA)</label>
              <input
                type="text"
                value={formData.name.ta}
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
                value={formData.description.en}
                onChange={(e) => handleNestedChange('description', 'en', e.target.value)}
                rows="4"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Description (TA)</label>
              <textarea
                value={formData.description.ta}
                onChange={(e) => handleNestedChange('description', 'ta', e.target.value)}
                rows="4"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold mb-2">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">GST Percentage (%)</label>
              <input
                type="number"
                name="gstPercentage"
                min="0"
                max="100"
                step="0.1"
                value={formData.gstPercentage}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="e.g., 18"
              />
              <small className="text-gray-500 mt-1 block">Common rates: 5%, 12%, 18%, 28%</small>
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-4">Use Cases</label>
            <div className="space-y-2">
              {useCaseOptions.map((option) => (
                <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={formData.useCases.includes(option.value)}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isPopular"
                checked={formData.isPopular}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span className="font-semibold">Mark as Popular</span>
            </label>
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isEnabled"
                checked={formData.isEnabled}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span className="font-semibold">Enable Product</span>
            </label>
          </div>

          <div>
            <label className="block font-semibold mb-2">Image URLs (comma-separated)</label>
            <input
              type="text"
              value={formData.images.join(',')}
              onChange={(e) => setFormData({ ...formData, images: e.target.value.split(',').filter(i => i.trim()) })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="https://image1.jpg, https://image2.jpg"
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-accent text-white rounded-lg font-bold hover:bg-accent/90 disabled:opacity-50"
            >
              {loading ? '⏳ Creating...' : '✅ Create Product'}
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
