import React, { useEffect, useState } from "react";
import ProductListing from "../components/ProductListing";
import CategoryRow from "../components/CategoryRow";
import VideoBanner from "../components/VideoBanner";

// Mock data for demonstration
const mockProducts = [
  {
    id: "1",
    name: "Nike Air Max 270",
    price: 159.99,
    originalPrice: 189.99,
    rating: 4.8,
    reviewCount: 1245,
    colors: ["#FF6B6B", "#4ECDC4", "#000000"],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"],
    description: "The Nike Air Max 270 delivers a lightweight and responsive ride with its full-length Max Air unit.",
    isNew: true,
    isSale: true
  },
  {
    id: "2",
    name: "Adidas Ultraboost 22",
    price: 179.99,
    rating: 4.9,
    reviewCount: 2156,
    colors: ["#000000", "#FFFFFF", "#FF0000"],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
    images: ["https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
    description: "Incredible energy return with responsive cushioning for all-day comfort.",
    isNew: true
  },
  {
    id: "3",
    name: "New Balance 990v5",
    price: 174.99,
    rating: 4.7,
    reviewCount: 956,
    colors: ["#A9A9A9", "#000000", "#FFFFFF"],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    images: ["https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1725&q=80"],
    description: "Premium comfort with ENCAP midsole technology for all-day support.",
    isSale: true
  },
  {
    id: "4",
    name: "Puma RS-X3 Puzzle",
    price: 119.99,
    originalPrice: 149.99,
    rating: 4.5,
    reviewCount: 724,
    colors: ["#FFA500", "#0000FF", "#FF0000"],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
    images: ["https://images.unsplash.com/photo-1543508282-6319a3e2621f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80"],
    description: "Bold design meets responsive cushioning in this statement sneaker.",
    isSale: true
  },
  {
    id: "5",
    name: "ASICS Gel-Kayano 28",
    price: 159.99,
    rating: 4.8,
    reviewCount: 1123,
    colors: ["#0000FF", "#FF0000", "#000000"],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    images: ["https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
    description: "Exceptional stability and support for long-distance runners.",
    isNew: true
  },
  {
    id: "6",
    name: "Hoka One One Clifton 8",
    price: 139.99,
    rating: 4.7,
    reviewCount: 845,
    colors: ["#FF69B4", "#000000", "#FFFFFF"],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
    images: ["https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"],
    description: "Lightweight with maximum cushioning for a smooth, responsive ride.",
    isNew: true
  },
  {
    id: "7",
    name: "Under Armour HOVR Phantom 2",
    price: 149.99,
    originalPrice: 169.99,
    rating: 4.6,
    reviewCount: 932,
    colors: ["#000000", "#FF0000", "#0000FF"],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"],
    description: "Energy return and comfort for the neutral runner.",
    isSale: true
  },
  {
    id: "8",
    name: "Brooks Ghost 14",
    price: 129.99,
    rating: 4.8,
    reviewCount: 1567,
    colors: ["#00BFFF", "#000000", "#FFFFFF"],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
    images: ["https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
    description: "Smooth ride with balanced, soft cushioning."
  },
  {
    id: "9",
    name: "Saucony Endorphin Speed 2",
    price: 169.99,
    originalPrice: 199.99,
    rating: 4.9,
    reviewCount: 1289,
    colors: ["#FF4500", "#000000", "#FFFFFF"],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    images: ["https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"],
    description: "Lightweight speed with responsive cushioning for race day.",
    isNew: true,
    isSale: true
  },
  {
    id: "10",
    name: "Reebok Nano X1",
    price: 129.99,
    rating: 4.6,
    reviewCount: 876,
    colors: ["#FF0000", "#000000", "#FFFFFF"],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
    images: ["https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
    description: "Designed for high-intensity training with responsive cushioning.",
    isNew: true
  },
  {
    id: "11",
    name: "On Cloudstratus",
    price: 179.99,
    rating: 4.7,
    reviewCount: 1043,
    colors: ["#000000", "#FFFFFF", "#808080"],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    images: ["https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"],
    description: "Maximum cushioning for long-distance running comfort.",
    isNew: true
  },
  {
    id: "12",
    name: "Altra Torin 5",
    price: 139.99,
    originalPrice: 159.99,
    rating: 4.5,
    reviewCount: 765,
    colors: ["#800080", "#000000", "#FFFFFF"],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
    images: ["https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
    description: "Zero-drop platform with balanced cushioning for natural running.",
    isSale: true
  }
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // In a real app, you would fetch from your backend
    // fetch("http://localhost:8000/api/v2/product/get-products")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setProducts(data.products || []);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching products:", error);
    //     setLoading(false);
    //   });

    // Using mock data for now
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-20 text-red-500">
            <p>Error loading products: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <VideoBanner />
      <CategoryRow />
      <div className="py-12">
        <ProductListing products={products} />
      </div>
    </div>
  );
}