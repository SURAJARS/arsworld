import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const slides = [
    {
      id: 1,
      title: 'ARS Premium Electronics',
      subtitle: 'Latest Technology & Best Prices',
      color: 'from-blue-600 to-blue-400',
      icon: '📱',
      description: 'Discover our exclusive collection of smartphones, laptops, and gadgets',
      cta: 'Shop Now',
      link: '/products',
    },
    {
      id: 2,
      title: 'ARS Home Appliances',
      subtitle: 'For Your Modern Lifestyle',
      color: 'from-green-600 to-green-400',
      icon: '🏠',
      description: 'Energy-efficient refrigerators, washing machines, and air conditioners',
      cta: 'Explore',
      link: '/products',
    },
    {
      id: 3,
      title: 'ARS Special Offers',
      subtitle: 'Up to 50% OFF',
      color: 'from-red-600 to-red-400',
      icon: '🎉',
      description: 'Limited time deals on your favorite brands',
      cta: 'View Deals',
      link: '/products',
    },
    {
      id: 4,
      title: 'ARS Fast Delivery',
      subtitle: 'Free Shipping Across India',
      color: 'from-purple-600 to-purple-400',
      icon: '🚚',
      description: 'Quick delivery with installation support',
      cta: 'Learn More',
      link: '/contact',
    },
  ];

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, slides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setAutoPlay(false);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setAutoPlay(false);
  };

  const slide = slides[currentSlide];

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg shadow-2xl mb-12">
      {/* Carousel Container */}
      <div className="relative w-full h-full">
        {/* Animated Background Gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${slide.color} transition-all duration-700 ease-out`}
        >
          {/* Animated Grid Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 animate-pulse" 
              style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              }}
            />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center px-4 md:px-12">
            <div className="text-center text-white z-10 animate-fadeInUp">
              <div className="text-6xl md:text-7xl mb-6 animate-bounce">{slide.icon}</div>
              <h2 className="text-3xl md:text-5xl font-bold mb-3 leading-tight">{slide.title}</h2>
              <p className="text-lg md:text-2xl font-light mb-2">{slide.subtitle}</p>
              <p className="text-base md:text-lg opacity-90 mb-8 max-w-xl mx-auto">{slide.description}</p>
              
              <Link
                href={slide.link}
                className="inline-block bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-gray-200 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                {slide.cta} ➜
              </Link>
            </div>
          </div>

          {/* 3D Effect Overlay */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-screen filter blur-3xl animate-moveTopLeft"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-screen filter blur-3xl animate-moveBottomRight"></div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-black rounded-full w-12 h-12 md:w-14 md:h-14 flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl font-bold text-xl"
        aria-label="Previous slide"
      >
        ❮
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-black rounded-full w-12 h-12 md:w-14 md:h-14 flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl font-bold text-xl"
        aria-label="Next slide"
      >
        ❯
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index);
              setAutoPlay(false);
            }}
            className={`rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'w-8 h-3 bg-white'
                : 'w-3 h-3 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play Resume Button */}
      {!autoPlay && (
        <button
          onClick={() => setAutoPlay(true)}
          className="absolute top-6 right-6 z-20 bg-white/80 hover:bg-white text-black px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300"
        >
          ▶ Resume
        </button>
      )}

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes moveTopLeft {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-20px, -20px);
          }
        }

        @keyframes moveBottomRight {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(20px, 20px);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }

        .animate-moveTopLeft {
          animation: moveTopLeft 6s ease-in-out infinite;
        }

        .animate-moveBottomRight {
          animation: moveBottomRight 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
