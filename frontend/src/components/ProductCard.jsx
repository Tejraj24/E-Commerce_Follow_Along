import React from 'react';
import { FiStar, FiShoppingCart, FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <Link to={`/product/${product._id}`}>
          <img 
            src={product.images?.[0] || 'https://via.placeholder.com/300x300'} 
            alt={product.name}
            className="w-full h-64 object-cover"
          />
        </Link>
        <button className="absolute top-3 right-3 bg-white p-2 rounded-full hover:bg-gray-100">
          <FiHeart className="text-gray-600" />
        </button>
        {product.colors && product.colors.length > 0 && (
          <div className="absolute bottom-3 left-3 flex space-x-1">
            {product.colors.slice(0, 3).map((color, index) => (
              <span 
                key={index}
                className="w-5 h-5 rounded-full border border-gray-300"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <Link to={`/product/${product._id}`} className="hover:underline">
              <h3 className="font-semibold text-lg">{product.name}</h3>
            </Link>
            <div className="flex items-center mt-1">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FiStar 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.floor(product.rating || 0) ? 'fill-current' : ''}`} 
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-2">
                {product.rating?.toFixed(1) || '4.5'} ({product.reviewCount || '0'})
              </span>
            </div>
          </div>
          <span className="font-bold">${(product.price || 0).toFixed(2)}</span>
        </div>
        <button className="mt-4 w-full bg-black text-white py-2 rounded-md flex items-center justify-center hover:bg-gray-800 transition-colors">
          <FiShoppingCart className="mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
