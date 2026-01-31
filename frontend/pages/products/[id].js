import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';
import { useI18n } from '../../utils/i18n/context';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { productAPI, orderAPI } from '../../utils/api';
import { useCart } from '../../utils/CartContext';
import { useState } from 'react';

export default function ProductDetail({ product }) {
  const { t, language } = useI18n();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleWhatsApp = () => {
    const phone = '919842236692';
    const message = `Hi, I'm interested in ${product.name[language]} priced at ₹${product.price}. Can you provide more details?`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`);
  };

  const handleCall = () => {
    window.open('tel:+919842236692');
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (!product) {
    return <div>{t('common.loading')}</div>;
  }

  return (
    <>
      <Head>
        <title>{product.name[language]} - ARS Electronics World</title>
        <meta name="description" content={product.description[language]} />
      </Head>

      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden mb-4">
              {product.images && product.images[0] && (
                <img
                  src={product.images[0]}
                  alt={product.name[language]}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images?.slice(0, 4).map((image, idx) => (
                <img
                  key={idx}
                  src={image}
                  alt=""
                  className="h-24 w-full object-cover rounded cursor-pointer hover:opacity-75"
                />
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-4xl font-bold text-primary mb-4">
              {product.name[language]}
            </h1>

            {product.isPopular && (
              <div className="inline-block bg-yellow-500 text-white px-4 py-2 rounded-full mb-4">
                ⭐ Popular in Our Shop
              </div>
            )}

            <p className="text-gray-600 mb-6">{product.description[language]}</p>

            <div className="bg-gray-100 p-6 rounded-lg mb-6">
              <p className="text-gray-600 mb-2">Price</p>
              <p className="text-4xl font-bold text-secondary">
                ₹{(product.price * quantity).toLocaleString('en-IN')}
              </p>
              <p className="text-sm text-gray-500 mt-2">₹{product.price.toLocaleString('en-IN')} per item</p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span className="text-2xl font-bold text-primary w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
                >
                  +
                </button>
              </div>
              <p className="text-xs text-gray-600 mt-3">Total: ₹{(product.price * quantity).toLocaleString('en-IN')}</p>
            </div>

            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">{t('products.specifications')}</h3>
                <div className="bg-white border rounded-lg p-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b last:border-b-0">
                      <span className="text-gray-600 capitalize">{key}</span>
                      <span className="font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className={`w-full py-3 rounded-lg font-bold transition ${
                  addedToCart
                    ? 'bg-green-500 text-white'
                    : 'bg-yellow-400 text-gray-900 hover:bg-yellow-500'
                }`}
              >
                {addedToCart ? '✓ Added to Cart' : '🛒 Add to Cart'}
              </button>

              <Link
                href="/checkout"
                className="block w-full bg-accent text-white py-3 rounded-lg font-bold hover:bg-accent/90 text-center"
              >
                💳 Buy Now (Checkout)
              </Link>

              <button
                onClick={handleWhatsApp}
                className="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600"
              >
                💬 {t('products.whatsappEnquiry')}
              </button>

              <button
                onClick={handleCall}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700"
              >
                📞 {t('products.callShop')}
              </button>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">
                ℹ️ Availability is confirmed via call/WhatsApp. We serve customers in and around Krishnagiri.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const res = await productAPI.getById(params.id);
    return {
      props: {
        product: res.data,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
