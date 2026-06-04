import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../services/userService';
import useUserEmail from '../hooks/useUserEmail';
import { motion } from 'framer-motion';
import { LoadingState, ErrorState, EmptyState } from '../components/PageState';

const SelectAddress = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userEmail = useUserEmail();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await userService.getAddresses(userEmail);
        const data = response.data;
        if (data && Array.isArray(data.addresses)) {
          setAddresses(data.addresses);
        } else {
          setAddresses([]);
        }
      } catch (err) {
        console.error('Error fetching addresses:', err);
        setError(err.response?.data?.message || err.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [userEmail]);

  const handleSelectAddress = (addressId) => {
    navigate('/order-confirmation', { state: { addressId, email: userEmail } });
  };

  if (loading) {
    return <LoadingState title="Loading addresses" subtitle="We're fetching your saved shipping destinations." />;
  }

  if (error) {
    return (
      <ErrorState
        title="Could not load addresses"
        message={error}
        actionLabel="Retry"
        onAction={() => window.location.reload()}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f5f3]"
    >
      <div className="flex-grow px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="mx-auto w-full max-w-4xl rounded-[1.75rem] border border-gray-100 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-6">
          <div className="mb-6 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Checkout</p>
            <h2 className="lux-heading mt-2 text-3xl font-semibold text-gray-900">Select Shipping Address</h2>
          </div>
          {addresses.length > 0 ? (
            <div className="max-h-[30rem] space-y-4 overflow-y-auto pr-1">
              {addresses.map((address) => (
                <div
                  key={address._id}
                  className="flex flex-col gap-4 rounded-[1.25rem] border border-gray-100 p-4 transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="break-words font-medium text-gray-900">
                      {address.address1}
                      {address.address2 ? `, ${address.address2}` : ''}, {address.city}, {address.zipCode}
                    </p>
                    <p className="text-sm text-gray-600">{address.country}</p>
                    <p className="text-sm text-gray-500">Type: {address.addressType || 'N/A'}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSelectAddress(address._id)}
                    className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-black"
                  >
                    Select
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No addresses found"
              message="Add a shipping address to continue checkout."
              actionLabel="Add address"
              onAction={() => navigate('/create-address')}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SelectAddress;
