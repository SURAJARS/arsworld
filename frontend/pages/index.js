import Head from 'next/head';
import { useI18n } from '../utils/i18n/context';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import Carousel from '../components/Carousel';
import { productAPI, settingsAPI } from '../utils/api';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home({ products, popularProducts, settings }) {
  const { t, language } = useI18n();
  const useCases = [
    { key: 'small_families', label: t('home.smallFamilies') },
    { key: 'large_families', label: t('home.largeFamilies') },
    { key: 'energy_saving', label: t('home.energySaving') },
    { key: 'premium', label: t('home.premium') },
  ];

  const features = [
    {
      icon: '⚡',
      title: 'Fast Delivery',
      description: 'Quick and reliable shipping across India with installation support',
    },
    {
      icon: '🛡️',
      title: 'Secure Payment',
      description: 'Safe and encrypted payment options for your peace of mind',
    },
    {
      icon: '📞',
      title: '24/7 Support',
      description: 'Dedicated customer service available round the clock',
    },
    {
      icon: '✅',
      title: 'Warranty',
      description: 'Authentic products with manufacturer warranty on all items',
    },
  ];

  return (
    <>
      <Head>
        <title>ARS Electronics World - Online Appliance Store</title>
        <meta name="description" content="Buy high-quality home appliances online" />
      </Head>

      <Header />

      {settings?.festivalBannerEnabled && (
        <div className="bg-yellow-500 text-primary py-4 text-center text-lg font-bold">
          🎉 {settings.festivalBannerText[language]}
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Modern Carousel */}
        <Carousel />

        {/* Features Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-blue-100"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Welcome Section */}
        <section className="text-center mb-16 py-8">
          <h1 className="text-5xl font-bold text-primary mb-4">{t('home.welcome')}</h1>
          <p className="text-xl text-gray-600 mb-8">📍 {t('home.serving')}</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/products" className="bg-accent text-white px-8 py-3 rounded-lg font-bold hover:bg-accent/90 transition">
              Shop Now
            </Link>
            <Link href="/ecatalogue" className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition">
              View Catalogue
            </Link>
            <Link href="/services" className="bg-secondary text-white px-8 py-3 rounded-lg font-bold hover:bg-secondary/90 transition">
              Service List
            </Link>
          </div>
        </section>

        {/* Product Categories */}
        {useCases.map((useCase) => (
          <section key={useCase.key} className="mb-16">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-primary">{useCase.label}</h2>
              <Link href={`/products?useCase=${useCase.key}`} className="text-accent font-semibold hover:text-secondary">
                {t('home.exploreNow')} →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products
                .filter((p) => p.useCases.includes(useCase.key))
                .slice(0, 4)
                .map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          </section>
        ))}

        {/* Popular Products */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-8">⭐ {t('home.popular')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  try {
    const [productsRes, popularRes, settingsRes] = await Promise.all([
      productAPI.getAll(),
      productAPI.getPopular(),
      settingsAPI.get(),
    ]);

    return {
      props: {
        products: productsRes.data || [],
        popularProducts: popularRes.data || [],
        settings: settingsRes.data || null,
      },
    };
  } catch (error) {
    return {
      props: {
        products: [],
        popularProducts: [],
        settings: null,
      },
    };
  }
}
