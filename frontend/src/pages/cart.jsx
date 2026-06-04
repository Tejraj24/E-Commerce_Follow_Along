import { useState, useEffect, useMemo } from 'react';
import CartProduct from '../components/auth/CartProduct';
import { useNavigate } from 'react-router-dom';
import productService from '../services/productService';
import { motion } from 'framer-motion';
import useUserEmail from '../hooks/useUserEmail';
import { LoadingState, EmptyState, ErrorState } from '../components/PageState';

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userEmail = useUserEmail();

  useEffect(() => {
    productService
      .getCartProducts(userEmail)
      .then((res) => {
        const data = res.data;
        setProducts(data.cart.map((product) => ({ quantity: product.quantity, ...product.productId })));
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setError(err.response?.data?.message || err.message || 'Could not load your cart.');
        setLoading(false);
      });
  }, [userEmail]);

  const subtotal = useMemo(
    () => products.reduce((sum, product) => sum + Number(product.price || 0) * Number(product.quantity || 1), 0),
    [products]
  );

  const handlePlaceOrder = () => {
    navigate('/select-address');
  };

  if (loading) {
    return <LoadingState title="Loading cart" subtitle="We're pulling in your selected pieces and quantities." />;
  }

  if (error) {
    return (
      <ErrorState
        title="Cart unavailable"
        message={error}
        actionLabel="Retry"
        onAction={() => window.location.reload()}
      />
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        message="Add products to your cart to review them here and continue to checkout."
        actionLabel="Start shopping"
        onAction={() => navigate('/men')}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="w-full min-h-screen overflow-x-hidden bg-[#f6f5f3]"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid gap-6 lg:grid-cols-[1.5fr_0.85fr]">
          <section className="min-w-0 rounded-[1.75rem] border border-gray-100 bg-white p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-6">
            <div className="mb-5 flex flex-col gap-3 border-b border-gray-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Shopping bag</p>
                <h1 className="lux-heading mt-2 text-3xl font-semibold text-gray-900">Cart</h1>
              </div>
              <span className="inline-flex w-fit rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white">
                {products.length} items
              </span>
            </div>
            <div className="space-y-3">
              {products.map((product) => (
                <CartProduct key={product._id} email={userEmail} {...product} />
              ))}
            </div>
          </section>

          <aside className="min-w-0 rounded-[1.75rem] border border-gray-100 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-6 lg:sticky lg:top-24 lg:self-start">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">Summary</h2>
            <div className="mt-4 space-y-3 text-sm text-gray-600">
              <div className="flex items-center justify-between gap-4">
                <span>Items</span>
                <span>{products.length}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Delivery</span>
                <span className="text-right">Calculated at checkout</span>
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-gray-100 pt-3 text-base font-semibold text-gray-900">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handlePlaceOrder}
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-black"
            >
              Place Order
            </button>
          </aside>
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;
