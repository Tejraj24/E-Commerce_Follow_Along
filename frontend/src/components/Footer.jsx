import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const shopLinks = [
    { name: 'Home', path: '/' },
    { name: "Men's Collection", path: '/men' },
    { name: 'Bestsellers', path: '/collections/mens-bestsellers' },
    { name: 'Cart', path: '/cart' },
  ];

  const accountLinks = [
    { name: 'Profile', path: '/profile' },
    { name: 'My Products', path: '/my-products' },
    { name: 'Login', path: '/login' },
    { name: 'Sign Up', path: '/signup' },
  ];

  return (
    <footer className="overflow-x-hidden border-t border-gray-100 bg-[#0b0b0c] text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-screen-2xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
      >
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div className="min-w-0 space-y-6">
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="lux-heading text-2xl font-bold tracking-[0.2em] sm:text-3xl">OVERMODE</span>
            </Link>
            <p className="max-w-xl text-sm leading-6 text-white/70 sm:text-base">
              Premium fashion destination with curated womenswear, menswear, and seasonal edits.
            </p>
            <form onSubmit={handleEmailSubmit} className="flex w-full max-w-xl flex-col gap-3 sm:flex-row">
              <label className="sr-only" htmlFor="newsletter-email">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Join the private list"
                className="min-h-12 w-full min-w-0 rounded-full border border-white/10 bg-white/5 px-5 text-sm text-white placeholder:text-white/40 focus:border-white/30 focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
              >
                Subscribe
              </button>
            </form>
            {subscribed && (
              <p className="text-sm text-emerald-300">Thank you. You&apos;re on the list.</p>
            )}
          </div>

          <div className="grid min-w-0 gap-8 sm:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xs uppercase tracking-[0.3em] text-white/50">Shop</h3>
              <ul className="space-y-3">
                {shopLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-sm text-white/80 transition-colors hover:text-white">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-xs uppercase tracking-[0.3em] text-white/50">Account</h3>
              <ul className="space-y-3">
                {accountLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-sm text-white/80 transition-colors hover:text-white">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2025 Overmode</p>
          <p>Luxury fashion, reimagined for a mobile-first experience.</p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
