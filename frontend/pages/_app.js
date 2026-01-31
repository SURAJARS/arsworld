import { I18nProvider } from '../utils/i18n/context';
import { CartProvider } from '../utils/CartContext';
import { GoogleAnalytics } from '../utils/analytics';
import { useEffect, useState } from 'react';
import { settingsAPI } from '../utils/api';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [measurementId, setMeasurementId] = useState(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await settingsAPI.get();
        if (res.data?.googleAnalyticsId) {
          setMeasurementId(res.data.googleAnalyticsId);
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };

    loadSettings();
  }, []);

  return (
    <CartProvider>
      <I18nProvider>
        <GoogleAnalytics measurementId={measurementId} />
        <Component {...pageProps} />
      </I18nProvider>
    </CartProvider>
  );
}

export default MyApp;
