import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { FiFilter, FiGrid, FiList, FiHeart, FiEye, FiGitCompare } from 'react-icons/fi';
import { ProductSkeleton, FilterSkeleton } from '../components/SkeletonLoader';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductQuickView from '../components/ProductQuickView';
import ProductCompare from '../components/ProductCompare';

const MenProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [showQuickView, setShowQuickView] = useState(false);
  const [compareProducts, setCompareProducts] = useState([]);
  const [showCompare, setShowCompare] = useState(false);

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
    },
    {
      id: '507f1f77bcf86cd799439013',
      name: 'Valentino Garavani Fuchsia Hoodie With Print',
      brand: 'Valentino Garavani',
      description: 'Luxury hoodie with signature print',
      price: 2001.00,
      originalPrice: 4968.00,
      discount: 60,
      image: 'https://cdn79045795.ahacdn.me/images/product/19701214/medium.webp',
      category: 'clothing',
      subcategory: 'hoodies',
      sizes: ['S'],
      colors: ['Fuchsia'],
      isNew: false,
      isSale: true,
      rating: 4.9,
      reviewCount: 67,
      inStock: true,
      shop: 'Italist'
    },
    {
      id: '507f1f77bcf86cd799439014',
      name: 'Versace Multicolor Mercury Sneakers',
      brand: 'Versace',
      description: 'Statement sneakers with multicolor design',
      price: 414.00,
      originalPrice: 1252.00,
      discount: 67,
      image: 'https://cdn79045795.ahacdn.me/images/product/14354796/medium.webp',
      category: 'footwear',
      subcategory: 'sneakers',
      sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
      colors: ['Multicolor'],
      isNew: false,
      isSale: true,
      rating: 4.7,
      reviewCount: 203,
      inStock: true,
      shop: 'Multiple Stores'
    },
    {
      id: '507f1f77bcf86cd799439015',
      name: 'Balenciaga Black 3b Sports Icon Ski Cargo Pants',
      brand: 'Balenciaga',
      description: 'Technical cargo pants with sport-inspired design',
      price: 1116.00,
      originalPrice: 2850.00,
      discount: 61,
      image: 'https://cdn79045795.ahacdn.me/images/product/10768727/medium.webp',
      category: 'clothing',
      subcategory: 'pants',
      sizes: ['40'],
      colors: ['Black'],
      isNew: false,
      isSale: true,
      rating: 4.5,
      reviewCount: 45,
      inStock: true,
      shop: 'Neiman Marcus'
    },
    {
      id: '507f1f77bcf86cd799439016',
      name: 'Dolce & Gabbana Black Silk Shirt',
      brand: 'Dolce & Gabbana',
      description: 'Luxury silk shirt in classic black',
      price: 510.00,
      originalPrice: 1275.00,
      discount: 60,
      image: 'https://cdn79045795.ahacdn.me/images/product/15278945/medium.webp',
      category: 'clothing',
      subcategory: 'shirts',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Black'],
      isNew: false,
      isSale: true,
      rating: 4.8,
      reviewCount: 156,
      inStock: true,
      shop: 'Lungolivigno Fashion'
    },
    {
      id: '507f1f77bcf86cd799439017',
      name: 'Dolce & Gabbana Black Nylon Blend Backpack',
      brand: 'Dolce & Gabbana',
      description: 'Modern backpack with nylon blend material',
      price: 585.00,
      originalPrice: 1462.00,
      discount: 60,
      image: 'https://cdn79045795.ahacdn.me/images/product/15296539/medium.webp',
      category: 'bags',
      subcategory: 'backpacks',
      sizes: ['One Size'],
      colors: ['Black'],
      isNew: false,
      isSale: true,
      rating: 4.6,
      reviewCount: 78,
      inStock: true,
      shop: 'Lungolivigno Fashion'
    },
    {
      id: '507f1f77bcf86cd799439018',
      name: 'Versace Black Embossed Leather Duffel Bag',
      brand: 'Versace',
      description: 'Premium leather duffel bag with embossed details',
      price: 1125.00,
      originalPrice: 2813.00,
      discount: 60,
      image: 'https://cdn79045795.ahacdn.me/images/product/15293694/medium.webp',
      category: 'bags',
      subcategory: 'bags',
      sizes: ['One Size'],
      colors: ['Black'],
      isNew: false,
      isSale: true,
      rating: 4.9,
      reviewCount: 92,
      inStock: true,
      shop: 'Lungolivigno Fashion'
    }
  ];

  const categories = [
    { id: 'clothing', name: 'Clothing', count: 156 },
    { id: 'footwear', name: 'Footwear', count: 89 },
    { id: 'accessories', name: 'Accessories', count: 67 },
    { id: 'bags', name: 'Bags', count: 45 }
  ];

  const brands = [
    { id: 'gucci', name: 'Gucci', count: 23 },
    { id: 'versace', name: 'Versace', count: 18 },
    { id: 'dolce-gabbana', name: 'Dolce & Gabbana', count: 15 },
    { id: 'balenciaga', name: 'Balenciaga', count: 12 },
    { id: 'valentino', name: 'Valentino', count: 10 },
    { id: 'amiri', name: 'Amiri', count: 8 }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedCategories.includes(product.category)
      );
    }

    // Filter by brands
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => 
        selectedBrands.includes(product.brand.toLowerCase().replace(/\s+/g, '-'))
      );
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'discount':
        filtered.sort((a, b) => b.discount - a.discount);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // featured - keep original order
        break;
    }

    setFilteredProducts(filtered);
  }, [products, priceRange, selectedCategories, selectedBrands, sortBy]);

  const toggleCategory = (categoryId) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleBrand = (brandId) => {
    setSelectedBrands(prev => 
      prev.includes(brandId) 
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    );
  };

  useEffect(() => {
    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
    
    // Load compare products from localStorage
    const savedCompare = localStorage.getItem('compareProducts');
    if (savedCompare) {
      setCompareProducts(JSON.parse(savedCompare));
    }
  }, []);

  useEffect(() => {
    // Save wishlist to localStorage whenever it changes
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    // Save compare products to localStorage whenever it changes
    localStorage.setItem('compareProducts', JSON.stringify(compareProducts));
  }, [compareProducts]);

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange({ min: 0, max: 5000 });
    setSortBy('featured');
  };

  const addToWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const openQuickView = (product) => {
    setQuickViewProduct(product);
    setShowQuickView(true);
  };

  const closeQuickView = () => {
    setShowQuickView(false);
    setQuickViewProduct(null);
  };

  const handleAddToCart = (product) => {
    // Implement cart functionality
    console.log('Added to cart:', product);
  };

  const addToCompare = (product) => {
    if (compareProducts.length >= 4) {
      alert('You can compare up to 4 products at a time');
      return;
    }
    
    const exists = compareProducts.find(item => item.id === product.id);
    if (exists) {
      alert('This product is already in comparison');
      return;
    }
    
    setCompareProducts(prev => [...prev, product]);
  };

  const removeFromCompare = (productId) => {
    setCompareProducts(prev => prev.filter(item => item.id !== productId));
  };

  const isInCompare = (productId) => {
    return compareProducts.some(item => item.id === productId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        {/* Header Skeleton */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="h-8 bg-gray-200 rounded w-48 animate-pulse mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-10 bg-gray-200 rounded w-20 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filter Skeleton */}
            <aside className="hidden lg:block w-full lg:w-64 flex-shrink-0">
              <FilterSkeleton />
            </aside>

            {/* Products Grid Skeleton */}
            <div className="flex-1">
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[...Array(8)].map((_, index) => (
                  <ProductSkeleton key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4">
        <Breadcrumbs />
      </div>
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Men's Collection</h1>
              <p className="text-gray-600 mt-1">{filteredProducts.length} products found</p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <FiGrid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <FiList size={18} />
                </button>
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="discount">Biggest Discount</option>
                <option value="rating">Highest Rated</option>
              </select>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-900 transition-colors md:hidden"
              >
                <FiFilter size={18} />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 flex-shrink-0`}>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Clear all
                </button>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-600">Min: ${priceRange.min}</label>
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="50"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) }))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Max: ${priceRange.max}</label>
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="50"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => toggleCategory(category.id)}
                        className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                      />
                      <span className="text-sm text-gray-700">
                        {category.name} ({category.count})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Brands</h3>
                <div className="space-y-2">
                  {brands.map(brand => (
                    <label key={brand.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand.id)}
                        onChange={() => toggleBrand(brand.id)}
                        className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                      />
                      <span className="text-sm text-gray-700">
                        {brand.name} ({brand.count})
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-4 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ${
                      viewMode === 'list' ? 'flex gap-4' : ''
                    }`}
                  >
                    <Link to={`/product/${product.id}`} className="group">
                      <div className={`${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                        <div className="relative">
                          <img
                            src={product.image}
                            alt={product.name}
                            className={`w-full h-64 object-cover group-hover:opacity-90 transition-opacity ${
                              viewMode === 'list' ? 'h-full' : ''
                            }`}
                          />
                          {product.isSale && (
                            <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs font-semibold rounded">
                              -{product.discount}%
                            </div>
                          )}
                          {product.isNew && (
                            <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 text-xs font-semibold rounded">
                              NEW
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                        <div className="mb-2">
                          <Link 
                            to={`/brand/${product.brand.toLowerCase().replace(/\s+/g, '-')}`}
                            className="text-sm text-gray-600 hover:text-gray-900 font-medium"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {product.brand}
                          </Link>
                        </div>
                        
                        <h3 className={`font-medium text-gray-900 mb-2 hover:text-gray-700 ${
                          viewMode === 'list' ? 'text-lg' : 'text-sm'
                        }`}>
                          {product.name}
                        </h3>
                        
                        <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                          {product.description}
                        </p>
                        
                        <div className="mb-3">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>From:</span>
                            <span className="font-medium text-gray-900">{product.shop}</span>
                          </div>
                          {product.sizes && product.sizes.length > 0 && (
                            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                              <span>Sizes:</span>
                              <span className="font-medium text-gray-900">{product.sizes.join(', ')}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`font-bold text-gray-900 ${
                                viewMode === 'list' ? 'text-lg' : 'text-base'
                              }`}>
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
                        
                        {/* Action Buttons */}
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openQuickView(product);
                            }}
                            className="flex-1 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:border-gray-900 transition-colors flex items-center justify-center gap-1"
                          >
                            <FiEye size={14} />
                            Quick View
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              addToWishlist(product);
                            }}
                            className={`p-2 rounded-lg border transition-colors ${
                              isInWishlist(product.id)
                                ? 'border-red-500 text-red-500 bg-red-50'
                                : 'border-gray-300 hover:border-red-500 hover:text-red-500'
                            }`}
                          >
                            <FiHeart size={14} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCompare(product);
                            }}
                            className={`p-2 rounded-lg border transition-colors ${
                              isInCompare(product.id)
                                ? 'border-blue-500 text-blue-500 bg-blue-50'
                                : 'border-gray-300 hover:border-blue-500 hover:text-blue-500'
                            }`}
                          >
                            <FiGitCompare size={14} />
                          </button>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Compare Bar */}
      {compareProducts.length > 0 && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-40">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FiGitCompare size={20} className="text-gray-900" />
              <span className="text-sm font-medium text-gray-900">
                {compareProducts.length} product{compareProducts.length > 1 ? 's' : ''} to compare
              </span>
            </div>
            <button
              onClick={() => setShowCompare(true)}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Compare Now
            </button>
            <button
              onClick={() => setCompareProducts([])}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              Clear All
            </button>
          </div>
        </div>
      )}
      
      {/* Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        isOpen={showQuickView}
        onClose={closeQuickView}
        onAddToCart={handleAddToCart}
        onAddToWishlist={addToWishlist}
      />
      
      {/* Compare Modal */}
      <ProductCompare
        isOpen={showCompare}
        onClose={() => setShowCompare(false)}
        products={compareProducts}
        onRemoveProduct={removeFromCompare}
      />
    </div>
  );
};

export default MenProducts;
