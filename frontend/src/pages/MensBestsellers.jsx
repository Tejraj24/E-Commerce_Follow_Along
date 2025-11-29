import React from 'react';
import { Link } from 'react-router-dom';

const MensBestsellers = () => {
  const products = [
    {
      id: 1,
      name: 'Everyday Running Sneakers',
      description: 'Lightweight everyday sneakers for men',
      price: 89.99,
      // man running in sneakers on track
      image: 'https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 2,
      name: 'Classic Leather Sneakers',
      description: 'Minimal leather sneakers for daily wear',
      price: 109.99,
      // close-up leather sneakers
      image: 'https://images.pexels.com/photos/2529150/pexels-photo-2529150.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 3,
      name: 'Sport Performance Runners',
      description: 'High cushioning running shoes for men',
      price: 129.99,
      // dynamic running shoes
      image: 'https://images.pexels.com/photos/3756042/pexels-photo-3756042.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 4,
      name: 'Trail Running Shoes',
      description: 'Grip-focused shoes for off-road runs',
      price: 119.99,
      // trail shoes on outdoor terrain
      image: 'https://images.pexels.com/photos/1552103/pexels-photo-1552103.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 5,
      name: 'Casual Knit Sneakers',
      description: 'Breathable knit upper with flexible sole',
      price: 99.99,
      // knit style casual sneakers
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 6,
      name: 'High-Top Street Sneakers',
      description: 'High-top design for a bold street look',
      price: 114.99,
      // high-top sneakers
      image: 'https://images.pexels.com/photos/6311579/pexels-photo-6311579.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 7,
      name: 'Waterproof Runners',
      description: 'Water-resistant upper for rainy runs',
      price: 134.99,
      // running shoes in wet conditions
      image: 'https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 8,
      name: 'Slip-On Sneakers',
      description: 'Easy on-off slip-on sneakers for men',
      price: 84.99,
      // slip-on casual sneakers
      image: 'https://images.pexels.com/photos/2041003/pexels-photo-2041003.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 9,
      name: 'Everyday Trainers',
      description: 'Cushioned trainers for all-day comfort',
      price: 94.99,
      // basic trainers on neutral background
      image: 'https://images.pexels.com/photos/1437445/pexels-photo-1437445.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 10,
      name: 'Retro Running Shoes',
      description: 'Vintage-inspired running silhouette',
      price: 104.99,
      // retro/vintage sneakers
      image: 'https://images.pexels.com/photos/1759622/pexels-photo-1759622.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];

  return (
    <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Men&apos;s Bestsellers</h1>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No bestseller products available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              to="#"
              className="group"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:opacity-90 transition-opacity"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-2 line-clamp-2">{product.description}</p>
                  <p className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MensBestsellers;
