import { useI18n } from '../utils/i18n/context';
import Link from 'next/link';

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-12 mt-16 border-t-4 border-yellow-400">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <svg viewBox="0 0 200 100" className="w-10 h-10">
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
            <span className="text-xl font-bold text-yellow-400">ARS Electronics</span>
          </div>
          <p className="text-gray-400">{t('footer.about')}</p>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-yellow-400">{t('footer.quickLinks')}</h4>
          <ul className="space-y-2 text-gray-300">
            <li><Link href="/" className="hover:text-yellow-400 transition">{t('header.home')}</Link></li>
            <li><Link href="/products" className="hover:text-yellow-400 transition">{t('header.products')}</Link></li>
            <li><Link href="/ecatalogue" className="hover:text-yellow-400 transition">Catalogue</Link></li>
            <li><Link href="/services" className="hover:text-yellow-400 transition">Services</Link></li>
            <li><Link href="/contact" className="hover:text-yellow-400 transition">{t('header.contact')}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-yellow-400">{t('footer.contact')}</h4>
          <div className="space-y-2 text-gray-300">
            <p>📞 <a href="tel:9842236692" className="hover:text-yellow-400 transition">9842236692</a></p>
            <p>☎️ <a href="tel:04343236697" className="hover:text-yellow-400 transition">Landline: 04343 236697</a></p>
            <p>💬 <a href="https://wa.me/919842236692" className="hover:text-yellow-400 transition">WhatsApp: 9842236692</a></p>
            <p>📧 <a href="mailto:arselectronicsworld@gmail.com" className="hover:text-yellow-400 transition">arselectronicsworld@gmail.com</a></p>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-yellow-400">Location</h4>
          <div className="space-y-3">
            <p className="text-gray-300 text-sm">📍 ARS Electronics World,<br></br> Krishnagiri, Tamil Nadu</p>
            <a 
              href="https://maps.app.goo.gl/SboLLVD4113zkatT6" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-yellow-400 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-300 transition w-full text-center"
            >
              📍 View on Google Maps
            </a>
            <a 
              href="https://maps.app.goo.gl/SboLLVD4113zkatT6" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block text-gray-300 hover:text-yellow-400 transition text-sm text-center"
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 border-t border-gray-700 mt-8 pt-8 text-center text-gray-500">
        <p>{t('footer.copyright')} | ARS Electronics World © 2026</p>
        <p className="text-sm mt-2">Authorised Service Partner for Major Brands</p>
      </div>
    </footer>
  );
}
