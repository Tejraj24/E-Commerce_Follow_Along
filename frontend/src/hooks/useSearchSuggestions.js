import { useState, useEffect } from 'react';
import useDebounce from './useDebounce';
import productService from '../services/productService';

/**
 * Hook to fetch search suggestions as the user types.
 * Debounces the query (200ms) before making the API call.
 * Only fires when the query is at least 2 characters.
 */
const useSearchSuggestions = (query) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 200);

  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    let cancelled = false;
    const fetchSuggestions = async () => {
      setIsLoading(true);
      try {
        const res = await productService.getSuggestions(debouncedQuery.trim());
        if (!cancelled) {
          setSuggestions(res.data?.suggestions || []);
        }
      } catch (err) {
        if (!cancelled) setSuggestions([]);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchSuggestions();
    return () => { cancelled = true; };
  }, [debouncedQuery]);

  return { suggestions, isLoading };
};

export default useSearchSuggestions;
