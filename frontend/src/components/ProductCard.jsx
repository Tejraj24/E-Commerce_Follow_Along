import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import iconsSprite from '../assets/img/icons/icons.svg?url';

const spriteHref = (id) => `${iconsSprite}#${id}`;

const ProductCard = ({ product, onQuickView }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(product);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`prod-card ${isHovered ? 'hovered' : ''} bg-white rounded-lg shadow-sm overflow-hidden`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product._id}`} className="prod-card__link">
        <div className="prod-card__image">
          <img 
            src={(import.meta.env.VITE_API_URL || 'http://localhost:8000') + (product.images?.[0] || '') || 'https://via.placeholder.com/300x300'} 
            alt={product.name}
            className="prod-card__img"
            loading="lazy"
          />
          {product.discount && (
            <span className="prod-card__discount">-{product.discount}%</span>
          )}
          <div className="prod-card__actions">
            <button 
              type="button" 
              className={`prod-card__favorite ${isFavorite ? 'active' : ''}`}
              onClick={handleFavoriteClick}
              data-prod-card-favorite
            >
              <svg>
                <use href={spriteHref('heart')}></use>
              </svg>
            </button>
            <button 
              type="button" 
              className="prod-card__quick-view"
              onClick={handleQuickView}
            >
              <svg>
                <use href={spriteHref('eye')}></use>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="prod-card__content">
          <div className="prod-card__category">{product.category}</div>
          <h3 className="prod-card__title">{product.name}</h3>
          
          <div className="prod-card__rating">
            <div className="prod-card__stars">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  className={`prod-card__star ${i < Math.floor(product.rating || 0) ? 'active' : ''}`}
                >
                  <use href={spriteHref('star')}></use>
                </svg>
              ))}
            </div>
            <span className="prod-card__reviews">({product.reviewCount || 0})</span>
          </div>
          
          <div className="prod-card__price">
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="prod-card__price-old">${product.originalPrice.toFixed(2)}</span>
            )}
            <span className="prod-card__price-current">${(product.price || 0).toFixed(2)}</span>
          </div>
          
          {product.colors && product.colors.length > 0 && (
            <div className="prod-card__colors">
              {product.colors.slice(0, 4).map((color, index) => (
                <span 
                  key={index}
                  className="prod-card__color"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="prod-card__color-more">+{product.colors.length - 4}</span>
              )}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
