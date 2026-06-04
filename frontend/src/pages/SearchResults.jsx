import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce';
import productService from '../services/productService';
import ProductCard from '../components/ProductCard';
import '../styles/search.css';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const queryFromUrl = searchParams.get('q') || '';

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState(queryFromUrl);
  const debouncedSearch = useDebounce(searchInput, 300);

  // Sync URL query → internal state when URL changes externally
  useEffect(() => {
    setSearchInput(queryFromUrl);
  }, [queryFromUrl]);

  // Fetch products when debounced search value changes
  useEffect(() => {
    let cancelled = false;

    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const params = {};
        if (debouncedSearch.trim()) params.q = debouncedSearch.trim();
        const res = await productService.getProducts(params);
        if (!cancelled) {
          setProducts(res.data?.products || []);
        }
      } catch (err) {
        console.error('Search error:', err);
        if (!cancelled) setProducts([]);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchProducts();
    return () => { cancelled = true; };
  }, [debouncedSearch]);

  // Sync search state to URL (replaceState to avoid polluting history)
  useEffect(() => {
    const url = new URL(window.location);
    if (debouncedSearch.trim()) {
      url.searchParams.set('q', debouncedSearch.trim());
    } else {
      url.searchParams.delete('q');
    }
    window.history.replaceState({}, '', url);
  }, [debouncedSearch]);

  return (
    <div className="search-results container mx-auto px-4">
      {/* Search Header */}
      <div className="search-results__header">
        <h1 className="search-results__title lux-heading">
          {queryFromUrl ? `Results for "${queryFromUrl}"` : 'All Products'}
        </h1>
        <div className="search-results__subtitle">
          <span className="search-results__count">{products.length}</span> product{products.length !== 1 ? 's' : ''} found
        </div>
      </div>

      {/* Inline Search Refinement */}
      <div className="search-results__toolbar">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Refine your search..."
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black/5 transition-colors"
            id="search-refine-input"
          />
          {searchInput && (
            <button
              onClick={() => setSearchInput('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
        <div className="search-results__showing">
          {isLoading ? 'Searching...' : `Showing ${products.length} result${products.length !== 1 ? 's' : ''}`}
        </div>
      </div>

      {/* Results Body */}
      <div className="search-results__body">
        {/* Loading Skeleton */}
        {isLoading && products.length === 0 && (
          <div className="search-results__skeleton">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="search-skeleton-card">
                <div className="search-skeleton-card__img" />
                <div className="search-skeleton-card__line" />
                <div className="search-skeleton-card__line search-skeleton-card__line--short" />
                <div className="search-skeleton-card__line search-skeleton-card__line--price" />
              </div>
            ))}
          </div>
        )}

        {/* Product Grid */}
        {!isLoading && products.length > 0 && (
          <div className="search-results__grid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && products.length === 0 && (
          <div className="search-results__empty">
            <svg className="search-results__empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
              <path d="M8 11h6" />
            </svg>
            <h2 className="search-results__empty-title">
              {searchInput.trim() ? 'No products found' : 'Start searching'}
            </h2>
            <p className="search-results__empty-text">
              {searchInput.trim()
                ? `We couldn't find any products matching "${searchInput.trim()}". Try different keywords or browse our collections.`
                : 'Enter a search term above to discover our premium collection.'}
            </p>
            <Link
              to="/"
              className="mt-6 inline-block px-6 py-2.5 bg-black text-white text-sm rounded-full hover:bg-gray-800 transition-colors"
            >
              Browse Collections
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
