import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productService from '../services/productService';
import useUserEmail from '../hooks/useUserEmail';
import { motion } from 'framer-motion';
import { IoIosAdd, IoIosRemove } from 'react-icons/io';
import { LoadingState, ErrorState, EmptyState } from '../components/PageState';

const imageBase = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const getImageSrc = (path) => {
  if (!path) return 'https://via.placeholder.com/600x600';
  if (path.startsWith('http')) return path;
  return `${imageBase}${path}`;
};

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [adding, setAdding] = useState(false);
  const [cartMessage, setCartMessage] = useState('');
  const userEmail = useUserEmail();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productService.getProduct(id);
        setProduct(response.data.product);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.response?.data?.message || err.message || 'We could not load this product.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const addToCart = async () => {
    setAdding(true);
    setCartMessage('');
    try {
      await productService.addToCart({ userId: userEmail, productId: id, quantity });
      setCartMessage('Added to cart successfully.');
    } catch (err) {
      console.error('Error adding to cart:', err);
      setCartMessage('Could not add to cart. Please try again.');
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return <LoadingState title="Loading product" subtitle="We're preparing the full product story, images, and details." />;
  }

  if (error) {
    return (
      <ErrorState
        title="Product unavailable"
        message={error}
        actionLabel="Retry"
        onAction={() => window.location.reload()}
      />
    );
  }

  if (!product) {
    return (
      <EmptyState
        title="No product found"
        message="This product no longer exists or was removed from the catalog."
        actionLabel="Go home"
        onAction={() => { window.location.href = '/'; }}
      />
    );
  }

  const images = product.images?.length ? product.images : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mx-auto w-full max-w-screen-2xl overflow-x-hidden px-4 py-6 sm:px-6 lg:px-8 lg:py-10"
    >
      <div className="grid gap-6 rounded-[2rem] border border-gray-100 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] lg:grid-cols-[1.1fr_0.9fr] lg:gap-0">
        <div className="overflow-hidden rounded-t-[2rem] bg-gray-50 p-4 sm:p-6 lg:rounded-l-[2rem] lg:rounded-tr-none">
          {images.length > 0 ? (
            <>
              <img
                src={getImageSrc(images[activeImage])}
                alt={product.name}
                className="mx-auto h-full max-h-[60vh] w-full rounded-[1.5rem] object-cover"
              />
              {images.length > 1 && (
                <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-5">
                  {images.map((image, index) => (
                    <button
                      key={image + index}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      className={`aspect-square overflow-hidden rounded-xl ring-2 transition-all ${
                        activeImage === index ? 'ring-gray-900' : 'ring-transparent hover:ring-gray-300'
                      }`}
                    >
                      <img src={getImageSrc(image)} alt={`${product.name} view ${index + 1}`} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="flex min-h-[20rem] w-full items-center justify-center rounded-[1.5rem] bg-gray-100 text-gray-500 sm:min-h-[28rem]">
              No Image Available
            </div>
          )}
        </div>

        <div className="min-w-0 p-5 sm:p-6 lg:p-8">
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-gray-400">Product details</p>
          <h1 className="lux-heading mb-2 text-3xl font-semibold text-gray-900 sm:text-4xl">{product.name}</h1>
          <p className="mb-5 text-2xl font-semibold text-gray-900">${Number(product.price).toFixed(2)}</p>

          <div className="mb-5 rounded-[1.5rem] bg-gray-50 p-4 sm:p-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">Description</h2>
            <p className="mt-3 leading-7 text-gray-600">{product.description}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.25rem] border border-gray-100 p-4">
              <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">Category</h2>
              <p className="mt-2 text-gray-700">{product.category}</p>
            </div>
            <div className="rounded-[1.25rem] border border-gray-100 p-4">
              <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">Stock</h2>
              <p className="mt-2 text-gray-700">{product.stock > 0 ? `${product.stock} available` : 'Out of stock'}</p>
            </div>
          </div>

          {product.tags?.length > 0 && (
            <div className="mt-4 rounded-[1.25rem] border border-gray-100 p-4">
              <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">Tags</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-gray-900 px-3 py-1 text-sm font-medium text-white">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-5 rounded-[1.25rem] border border-gray-100 p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">Quantity</div>
            <div className="mt-3 flex flex-row items-center gap-2">
              <button type="button" onClick={handleDecrement} className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 transition-colors hover:border-gray-900">
                <IoIosRemove />
              </button>
              <div className="min-w-14 rounded-full bg-gray-50 px-5 py-2 text-center font-semibold text-gray-900">{quantity}</div>
              <button type="button" onClick={handleIncrement} className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 transition-colors hover:border-gray-900">
                <IoIosAdd />
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <button
              type="button"
              onClick={addToCart}
              disabled={adding || product.stock <= 0}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              {adding ? 'Adding...' : product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
            {cartMessage && (
              <p className={`text-sm ${cartMessage.includes('success') ? 'text-emerald-600' : 'text-red-600'}`}>
                {cartMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
