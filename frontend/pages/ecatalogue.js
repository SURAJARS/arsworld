import Head from "next/head";
import { useI18n } from "../utils/i18n/context";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import Link from "next/link";
import { catalogueAPI } from "../utils/api";

export default function ECatalogue() {
  const { t, language } = useI18n();
  const [catalogues, setCatalogues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCatalogue, setSelectedCatalogue] = useState(null);

  useEffect(() => {
    fetchCatalogues();
  }, []);

  /* =========================
     FETCH CATALOGUES
  ========================= */
  const fetchCatalogues = async () => {
    setLoading(true);
    try {
      const res = await catalogueAPI.getAll();
      setCatalogues(res.data.catalogues || res.data || []);
    } catch (error) {
      console.error("Error fetching catalogues:", error);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     FALLBACK SAMPLE DATA
  ========================= */
  const sampleCatalogues = [
    {
      _id: "1",
      title: "Product Catalogue 2024",
      description: "Complete list of all our products with specifications",
      url: "https://example.com/product-catalogue-2024.pdf",
      thumbnail: "📄",
      category: "Products",
      views: 1243,
      createdAt: new Date(2024, 0, 1),
    },
    {
      _id: "2",
      title: "Price List January 2026",
      description: "Current pricing for all items",
      url: "https://example.com/price-list.pdf",
      thumbnail: "💰",
      category: "Pricing",
      views: 856,
      createdAt: new Date(2026, 0, 15),
    },
    {
      _id: "3",
      title: "Installation Guide",
      description: "Step-by-step installation instructions for appliances",
      url: "https://example.com/installation-guide.pdf",
      thumbnail: "🔧",
      category: "Support",
      views: 2341,
      createdAt: new Date(2025, 11, 1),
    },
    {
      _id: "4",
      title: "Warranty Information",
      description: "Warranty terms and conditions for all products",
      url: "https://example.com/warranty.pdf",
      thumbnail: "🛡️",
      category: "Warranty",
      views: 654,
      createdAt: new Date(2025, 8, 1),
    },
  ];

  const displayCatalogues =
    catalogues.length > 0 ? catalogues : sampleCatalogues;

  return (
    <>
      <Head>
        <title>eCatalogue - ARS Electronics World</title>
        <meta
          name="description"
          content="Download our product catalogues and price lists"
        />
      </Head>

      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-primary mb-4">📚 eCatalogue</h1>
          <p className="text-xl text-gray-600 mb-8">
            Download our product catalogues, price lists, and guides
          </p>
          <Link href="/" className="text-accent font-semibold">
            ← Back to Home
          </Link>
        </section>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin text-3xl">🔄</div>
            <p className="text-gray-600 mt-4">Loading catalogues...</p>
          </div>
        )}

        {/* Empty */}
        {!loading && displayCatalogues.length === 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
            No catalogues available.
          </div>
        )}

        {/* Grid */}
        {!loading && displayCatalogues.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayCatalogues.map((catalogue) => (
              <div
                key={catalogue._id}
                className="bg-white rounded-lg shadow hover:shadow-xl transition cursor-pointer"
                onClick={() => setSelectedCatalogue(catalogue)}
              >
                <div className="h-40 flex items-center justify-center text-6xl bg-blue-100">
                  {catalogue.thumbnail}
                </div>

                <div className="p-6">
                  <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mb-2">
                    {catalogue.category}
                  </span>

                  <h3 className="text-xl font-bold mb-2">
                    {catalogue.title}
                  </h3>

                  <p className="text-gray-600 mb-4">
                    {catalogue.description}
                  </p>

                  <a
                    href={catalogue.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="block bg-accent text-white py-2 rounded text-center font-bold"
                  >
                    📥 Download PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {selectedCatalogue && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-xl w-full">
              <h2 className="text-2xl font-bold mb-2">
                {selectedCatalogue.title}
              </h2>
              <p className="mb-4">{selectedCatalogue.description}</p>

              <div className="flex gap-4">
                <a
                  href={selectedCatalogue.url}
                  target="_blank"
                  className="flex-1 bg-accent text-white py-2 rounded text-center"
                >
                  Download
                </a>
                <button
                  onClick={() => setSelectedCatalogue(null)}
                  className="flex-1 bg-gray-200 py-2 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
