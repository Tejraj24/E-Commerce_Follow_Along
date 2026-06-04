import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      title: 'Discover the <span>hottest</span> brands',
      subtitle: 'Explore our curated collection of premium fashion',
      image: 'https://cdn79045795.ahacdn.me/images/pages/home/hero-slider/hero6.webp',
      mobileImage: 'https://cdn79045795.ahacdn.me/images/pages/home/hero-slider/hero6-mobile.webp',
      womenLink: '/women',
      menLink: '/men'
    },
    {
      id: 2,
      title: 'Browse <span>millions</span> of products',
      subtitle: 'Find everything you need in one place',
      image: 'https://cdn79045795.ahacdn.me/images/pages/home/hero-slider/hero3.webp',
      mobileImage: 'https://cdn79045795.ahacdn.me/images/pages/home/hero-slider/hero3-mobile.webp',
      womenLink: '/women',
      menLink: '/men'
    },
    {
      id: 3,
      title: 'Stay ahead with the <span>latest</span> trends',
      subtitle: 'Be the first to wear what\'s next',
      image: 'https://cdn79045795.ahacdn.me/images/pages/home/hero-slider/hero2.webp',
      mobileImage: 'https://cdn79045795.ahacdn.me/images/pages/home/hero-slider/hero2-mobile.webp',
      womenLink: '/women',
      menLink: '/men'
    },
    {
      id: 4,
      title: 'Find the <span>best</span> prices',
      subtitle: 'Premium fashion at affordable prices',
      image: 'https://cdn79045795.ahacdn.me/images/pages/home/hero-slider/hero1.webp',
      mobileImage: 'https://cdn79045795.ahacdn.me/images/pages/home/hero-slider/hero1-mobile.webp',
      womenLink: '/women',
      menLink: '/men'
    },
    {
      id: 5,
      title: '<span>Fuel</span> your fashion inspiration!',
      subtitle: 'Discover your unique style with us',
      image: 'https://cdn79045795.ahacdn.me/images/pages/home/hero-slider/hero5.webp',
      mobileImage: 'https://cdn79045795.ahacdn.me/images/pages/home/hero-slider/hero5-mobile.webp',
      womenLink: '/women',
      menLink: '/men'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentSlide]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <section className="main__promo promo-main">
      <div className="promo-main__container container mx-auto px-4">
        <div className="promo-main__body relative">
          <div 
            className="promo-main__slider relative overflow-hidden rounded-lg"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide) => (
                <div key={slide.id} className="w-full flex-shrink-0">
                    <div className="promo-main__slide relative">
                      <div className="promo-main__image">
                      <picture>
                        <source 
                          media="(max-width: 767px)" 
                          srcSet={slide.mobileImage} 
                          type="image/webp"
                        />
                        <source 
                          srcSet={slide.image} 
                          type="image/webp"
                        />
                        <img 
                          src={slide.image} 
                          alt={slide.title.replace(/<[^>]*>/g, '')}
                          className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
                          loading="eager"
                        />
                      </picture>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <motion.div className="text-center text-white px-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <h2 
                          className="promo-main__title text-3xl md:text-4xl lg:text-5xl font-bold mb-4 lux-heading"
                          dangerouslySetInnerHTML={{ __html: slide.title }}
                        />
                        <p className="text-lg md:text-xl mb-8 opacity-90">
                          {slide.subtitle}
                        </p>
                        <div className="promo-main__btns flex flex-col sm:flex-row gap-4 justify-center">
                          <Link 
                            to={slide.womenLink}
                            className="promo-main__btn bg-white text-black px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
                          >
                            SHOP WOMEN
                          </Link>
                          <Link 
                            to={slide.menLink}
                            className="promo-main__btn bg-black text-white px-8 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
                          >
                            SHOP MEN
                          </Link>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-black p-2 rounded-full transition-all"
              aria-label="Previous slide"
            >
              <FiChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-black p-2 rounded-full transition-all"
              aria-label="Next slide"
            >
              <FiChevronRight size={24} />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentSlide === index 
                      ? 'bg-white w-8' 
                      : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
