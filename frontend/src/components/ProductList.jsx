import React from 'react';
import { FiStar, FiShoppingCart, FiHeart } from 'react-icons/fi';

const products = [
  {
    id: 1,
    name: 'Wool Runner Mizzle',
    price: 115.00,
    rating: 4.8,
    reviewCount: 1245,
    colors: ['#F5F5DC', '#2F4F4F', '#A0522D'],
    image: 'https://images.unsplash.com/photo-1602810319880-3f2baf9042ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 2,
    name: 'Tree Dasher',
    price: 125.00,
    rating: 4.9,
    reviewCount: 892,
    colors: ['#000000', '#556B2F', '#8B4513'],
    image: 'https://images.unsplash.com/photo-1600185365483-26c7a535bbfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  // Add more products as needed
];

const ProductCard = ({ product }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
    <div className="relative">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-64 object-cover"
      />
      <button className="absolute top-3 right-3 bg-white p-2 rounded-full hover:bg-gray-100">
        <FiHeart className="text-gray-600" />
      </button>
      <div className="absolute bottom-3 left-3 flex space-x-1">
        {product.colors.map((color, index) => (
          <span 
            key={index}
            className="w-5 h-5 rounded-full border border-gray-300"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
    <div className="p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <div className="flex items-center mt-1">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">
              {product.rating} ({product.reviewCount})
            </span>
          </div>
        </div>
        <span className="font-bold">${product.price.toFixed(2)}</span>
      </div>
      <button className="mt-4 w-full bg-black text-white py-2 rounded-md flex items-center justify-center hover:bg-gray-800 transition-colors">
        <FiShoppingCart className="mr-2" />
        Add to Cart
      </button>
    </div>
  </div>
);

const ProductList = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">New Arrivals</h1>
        <div className="flex space-x-4">
          <button className="px-4 py-2 border border-black rounded-md hover:bg-gray-100">
            Filter
          </button>
          <select className="px-4 py-2 border border-black rounded-md bg-white">
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
