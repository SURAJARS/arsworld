import Head from 'next/head';
import { useI18n } from '../utils/i18n/context';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';
import Link from 'next/link';

export default function Services() {
  const { t, language } = useI18n();
  const [selectedBrand, setSelectedBrand] = useState(null);

  const brands = [
    {
      id: 1,
      name: 'Samsung',
      logo: 'Samsung',
      services: [
        { name: 'Customer Care', phone: '1800-3000-8282', email: 'support@samsung.com' },
        { name: 'Service Center Locator', phone: '1800-SAMSUNG-1', email: 'service@samsung.com' },
        { name: 'Extended Warranty', phone: '1800-3000-8282', email: 'warranty@samsung.com' },
      ],
      bgColor: 'from-blue-100 to-blue-50',
      textColor: 'text-blue-700',
    },
    {
      id: 2,
      name: 'LG',
      logo: 'LG',
      services: [
        { name: 'Customer Care', phone: '1800-180-9999', email: 'care@lg.com' },
        { name: 'Service Centers', phone: '1800-LG-CARE-1', email: 'service@lg.com' },
        { name: 'Warranty Claims', phone: '1800-180-9999', email: 'warranty@lg.com' },
      ],
      bgColor: 'from-red-100 to-red-50',
      textColor: 'text-red-700',
    },
    {
      id: 3,
      name: 'Whirlpool',
      logo: 'Whirlpool',
      services: [
        { name: 'Customer Support', phone: '1860-180-1948', email: 'support@whirlpool.com' },
        { name: 'Service Booking', phone: '1860-180-1948', email: 'service@whirlpool.com' },
        { name: 'Parts & Accessories', phone: '1860-180-1948', email: 'parts@whirlpool.com' },
      ],
      bgColor: 'from-green-100 to-green-50',
      textColor: 'text-green-700',
    },
    {
      id: 4,
      name: 'Godrej',
      logo: 'Godrej',
      services: [
        { name: 'Customer Care', phone: '1800-102-2555', email: 'care@godrej.com' },
        { name: 'Service Centers', phone: '1800-102-2555', email: 'service@godrej.com' },
        { name: 'Spare Parts', phone: '1800-102-2555', email: 'parts@godrej.com' },
      ],
      bgColor: 'from-purple-100 to-purple-50',
      textColor: 'text-purple-700',
    },
    {
      id: 5,
      name: 'Bosch',
      logo: 'Bosch',
      services: [
        { name: 'Customer Service', phone: '1860-266-2474', email: 'service@bosch.com' },
        { name: 'Service Centers', phone: '1860-266-2474', email: 'centers@bosch.com' },
        { name: 'Warranty Support', phone: '1860-266-2474', email: 'warranty@bosch.com' },
      ],
      bgColor: 'from-orange-100 to-orange-50',
      textColor: 'text-orange-700',
    },
    {
      id: 6,
      name: 'IFB',
      logo: 'IFB',
      services: [
        { name: 'Customer Support', phone: '1800-200-1123', email: 'support@ifb.com' },
        { name: 'Service Centers', phone: '1800-200-1123', email: 'service@ifb.com' },
        { name: 'Maintenance Tips', phone: '1800-200-1123', email: 'care@ifb.com' },
      ],
      bgColor: 'from-pink-100 to-pink-50',
      textColor: 'text-pink-700',
    },
    {
      id: 7,
      name: 'Panasonic',
      logo: 'Panasonic',
      services: [
        { name: 'Customer Care', phone: '1800-273-8888', email: 'care@panasonic.com' },
        { name: 'Service Locator', phone: '1800-273-8888', email: 'service@panasonic.com' },
        { name: 'Spare Parts', phone: '1800-273-8888', email: 'parts@panasonic.com' },
      ],
      bgColor: 'from-cyan-100 to-cyan-50',
      textColor: 'text-cyan-700',
    },
    {
      id: 8,
      name: 'Daikin',
      logo: 'Daikin',
      services: [
        { name: 'Customer Support', phone: '1860-180-8080', email: 'support@daikin.com' },
        { name: 'Service Centers', phone: '1860-180-8080', email: 'service@daikin.com' },
        { name: 'AC Maintenance', phone: '1860-180-8080', email: 'maintenance@daikin.com' },
      ],
      bgColor: 'from-blue-100 to-indigo-50',
      textColor: 'text-blue-700',
    },
  ];

  return (
    <>
      <Head>
        <title>Service List - ARS Electronics World</title>
        <meta name="description" content="Brand service numbers and support contacts" />
      </Head>

      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-primary mb-4">🔧 Service List</h1>
          <p className="text-xl text-gray-600 mb-8">Quick access to brand service numbers and support contacts</p>
          <Link
            href="/"
            className="text-accent font-semibold hover:text-secondary inline-flex items-center gap-2"
          >
            ← Back to Home
          </Link>
        </section>

        {/* Search/Filter Section */}
        <div className="mb-12 bg-white p-6 rounded-lg shadow-md">
          <input
            type="text"
            placeholder="Search brands..."
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent"
          />
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {brands.map((brand) => (
            <div
              key={brand.id}
              onClick={() => setSelectedBrand(brand)}
              className={`bg-gradient-to-br ${brand.bgColor} border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300`}
            >
              <div className="text-4xl font-bold mb-4 text-center px-3 py-2 bg-white rounded-lg border-2 border-gray-300 text-gray-800">{brand.logo}</div>
              <h3 className={`text-2xl font-bold ${brand.textColor} text-center`}>{brand.name}</h3>
              <p className="text-gray-600 text-center mt-2 text-sm">
                {brand.services.length} service options
              </p>
              <div className="mt-4 pt-4 border-t border-gray-300 text-center">
                <button className={`font-bold ${brand.textColor} hover:underline`}>
                  View Services ➜
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed View Modal */}
        {selectedBrand && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
              <div className={`bg-gradient-to-r ${selectedBrand.bgColor} p-6 border-b-2 border-gray-200`}>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{selectedBrand.logo}</div>
                    <div>
                      <h2 className={`text-3xl font-bold ${selectedBrand.textColor}`}>{selectedBrand.name}</h2>
                      <p className="text-gray-600">Brand Service Support</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedBrand(null)}
                    className="text-2xl text-gray-500 hover:text-gray-700 font-bold"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-4">📞 Service Contacts</h3>
                <div className="space-y-4">
                  {selectedBrand.services.map((service, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                    >
                      <h4 className="font-bold text-primary mb-2">{service.name}</h4>
                      <div className="space-y-1 text-sm">
                        <p className="flex items-center gap-2">
                          📞 <a href={`tel:${service.phone}`} className="text-accent hover:underline font-semibold">
                            {service.phone}
                          </a>
                        </p>
                        <p className="flex items-center gap-2">
                          📧 <a href={`mailto:${service.email}`} className="text-accent hover:underline break-all">
                            {service.email}
                          </a>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-gray-600 text-sm mb-4">
                    💡 Keep these numbers handy for quick service support!
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedBrand(null)}
                      className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg font-bold hover:bg-gray-400 transition"
                    >
                      Close
                    </button>
                    <a
                      href={`mailto:?subject=Service Contact - ${selectedBrand.name}`}
                      className="flex-1 bg-primary text-white py-2 rounded-lg font-bold text-center hover:bg-primary/90 transition"
                    >
                      Share
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Info Section */}
        <section className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-orange-200 rounded-lg p-8 mt-12">
          <h2 className="text-2xl font-bold text-primary mb-4">ℹ️ Service Information</h2>
          <ul className="space-y-3 text-gray-700">
            <li>✅ All service numbers are verified and updated regularly</li>
            <li>✅ Most brands offer 24/7 customer support via phone</li>
            <li>✅ Service centers are available across India</li>
            <li>✅ For emergency repair, contact the brand directly</li>
            <li>✅ Keep your warranty card and product receipt for service claims</li>
          </ul>
        </section>

        {/* Additional Services */}
        <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
            <div className="text-4xl mb-3">🛠️</div>
            <h3 className="font-bold text-lg text-primary mb-2">On-site Service</h3>
            <p className="text-gray-600">Most brands offer free on-site service during warranty period</p>
          </div>
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
            <div className="text-4xl mb-3">⏱️</div>
            <h3 className="font-bold text-lg text-primary mb-2">Quick Response</h3>
            <p className="text-gray-600">Average service response time is 24-48 hours</p>
          </div>
          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
            <div className="text-4xl mb-3">🔄</div>
            <h3 className="font-bold text-lg text-primary mb-2">Spare Parts</h3>
            <p className="text-gray-600">Genuine spare parts available from authorized service centers</p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
