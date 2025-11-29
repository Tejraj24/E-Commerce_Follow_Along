import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiInfo, FiTrendingUp } from 'react-icons/fi';

const TrendingBrands = () => {
  const [activeTab, setActiveTab] = useState('women');

  const womenBrands = [
    { name: 'Vilebrequin', growth: 69, link: '/brands/women/vilebrequin' },
    { name: 'Philippe Model', growth: 52, link: '/brands/women/philippe-model' },
    { name: 'Ermanno Scervino', growth: 52, link: '/brands/women/ermanno-scervino' },
    { name: 'Ieena for Mac Duggal', growth: 49, link: '/brands/women/ieena-for-mac-duggal' },
    { name: 'Orlebar Brown', growth: 40, link: '/brands/women/orlebar-brown' },
    { name: 'Miu Miu', growth: 40, link: '/brands/women/miu-miu' },
    { name: 'RETROSUPERFUTURE', growth: 38, link: '/brands/women/retrosuperfuture' },
    { name: 'By Malene Birger', growth: 38, link: '/brands/women/by-malene-birger' },
    { name: 'Converse', growth: 37, link: '/brands/women/converse' },
    { name: 'Zadig & Voltaire', growth: 37, link: '/brands/women/zadig-voltaire' },
    { name: 'MISBHV', growth: 37, link: '/brands/women/misbhv' },
    { name: 'Crocs', growth: 34, link: '/brands/women/crocs' },
    { name: 'Parajumpers', growth: 33, link: '/brands/women/parajumpers' },
    { name: 'Ryderwear', growth: 33, link: '/brands/women/ryderwear' },
    { name: 'Colmar', growth: 32, link: '/brands/women/colmar' }
  ];

  const menBrands = [
    { name: 'Vilebrequin', growth: 69, link: '/brands/men/vilebrequin' },
    { name: 'Philippe Model', growth: 52, link: '/brands/men/philippe-model' },
    { name: 'Orlebar Brown', growth: 40, link: '/brands/men/orlebar-brown' },
    { name: 'Miu Miu', growth: 40, link: '/brands/men/miu-miu' },
    { name: 'RETROSUPERFUTURE', growth: 38, link: '/brands/men/retrosuperfuture' },
    { name: 'Converse', growth: 37, link: '/brands/men/converse' },
    { name: 'Zadig & Voltaire', growth: 37, link: '/brands/men/zadig-voltaire' },
    { name: 'Crocs', growth: 34, link: '/brands/men/crocs' },
    { name: 'Parajumpers', growth: 33, link: '/brands/men/parajumpers' },
    { name: 'Ryderwear', growth: 33, link: '/brands/men/ryderwear' },
    { name: 'Colmar', growth: 32, link: '/brands/men/colmar' },
    { name: 'New Balance', growth: 28, link: '/brands/men/new-balance' },
    { name: 'Acne Studios', growth: 27, link: '/brands/men/acne-studios' },
    { name: 'Herno', growth: 26, link: '/brands/men/herno' },
    { name: 'PT01', growth: 26, link: '/brands/men/pt01' }
  ];

  const currentBrands = activeTab === 'women' ? womenBrands : menBrands;

  return (
    <section className="main__hot hot-main py-12">
      <div className="hot-main__container container mx-auto px-4">
        <div className="tranding-main__header flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h2 className="tranding-main__title text-2xl md:text-3xl font-bold text-gray-900">
            Trending Up: <span className="text-gray-600">Hot Brand Picks</span>
          </h2>
          <div className="tranding-main__info flex items-center gap-2 text-sm text-gray-600">
            <div className="tranding-main__icon">
              <FiInfo size={16} />
            </div>
            <p className="tranding-main__help">
              We use Google Trends data to identify these trends.
            </p>
          </div>
        </div>
        
        <h3 className="hot-main__subtitle text-lg font-medium text-gray-700 mb-6">
          from the Last 30 Days
        </h3>
        
        <div className="hot-main__body">
          {/* Tab Navigation */}
          <div className="hot-main__categories flex gap-4 mb-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('women')}
              className={`hot-main__category pb-3 px-2 font-medium transition-colors border-b-2 ${
                activeTab === 'women' 
                  ? 'text-gray-900 border-gray-900' 
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
            >
              Women
            </button>
            <button
              onClick={() => setActiveTab('men')}
              className={`hot-main__category pb-3 px-2 font-medium transition-colors border-b-2 ${
                activeTab === 'men' 
                  ? 'text-gray-900 border-gray-900' 
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
            >
              Men
            </button>
          </div>

          {/* Tab Content */}
          <div className="hot-main__tabs">
            <div className="hot-main__tab">
              {/* View All Button */}
              <div className="flex justify-end mb-6">
                <Link 
                  to="/trending-brands" 
                  className="hot-main__btn inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-900 border border-gray-300 rounded-lg hover:border-gray-900 hover:bg-gray-50 transition-colors"
                >
                  VIEW ALL
                  <FiTrendingUp size={16} />
                </Link>
              </div>

              {/* Brands List */}
              <ol className="hot-main__list space-y-3">
                {currentBrands.map((brand, index) => (
                  <li 
                    key={brand.name}
                    className="hot-main__item flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-4">
                      {/* Rank */}
                      <div className="text-lg font-bold text-gray-400 w-8 text-center">
                        {index + 1}
                      </div>
                      
                      {/* Brand Name */}
                      <Link 
                        to={brand.link}
                        className="hot-main__name text-lg font-medium text-gray-900 hover:text-gray-700 transition-colors"
                      >
                        {brand.name}
                      </Link>
                    </div>
                    
                    {/* Growth Indicator */}
                    <div className="flex items-center gap-2">
                      <div className="hot-main__icon text-green-600">
                        <FiTrendingUp size={20} />
                      </div>
                      <div className="hot-main__value text-lg font-bold text-green-600">
                        +{brand.growth} %
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingBrands;
