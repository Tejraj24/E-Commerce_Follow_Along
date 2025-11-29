import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MenProducts_simple = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const mockProducts = [
    {
      id: '507f1f77bcf86cd799439011',
      name: 'Gucci Black Ankle Boots With Web Detail',
      brand: 'Gucci',
      description: 'Premium leather ankle boots with iconic web detail',
      price: 616.00,
      originalPrice: 1557.00,
      discount: 60,
      image: 'https://cdn79045795.ahacdn.me/images/product/19434529/medium.webp',
      category: 'footwear',
      subcategory: 'boots',
      sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
      colors: ['Black'],
      isNew: false,
      isSale: true,
      rating: 4.8,
      reviewCount: 124,
      inStock: true,
      shop: 'Baltini'
    },
    {
      id: '507f1f77bcf86cd799439012',
      name: 'Amiri Black Jeans',
      brand: 'Amiri',
      description: 'Slim fit black jeans with distressed details',
      price: 575.98,
      originalPrice: 1439.94,
      discount: 60,
      image: 'https://cdn79045795.ahacdn.me/images/product/14008468/medium.webp',
      category: 'clothing',
      subcategory: 'jeans',
      sizes: ['31'],
      colors: ['Black'],
      isNew: false,
      isSale: true,
      rating: 4.6,
      reviewCount: 89,
      inStock: true,
      shop: 'GIGLIO'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Men's Collection</h1>
        <p className="text-gray-600 mt-2">{products.length} products found</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <Link to={`/product/${product.id}`} className="group block">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:opacity-90 transition-opacity"
                />
                {product.isSale && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs font-semibold rounded">
                    -{product.discount}%
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <div className="mb-2">
                  <span className="text-sm text-gray-600 font-medium">{product.brand}</span>
                </div>
                
                <h3 className="font-medium text-gray-900 mb-2 hover:text-gray-700 text-sm">
                  {product.name}
                </h3>
                
                <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 text-base">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {product.rating && (
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-yellow-500">★</span>
                      <span className="text-gray-600">
                        {product.rating} ({product.reviewCount})
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenProducts_simple;
