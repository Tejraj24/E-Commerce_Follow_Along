import { useState } from 'react';
import { motion } from 'framer-motion';
import userService from '../services/userService';
import { useNavigate } from 'react-router-dom';
import useUserEmail from '../hooks/useUserEmail';

const CreateAddress = () => {
  const navigate = useNavigate();
  const userEmail = useUserEmail();
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [addressType, setAddressType] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const addressData = {
      country,
      city,
      address1,
      address2,
      zipCode,
      addressType,
      email: userEmail,
    };

    try {
      const response = await userService.addAddress(addressData);
      if (response.status === 201) {
        navigate('/profile');
      }
    } catch (err) {
      console.error('Error adding address:', err);
      setError('Failed to add address. Please check the data and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    'min-h-12 w-full min-w-0 rounded-[1rem] border border-gray-200 bg-white px-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-[70vh] w-full overflow-x-hidden bg-[#f6f5f3] px-4 py-6 sm:px-6 lg:px-8 lg:py-10"
    >
      <div className="mx-auto w-full max-w-xl">
        <div className="mb-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Account</p>
          <h1 className="lux-heading mt-2 text-3xl font-semibold text-gray-900 sm:text-4xl">Add Address</h1>
          <p className="mt-3 text-sm leading-6 text-gray-500">
            Save a shipping destination for faster checkout.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[1.75rem] border border-gray-100 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-6"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">Country</label>
              <input type="text" value={country} className={inputClass} onChange={(e) => setCountry(e.target.value)} placeholder="Enter country" required />
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">City</label>
              <input type="text" value={city} className={inputClass} onChange={(e) => setCity(e.target.value)} placeholder="Enter city" required />
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">Zip Code</label>
              <input type="text" value={zipCode} className={inputClass} onChange={(e) => setZipCode(e.target.value)} placeholder="Enter zip code" required />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">Address Line 1</label>
              <input type="text" value={address1} className={inputClass} onChange={(e) => setAddress1(e.target.value)} placeholder="Street address" required />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">Address Line 2</label>
              <input type="text" value={address2} className={inputClass} onChange={(e) => setAddress2(e.target.value)} placeholder="Apartment, suite, etc. (optional)" />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">Address Type</label>
              <select value={addressType} className={inputClass} onChange={(e) => setAddressType(e.target.value)} required>
                <option value="">Select type</option>
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full border border-gray-300 px-6 text-sm font-semibold text-gray-900 transition-colors hover:border-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-gray-900 px-6 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? 'Saving...' : 'Save Address'}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default CreateAddress;
