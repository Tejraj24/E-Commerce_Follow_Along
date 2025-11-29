// src/pages/Home_working.jsx
import React from "react";

const Home_working = () => {
  return (
    <div className="bg-white">
      {/* ================= HERO / HERO SLIDE ================= */}
      <section className="main__promo promo-main">
        <div className="promo-main__container container">
          <div className="promo-main__body relative">
            <div className="relative overflow-hidden rounded-lg">
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
                  className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
                  loading="eager"
                />
              </picture>

              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h2 className="promo-main__title text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                    Discover the <span>hottest</span> brands
                  </h2>
                  <p className="text-lg md:text-xl mb-8 opacity-90">
                    Explore our curated collection of premium fashion
                  </p>
                  <div className="promo-main__btns flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      className="promo-main__btn bg-white text-black px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
                      href="/women"
                    >
                      SHOP WOMEN
                    </a>
                    <a
                      className="promo-main__btn bg-black text-white px-8 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
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
      <section className="main__tranding tranding-main">
        <div className="container">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <p className="uppercase text-xs tracking-[0.35em] text-gray-500 mb-2">
                Trending Now
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
                Searches spiking this week
              </h2>
              <p className="text-gray-600 mt-2 max-w-2xl">
                We monitor millions of product views to highlight the categories
                customers are craving right this moment.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 rounded-full px-4 py-2 border border-gray-100">
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
                height="16"
                width="16"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              <span>Signals from partner stores &amp; search.</span>
            </div>
          </div>

          {/* Tabs (Women / Men) */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <button
              type="button"
              className="px-5 py-2 rounded-full text-sm font-medium transition-colors bg-gray-900 text-white"
            >
              Women
            </button>
            <button
              type="button"
              className="px-5 py-2 rounded-full text-sm font-medium transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200"
            >
              Men
            </button>
          </div>

          {/* Cards grid (instead of swiper, simpler but same design) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <article className="h-full rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="relative">
                <img
                  src="https://cdn79045795.ahacdn.me/images/product/13157577/medium.webp"
                  alt="Maxi Dresses"
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
                    Summer hero piece
                  </p>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Maxi Dresses
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  Highly requested this week — tap to shop curated pieces.
                </p>
                <a
                  href="/search/women?q=maxi+dresses"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-gray-600"
                >
                  Explore picks
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="16"
                    width="16"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            </article>

            {/* Card 2 */}
            <article className="h-full rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="relative">
                <img
                  src="https://cdn79045795.ahacdn.me/images/product/16743594/medium.webp"
                  alt="Vacation Sets"
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
                    Ready-to-pack looks
                  </p>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Vacation Sets
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  Highly requested this week — curated edits for your next trip.
                </p>
                <a
                  href="/search/women?q=vacation+set"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-gray-600"
                >
                  Explore picks
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="16"
                    width="16"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            </article>

            {/* Card 3 */}
            <article className="h-full rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="relative">
                <img
                  src="https://cdn79045795.ahacdn.me/images/product/9987357/medium.webp"
                  alt="Platform Loafers"
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
                    Office-to-out inspo
                  </p>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Platform Loafers
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  A key silhouette across boutiques this week.
                </p>
                <a
                  href="/search/women?q=platform+loafers"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-gray-600"
                >
                  Explore picks
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="16"
                    width="16"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ================= TODAY'S DROPS ================= */}
      <section className="main__catalog catalog-main catalog-main--drops">
        <div className="container">
          <div className="flex flex-col gap-4 mb-8">
            <p className="uppercase text-xs tracking-[0.35em] text-gray-500">
              New-In Radar
            </p>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
                  <span className="text-gray-500 mr-2">Today’s</span> Drops
                </h2>
                <p className="text-gray-600 mt-3 max-w-3xl">
                  Fresh arrivals from boutique partners, updated frequently.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  className="px-5 py-2 rounded-full text-sm font-semibold transition-colors bg-gray-900 text-white"
                >
                  Women
                </button>
                <button
                  type="button"
                  className="px-5 py-2 rounded-full text-sm font-semibold transition-colors bg-white text-gray-600 border border-gray-200 hover:text-gray-900"
                >
                  Men
                </button>
              </div>
            </div>
          </div>

          {/* Simple filters */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button className="px-4 py-2 rounded-full text-sm font-medium bg-white text-gray-900 shadow-sm">
              Under $50
            </button>
            <button className="px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-gray-900">
              $50 - $149
            </button>
            <button className="px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-gray-900">
              $150 - $299
            </button>
          </div>

          {/* Product cards (similar vibe to Overmode) */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <article className="bg-white rounded-3xl border border-gray-100 shadow-sm h-full flex flex-col overflow-hidden">
              <div className="relative">
                <img
                  src="https://cdn79045795.ahacdn.me/images/product/12657530/medium.webp"
                  alt="Sweatshirt in Cotton Blend"
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full">
                  -60%
                </div>
              </div>
              <div className="p-5 flex flex-col gap-3 flex-1">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-gray-400 mb-1">
                    MICHAEL Michael Kors
                  </p>
                  <h3 className="text-lg font-semibold text-gray-900 leading-snug">
                    Sweatshirt in Cotton Blend
                  </h3>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-semibold text-gray-900">
                    $39.27
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    $98.18
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  From: <span className="text-gray-900 font-medium">GIGLIO</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs border border-gray-200 rounded-full text-gray-600">
                    XS
                  </span>
                  <span className="px-2 py-1 text-xs border border-gray-200 rounded-full text-gray-600">
                    S
                  </span>
                  <span className="px-2 py-1 text-xs border border-gray-200 rounded-full text-gray-600">
                    M
                  </span>
                </div>
                <a
                  href="#"
                  className="mt-auto inline-flex items-center justify-between border border-gray-200 rounded-2xl px-4 py-2 text-sm font-semibold text-gray-900 hover:border-gray-900 transition-colors"
                >
                  View product
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="16"
                    width="16"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            </article>

            {/* Card 2 */}
            <article className="bg-white rounded-3xl border border-gray-100 shadow-sm h-full flex flex-col overflow-hidden">
              <div className="relative">
                <img
                  src="https://cdn79045795.ahacdn.me/images/product/13157577/medium.webp"
                  alt="Pink Pleated Dress"
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full">
                  -58%
                </div>
              </div>
              <div className="p-5 flex flex-col gap-3 flex-1">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-gray-400 mb-1">
                    Karl Lagerfeld
                  </p>
                  <h3 className="text-lg font-semibold text-gray-900 leading-snug">
                    Pink Pleated Dress
                  </h3>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-semibold text-gray-900">
                    $45.70
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    $107.54
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  From:{" "}
                  <span className="text-gray-900 font-medium">
                    Eleonora Bonucci
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs border border-gray-200 rounded-full text-gray-600">
                    12
                  </span>
                  <span className="px-2 py-1 text-xs border border-gray-200 rounded-full text-gray-600">
                    14
                  </span>
                  <span className="px-2 py-1 text-xs border border-gray-200 rounded-full text-gray-600">
                    16
                  </span>
                </div>
                <a
                  href="#"
                  className="mt-auto inline-flex items-center justify-between border border-gray-200 rounded-2xl px-4 py-2 text-sm font-semibold text-gray-900 hover:border-gray-900 transition-colors"
                >
                  View product
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="16"
                    width="16"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            </article>

            {/* Card 3 */}
            <article className="bg-white rounded-3xl border border-gray-100 shadow-sm h-full flex flex-col overflow-hidden">
              <div className="relative">
                <img
                  src="https://cdn79045795.ahacdn.me/images/product/9987357/medium.webp"
                  alt="Denim Straight Jeans"
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full">
                  -49%
                </div>
              </div>
              <div className="p-5 flex flex-col gap-3 flex-1">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-gray-400 mb-1">
                    Bellerose
                  </p>
                  <h3 className="text-lg font-semibold text-gray-900 leading-snug">
                    Denim Straight Jeans
                  </h3>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-semibold text-gray-900">
                    $47.09
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    $92.33
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  From:{" "}
                  <span className="text-gray-900 font-medium">
                    Eleonora Bonucci
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs border border-gray-200 rounded-full text-gray-600">
                    L
                  </span>
                </div>
                <a
                  href="#"
                  className="mt-auto inline-flex items-center justify-between border border-gray-200 rounded-2xl px-4 py-2 text-sm font-semibold text-gray-900 hover:border-gray-900 transition-colors"
                >
                  View product
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="16"
                    width="16"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            </article>

            {/* Card 4 – duplicate style */}
            <article className="bg-white rounded-3xl border border-gray-100 shadow-sm h-full flex flex-col overflow-hidden">
              <div className="relative">
                <img
                  src="https://cdn79045795.ahacdn.me/images/product/16743594/medium.webp"
                  alt="Multicolor Midi Skirt"
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full">
                  -60%
                </div>
              </div>
              <div className="p-5 flex flex-col gap-3 flex-1">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-gray-400 mb-1">
                    BOBO CHOSES
                  </p>
                  <h3 className="text-lg font-semibold text-gray-900 leading-snug">
                    Multicolor Midi Skirt
                  </h3>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-semibold text-gray-900">
                    $48.50
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    $120.00
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  From: <span className="text-gray-900 font-medium">Cettire</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs border border-gray-200 rounded-full text-gray-600">
                    S
                  </span>
                  <span className="px-2 py-1 text-xs border border-gray-200 rounded-full text-gray-600">
                    M
                  </span>
                </div>
                <a
                  href="#"
                  className="mt-auto inline-flex items-center justify-between border border-gray-200 rounded-2xl px-4 py-2 text-sm font-semibold text-gray-900 hover:border-gray-900 transition-colors"
                >
                  View product
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="16"
                    width="16"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ================= BIG SALES (OPTIONAL – REUSE SAME CARDS) ================= */}
      <section className="main__catalog catalog-main catalog-main--sales">
        <div className="container">
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
                  Biggest <span className="text-gray-500">Sales</span> Ever
                </h2>
                <p className="text-gray-600 mt-3 max-w-3xl">
                  Discover the biggest discounts and best deals from partner
                  stores.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="px-5 py-2 rounded-full text-sm font-semibold bg-gray-900 text-white">
                  Women
                </button>
                <button className="px-5 py-2 rounded-full text-sm font-semibold bg-gray-100 text-gray-600 border border-gray-200 hover:text-gray-900">
                  Men
                </button>
              </div>
            </div>
          </div>

          {/* For now just reuse the same 4 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* You can copy the 4 cards from above or map over data later */}
            {/* For brevity, we’ll just show one example card again */}
            <article className="bg-white rounded-3xl border border-gray-100 shadow-sm h-full flex flex-col overflow-hidden">
              <div className="relative">
                <img
                  src="https://cdn79045795.ahacdn.me/images/product/12657530/medium.webp"
                  alt="Sweatshirt in Cotton Blend"
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full">
                  -60%
                </div>
              </div>
              <div className="p-5 flex flex-col gap-3 flex-1">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-gray-400 mb-1">
                    MICHAEL Michael Kors
                  </p>
                  <h3 className="text-lg font-semibold text-gray-900 leading-snug">
                    Sweatshirt in Cotton Blend
                  </h3>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-semibold text-gray-900">
                    $39.27
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    $98.18
                  </span>
                </div>
                <a
                  href="#"
                  className="mt-auto inline-flex items-center justify-between border border-gray-200 rounded-2xl px-4 py-2 text-sm font-semibold text-gray-900 hover:border-gray-900 transition-colors"
                >
                  View product
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="16"
                    width="16"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home_working;
