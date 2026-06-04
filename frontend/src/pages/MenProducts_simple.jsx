import { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductQuickView from '../components/ProductQuickView';
import productService from '../services/productService';
import useUserEmail from '../hooks/useUserEmail';
import { LoadingState, EmptyState } from '../components/PageState';

const imageBase = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const MOCK_PRODUCTS = [
  {
    id: '507f1f77bcf86cd799439011',
    _id: '507f1f77bcf86cd799439011',
    name: 'Gucci Black Ankle Boots With Web Detail',
    brand: 'Gucci',
    description: 'Premium leather ankle boots with iconic web detail',
    price: 616.0,
    originalPrice: 1557.0,
    discount: 60,
    image: 'https://cdn79045795.ahacdn.me/images/product/19434529/medium.webp',
    category: 'footwear',
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
    colors: ['Black'],
    isSale: true,
    rating: 4.8,
    reviewCount: 124,
  },
  {
    id: '507f1f77bcf86cd799439012',
    _id: '507f1f77bcf86cd799439012',
    name: 'Amiri Black Jeans',
    brand: 'Amiri',
    description: 'Slim fit black jeans with distressed details',
    price: 575.98,
    originalPrice: 1439.94,
    discount: 60,
    image: 'https://cdn79045795.ahacdn.me/images/product/14008468/medium.webp',
    category: 'clothing',
    sizes: ['31'],
    colors: ['Black'],
    isSale: true,
    rating: 4.6,
    reviewCount: 89,
  },
];

const normalizeApiProduct = (product) => ({
  id: product._id,
  _id: product._id,
  name: product.name,
  brand: product.tags?.[0] || product.category || 'Overmode',
  description: product.description,
  price: product.price,
  originalPrice: null,
  discount: null,
  image: product.images?.[0]
    ? product.images[0].startsWith('http')
      ? product.images[0]
      : `${imageBase}${product.images[0]}`
    : 'https://via.placeholder.com/600x600',
  images: product.images,
  category: product.category,
  sizes: [],
  colors: [],
  isSale: false,
  rating: null,
  reviewCount: 0,
});

const MenProducts_simple = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [searchParams] = useSearchParams();
  const searchQuery = (searchParams.get('q') || '').trim().toLowerCase();
  const userEmail = useUserEmail();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getProducts();
        const apiProducts = response.data?.products || [];
        if (apiProducts.length > 0) {
          setProducts(apiProducts.map(normalizeApiProduct));
        } else {
          setProducts(MOCK_PRODUCTS);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setProducts(MOCK_PRODUCTS);
        setError('Live catalog unavailable. Showing curated picks.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;
    return products.filter((product) =>
      [product.name, product.description, product.brand, product.category]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(searchQuery))
    );
  }, [products, searchQuery]);

  const handleAddToCart = async (item) => {
    await productService.addToCart({
      userId: userEmail,
      productId: item._id || item.id,
      quantity: item.quantity || 1,
    });
  };

  if (loading) {
    return <LoadingState title="Loading collection" subtitle="We're fetching the men's edit and premium product picks." />;
  }

  if (filteredProducts.length === 0) {
    return (
      <EmptyState
        title={searchQuery ? 'No matching products' : 'No products found'}
        message={
          searchQuery
            ? `We couldn't find results for "${searchParams.get('q')}". Try another search or browse the full collection.`
            : 'Try another category or check back soon for the latest menswear drops.'
        }
        actionLabel={searchQuery ? 'Clear search' : 'Browse home'}
        onAction={() => {
          if (searchQuery) window.location.href = '/men';
          else window.location.href = '/';
        }}
      />
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="overflow-x-hidden bg-[#f6f5f3]"
      >
        <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
          <Breadcrumbs />
          <div className="mb-8 rounded-[1.75rem] border border-gray-100 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-6 lg:p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Category</p>
            <h1 className="lux-heading mt-2 text-3xl font-semibold text-gray-900 sm:text-4xl">Men&apos;s Collection</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
              {filteredProducts.length} products found
              {searchQuery ? ` for "${searchParams.get('q')}"` : ''}
            </p>
            {error && <p className="mt-3 text-sm text-amber-700">{error}</p>}
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white">Premium picks</span>
              <span className="rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-600">Mobile-first grid</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <motion.article
                key={product.id}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="overflow-hidden rounded-[1.5rem] border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-xl"
              >
                <div className="group relative">
                  <Link to={`/product/${product.id}`} className="block">
                    <div className="relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {product.isSale && product.discount && (
                        <div className="absolute left-3 top-3 rounded-full bg-gray-900 px-3 py-1 text-xs font-semibold text-white">
                          -{product.discount}%
                        </div>
                      )}
                    </div>
                  </Link>
                  <button
                    type="button"
                    onClick={() => setQuickViewProduct(product)}
                    className="absolute bottom-4 right-4 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-900 shadow-md transition-transform hover:-translate-y-0.5"
                  >
                    Quick View
                  </button>
                </div>

                <div className="p-5">
                  <span className="text-xs uppercase tracking-[0.3em] text-gray-400">{product.brand}</span>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="mb-2 mt-2 text-lg font-semibold text-gray-900 transition-colors hover:text-gray-600">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="mb-3 line-clamp-2 text-sm leading-6 text-gray-500">{product.description}</p>
                  <div className="flex items-end justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-semibold text-gray-900">${Number(product.price).toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">${Number(product.originalPrice).toFixed(2)}</span>
                      )}
                    </div>
                    {product.rating && (
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <span className="text-gray-900">★</span>
                        <span>{product.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.div>

      <ProductQuickView
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onAddToWishlist={async () => {}}
      />
    </>
  );
};

export default MenProducts_simple;
