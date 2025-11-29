import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Welcome to Fashion Store</h1>
            <p className="text-xl mb-8">Discover the latest trends in fashion</p>
            <div className="space-x-4">
              <Link 
                to="/men" 
                className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Shop Men
              </Link>
              <Link 
                to="/women" 
                className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
              >
                Shop Women
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gray-200 h-48 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-gray-500 text-6xl">👔</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Clothing</h3>
              <p className="text-gray-600 mb-4">Premium fashion essentials</p>
              <Link to="/men?category=clothing" className="text-gray-900 font-semibold hover:underline">
                Shop Now →
              </Link>
            </div>
            <div className="text-center">
              <div className="bg-gray-200 h-48 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-gray-500 text-6xl">👟</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Footwear</h3>
              <p className="text-gray-600 mb-4">Step up your style game</p>
              <Link to="/men?category=footwear" className="text-gray-900 font-semibold hover:underline">
                Shop Now →
              </Link>
            </div>
            <div className="text-center">
              <div className="bg-gray-200 h-48 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-gray-500 text-6xl">👜</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Accessories</h3>
              <p className="text-gray-600 mb-4">Complete your look</p>
              <Link to="/men?category=bags" className="text-gray-900 font-semibold hover:underline">
                Shop Now →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-64 flex items-center justify-center">
                  <span className="text-gray-400 text-4xl">Product {item}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">Premium Product {item}</h3>
                  <p className="text-gray-600 text-sm mb-3">High-quality fashion item</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">$199.99</span>
                    <Link to="/men" className="text-gray-900 hover:underline">
                      View →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-8">Get the latest updates on new products and exclusive offers</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
              <button className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
