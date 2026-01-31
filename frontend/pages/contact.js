import Head from 'next/head';
import { useI18n } from '../utils/i18n/context';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { settingsAPI, enquiryAPI } from '../utils/api';
import { useState } from 'react';

export default function Contact({ settings }) {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await enquiryAPI.create({
        productId: null,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        enquiryType: 'contact-form',
      });
      
      if (response && response.data) {
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to send message. Please try again.';
      setError(errorMessage);
      setTimeout(() => setError(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = () => {
    const phone = settings?.shopWhatsapp?.replace(/\D/g, '') || '919842236692';
    const message = 'Hi, I have a query about your products.';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`);
  };

  return (
    <>
      <Head>
        <title>{t('contact.title')} - ARS Electronics World</title>
      </Head>

      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-primary mb-12 text-center">{t('contact.title')}</h1>

        {/* YouTube Video Embed - Location */}
        <div className="mb-12 rounded-lg overflow-hidden shadow-lg">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/ti1tC7g2nrw?si=uXPVZbJUcJIbLfA7"
              title="ARS Electronics Location"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="bg-white rounded-lg shadow p-8">
              <h2 className="text-2xl font-bold mb-8">{t('footer.contact')}</h2>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">📞</div>
                  <div>
                    <p className="font-semibold">{t('contact.phone')}</p>
                    <a
                      href={`tel:${settings?.shopPhone}`}
                      className="text-accent hover:underline"
                    >
                      {settings?.shopPhone || '+91-9876543210'}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-3xl">💬</div>
                  <div>
                    <p className="font-semibold">{t('contact.whatsapp')}</p>
                    <button
                      onClick={handleWhatsApp}
                      className="text-accent hover:underline"
                    >
                      {settings?.shopWhatsapp || '+91-9876543210'}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-3xl">📍</div>
                  <div>
                    <p className="font-semibold">{t('contact.location')}</p>
                    <p className="text-gray-600">{settings?.shopLocation || 'Krishnagiri, TN'}</p>
                  </div>
                </div>
              </div>

              {settings?.googleMapsEmbed && (
                <div className="mt-8">
                  <div dangerouslySetInnerHTML={{ __html: settings.googleMapsEmbed }} />
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold mb-8">{t('contact.message')}</h2>

            {success && (
              <div className="bg-green-100 text-green-700 px-4 py-3 rounded mb-6 border border-green-400">
                ✓ Message sent successfully!
              </div>
            )}

            {error && (
              <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-6 border border-red-400">
                ✗ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  {t('contact.name')}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  {t('contact.email')}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  {t('contact.message')}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent text-white py-3 rounded-lg font-bold hover:bg-accent/90 disabled:opacity-50"
              >
                {loading ? t('common.loading') : t('contact.send')}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  try {
    const res = await settingsAPI.get();
    return {
      props: {
        settings: res.data || null,
      },
    };
  } catch (error) {
    return {
      props: {
        settings: null,
      },
    };
  }
}
