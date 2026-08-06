import { useQuery } from '@tanstack/react-query';
import { products, getRelatedProducts, getProductsByCategory } from '@/data/products';
import type { Product } from '@/types/product';

// Mock network delay function
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      await delay(500);
      return products;
    },
  });
};

export const useProduct = (idOrSlug: string) => {
  return useQuery({
    queryKey: ['product', idOrSlug],
    queryFn: async () => {
      await delay(300);
      const product = products.find(p => p.id === idOrSlug || p.slug === idOrSlug);
      if (!product) throw new Error('Product not found');
      return product as Product;
    },
  });
};

export const useProductsByCategory = (categorySlug: string) => {
  return useQuery({
    queryKey: ['products', 'category', categorySlug],
    queryFn: async () => {
      await delay(400);
      return getProductsByCategory(categorySlug);
    },
  });
};

export const useRelatedProducts = (currentProductId: string) => {
  return useQuery({
    queryKey: ['products', 'related', currentProductId],
    queryFn: async () => {
      await delay(300);
      return getRelatedProducts(currentProductId);
    },
  });
};

export const useSearchProducts = (query: string) => {
  return useQuery({
    queryKey: ['products', 'search', query],
    queryFn: async () => {
      if (!query.trim()) return [];
      await delay(400); // Simulate network delay
      const lowerQuery = query.toLowerCase();
      // Search in name or description
      return products.filter(p => 
        p.name.toLowerCase().includes(lowerQuery) || 
        p.description.some(d => d.toLowerCase().includes(lowerQuery))
      );
    },
    enabled: query.length > 0, // Only run query if there is a search term
  });
};
