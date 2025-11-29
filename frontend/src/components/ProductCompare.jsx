import React, { useState, useEffect } from 'react';
import { FiX, FiGitCompare, FiTrash2 } from 'react-icons/fi';

const ProductCompare = ({ isOpen, onClose, products, onRemoveProduct }) => {
  const [compareData, setCompareData] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      setCompareData(products);
    }
  }, [products]);

  if (!isOpen || !products || products.length === 0) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const removeProduct = (productId) => {
    onRemoveProduct(productId);
  };

  const getComparisonFeatures = () => {
    const features = [
      { key: 'brand', label: 'Brand' },
      { key: 'price', label: 'Price', format: (value) => `$${value.toFixed(2)}` },
      { key: 'originalPrice', label: 'Original Price', format: (value) => value ? `$${value.toFixed(2)}` : 'N/A' },
      { key: 'discount', label: 'Discount', format: (value) => value ? `-${value}%` : 'N/A' },
      { key: 'category', label: 'Category', format: (value) => value?.charAt(0).toUpperCase() + value?.slice(1) || 'N/A' },
      { key: 'sizes', label: 'Available Sizes', format: (value) => value?.join(', ') || 'N/A' },
      { key: 'colors', label: 'Colors', format: (value) => value?.join(', ') || 'N/A' },
      { key: 'rating', label: 'Rating', format: (value) => value ? `${value} ★` : 'N/A' },
      { key: 'reviewCount', label: 'Reviews', format: (value) => value?.toString() || '0' },
      { key: 'shop', label: 'Available From' },
      { key: 'inStock', label: 'Availability', format: (value) => value ? 'In Stock' : 'Out of Stock' },
      { key: 'isNew', label: 'New Arrival', format: (value) => value ? 'Yes' : 'No' },
      { key: 'isSale', label: 'On Sale', format: (value) => value ? 'Yes' : 'No' }
    ];

    return features;
  };

  const comparisonFeatures = getComparisonFeatures();

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-7xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FiGitCompare size={24} className="text-gray-900" />
              <h2 className="text-2xl font-bold text-gray-900">Compare Products</h2>
              <span className="text-sm text-gray-500">({products.length} items)</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close comparison"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Product Headers */}
          <div className="grid gap-4 mb-8" style={{ gridTemplateColumns: `repeat(${products.length}, 1fr)` }}>
            {products.map((product) => (
              <div key={product.id} className="text-center">
                <div className="relative mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeProduct(product.id)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 hover:text-red-600 transition-colors"
                    aria-label="Remove product from comparison"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                <div className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</div>
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                {comparisonFeatures.map((feature) => (
                  <tr key={feature.key} className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-700 w-48">
                      {feature.label}
                    </td>
                    {products.map((product) => (
                      <td key={`${product.id}-${feature.key}`} className="py-3 px-4 text-center">
                        <span className="text-gray-600">
                          {feature.format 
                            ? feature.format(product[feature.key])
                            : product[feature.key] || 'N/A'
                          }
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:border-gray-900 transition-colors"
            >
              Close Comparison
            </button>
            {products.length < 4 && (
              <div className="text-sm text-gray-500 flex items-center">
                <FiGitCompare className="mr-2" />
                Add up to 4 products to compare
              </div>
            )}
          </div>

          {/* Empty State Message */}
          {products.length === 0 && (
            <div className="text-center py-12">
              <FiGitCompare size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products to compare</h3>
              <p className="text-gray-600 mb-4">Add products to compare their features side by side</p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCompare;
