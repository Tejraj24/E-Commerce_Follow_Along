// src/pages/Home_working.jsx
import React from 'react';
import { FiInfo } from 'react-icons/fi';

const trendingCards = [
  {
    title: 'Maxi Dresses',
    descriptor: 'Summer hero piece',
    image: 'https://cdn79045795.ahacdn.me/images/product/13157577/medium.webp',
    href: '/search/women?q=maxi+dresses'
  },
  {
    title: 'Vacation Sets',
    descriptor: 'Ready-to-pack looks',
    image: 'https://cdn79045795.ahacdn.me/images/product/16743594/medium.webp',
    href: '/search/women?q=vacation+set'
  },
  {
    title: 'Platform Loafers',
    descriptor: 'Office-to-out inspo',
    image: 'https://cdn79045795.ahacdn.me/images/product/9987357/medium.webp',
    href: '/search/women?q=platform+loafers'
  }
];

const dropsCards = [
  {
    brand: 'MICHAEL Michael Kors',
    name: 'Sweatshirt in Cotton Blend',
    price: '$39.27',
    originalPrice: '$98.18',
    shop: 'GIGLIO',
    sizes: ['XS', 'S', 'M'],
    badge: '-60%',
    image: 'https://cdn79045795.ahacdn.me/images/product/12657530/medium.webp',
    href: '#'
  },
  {
    brand: 'Karl Lagerfeld',
    name: 'Pink Pleated Dress',
    price: '$45.70',
    originalPrice: '$107.54',
    shop: 'Eleonora Bonucci',
    sizes: ['12', '14', '16'],
    badge: '-58%',
    image: 'https://cdn79045795.ahacdn.me/images/product/13157577/medium.webp',
    href: '#'
  },
  {
    brand: 'Bellerose',
    name: 'Denim Straight Jeans',
    price: '$47.09',
    originalPrice: '$92.33',
    shop: 'Eleonora Bonucci',
    sizes: ['L'],
    badge: '-49%',
    image: 'https://cdn79045795.ahacdn.me/images/product/9987357/medium.webp',
    href: '#'
  },
  {
    brand: 'BOBO CHOSES',
    name: 'Multicolor Midi Skirt',
    price: '$48.50',
    originalPrice: '$120.00',
    shop: 'Cettire',
    sizes: ['S', 'M'],
    badge: '-60%',
    image: 'https://cdn79045795.ahacdn.me/images/product/16743594/medium.webp',
    href: '#'
  }
];

const salesCards = dropsCards;

const TrendCard = ({ card }) => (
  <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md">
    <div className="relative">
      <img
        src={card.image}
        alt={card.title}
        className="h-56 w-full object-cover sm:h-60"
        loading="lazy"
      />
      <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-700 backdrop-blur">
        Live Trend
      </div>
    </div>
    <div className="flex flex-1 flex-col gap-3 p-5">
      <div>
        <p className="mb-1 text-xs uppercase tracking-[0.3em] text-gray-400">
          {card.descriptor}
        </p>
        <h3 className="text-lg font-semibold text-gray-900">{card.title}</h3>
      </div>
      <p className="text-sm leading-6 text-gray-600">
        Highly requested this week — tap to shop curated pieces across partner stores.
      </p>
      <a
        href={card.href}
        className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-gray-900 transition-colors hover:text-gray-600"
      >
        Explore picks
        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="16" width="16">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </a>
    </div>
  </article>
);

const ProductCard = ({ card }) => (
  <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md">
    <div className="relative">
      <img
        src={card.image}
        alt={card.name}
        className="h-60 w-full object-cover sm:h-64"
        loading="lazy"
      />
      <div className="absolute left-3 top-3 rounded-full bg-black px-3 py-1 text-xs text-white">
        {card.badge}
      </div>
    </div>
    <div className="flex flex-1 flex-col gap-3 p-5">
      <div>
        <p className="mb-1 text-xs uppercase tracking-[0.35em] text-gray-400">
          {card.brand}
        </p>
        <h3 className="text-lg font-semibold leading-snug text-gray-900">
          {card.name}
        </h3>
      </div>
      <div className="flex items-baseline gap-3">
        <span className="text-2xl font-semibold text-gray-900">{card.price}</span>
        <span className="text-sm text-gray-400 line-through">{card.originalPrice}</span>
      </div>
      <div className="text-sm text-gray-500">
        From: <span className="font-medium text-gray-900">{card.shop}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {card.sizes.map((size) => (
          <span key={size} className="rounded-full border border-gray-200 px-2 py-1 text-xs text-gray-600">
            {size}
          </span>
        ))}
      </div>
      <a
        href={card.href}
        className="mt-auto inline-flex min-h-11 items-center justify-between rounded-2xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-900 transition-colors hover:border-gray-900"
      >
        View product
        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="16" width="16">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </a>
    </div>
  </article>
);

const Home_working = () => {
  return (
    <div className="bg-white">
      {/* ================= HERO / HERO SLIDE ================= */}
      <section className="main__promo promo-main px-4 pb-8 pt-4 sm:px-6 sm:pb-10 lg:px-8 lg:pb-14">
        <div className="mx-auto max-w-screen-2xl">
          <div className="relative overflow-hidden rounded-[1.5rem] shadow-[0_12px_32px_rgba(0,0,0,0.08)]">
            <picture>
              <source
                media="(max-width: 767px)"
                srcSet="https://cdn79045795.ahacdn.me/images/pages/home/hero-slider/hero6-mobile.webp"
                type="image/webp"
              />
              <source
                srcSet="https://cdn79045795.ahacdn.me/images/pages/home/hero-slider/hero6.webp"
                type="image/webp"
              />
              <img
                src="https://cdn79045795.ahacdn.me/images/pages/home/hero-slider/hero6.webp"
                alt="Discover the hottest brands"
                className="h-[clamp(22rem,70vw,42rem)] w-full object-cover object-center"
                loading="eager"
              />
            </picture>

            <div className="absolute inset-0 bg-black/35">
              <div className="flex h-full items-center justify-center px-4 py-10 text-center text-white sm:px-6 lg:px-10">
                <div className="mx-auto max-w-3xl">
                  <p className="mb-3 text-xs uppercase tracking-[0.35em] text-white/70">
                    Premium fashion marketplace
                  </p>
                  <h2 className="text-[clamp(2rem,6vw,4.75rem)] font-semibold leading-[1.05] tracking-tight text-white">
                    Discover the <span className="text-white">hottest</span> brands
                  </h2>
                  <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/90 sm:text-base md:text-lg">
                    Explore our curated collection of premium fashion
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <a
                      className="inline-flex min-h-11 items-center justify-center rounded-md bg-white px-8 py-3 text-sm font-medium text-black transition-colors hover:bg-gray-100"
                      href="/women"
                    >
                      SHOP WOMEN
                    </a>
                    <a
                      className="inline-flex min-h-11 items-center justify-center rounded-md bg-black px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
                      href="/men"
                    >
                      SHOP MEN
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TRENDING NOW ================= */}
      <section className="main__tranding tranding-main bg-white px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-screen-2xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-2 text-xs uppercase tracking-[0.35em] text-gray-500">
                Trending Now
              </p>
              <h2 className="text-[clamp(1.9rem,4vw,3.5rem)] font-semibold tracking-tight text-gray-900">
                Searches spiking this week
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
                We monitor millions of product views across the Overmode network to highlight
                the categories customers are craving right this moment.
              </p>
            </div>
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-500">
              <FiInfo className="shrink-0 text-gray-400" />
              <span>Signals from partner stores &amp; marketplace search.</span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8">
            <button
              type="button"
              className="min-h-11 rounded-full bg-gray-900 px-5 py-3 text-sm font-medium text-white transition-colors"
            >
              Women
            </button>
            <button
              type="button"
              className="min-h-11 rounded-full bg-gray-100 px-5 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              Men
            </button>

            <div className="ml-0 flex items-center gap-2 sm:ml-auto">
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition-colors hover:border-gray-900 hover:text-gray-900"
                aria-label="Previous trending slide"
              >
                ‹
              </button>
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition-colors hover:border-gray-900 hover:text-gray-900"
                aria-label="Next trending slide"
              >
                ›
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {trendingCards.map((card) => (
              <TrendCard key={card.title} card={card} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= TODAY'S DROPS ================= */}
      <section className="main__catalog catalog-main catalog-main--drops px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-screen-2xl">
          <div className="mb-8 flex flex-col gap-4">
            <p className="text-xs uppercase tracking-[0.35em] text-gray-500">
              New-In Radar
            </p>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="text-[clamp(2rem,4vw,3.75rem)] font-semibold tracking-tight text-gray-900">
                  <span className="mr-2 text-gray-500">Today’s</span> Drops
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600 sm:text-base">
                  Fresh arrivals from boutique partners, updated frequently.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button type="button" className="min-h-11 rounded-full bg-gray-900 px-5 py-3 text-sm font-semibold text-white">
                  Women
                </button>
                <button type="button" className="min-h-11 rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 transition-colors hover:text-gray-900">
                  Men
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button className="min-h-11 rounded-full bg-white px-4 py-3 text-sm font-medium text-gray-900 shadow-sm">
              Under $50
            </button>
            <button className="min-h-11 rounded-full px-4 py-3 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900">
              $50 - $149
            </button>
            <button className="min-h-11 rounded-full px-4 py-3 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900">
              $150 - $299
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {dropsCards.map((card) => (
              <ProductCard key={card.name} card={card} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= BIG SALES ================= */}
      <section className="main__catalog catalog-main catalog-main--sales px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-screen-2xl">
          <div className="mb-8 flex flex-col gap-4">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="text-[clamp(2rem,4vw,3.75rem)] font-semibold tracking-tight text-gray-900">
                  Biggest <span className="text-gray-500">Sales</span> Ever
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600 sm:text-base">
                  Discover the biggest discounts and best deals from partner stores.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="min-h-11 rounded-full bg-gray-900 px-5 py-3 text-sm font-semibold text-white">
                  Women
                </button>
                <button className="min-h-11 rounded-full border border-gray-200 bg-gray-100 px-5 py-3 text-sm font-semibold text-gray-600 transition-colors hover:text-gray-900">
                  Men
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {salesCards.map((card) => (
              <ProductCard key={`${card.brand}-${card.name}`} card={card} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home_working;
