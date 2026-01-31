import Head from 'next/head';
import { useI18n } from '../utils/i18n/context';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function eCatalogue() {
  const { t, language } = useI18n();
  const [catalogues, setCatalogues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCatalogue, setSelectedCatalogue] = useState(null);

  useEffect(() => {
    fetchCatalogues();
  }, []);

  const fetchCatalogues = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/catalogues');
      if (response.ok) {
        const data = await response.json();
        setCatalogues(data.catalogues || []);
      }
    } catch (error) {
      console.error('Error fetching catalogues:', error);
    } finally {
      setLoading(false);
    }
  };

  const sampleCatalogues = [
    {
      _id: '1',
      title: 'Product Catalogue 2024',
      description: 'Complete list of all our products with specifications',
      url: 'https://example.com/product-catalogue-2024.pdf',
      thumbnail: '📄',
      category: 'Products',
      views: 1243,
      createdAt: new Date(2024, 0, 1),
    },
    {
      _id: '2',
      title: 'Price List January 2026',
      description: 'Current pricing for all items',
      url: 'https://example.com/price-list.pdf',
      thumbnail: '💰',
      category: 'Pricing',
      views: 856,
      createdAt: new Date(2026, 0, 15),
    },
    {
      _id: '3',
      title: 'Installation Guide',
      description: 'Step-by-step installation instructions for appliances',
      url: 'https://example.com/installation-guide.pdf',
      thumbnail: '🔧',
      category: 'Support',
      views: 2341,
      createdAt: new Date(2025, 11, 1),
    },
    {
      _id: '4',
      title: 'Warranty Information',
      description: 'Warranty terms and conditions for all products',
      url: 'https://example.com/warranty.pdf',
      thumbnail: '🛡️',
      category: 'Warranty',
      views: 654,
      createdAt: new Date(2025, 8, 1),
    },
  ];

  const displayCatalogues = catalogues.length > 0 ? catalogues : sampleCatalogues;

  return (
    <>
      <Head>
        <title>eCatalogue - ARS Electronics World</title>
        <meta name="description" content="Download our product catalogues and price lists" />
      </Head>

      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Header Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-primary mb-4">📚 eCatalogue</h1>
          <p className="text-xl text-gray-600 mb-8">Download our product catalogues, price lists, and guides</p>
          <Link
            href="/"
            className="text-accent font-semibold hover:text-secondary inline-flex items-center gap-2"
          >
            ← Back to Home
          </Link>
        </section>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin">🔄</div>
            <p className="text-gray-600 mt-4">Loading catalogues...</p>
          </div>
        )}

        {!loading && displayCatalogues.length === 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
            <p className="text-gray-700 text-lg">No catalogues available at the moment.</p>
          </div>
        )}

        {!loading && displayCatalogues.length > 0 && (
          <>
            {/* Filter/Category Buttons */}
            <div className="mb-12 flex flex-wrap gap-3 justify-center">
              <button className="px-6 py-2 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition">
                All Documents
              </button>
              {['Products', 'Pricing', 'Support', 'Warranty'].map((category) => (
                <button
                  key={category}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-300 transition"
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Catalogues Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {displayCatalogues.map((catalogue) => (
                <div
                  key={catalogue._id}
                  className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:scale-105 cursor-pointer"
                  onClick={() => setSelectedCatalogue(catalogue)}
                >
                  {/* Thumbnail */}
                  <div className="bg-gradient-to-br from-blue-100 to-indigo-100 h-48 flex items-center justify-center text-6xl">
                    {catalogue.thumbnail}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                      {catalogue.category}
                    </div>

                    <h3 className="text-2xl font-bold text-primary mb-2">{catalogue.title}</h3>
                    <p className="text-gray-600 mb-4">{catalogue.description}</p>

                    <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                      <span>👁️ {catalogue.views} views</span>
                      <span>📅 {new Date(catalogue.createdAt).toLocaleDateString()}</span>
                    </div>

                    {/* Download Button */}
                    <a
                      href={catalogue.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="block w-full bg-accent text-white py-3 rounded-lg font-bold text-center hover:bg-accent/90 transition"
                    >
                      📥 Download PDF
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Catalogue Preview Modal */}
            {selectedCatalogue && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-3xl font-bold text-primary mb-2">{selectedCatalogue.title}</h2>
                        <p className="text-gray-600">{selectedCatalogue.description}</p>
                      </div>
                      <button
                        onClick={() => setSelectedCatalogue(null)}
                        className="text-2xl text-gray-500 hover:text-gray-700 font-bold"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="mb-6 text-gray-600 space-y-2">
                      <p>📁 Category: <span className="font-semibold">{selectedCatalogue.category}</span></p>
                      <p>👁️ Views: <span className="font-semibold">{selectedCatalogue.views}</span></p>
                      <p>📅 Published: <span className="font-semibold">{new Date(selectedCatalogue.createdAt).toLocaleDateString()}</span></p>
                    </div>

                    <div className="flex gap-4">
                      <a
                        href={selectedCatalogue.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-accent text-white py-3 rounded-lg font-bold text-center hover:bg-accent/90 transition"
                      >
                        📥 Download PDF
                      </a>
                      <a
                        href={selectedCatalogue.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-primary text-white py-3 rounded-lg font-bold text-center hover:bg-primary/90 transition"
                      >
                        👁️ View Online
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Info Section */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-8 mt-12">
          <h2 className="text-2xl font-bold text-primary mb-4">📋 About Our Catalogues</h2>
          <ul className="space-y-3 text-gray-700">
            <li>✅ All catalogues are updated regularly with latest products and prices</li>
            <li>✅ PDFs are optimized for easy viewing and printing</li>
            <li>✅ For custom catalogues or bulk orders, contact us directly</li>
            <li>✅ These documents are confidential and for authorized dealers only</li>
          </ul>
        </section>
      </main>

      <Footer />
    </>
  );
}
