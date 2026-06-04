import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiUser, FiShoppingBag, FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchGender, setSearchGender] = useState('women');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dropdownTimeoutRef = useRef(null);

  const navLinks = [
    {
      name: 'Womenswear',
      path: '/women',
      hasDropdown: true,
      categories: [
        {
          title: 'Clothing',
          link: '/women/clothing',
          items: [
            { name: 'All Clothing', link: '/women/clothing' },
            { name: 'Blazers', link: '/women/clothing/blazers' },
            { name: 'Bras', link: '/women/clothing/bras' },
            { name: 'Coats', link: '/women/clothing/coats' },
            { name: 'Dresses', link: '/women/clothing/dresses' },
            { name: 'Hoodies', link: '/women/clothing/hoodies' },
            { name: 'Jackets', link: '/women/clothing/jackets' },
            { name: 'Jeans', link: '/women/clothing/jeans' },
            { name: 'Pants', link: '/women/clothing/pants' },
            { name: 'Shirts', link: '/women/clothing/shirts' },
            { name: 'Shorts', link: '/women/clothing/shorts' },
            { name: 'Skirts', link: '/women/clothing/skirts' },
            { name: 'Sweaters', link: '/women/clothing/sweaters' },
            { name: 'Swimwear', link: '/women/clothing/swimwear' },
            { name: 'T-shirts', link: '/women/clothing/t-shirts' },
            { name: 'Tops', link: '/women/clothing/tops' },
            { name: 'Underwear', link: '/women/clothing/underwear' }
          ]
        },
        {
          title: 'Accessories',
          link: '/women/accessories',
          items: [
            { name: 'All Accessories', link: '/women/accessories' },
            { name: 'Belts', link: '/women/accessories/belts' },
            { name: 'Caps and hats', link: '/women/accessories/caps-and-hats' },
            { name: 'Gloves', link: '/women/accessories/gloves' },
            { name: 'Scarves', link: '/women/accessories/scarves' },
            { name: 'Sunglasses', link: '/women/accessories/sunglasses' }
          ]
        },
        {
          title: 'Footwear',
          link: '/women/footwear',
          items: [
            { name: 'All Footwear', link: '/women/footwear' },
            { name: 'Boots', link: '/women/footwear/boots' },
            { name: 'Sandals', link: '/women/footwear/sandals' },
            { name: 'Shoes', link: '/women/footwear/shoes' },
            { name: 'Sneakers', link: '/women/footwear/sneakers' }
          ]
        },
        {
          title: 'Bags',
          link: '/women/bags',
          items: [
            { name: 'All Bags', link: '/women/bags' },
            { name: 'Backpacks', link: '/women/bags/backpacks' },
            { name: 'Bags', link: '/women/bags/bags' },
            { name: 'Passport covers', link: '/women/bags/passport-covers' },
            { name: 'Wallets', link: '/women/bags/wallets' }
          ]
        }
      ]
    },
    {
      name: 'Menswear',
      path: '/men',
      hasDropdown: true,
      categories: [
        {
          title: 'Clothing',
          link: '/men/clothing',
          items: [
            { name: 'All Clothing', link: '/men/clothing' },
            { name: 'Coats', link: '/men/clothing/coats' },
            { name: 'Hoodies', link: '/men/clothing/hoodies' },
            { name: 'Jackets', link: '/men/clothing/jackets' },
            { name: 'Jeans', link: '/men/clothing/jeans' },
            { name: 'Pants', link: '/men/clothing/pants' },
            { name: 'Shirts', link: '/men/clothing/shirts' },
            { name: 'Shorts', link: '/men/clothing/shorts' },
            { name: 'Suits and blazers', link: '/men/clothing/suits-and-blazers' },
            { name: 'Sweaters', link: '/men/clothing/sweaters' },
            { name: 'Swimwear', link: '/men/clothing/swimwear' },
            { name: 'T-shirts', link: '/men/clothing/t-shirts' },
            { name: 'Underwear', link: '/men/clothing/underwear' }
          ]
        },
        {
          title: 'Accessories',
          link: '/men/accessories',
          items: [
            { name: 'All Accessories', link: '/men/accessories' },
            { name: 'Belts', link: '/men/accessories/belts' },
            { name: 'Caps and hats', link: '/men/accessories/caps-and-hats' },
            { name: 'Gloves', link: '/men/accessories/gloves' },
            { name: 'Scarves', link: '/men/accessories/scarves' },
            { name: 'Sunglasses', link: '/men/accessories/sunglasses' },
            { name: 'Ties', link: '/men/accessories/ties' }
          ]
        },
        {
          title: 'Footwear',
          link: '/men/footwear',
          items: [
            { name: 'All Footwear', link: '/men/footwear' },
            { name: 'Boots', link: '/men/footwear/boots' },
            { name: 'Sandals', link: '/men/footwear/sandals' },
            { name: 'Shoes', link: '/men/footwear/shoes' },
            { name: 'Sneakers', link: '/men/footwear/sneakers' }
          ]
        },
        {
          title: 'Bags',
          link: '/men/bags',
          items: [
            { name: 'All Bags', link: '/men/bags' },
            { name: 'Backpacks', link: '/men/bags/backpacks' },
            { name: 'Bags', link: '/men/bags/bags' },
            { name: 'Passport covers', link: '/men/bags/passport-covers' },
            { name: 'Wallets', link: '/men/bags/wallets' }
          ]
        }
      ]
    }
  ];

  const secondaryLinks = [
    { name: 'Our Stores', path: '/stores' },
    { name: 'About', path: '/about' },
  ];

  const handleDropdownMouseEnter = (name) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(name);
  };

  const handleDropdownMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching:', searchQuery, 'Gender:', searchGender);
      // Implement search functionality
    }
  };

  return (
    <motion.div initial={{ y: -10 }} animate={{ y: 0 }} transition={{ duration: 0.35 }} className="sticky top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
          <div className="bg-white w-full max-w-2xl mx-4 p-6 rounded-lg">
            <form onSubmit={handleSearchSubmit} className="flex gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                  autoFocus
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={searchGender}
                  onChange={(e) => setSearchGender(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                >
                  <option value="women">Women</option>
                  <option value="men">Men</option>
                </select>
                <button
                  type="submit"
                  className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
                >
                  Search
                </button>
              </div>
            </form>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FiX size={24} />
            </button>
          </div>
        </div>
      )}

      <div className="relative mx-auto max-w-[2560px] overflow-hidden bg-white px-5 py-3 lg:px-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-1 flex items-center">
            <Link to="/" className="inline-block">
              <span className="text-2xl lux-heading font-extrabold tracking-wide">OVERMODE</span>
            </Link>
          </div>
          
          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex flex-1 justify-center space-x-8">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.hasDropdown && handleDropdownMouseEnter(link.name)}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <Link 
                  to={link.path}
                  className="text-sm font-medium uppercase tracking-wider hover:text-gray-600 flex items-center gap-1"
                >
                  {link.name}
                  {link.hasDropdown && <FiChevronDown size={14} />}
                </Link>
                
                {/* Dropdown Menu */}
                {link.hasDropdown && activeDropdown === link.name && (
                  <div className="absolute top-full left-0 mt-2 w-screen max-w-4xl bg-white shadow-xl border border-gray-200 rounded-lg overflow-hidden">
                    <div className="grid grid-cols-4 gap-8 p-8">
                      {/* All Apparel Link */}
                      <div className="col-span-4">
                        <Link 
                          to={link.path}
                          className="text-sm font-bold uppercase tracking-wider hover:text-gray-600"
                        >
                          All apparel
                        </Link>
                      </div>
                      
                      {/* Categories */}
                      {link.categories.map((category) => (
                        <div key={category.title}>
                          <Link 
                            to={category.link}
                            className="text-sm font-bold uppercase tracking-wider hover:text-gray-600 flex items-center gap-1 mb-4"
                          >
                            {category.title}
                            <FiChevronDown size={12} />
                          </Link>
                          <ul className="space-y-2">
                            {category.items.map((item) => (
                              <li key={item.name}>
                                <Link 
                                  to={item.link}
                                  className="text-sm text-gray-600 hover:text-black"
                                >
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      
                      {/* Brands and Sale */}
                      <div>
                        <div className="space-y-4">
                          <Link 
                            to={`/brands/${link.path.includes('women') ? 'women' : 'men'}`}
                            className="text-sm font-bold uppercase tracking-wider hover:text-gray-600 flex items-center gap-2"
                          >
                            <span>Brands</span>
                          </Link>
                          <Link 
                            to={`${link.path}/sale`}
                            className="text-sm font-bold uppercase tracking-wider hover:text-gray-600 flex items-center gap-2"
                          >
                            <span>Sale</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-4 text-sm">
              {secondaryLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className="hover:underline"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center">
                <form onSubmit={(e) => { e.preventDefault(); setIsSearchOpen(true); }} className="hidden lg:flex items-center w-full max-w-sm">
                  <div className="search__body w-full">
                    <div className="search__icon"><FiSearch size={16} /></div>
                    <div className="search__input">
                      <input placeholder="Search premium styles, brands..." aria-label="Search" className="w-full bg-transparent" />
                    </div>
                  </div>
                </form>
                <button onClick={() => setIsSearchOpen(true)} className="p-2 hover:text-gray-600 lg:hidden">
                  <FiSearch size={20} />
                </button>
              </div>
              <Link to="/account" className="p-2 hover:text-gray-600 hidden lg:block">
                <FiUser size={20} />
              </Link>
              <Link to="/cart" className="p-2 relative hover:text-gray-600">
                <FiShoppingBag size={20} />
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span>
              </Link>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-700 hover:text-gray-900 lg:hidden"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-3 space-y-4">
            {navLinks.map((link) => (
              <div key={`mobile-${link.name}`}>
                <Link 
                  to={link.path}
                  className="block py-2 text-gray-700 hover:bg-gray-100 px-2 rounded font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
                {link.hasDropdown && (
                  <div className="ml-4 mt-2 space-y-2">
                    {link.categories.map((category) => (
                      <div key={category.title}>
                        <Link 
                          to={category.link}
                          className="block py-1 text-sm text-gray-600 hover:text-black"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {category.title}
                        </Link>
                        <div className="ml-4 space-y-1">
                          {category.items.map((item) => (
                            <Link 
                              key={item.name}
                              to={item.link}
                              className="block py-1 text-sm text-gray-500 hover:text-gray-700"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="border-t border-gray-200 my-2"></div>
            {secondaryLinks.map((link) => (
              <Link 
                key={`mobile-secondary-${link.name}`}
                to={link.path}
                className="block py-2 text-gray-700 hover:bg-gray-100 px-2 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="border-t border-gray-200 my-2"></div>
            <Link 
              to="/account"
              className="flex items-center py-2 text-gray-700 hover:bg-gray-100 px-2 rounded"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FiUser className="mr-2" /> My Account
            </Link>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Navbar;
