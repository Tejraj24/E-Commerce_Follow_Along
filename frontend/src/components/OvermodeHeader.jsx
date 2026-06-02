import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo.svg';
import iconsSprite from '../assets/img/icons/icons.svg?url';

const spriteHref = (id) => `${iconsSprite}#${id}`;

const OvermodeHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchGender, setSearchGender] = useState('women');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('lock');
    } else {
      document.body.classList.remove('lock');
    }

    return () => {
      document.body.classList.remove('lock');
    };
  }, [isMenuOpen]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
    setActiveDropdown(null);
  }, []);

  const toggleSearch = useCallback(() => {
    setIsSearchOpen((prev) => !prev);
  }, []);

  const handleSearchSubmit = useCallback((event) => {
    event.preventDefault();

    if (!searchQuery.trim()) {
      return;
    }

    window.location.href = `/search/${searchGender}?q=${encodeURIComponent(searchQuery.trim())}`;
  }, [searchGender, searchQuery]);

  const handleMenuLinkClick = useCallback(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      setActiveDropdown(null);
    }
  }, [isMenuOpen]);

  const handleGenderChange = useCallback((gender) => {
    setSearchGender(gender);
  }, []);

  const handleDropdownEnter = useCallback((menu) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(menu);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  }, []);

  const handleDropdownClick = useCallback((menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  }, [activeDropdown]);

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header__container container">
          <div className="header__body">
            {/* Logo on the left */}
            <div className="header__logo">
              <Link to="/">
                <img src={logo} alt="Logo" />
              </Link>
            </div>
            
            {/* Navigation in the center */}
            <div className={`header__menu menu ${isMenuOpen ? 'active' : ''}`}>
              <nav
                id="site-navigation"
                className={`menu__body ${isMenuOpen ? 'active' : ''}`}
                onClick={handleMenuLinkClick}
              >
                <ul className="menu__list">
                  <li 
                    className="menu__item"
                    onMouseEnter={() => handleDropdownEnter('womenswear')}
                    onMouseLeave={handleDropdownLeave}
                    onClick={() => handleDropdownClick('womenswear')}
                  >
                    <Link to="/c/women" className="menu__link">Womenswear</Link>
                    <span className="menu__arrow">
                      <svg>
                        <use href={spriteHref('arrow2-str')}></use>
                      </svg>
                    </span>
                    <div className={`menu__submenu submenu ${activeDropdown === 'womenswear' ? 'active' : ''}`}>
                      <div className="submenu__container container2">
                        <div className="submenu__body">
                          <div className="submenu__section submenu__section_mob">
                            <Link to="/c/women" className="submenu__title">All apparel</Link>
                          </div>
                          <div className="submenu__section">
                            <Link to="/c/women/clothing" className="submenu__title">Clothing</Link>
                            <span className="submenu__arrow">
                              <svg>
                                <use href={spriteHref('arrow2-str')}></use>
                              </svg>
                            </span>
                            <div className="submenu__wrapper">
                              <ul className="submenu__list">
                                <li className="submenu__item submenu__item_mob">
                                  <Link to="/c/women/clothing" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('clothes2')}></use>
                                    </svg>
                                    All Clothing
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/women/clothing/blazers" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('women-blazers')}></use>
                                    </svg>
                                    Blazers
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/women/clothing/bras" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('women-bras')}></use>
                                    </svg>
                                    Bras
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/women/clothing/coats" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('women-coats')}></use>
                                    </svg>
                                    Coats
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/women/clothing/dresses" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('women-dresses')}></use>
                                    </svg>
                                    Dresses
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/women/clothing/hoodies" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('women-hoodies')}></use>
                                    </svg>
                                    Hoodies
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/women/clothing/jackets" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('women-jackets')}></use>
                                    </svg>
                                    Jackets
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/women/clothing/jeans" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('women-jeans')}></use>
                                    </svg>
                                    Jeans
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/women/clothing/pants" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('women-pants')}></use>
                                    </svg>
                                    Pants
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/women/clothing/shirts" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('women-shirts')}></use>
                                    </svg>
                                    Shirts
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/women/clothing/shorts" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('women-shorts')}></use>
                                    </svg>
                                    Shorts
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/women/clothing/skirts" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('women-skirts')}></use>
                                    </svg>
                                    Skirts
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/women/clothing/sweaters" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('women-sweaters')}></use>
                                    </svg>
                                    Sweaters
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/women/clothing/swimwear" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('women-swimwear')}></use>
                                    </svg>
                                    Swimwear
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/women/clothing/t-shirts" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('women-t-shirts')}></use>
                                    </svg>
                                    T-shirts
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/women/clothing/tops" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('women-tops')}></use>
                                    </svg>
                                    Tops
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/women/clothing/underwear" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('women-underwear')}></use>
                                    </svg>
                                    Underwear
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="submenu__section">
                            <Link to="/c/women/accessories" className="submenu__title">Accessories</Link>
                            <span className="submenu__arrow">
                              <svg>
                                <use href={spriteHref('arrow2-str')}></use>
                              </svg>
                            </span>
                            <div className="submenu__wrapper">
                              <ul className="submenu__list">
                                <li className="submenu__item submenu__item_mob">
                                  <Link to="/c/women/accessories" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('clothes2')}></use>
                                    </svg>
                                    All Accessories
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/women/accessories/belts" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('women-belts')}></use>
                                    </svg>
                                    Belts
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/women/accessories/caps-and-hats" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('women-caps-and-hats')}></use>
                                    </svg>
                                    Caps and hats
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/women/accessories/gloves" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('women-gloves')}></use>
                                    </svg>
                                    Gloves
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/women/accessories/scarves" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('women-scarves')}></use>
                                    </svg>
                                    Scarves
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/women/accessories/sunglasses" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('women-sunglasses')}></use>
                                    </svg>
                                    Sunglasses
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="submenu__section">
                            <Link to="/c/women/footwear" className="submenu__title">Footwear</Link>
                            <span className="submenu__arrow">
                              <svg>
                                <use href={spriteHref('arrow2-str')}></use>
                              </svg>
                            </span>
                            <div className="submenu__wrapper">
                              <ul className="submenu__list">
                                <li className="submenu__item submenu__item_mob">
                                  <Link to="/c/women/footwear" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('clothes2')}></use>
                                    </svg>
                                    All Footwear
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/women/footwear/boots" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('women-boots')}></use>
                                    </svg>
                                    Boots
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/women/footwear/sandals" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('women-sandals')}></use>
                                    </svg>
                                    Sandals
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/women/footwear/shoes" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('women-shoes')}></use>
                                    </svg>
                                    Shoes
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/women/footwear/sneakers" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('women-sneakers')}></use>
                                    </svg>
                                    Sneakers
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="submenu__section">
                            <Link to="/c/women/bags" className="submenu__title">Bags</Link>
                            <span className="submenu__arrow">
                              <svg>
                                <use href={spriteHref('arrow2-str')}></use>
                              </svg>
                            </span>
                            <div className="submenu__wrapper">
                              <ul className="submenu__list">
                                <li className="submenu__item submenu__item_mob">
                                  <Link to="/c/women/bags" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('clothes2')}></use>
                                    </svg>
                                    All Bags
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/women/bags/backpacks" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('women-backpacks')}></use>
                                    </svg>
                                    Backpacks
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/women/bags/bags" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('women-bags')}></use>
                                    </svg>
                                    Bags
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/women/bags/passport-covers" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('women-passport-covers')}></use>
                                    </svg>
                                    Passport covers
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/women/bags/wallets" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('women-wallets')}></use>
                                    </svg>
                                    Wallets
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="submenu__section brands_sale">
                            <Link to="/brands/women" className="submenu__category">
                              <svg>
                                <use href={spriteHref('brands')}></use>
                              </svg>
                              <span>Brands</span>
                            </Link>
                            <Link to="/c/women/sale" className="submenu__category">
                              <svg>
                                <use href={spriteHref('sale')}></use>
                              </svg>
                              <span>Sale</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li 
                    className="menu__item"
                    onMouseEnter={() => handleDropdownEnter('menswear')}
                    onMouseLeave={handleDropdownLeave}
                    onClick={() => handleDropdownClick('menswear')}
                  >
                    <Link to="/c/men" className="menu__link">Menswear</Link>
                    <span className="menu__arrow">
                      <svg>
                        <use href={spriteHref('arrow2-str')}></use>
                      </svg>
                    </span>
                    <div className={`menu__submenu submenu ${activeDropdown === 'menswear' ? 'active' : ''}`}>
                      <div className="submenu__container container2">
                        <div className="submenu__body">
                          <div className="submenu__section submenu__section_mob">
                            <Link to="/c/men" className="submenu__title">All apparel</Link>
                          </div>
                          <div className="submenu__section">
                            <Link to="/c/men/clothing" className="submenu__title">Clothing</Link>
                            <span className="submenu__arrow">
                              <svg>
                                <use href={spriteHref('arrow2-str')}></use>
                              </svg>
                            </span>
                            <div className="submenu__wrapper">
                              <ul className="submenu__list">
                                <li className="submenu__item submenu__item_mob">
                                  <Link to="/c/men/clothing" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('clothes2')}></use>
                                    </svg>
                                    All Clothing
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/men/clothing/coats" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('men-coats')}></use>
                                    </svg>
                                    Coats
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/men/clothing/hoodies" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('men-hoodies')}></use>
                                    </svg>
                                    Hoodies
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/men/clothing/jackets" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('men-jackets')}></use>
                                    </svg>
                                    Jackets
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/men/clothing/jeans" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('men-jeans')}></use>
                                    </svg>
                                    Jeans
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/men/clothing/pants" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('men-pants')}></use>
                                    </svg>
                                    Pants
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/men/clothing/shirts" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('men-shirts')}></use>
                                    </svg>
                                    Shirts
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/men/clothing/shorts" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('men-shorts')}></use>
                                    </svg>
                                    Shorts
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/men/clothing/suits-and-blazers" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('men-suits-and-blazers')}></use>
                                    </svg>
                                    Suits and blazers
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/men/clothing/sweaters" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('men-sweaters')}></use>
                                    </svg>
                                    Sweaters
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/men/clothing/swimwear" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('men-swimwear')}></use>
                                    </svg>
                                    Swimwear
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/men/clothing/t-shirts" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('men-t-shirts')}></use>
                                    </svg>
                                    T-shirts
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/men/clothing/underwear" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('men-underwear')}></use>
                                    </svg>
                                    Underwear
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="submenu__section">
                            <Link to="/c/men/accessories" className="submenu__title">Accessories</Link>
                            <span className="submenu__arrow">
                              <svg>
                                <use href={spriteHref('arrow2-str')}></use>
                              </svg>
                            </span>
                            <div className="submenu__wrapper">
                              <ul className="submenu__list">
                                <li className="submenu__item submenu__item_mob">
                                  <Link to="/c/men/accessories" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('clothes2')}></use>
                                    </svg>
                                    All Accessories
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/men/accessories/belts" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('men-belts')}></use>
                                    </svg>
                                    Belts
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/men/accessories/caps-and-hats" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('men-caps-and-hats')}></use>
                                    </svg>
                                    Caps and hats
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/men/accessories/gloves" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('men-gloves')}></use>
                                    </svg>
                                    Gloves
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/men/accessories/scarves" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('men-scarves')}></use>
                                    </svg>
                                    Scarves
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/men/accessories/sunglasses" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('men-sunglasses')}></use>
                                    </svg>
                                    Sunglasses
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/men/accessories/ties" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('men-ties')}></use>
                                    </svg>
                                    Ties
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="submenu__section">
                            <Link to="/c/men/footwear" className="submenu__title">Footwear</Link>
                            <span className="submenu__arrow">
                              <svg>
                                <use href={spriteHref('arrow2-str')}></use>
                              </svg>
                            </span>
                            <div className="submenu__wrapper">
                              <ul className="submenu__list">
                                <li className="submenu__item submenu__item_mob">
                                  <Link to="/c/men/footwear" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('clothes2')}></use>
                                    </svg>
                                    All Footwear
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/men/footwear/boots" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('men-boots')}></use>
                                    </svg>
                                    Boots
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/men/footwear/sandals" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('men-sandals')}></use>
                                    </svg>
                                    Sandals
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/men/footwear/shoes" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('men-shoes')}></use>
                                    </svg>
                                    Shoes
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/men/footwear/sneakers" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('men-sneakers')}></use>
                                    </svg>
                                    Sneakers
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="submenu__section">
                            <Link to="/c/men/bags" className="submenu__title">Bags</Link>
                            <span className="submenu__arrow">
                              <svg>
                                <use href={spriteHref('arrow2-str')}></use>
                              </svg>
                            </span>
                            <div className="submenu__wrapper">
                              <ul className="submenu__list">
                                <li className="submenu__item submenu__item_mob">
                                  <Link to="/c/men/bags" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('clothes2')}></use>
                                    </svg>
                                    All Bags
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/men/bags/backpacks" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('men-backpacks')}></use>
                                    </svg>
                                    Backpacks
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/men/bags/bags" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('men-bags')}></use>
                                    </svg>
                                    Bags
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/men/bags/passport-covers" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('men-passport-covers')}></use>
                                    </svg>
                                    Passport covers
                                  </Link>
                                </li>
                                <li className="submenu__item">
                                  <Link to="/c/men/bags/wallets" className="submenu__link">
                                    <svg>
                                      <use href={spriteHref('men-wallets')}></use>
                                    </svg>
                                    Wallets
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="submenu__section brands_sale">
                            <Link to="/brands/men" className="submenu__category">
                              <svg>
                                <use href={spriteHref('brands')}></use>
                              </svg>
                              <span>Brands</span>
                            </Link>
                            <Link to="/c/men/sale" className="submenu__category">
                              <svg>
                                <use href={spriteHref('sale')}></use>
                              </svg>
                              <span>Sale</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
            
            {/* Search and icons on the right */}
            <div className="header__options">
              <div className={`header__search search ${isSearchOpen ? 'active' : ''}`}>
                <form
                  id="site-search"
                  className="search__body"
                  method="GET"
                  action={`/search/${searchGender}`}
                  onSubmit={handleSearchSubmit}
                >
                  <div className="search__icon">
                    <svg>
                      <use href={spriteHref('search')}></use>
                    </svg>
                  </div>
                  <div className="search__input">
                    <input
                      type="text"
                      name="q"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                    />
                    <button type="submit" className="search__submit">
                      <svg>
                        <use href={spriteHref('arrow')}></use>
                      </svg>
                    </button>
                  </div>
                  <div className="search__select select-box">
                    <div className="options-container">
                      <div className="option">
                        <input 
                          type="radio" 
                          name="gender" 
                          id="women" 
                          value="women" 
                          checked={searchGender === 'women'}
                          onChange={() => handleGenderChange('women')}
                        />
                        <label htmlFor="women">Women</label>
                      </div>
                      <div className="option">
                        <input 
                          type="radio" 
                          name="gender" 
                          id="men" 
                          value="men"
                          checked={searchGender === 'men'}
                          onChange={() => handleGenderChange('men')}
                        />
                        <label htmlFor="men">Men</label>
                      </div>
                    </div>
                    <div className="selected">
                      {searchGender === 'women' ? 'Women' : 'Men'}
                    </div>
                  </div>
                </form>
                <button type="button" className="search__close" title="Close search" onClick={toggleSearch}>
                  <svg>
                    <use href={spriteHref('close')}></use>
                  </svg>
                </button>
              </div>
              
              <div className="header__icons">
                <Link to="/account/index">
                  <button type="button" className="header__user login-or-account" title="User" data-modal="auth">
                    <svg aria-label="Log in button">
                      <use href={spriteHref('user')}></use>
                    </svg>
                  </button>
                  <span className="sr-only">Log in</span>
                </Link>
                <button
                  type="button"
                  className="header__search-icon"
                  title="Search"
                  onClick={toggleSearch}
                  aria-expanded={isSearchOpen}
                  aria-controls="site-search"
                >
                  <svg>
                    <use href={spriteHref('search')}></use>
                  </svg>
                </button>
                <button
                  type="button"
                  className="header__menu-icon menu-icon"
                  title="Menu"
                  onClick={toggleMenu}
                  aria-expanded={isMenuOpen}
                  aria-controls="site-navigation"
                >
                  <span></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      {isMenuOpen && (
        <button
          type="button"
          className="header__backdrop"
          aria-label="Close menu"
          onClick={toggleMenu}
        />
      )}
      {isSearchOpen && (
        <div className="search-overlay" onClick={toggleSearch}></div>
      )}
    </>
  );
};

export default OvermodeHeader;