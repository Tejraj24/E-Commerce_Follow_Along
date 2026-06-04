import React from 'react';
import { FiHeart, FiShoppingCart, FiFilter, FiChevronDown } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const ProductListing = ({ products = [] }) => {

  return (
    <div className="bg-white min-h-screen">
      {/* Header removed */}

      {/* Hero Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 lux-heading">New Arrivals</h1>
          <p className="text-gray-600">Summer Collection 2025</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Filters and Sort */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <button className="flex items-center space-x-2 border border-gray-300 rounded-md px-4 py-2">
              <FiFilter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <div className="relative">
              <select className="appearance-none border border-gray-300 rounded-md px-4 py-2 pr-8">
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
                <option>Popular</option>
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Showing 1-{products.length} of {products.length} products
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <div key={product._id || product.id} className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64 w-full overflow-hidden">
                {/* Product Image */}
                <img
                  src={(import.meta.env.VITE_API_URL || 'http://localhost:8000') + (product.images?.[0] || '') || 'https://via.placeholder.com/300x300'}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Badges */}
                <div className="absolute top-2 right-2 flex flex-col space-y-2">
                  {product.isNew && (
                    <span className="bg-black text-white text-xs px-2 py-1 rounded-full">New</span>
                  )}
                  {product.isSale && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {product.originalPrice ? `$${product.originalPrice - product.price} OFF` : 'Sale'}
                    </span>
                  )}
                </div>
                
                {/* Quick Actions */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button className="bg-white rounded-full p-2 m-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <FiHeart className="w-5 h-5" />
                  </button>
                  <button className="bg-white rounded-full p-2 m-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <FiShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                <p className="mt-1 text-xs text-gray-500 line-clamp-2">{product.description}</p>
                
                <div className="mt-2 flex items-center">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`h-4 w-4 ${star <= Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-1 text-xs text-gray-500">({product.reviewCount || 0})</span>
                  </div>
                </div>
                
                <div className="mt-2">
                  <div className="flex items-center">
                    <p className="text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</p>
                    {product.originalPrice && (
                      <span className="ml-2 text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                </div>
                
                {/* Color Swatches */}
                <div className="mt-2 flex space-x-1">
                  {product.colors?.map((color, index) => (
                    <div
                      key={index}
                      className="w-4 h-4 rounded-full border border-gray-200"
                      style={{ backgroundColor: color }}
                      aria-label={`Color ${color}`}
                    />
                  ))}
                </div>
                
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.sizes?.map((size) => (
                    <button
                      key={size}
                      className="text-xs px-2 py-1 border border-gray-200 rounded hover:bg-gray-100"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-1 border rounded-md">Previous</button>
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`w-8 h-8 rounded-full ${
                  page === 1 ? 'bg-black text-white' : 'hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
            <button className="px-3 py-1 border rounded-md">Next</button>
          </nav>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-100 mt-16 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Shop</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-black">All Products</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black">New Arrivals</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black">Best Sellers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black">Sale</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">About</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-black">Our Story</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black">Sustainability</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black">Careers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Help</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-black">Contact Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black">FAQs</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black">Shipping</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black">Returns</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Newsletter</h3>
              <p className="text-gray-600 mb-4">Subscribe for updates and special offers</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 border border-r-0 rounded-l-md focus:outline-none focus:ring-1 focus:ring-black"
                />
                <button className="bg-black text-white px-4 py-2 rounded-r-md">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© 2025 Your Store. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductListing;
