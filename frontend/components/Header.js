import { useI18n } from '../utils/i18n/context';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '../utils/CartContext';

export default function Header() {
  const { t, language, toggleLanguage } = useI18n();
  const router = useRouter();
  const { getCartItemsCount } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const cartCount = getCartItemsCount();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/');
  };

  return (
    <header className="bg-gradient-to-r from-amber-50 to-yellow-50 text-gray-800 shadow-lg border-b-4 border-yellow-400">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <svg viewBox="0 0 200 100" className="w-12 h-12">
            <g id="leaves">
              <path d="M 40 30 Q 48 22 50 35 Q 42 38 40 30" fill="#FFC107" stroke="none"/>
              <path d="M 65 22 Q 75 17 77 32 Q 67 37 65 22" fill="#FFB300" stroke="none"/>
              <path d="M 30 55 Q 38 47 47 57 Q 40 65 30 55" fill="#FFC107" stroke="none"/>
              <path d="M 55 50 Q 67 40 77 55 Q 65 67 55 50" fill="#FFC107" stroke="none"/>
              <path d="M 50 70 Q 65 55 80 75 Q 62 87 50 70" fill="#FFD54F" stroke="none"/>
              <path d="M 35 85 Q 45 77 55 90 Q 45 95 35 85" fill="#FFC107" stroke="none"/>
              <path d="M 65 87 Q 77 80 87 92 Q 77 100 65 87" fill="#FFB300" stroke="none"/>
            </g>
          </svg>
          <span className="text-2xl font-bold text-amber-900 hidden sm:block">ARS Electronics</span>
        </Link>

        <nav className={`${showMobileMenu ? 'block' : 'hidden'} md:block absolute md:static top-16 left-0 right-0 bg-white md:bg-transparent p-4 md:p-0 rounded md:rounded-none`}>
          <ul className="flex flex-col md:flex-row gap-6">
            <li><Link href="/" className="text-gray-700 hover:text-yellow-600 font-medium">{t('header.home')}</Link></li>
            <li><Link href="/products" className="text-gray-700 hover:text-yellow-600 font-medium">{t('header.products')}</Link></li>
            <li><Link href="/ecatalogue" className="text-gray-700 hover:text-yellow-600 font-medium">Catalogue</Link></li>
            <li><Link href="/services" className="text-gray-700 hover:text-yellow-600 font-medium">Services</Link></li>
            <li><Link href="/compare" className="text-gray-700 hover:text-yellow-600 font-medium">{t('header.compare')}</Link></li>
            <li><Link href="/contact" className="text-gray-700 hover:text-yellow-600 font-medium">{t('header.contact')}</Link></li>
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/checkout"
            className="relative px-3 py-2 bg-yellow-400 text-gray-900 rounded font-semibold hover:bg-yellow-500 transition flex items-center gap-2"
          >
            🛒 Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            onClick={toggleLanguage}
            className="px-3 py-2 bg-yellow-400 text-gray-900 rounded font-semibold hover:bg-yellow-500 transition"
          >
            {language === 'en' ? 'தமிழ்' : 'EN'}
          </button>

          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className="text-gray-700 hover:text-yellow-600 font-medium">{t('header.dashboard')}</Link>
              <button onClick={handleLogout} className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-semibold">
                {t('header.logout')}
              </button>
            </>
          ) : (
            <Link href="/login" className="px-3 py-2 bg-yellow-400 text-gray-900 rounded hover:bg-yellow-500 font-semibold transition">
              {t('header.login')}
            </Link>
          )}

          <button
            className="md:hidden text-2xl text-gray-700"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}
