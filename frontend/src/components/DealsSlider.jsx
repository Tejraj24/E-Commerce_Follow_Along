import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const DealsSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const deals = [
    {
      id: 0,
      image: 'https://cdn79045795.ahacdn.me/images/pages/home/deals/deal-anine-bing.webp',
      alt: 'Anine Bing Deal',
      link: '/deals/anine-bing'
    },
    {
      id: 1,
      image: 'https://cdn79045795.ahacdn.me/images/pages/home/deals/deal-diesel.webp',
      alt: 'Diesel Deal',
      link: '/deals/diesel'
    },
    {
      id: 2,
      image: 'https://cdn79045795.ahacdn.me/images/pages/home/deals/deal-mac-duggal.webp',
      alt: 'Mac Duggal Deal',
      link: '/deals/mac-duggal'
    },
    {
      id: 3,
      image: 'https://cdn79045795.ahacdn.me/images/pages/home/deals/deal-marimekko.webp',
      alt: 'Marimekko Deal',
      link: '/deals/marimekko'
    },
    {
      id: 4,
      image: 'https://cdn79045795.ahacdn.me/images/pages/home/deals/deal-orlebar-brown.webp',
      alt: 'Orlebar Brown Deal',
      link: '/deals/orlebar-brown'
    },
    {
      id: 5,
      image: 'https://cdn79045795.ahacdn.me/images/pages/home/deals/deal-wicked-aldo.webp',
      alt: 'Wicked ALDO Deal',
      link: '/deals/wicked-aldo'
    }
  ];

  const slidesPerView = {
    mobile: 1.2,
    tablet: 2.5,
    desktop: 4,
    large: 5
  };

  const nextSlide = () => {
    if (currentSlide < deals.length - Math.floor(slidesPerView.desktop)) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const canGoNext = currentSlide < deals.length - Math.floor(slidesPerView.desktop);
  const canGoPrev = currentSlide > 0;

  return (
    <section className="main__deals deals-main deals-main_full py-12 bg-gray-50">
      <div className="deals-main__container container mx-auto px-4">
        {/* Header */}
        <div className="deals-main__header flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h2 className="deals-main__title text-2xl md:text-3xl font-bold text-gray-900">
            Deals From Our <span className="text-gray-600">Partner Stores</span>
          </h2>
          
          {/* Navigation */}
          <div className="deals-main__navigation nav flex items-center gap-2">
            <button
              onClick={prevSlide}
              disabled={!canGoPrev}
              className={`nav__prev p-2 rounded-full border transition-all ${
                canGoPrev 
                  ? 'border-gray-300 hover:border-gray-900 hover:bg-gray-100' 
                  : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              title="Previous"
            >
              <FiChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              disabled={!canGoNext}
              className={`nav__next p-2 rounded-full border transition-all ${
                canGoNext 
                  ? 'border-gray-300 hover:border-gray-900 hover:bg-gray-100' 
                  : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              title="Next"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div className="deals-main__slider relative overflow-hidden">
          <div 
            ref={sliderRef}
            className="deals-main__wrapper flex transition-transform duration-300 ease-in-out"
            style={{ 
              transform: `translateX(-${currentSlide * (100 / slidesPerView.desktop)}%)`,
              gap: '0.5rem'
            }}
          >
            {deals.map((deal) => (
              <div 
                key={deal.id}
                className="deals-main__slide flex-shrink-0 cursor-pointer group"
                style={{ width: `${100 / slidesPerView.desktop}%` }}
              >
                <Link 
                  to={deal.link}
                  className="block relative overflow-hidden rounded-lg"
                >
                  <div className="aspect-w-4 aspect-h-3">
                    <img
                      src={deal.image}
                      alt={deal.alt}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-center">
                        <span className="text-sm font-medium text-gray-900">Shop Now</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="deals-main__navigation nav flex justify-center items-center gap-2 mt-6">
          <button
            onClick={prevSlide}
            disabled={!canGoPrev}
            className={`nav__prev p-2 rounded-full border transition-all ${
              canGoPrev 
                ? 'border-gray-300 hover:border-gray-900 hover:bg-gray-100' 
                : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            title="Previous"
          >
            <FiChevronLeft size={20} />
          </button>
          
          {/* Slide Indicators */}
          <div className="flex gap-2 mx-4">
            {Array.from({ length: Math.max(1, deals.length - Math.floor(slidesPerView.desktop) + 1) }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index 
                    ? 'bg-gray-900 w-6' 
                    : 'bg-gray-300 hover:bg-gray-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={nextSlide}
            disabled={!canGoNext}
            className={`nav__next p-2 rounded-full border transition-all ${
              canGoNext 
                ? 'border-gray-300 hover:border-gray-900 hover:bg-gray-100' 
                : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            title="Next"
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default DealsSlider;
