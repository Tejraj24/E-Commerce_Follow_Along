import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiFilter, FiGrid, FiList, FiHeart, FiEye, FiGitCompare, FiX, FiChevronDown } from 'react-icons/fi';
import ProductSkeleton from '../components/SkeletonLoader';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductQuickView from '../components/ProductQuickView';
import ProductCompare from '../components/ProductCompare';

const MenProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState('featured');
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
      rating: 4.4,
      reviewCount: 92,
      inStock: true,
      shop: 'Cettu'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by brand
    if (selectedBrand !== 'all') {
      filtered = filtered.filter(product => product.brand === selectedBrand);
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Filter by selected brands (multi-select)
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => selectedBrands.includes(product.brand));
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'brand':
        filtered.sort((a, b) => a.brand.localeCompare(b.brand));
        break;
      default:
        // Featured - no sorting
        break;
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, selectedBrand, priceRange, sortBy, selectedBrands]);

  const categories = ['all', 'clothing', 'footwear', 'bags'];
  const brands = ['all', ...Array.from(new Set(products.map(p => p.brand)))];
  const priceRanges = [
    [0, 500],
    [500, 1000],
    [1000, 2000],
    [2000, 5000]
  ];

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const isInCompare = (productId) => {
    return compareProducts.some(item => item.id === productId);
  };

  const addToWishlist = (product) => {
    if (isInWishlist(product.id)) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
    // Store in localStorage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  };

  const addToCompare = (product) => {
    if (isInCompare(product.id)) {
      setCompareProducts(compareProducts.filter(item => item.id !== product.id));
    } else {
      if (compareProducts.length >= 4) {
        alert('You can compare up to 4 products at a time');
        return;
      }
      setCompareProducts([...compareProducts, product]);
    }
    // Store in localStorage
    localStorage.setItem('compareProducts', JSON.stringify(compareProducts));
  };

  const openQuickView = (product) => {
    setQuickViewProduct(product);
    setShowQuickView(true);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedBrand('all');
    setPriceRange([0, 5000]);
    setSortBy('featured');
    setSelectedBrands([]);
  };

  const toggleBrandFilter = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  if (loading) {
    return <ProductSkeleton />;
  }

  return (
    <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <Breadcrumbs />
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-64">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Filters</h3>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <FiFilter size={20} />
              </button>
            </div>
            
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block space-y-6`}>
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                    placeholder="Search products..."
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Brands */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                <div className="space-y-2">
                  {brands.slice(1).map(brand => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrandFilter(brand)}
                        className="mr-2"
                      />
                      <span className="text-sm">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                      placeholder="Min"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name</option>
                  <option value="brand">Brand</option>
                </select>
              </div>

              {/* Clear Filters */}
              <button
                onClick={clearFilters}
                className="w-full py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Men's Collection</h1>
              <p className="text-gray-600 mt-1">{filteredProducts.length} products found</p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-gray-900 text-white' : 'text-gray-600'}`}
                >
                  <FiGrid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-gray-900 text-white' : 'text-gray-600'}`}
                >
                  <FiList size={16} />
                </button>
              </div>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg"
              >
                <FiFilter size={16} />
                Filters
              </button>
            </div>
          </div>

          {/* Products */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
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
            <button onClick={() => setShowCompare(true)} className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
              Compare Now
            </button>
            <button onClick={() => setCompareProducts([])} className="text-gray-500 hover:text-gray-700 text-sm">
              Clear All
            </button>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {showQuickView && quickViewProduct && (
        <ProductQuickView
          product={quickViewProduct}
          isOpen={showQuickView}
          onClose={() => setShowQuickView(false)}
          onAddToCart={(product) => {
            console.log('Adding to cart:', product);
            // Implement cart functionality
          }}
          onAddToWishlist={(product) => {
            addToWishlist(product);
          }}
        />
      )}

      {/* Compare Modal */}
      {showCompare && (
        <ProductCompare
          products={compareProducts}
          isOpen={showCompare}
          onClose={() => setShowCompare(false)}
          onRemoveProduct={(productId) => {
            setCompareProducts(compareProducts.filter(p => p.id !== productId));
          }}
        />
      )}
    </div>
  );
};

export default MenProducts;
