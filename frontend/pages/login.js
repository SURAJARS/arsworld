import Head from 'next/head';
import { useI18n } from '../utils/i18n/context';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { authAPI } from '../utils/api';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Login() {
  const { t } = useI18n();
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
      const res = await authAPI.login(formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      router.push('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>{t('auth.login')} - ARS Electronics World</title>
      </Head>

      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-primary mb-8 text-center">{t('auth.login')}</h1>

            {error && (
              <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  {t('auth.email')}
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
                  {t('auth.password')}
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent text-white py-3 rounded-lg font-bold hover:bg-accent/90 disabled:opacity-50"
              >
                {loading ? t('common.loading') : t('auth.loginBtn')}
              </button>
            </form>

            <p className="text-center text-gray-600 mt-6">
              {t('auth.noAccount')}{' '}
              <Link href="/signup" className="text-accent font-semibold hover:underline">
                {t('auth.signup')}
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
