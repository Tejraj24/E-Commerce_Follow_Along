import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      console.log('Newsletter subscription:', email);
      setEmail('');
    }
  };

  const footerLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about-us' },
    { name: 'CONTACT', path: '/contact-us' },
    { name: 'SHIPPING POLICY', path: '/shipping-policy' },
    { name: 'REFUND POLICY', path: '/return-policy' },
    { name: 'AD DISCLOSURE', path: '/ad-disclosure' },
    { name: 'TERMS OF USE', path: '/terms-and-conditions' },
    { name: 'PRIVACY POLICY', path: '/privacy-policy' }
  ];

  return (
    <footer className="footer">
      <div className="footer__container container">
        <div className="footer__top" style={{ marginBottom: '40px' }}>
          <Link to="/" className="footer__logo">
            <img 
              src="https://cdn89689517.ahacdn.me/frontend/img/logo_white.svg" 
              alt="Overmode logo" 
              loading="lazy"
            />
          </Link>
        </div>

        <div className="footer__bottom">
          <div className="footer__menu menu-footer">
            <nav className="menu-footer__body">
              <ul className="menu-footer__list">
                {footerLinks.map((link) => (
                  <li key={link.name} className="menu-footer__item">
                    <Link to={link.path} className="menu-footer__link">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <p className="footer__rights">
            © 2025 Overmode
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
