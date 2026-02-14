import { useI18n } from '../utils/i18n/context';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { trackEvent } from '../utils/analytics';
import { useCart } from '../utils/CartContext';

export default function ProductCard({ product }) {
  const { t, language } = useI18n();
  const router = useRouter();
  const { addToCart } = useCart();
  const [isComparing, setIsComparing] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleCompare = () => {
    const compared = JSON.parse(localStorage.getItem('compared_products') || '[]');
    if (!compared.includes(product._id)) {
      if (compared.length >= 3) {
        alert(t('compare.selectProducts'));
        return;
      }
      compared.push(product._id);
      localStorage.setItem('compared_products', JSON.stringify(compared));
      setIsComparing(true);
    }
  };

  const handleBuyNow = () => {
    trackEvent('buy_now_clicked', { product_id: product._id, product_name: product.name[language] });
  };

  const handleWhatsApp = () => {
    trackEvent('whatsapp_clicked', { product_id: product._id });
  };

  const handleAddToCart = () => {
    addToCart(product, 1);
    setAddedToCart(true);
    trackEvent('add_to_cart_clicked', { product_id: product._id, product_name: product.name[language] });
    // Reset the "added" message after 2 seconds
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-2">
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        {product.images && product.images[0] && (
          <img
            src={product.images[0]}
            alt={product.name[language]}
            className="w-full h-full object-cover"
          />
        )}
        {product.isPopular && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            ⭐ {t('home.popular')}
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-primary mb-2">
          {product.name[language]}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description[language]}
        </p>

        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-600">Price (Inc. GST)</p>
            <span className="text-2xl font-bold text-secondary">
              ₹{(product.price * (1 + (product.gstPercentage || 18) / 100)).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </span>
            <p className="text-xs text-gray-500 mt-1">({(product.gstPercentage || 18)}% GST)</p>
          </div>
        </div>

        <div className="space-y-2">
          <button
            onClick={handleAddToCart}
            className={`w-full py-2 rounded text-center font-semibold transition ${
              addedToCart
                ? 'bg-green-500 text-white'
                : 'bg-yellow-400 text-gray-900 hover:bg-yellow-500'
            }`}
          >
            {addedToCart ? '✓ Added to Cart' : '🛒 Add to Cart'}
          </button>

          <Link href={`/products/${product._id}`} className="block w-full bg-accent text-white py-2 rounded text-center font-semibold hover:bg-accent/90 transition">
            {t('products.buyNow')}
          </Link>

          <button
            onClick={handleWhatsApp}
            className="w-full bg-green-500 text-white py-2 rounded text-center font-semibold hover:bg-green-600 transition"
          >
            💬 {t('products.whatsappEnquiry')}
          </button>

          <button
            onClick={handleCompare}
            className={`w-full py-2 rounded text-center font-semibold transition ${
              isComparing
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {isComparing ? '✓ ' : '+'}
            {t('products.addToCompare')}
          </button>
        </div>
      </div>
    </div>
  );
}
