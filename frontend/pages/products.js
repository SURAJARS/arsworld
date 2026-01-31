import Head from 'next/head';
import { useI18n } from '../utils/i18n/context';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { productAPI } from '../utils/api';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Products({ initialProducts }) {
  const { t } = useI18n();
  const router = useRouter();
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedUseCase, setSelectedUseCase] = useState('');

  const handleFilter = async (useCase) => {
    setLoading(true);
    setSelectedUseCase(useCase);
    try {
      const res = await productAPI.getAll({ useCase: useCase || undefined, search: search || undefined });
      setProducts(res.data);
    } catch (error) {
      console.error('Error filtering products:', error);
    }
    setLoading(false);
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);
    setLoading(true);
    try {
      const res = await productAPI.getAll({ search: value || undefined, useCase: selectedUseCase || undefined });
      setProducts(res.data);
    } catch (error) {
      console.error('Error searching:', error);
    }
    setLoading(false);
  };

  const useCases = [
    { value: '', label: 'All' },
    { value: 'small_families', label: 'Small Families' },
    { value: 'large_families', label: 'Large Families' },
    { value: 'energy_saving', label: 'Energy Saving' },
    { value: 'premium', label: 'Premium' },
  ];

  return (
    <>
      <Head>
        <title>{t('products.title')} - ARS Electronics World</title>
      </Head>

      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-primary mb-8">{t('products.title')}</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold mb-4">{t('products.filter')}</h3>
              <div className="space-y-2">
                {useCases.map((useCase) => (
                  <button
                    key={useCase.value}
                    onClick={() => handleFilter(useCase.value)}
                    className={`block w-full text-left px-4 py-2 rounded transition ${
                      selectedUseCase === useCase.value
                        ? 'bg-accent text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {useCase.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="mb-8">
              <input
                type="text"
                placeholder={t('products.search')}
                value={search}
                onChange={handleSearch}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            {loading && <p className="text-center text-gray-500">{t('common.loading')}</p>}

            {!loading && products.length === 0 && (
              <p className="text-center text-gray-500 text-lg">{t('products.noProducts')}</p>
            )}

            {!loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  try {
    const res = await productAPI.getAll();
    return {
      props: {
        initialProducts: res.data || [],
      },
    };
  } catch (error) {
    return {
      props: {
        initialProducts: [],
      },
    };
  }
}
