import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddressCard from '../components/auth/AddressCard';
import userService from '../services/userService';
import useUserEmail from '../hooks/useUserEmail';
import { motion } from 'framer-motion';
import { LoadingState, EmptyState, ErrorState } from '../components/PageState';

export default function Profile() {
  const [personalDetails, setPersonalDetails] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    avatarUrl: '',
  });
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userEmail = useUserEmail();

  useEffect(() => {
    userService
      .getProfile(userEmail)
      .then((res) => {
        const data = res.data;
        setPersonalDetails(data.user);
        setAddresses(data.addresses || []);
      })
      .catch((err) => {
        console.error('Error fetching profile:', err);
        setError(err.response?.data?.message || err.message || 'Could not load your profile.');
      })
      .finally(() => setLoading(false));
  }, [userEmail]);

  const handleAddAddress = () => {
    navigate('/create-address');
  };

  if (loading) {
    return <LoadingState title="Loading profile" subtitle="We're fetching your account information and saved addresses." />;
  }

  if (error) {
    return (
      <ErrorState
        title="Profile unavailable"
        message={error}
        actionLabel="Retry"
        onAction={() => window.location.reload()}
      />
    );
  }

  const imageBase = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const avatarSrc = personalDetails.avatarUrl
    ? `${imageBase}/${personalDetails.avatarUrl}`
    : 'https://cdn.vectorstock.com/i/500p/17/61/male-avatar-profile-picture-vector-10211761.jpg';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen w-full overflow-x-hidden bg-[#f6f5f3]"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="min-w-0 rounded-[1.75rem] border border-gray-100 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Account</p>
            <h1 className="lux-heading mt-2 text-3xl font-semibold text-gray-900">Personal Details</h1>
            <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
              <img
                src={avatarSrc}
                alt="Profile"
                className="h-32 w-32 shrink-0 rounded-full object-cover ring-4 ring-gray-100 sm:h-40 sm:w-40"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://cdn.vectorstock.com/i/500p/17/61/male-avatar-profile-picture-vector-10211761.jpg';
                }}
              />
              <div className="grid min-w-0 flex-1 gap-4">
                <div className="rounded-[1.25rem] border border-gray-100 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Name</p>
                  <p className="mt-2 break-words text-lg font-medium text-gray-900">{personalDetails.name || '—'}</p>
                </div>
                <div className="rounded-[1.25rem] border border-gray-100 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Email</p>
                  <p className="mt-2 break-all text-lg font-medium text-gray-900">{personalDetails.email || userEmail}</p>
                </div>
                <div className="rounded-[1.25rem] border border-gray-100 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Mobile</p>
                  <p className="mt-2 break-words text-lg font-medium text-gray-900">{personalDetails.phoneNumber || '—'}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="min-w-0 rounded-[1.75rem] border border-gray-100 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Saved places</p>
                <h2 className="lux-heading mt-2 text-3xl font-semibold text-gray-900">Addresses</h2>
              </div>
              <button
                type="button"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-black"
                onClick={handleAddAddress}
              >
                Add Address
              </button>
            </div>
            <div className="mt-6 space-y-4">
              {addresses.length === 0 ? (
                <EmptyState
                  title="No addresses yet"
                  message="Add a shipping or billing address to speed up checkout."
                  actionLabel="Add address"
                  onAction={handleAddAddress}
                />
              ) : (
                addresses.map((address, index) => <AddressCard key={address._id || index} {...address} />)
              )}
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
