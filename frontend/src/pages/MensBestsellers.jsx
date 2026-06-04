import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Breadcrumbs from '../components/Breadcrumbs';

const PRODUCTS = [
  {
    id: 1,
    name: 'Everyday Running Sneakers',
    description: 'Lightweight everyday sneakers for men',
    price: 89.99,
    image: 'https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 2,
    name: 'Classic Leather Sneakers',
    description: 'Minimal leather sneakers for daily wear',
    price: 109.99,
    image: 'https://images.pexels.com/photos/2529150/pexels-photo-2529150.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 3,
    name: 'Sport Performance Runners',
    description: 'High cushioning running shoes for men',
    price: 129.99,
    image: 'https://images.pexels.com/photos/3756042/pexels-photo-3756042.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 4,
    name: 'Trail Running Shoes',
    description: 'Grip-focused shoes for off-road runs',
    price: 119.99,
    image: 'https://images.pexels.com/photos/1552103/pexels-photo-1552103.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 5,
    name: 'Casual Knit Sneakers',
    description: 'Breathable knit upper with flexible sole',
    price: 99.99,
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 6,
    name: 'High-Top Street Sneakers',
    description: 'High-top design for a bold street look',
    price: 114.99,
    image: 'https://images.pexels.com/photos/6311579/pexels-photo-6311579.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 7,
    name: 'Waterproof Runners',
    description: 'Water-resistant upper for rainy runs',
    price: 134.99,
    image: 'https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 8,
    name: 'Slip-On Sneakers',
    description: 'Easy on-off slip-on sneakers for men',
    price: 84.99,
    image: 'https://images.pexels.com/photos/2041003/pexels-photo-2041003.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

const MensBestsellers = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="overflow-x-hidden bg-[#f6f5f3]"
    >
      <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <Breadcrumbs />
        <div className="mb-8 rounded-[1.75rem] border border-gray-100 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-6 lg:p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Collection</p>
          <h1 className="lux-heading mt-2 text-3xl font-semibold text-gray-900 sm:text-4xl">Men&apos;s Bestsellers</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
            Top-rated footwear and streetwear essentials curated for everyday luxury.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {PRODUCTS.map((product) => (
            <motion.article
              key={product.id}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="overflow-hidden rounded-[1.5rem] border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-xl"
            >
              <Link to="/men" className="group block">
                <div className="overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-72"
                  />
                </div>
                <div className="p-5">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">{product.name}</h3>
                  <p className="mb-3 line-clamp-2 text-sm leading-6 text-gray-500">{product.description}</p>
                  <p className="text-base font-semibold text-gray-900">${product.price.toFixed(2)}</p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MensBestsellers;
