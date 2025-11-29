import { useMemo, useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { FiInfo, FiArrowRight } from 'react-icons/fi';
import { trendingLinks } from '../data/overmodeHomeData';

const genderTabs = [
  { id: 'women', label: 'Women' },
  { id: 'men', label: 'Men' }
];

const TrendingSlider = () => {
  const [activeGender, setActiveGender] = useState('women');
  const [sliderKey, setSliderKey] = useState(`trending-${activeGender}`);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    setSliderKey(`trending-${activeGender}`);
  }, [activeGender]);

  const slides = useMemo(() => trendingLinks[activeGender] ?? [], [activeGender]);

  return (
    <section className="main__tranding tranding-main py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <p className="uppercase text-xs tracking-[0.35em] text-gray-500 mb-2">Trending Now</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
              Searches spiking this week
            </h2>
            <p className="text-gray-600 mt-2 max-w-2xl">
              We monitor millions of product views across the Overmode network to highlight
              the categories customers are craving right this moment.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 rounded-full px-4 py-2 border border-gray-100">
            <FiInfo className="text-gray-400" />
            <span>Signals from partner stores &amp; marketplace search.</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          {genderTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveGender(tab.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                activeGender === tab.id
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}

          <div className="ml-auto flex items-center gap-2">
            <button
              ref={prevRef}
              type="button"
              className="w-10 h-10 rounded-full border border-gray-200 text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-colors disabled:opacity-40"
              aria-label="Previous trending slide"
            >
              ‹
            </button>
            <button
              ref={nextRef}
              type="button"
              className="w-10 h-10 rounded-full border border-gray-200 text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-colors disabled:opacity-40"
              aria-label="Next trending slide"
            >
              ›
            </button>
          </div>
        </div>

        <Swiper
          key={sliderKey}
          modules={[Navigation]}
          slidesPerView={1.1}
          spaceBetween={16}
          onBeforeInit={(swiper) => {
            if (typeof swiper.params.navigation !== 'boolean') {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current
          }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 24 },
            1024: { slidesPerView: 4, spaceBetween: 24 }
          }}
          className="pb-6"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <article className="h-full rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="relative">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-56 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                    Live Trend
                  </div>
                </div>
                <div className="p-5 flex flex-col gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-1">
                      {slide.descriptor}
                    </p>
                    <h3 className="text-lg font-semibold text-gray-900">{slide.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Highly requested this week — tap to shop curated pieces across partner stores.
                  </p>
                  <a
                    href={slide.href}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-gray-600"
                  >
                    Explore picks
                    <FiArrowRight />
                  </a>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TrendingSlider;

