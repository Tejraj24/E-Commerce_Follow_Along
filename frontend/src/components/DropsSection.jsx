import { useMemo, useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { dropsData } from '../data/overmodeHomeData';
import { FiArrowRight, FiShoppingBag } from 'react-icons/fi';

const genders = Object.keys(dropsData);

const DropsSection = () => {
  const [activeGender, setActiveGender] = useState('women');
  const [activeRange, setActiveRange] = useState(dropsData[activeGender].priceRanges[0].id);
  const [sliderKey, setSliderKey] = useState(`drops-${activeGender}-${activeRange}`);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const defaultRange = dropsData[activeGender].priceRanges[0].id;
    setActiveRange(defaultRange);
  }, [activeGender]);

  useEffect(() => {
    setSliderKey(`drops-${activeGender}-${activeRange}`);
  }, [activeGender, activeRange]);

  const genderData = dropsData[activeGender];
  const currentRange = useMemo(
    () => genderData.priceRanges.find((range) => range.id === activeRange),
    [genderData, activeRange]
  );
  const products = currentRange?.products ?? [];
  const ctaHref = activeGender === 'women' ? '/' : '/men';

  return (
    <section className="main__catalog catalog-main py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 mb-8">
          <p className="uppercase text-xs tracking-[0.35em] text-gray-500">New-In Radar</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
                <span className="text-gray-500 mr-2">Today’s</span> Drops
              </h2>
              <p className="text-gray-600 mt-3 max-w-3xl">{genderData.description}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {genders.map((gender) => (
                <button
                  key={gender}
                  type="button"
                  onClick={() => setActiveGender(gender)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                    activeGender === gender
                      ? 'bg-gray-900 text-white'
                      : 'bg-white text-gray-600 border border-gray-200 hover:text-gray-900'
                  }`}
                >
                  {dropsData[gender].title.replace('Today’s Drops — ', '')}
                </button>
              ))}
            </div>
          </div>

        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {genderData.priceRanges.map((range) => (
            <button
              key={range.id}
              type="button"
              onClick={() => setActiveRange(range.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeRange === range.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {range.label}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <button
              ref={prevRef}
              type="button"
              className="w-10 h-10 rounded-full border border-gray-200 text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-colors disabled:opacity-40 bg-white"
              aria-label="Previous drop"
            >
              ‹
            </button>
            <button
              ref={nextRef}
              type="button"
              className="w-10 h-10 rounded-full border border-gray-200 text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-colors disabled:opacity-40 bg-white"
              aria-label="Next drop"
            >
              ›
            </button>
          </div>
        </div>

        <Swiper
          key={sliderKey}
          modules={[Navigation]}
          slidesPerView={1.05}
          spaceBetween={18}
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
            640: { slidesPerView: 1.5, spaceBetween: 20 },
            768: { slidesPerView: 2.3, spaceBetween: 24 },
            1024: { slidesPerView: 3.25, spaceBetween: 24 },
            1280: { slidesPerView: 4.25, spaceBetween: 24 }
          }}
          className="pt-8"
        >
          {products.map((product) => {
            const discount =
              product.originalPrice && product.originalPrice > product.price
                ? Math.round((1 - product.price / product.originalPrice) * 100)
                : null;

            return (
              <SwiperSlide key={product.id} className="h-auto">
                <article className="bg-white rounded-3xl border border-gray-100 shadow-sm h-full flex flex-col overflow-hidden">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                      loading="lazy"
                    />
                    {discount && (
                      <div className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full">
                        -{discount}%
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex flex-col gap-3 flex-1">
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-gray-400 mb-1">
                        {product.brand}
                      </p>
                      <h3 className="text-lg font-semibold text-gray-900 leading-snug">{product.name}</h3>
                    </div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-2xl font-semibold text-gray-900">${product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      From: <span className="text-gray-900 font-medium">{product.shop}</span>
                    </div>
                    {product.sizes && product.sizes.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {product.sizes.slice(0, 4).map((size) => (
                          <span
                            key={size}
                            className="px-2 py-1 text-xs border border-gray-200 rounded-full text-gray-600"
                          >
                            {size}
                          </span>
                        ))}
                        {product.sizes.length > 4 && (
                          <span className="text-xs text-gray-500">
                            +{product.sizes.length - 4} more
                          </span>
                        )}
                      </div>
                    )}
                    <a
                      href={product.url}
                      className="mt-auto inline-flex items-center justify-between border border-gray-200 rounded-2xl px-4 py-2 text-sm font-semibold text-gray-900 hover:border-gray-900 transition-colors"
                      target="_blank"
                      rel="noreferrer"
                    >
                      View product
                      <FiArrowRight />
                    </a>
                  </div>
                </article>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className="mt-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3 text-gray-600">
            <FiShoppingBag className="text-gray-900" />
            <p className="text-sm">
              Data from {activeGender === 'women' ? '220' : '180'} global boutiques — refreshed every few hours.
            </p>
          </div>
          <a
            href={ctaHref}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gray-900 text-white text-sm font-semibold self-start lg:self-auto"
          >
            Shop all {activeGender}
            <FiArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
};

export default DropsSection;

