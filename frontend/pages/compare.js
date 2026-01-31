import Head from 'next/head';
import { useI18n } from '../utils/i18n/context';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { productAPI } from '../utils/api';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Compare() {
  const { t, language } = useI18n();
  const [products, setProducts] = useState([]);
  const [compared, setCompared] = useState([]);

  useEffect(() => {
    const comparedIds = JSON.parse(localStorage.getItem('compared_products') || '[]');
    setCompared(comparedIds);
    
    if (comparedIds.length > 0) {
      loadProducts(comparedIds);
    }
  }, []);

  const loadProducts = async (ids) => {
    try {
      const res = await productAPI.compare(ids);
      setProducts(res.data);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const removeProduct = (id) => {
    const updated = compared.filter((c) => c !== id);
    setCompared(updated);
    localStorage.setItem('compared_products', JSON.stringify(updated));
    setProducts(products.filter((p) => p._id !== id));
  };

  if (products.length === 0) {
    return (
      <>
        <Head>
          <title>{t('compare.title')} - ARS Electronics World</title>
        </Head>

        <Header />
        <main className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold text-primary mb-8">{t('compare.title')}</h1>
          <p className="text-gray-500 mb-8">{t('compare.noProducts')}</p>
          <Link href="/products" className="px-6 py-3 bg-accent text-white rounded hover:bg-accent/90">
            {t('header.products')}
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{t('compare.title')} - ARS Electronics World</title>
      </Head>

      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-primary mb-12">{t('compare.title')}</h1>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-primary text-white">
                <th className="border p-4 text-left">Feature</th>
                {products.map((product) => (
                  <th key={product._id} className="border p-4 text-center">
                    <div className="min-w-max">
                      <button
                        onClick={() => removeProduct(product._id)}
                        className="float-right bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                      >
                        ✕
                      </button>
                      <h3 className="font-bold mb-2 pr-8">{product.name[language]}</h3>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="border p-4 font-semibold">Price</td>
                {products.map((product) => (
                  <td key={product._id} className="border p-4 text-center text-secondary font-bold">
                    ₹{product.price.toLocaleString('en-IN')}
                  </td>
                ))}
              </tr>

              {products[0]?.specifications &&
                Object.keys(products[0].specifications).map((specKey) => (
                  <tr key={specKey} className="hover:bg-gray-50">
                    <td className="border p-4 font-semibold capitalize">{specKey}</td>
                    {products.map((product) => (
                      <td key={product._id} className="border p-4 text-center">
                        {product.specifications?.[specKey] || '-'}
                      </td>
                    ))}
                  </tr>
                ))}

              <tr className="bg-gray-50">
                <td className="border p-4"></td>
                {products.map((product) => (
                  <td key={product._id} className="border p-4 text-center">
                    <Link href={`/products/${product._id}`} className="px-4 py-2 bg-accent text-white rounded hover:bg-accent/90">
                      {t('common.view')}
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => {
              localStorage.setItem('compared_products', '[]');
              setCompared([]);
              setProducts([]);
            }}
            className="px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear Comparison
          </button>
        </div>
      </main>

      <Footer />
    </>
  );
}
