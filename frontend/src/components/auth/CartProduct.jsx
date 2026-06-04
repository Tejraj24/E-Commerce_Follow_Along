import { useState, useEffect } from 'react';
import productService from '../../services/productService';
import { IoIosAdd, IoIosRemove } from 'react-icons/io';

export default function CartProduct({ _id, name, images, quantity, price, email }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantityVal, setQuantityVal] = useState(quantity);

  useEffect(() => {
    if (!images || images.length === 0) return undefined;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [images]);

  const updateQuantityVal = (nextQuantity) => {
    productService
      .updateCartQuantity({ email, productId: _id, quantity: nextQuantity })
      .catch((err) => console.error('Error updating quantity:', err));
  };

  const handleIncrement = () => {
    const nextQuantity = quantityVal + 1;
    setQuantityVal(nextQuantity);
    updateQuantityVal(nextQuantity);
  };

  const handleDecrement = () => {
    const nextQuantity = quantityVal > 1 ? quantityVal - 1 : 1;
    setQuantityVal(nextQuantity);
    updateQuantityVal(nextQuantity);
  };

  const imageBase = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const currentImage = images && images.length > 0 ? images[currentIndex] : '';
  const lineTotal = Number(price || 0) * quantityVal;

  return (
    <div className="flex w-full min-w-0 flex-col gap-4 rounded-[1.25rem] border border-gray-100 bg-gray-50/80 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-4">
        <img
          src={currentImage ? `${imageBase}${currentImage}` : 'https://via.placeholder.com/128'}
          alt={name}
          className="h-24 w-24 shrink-0 rounded-[1rem] object-cover ring-1 ring-gray-200 sm:h-28 sm:w-28"
        />
        <div className="min-w-0">
          <p className="truncate text-base font-semibold text-gray-900 sm:text-lg">{name}</p>
          <p className="mt-1 text-sm text-gray-500">${Number(price || 0).toFixed(2)} each</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDecrement}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white transition-colors hover:border-gray-900"
            aria-label="Decrease quantity"
          >
            <IoIosRemove />
          </button>
          <span className="min-w-10 text-center text-sm font-semibold text-gray-900">{quantityVal}</span>
          <button
            type="button"
            onClick={handleIncrement}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white transition-colors hover:border-gray-900"
            aria-label="Increase quantity"
          >
            <IoIosAdd />
          </button>
        </div>
        <p className="text-base font-semibold text-gray-900 sm:min-w-[5rem] sm:text-right">
          ${lineTotal.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
