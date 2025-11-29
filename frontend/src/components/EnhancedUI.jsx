import React, { useState, useEffect, useRef } from 'react';
import { toast, modal, storage, debounce } from '../utils/enhancedUtils';

// Enhanced Loading Spinner Component
export const LoadingSpinner = ({ size = 'medium', color = '#000000' }) => {
  const sizeMap = {
    small: '20px',
    medium: '40px',
    large: '60px'
  };

  return (
    <div 
      className="loading-spinner"
      style={{
        width: sizeMap[size],
        height: sizeMap[size],
        border: `3px solid ${color}20`,
        borderTop: `3px solid ${color}`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}
    />
  );
};

// Enhanced Skeleton Loader Component
export const SkeletonLoader = ({ type = 'text', lines = 3, height = '16px' }) => {
  if (type === 'image') {
    return (
      <div 
        className="skeleton skeleton-image"
        style={{ height: height }}
      />
    );
  }

  return (
    <div className="skeleton-container">
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="skeleton skeleton-text"
          style={{ 
            height: height,
            width: index === lines - 1 ? '60%' : '100%'
          }}
        />
      ))}
    </div>
  );
};

// Enhanced Button Component
export const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  onClick,
  className = '',
  ...props
}) => {
  const baseStyles = {
    border: 'none',
    borderRadius: '8px',
    fontWeight: '500',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: 'Inter, sans-serif'
  };

  const variants = {
    primary: {
      background: '#000000',
      color: '#ffffff',
      border: '1px solid #000000'
    },
    secondary: {
      background: '#ffffff',
      color: '#000000',
      border: '1px solid #000000'
    },
    outline: {
      background: 'transparent',
      color: '#000000',
      border: '1px solid #000000'
    },
    ghost: {
      background: 'transparent',
      color: '#000000',
      border: 'none'
    }
  };

  const sizes = {
    small: { padding: '8px 16px', fontSize: '14px' },
    medium: { padding: '12px 24px', fontSize: '16px' },
    large: { padding: '16px 32px', fontSize: '18px' }
  };

  const handleClick = (e) => {
    if (!disabled && !loading && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      className={`btn ${className}`}
      style={{
        ...baseStyles,
        ...variants[variant],
        ...sizes[size],
        opacity: disabled ? 0.6 : 1
      }}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <LoadingSpinner size="small" />}
      <span style={{ opacity: loading ? 0 : 1 }}>
        {children}
      </span>
    </button>
  );
};

// Enhanced Card Component
export const Card = ({
  children,
  hover = true,
  shadow = true,
  padding = '20px',
  className = '',
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyles = {
    background: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #f0f0f0',
    padding: padding,
    transition: 'all 0.3s ease',
    cursor: hover ? 'pointer' : 'default',
    transform: isHovered && hover ? 'translateY(-5px)' : 'translateY(0)',
    boxShadow: shadow 
      ? (isHovered && hover ? '0 15px 40px rgba(0,0,0,0.1)' : '0 4px 12px rgba(0,0,0,0.05)')
      : 'none',
    borderColor: isHovered && hover ? '#e9ecef' : '#f0f0f0'
  };

  return (
    <div
      className={`card ${className}`}
      style={cardStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </div>
  );
};

// Enhanced Badge Component
export const Badge = ({
  children,
  variant = 'primary',
  size = 'small',
  className = '',
  ...props
}) => {
  const variants = {
    primary: { background: '#000000', color: '#ffffff' },
    success: { background: '#2ecc71', color: '#ffffff' },
    danger: { background: '#ff4757', color: '#ffffff' },
    warning: { background: '#f39c12', color: '#ffffff' },
    info: { background: '#3498db', color: '#ffffff' }
  };

  const sizes = {
    small: { padding: '4px 8px', fontSize: '11px' },
    medium: { padding: '6px 12px', fontSize: '12px' },
    large: { padding: '8px 16px', fontSize: '14px' }
  };

  return (
    <span
      className={`badge ${className}`}
      style={{
        ...variants[variant],
        ...sizes[size],
        borderRadius: '12px',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        display: 'inline-block',
        fontFamily: 'Inter, sans-serif'
      }}
      {...props}
    >
      {children}
    </span>
  );
};

// Enhanced Alert Component
export const Alert = ({
  children,
  variant = 'info',
  dismissible = false,
  onDismiss,
  className = '',
  ...props
}) => {
  const [visible, setVisible] = useState(true);

  const variants = {
    success: { background: '#d4edda', color: '#155724', borderColor: '#c3e6cb' },
    danger: { background: '#f8d7da', color: '#721c24', borderColor: '#f5c6cb' },
    warning: { background: '#fff3cd', color: '#856404', borderColor: '#ffeaa7' },
    info: { background: '#d1ecf1', color: '#0c5460', borderColor: '#bee5eb' }
  };

  const handleDismiss = () => {
    setVisible(false);
    if (onDismiss) onDismiss();
  };

  if (!visible) return null;

  return (
    <div
      className={`alert ${className}`}
      style={{
        ...variants[variant],
        padding: '16px 20px',
        borderRadius: '8px',
        marginBottom: '20px',
        border: '1px solid',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: 'Inter, sans-serif'
      }}
      {...props}
    >
      <span>{children}</span>
      {dismissible && (
        <button
          onClick={handleDismiss}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            opacity: 0.7,
            padding: '0',
            marginLeft: '10px'
          }}
        >
          &times;
        </button>
      )}
    </div>
  );
};

// Enhanced Modal Component
export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  className = '',
  ...props
}) => {
  const modalRef = useRef(null);

  const sizes = {
    small: { maxWidth: '400px' },
    medium: { maxWidth: '500px' },
    large: { maxWidth: '700px' },
    fullscreen: { maxWidth: '90vw' }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`modal ${isOpen ? 'active' : ''} ${className}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '1000',
        opacity: isOpen ? 1 : 0,
        visibility: isOpen ? 'visible' : 'hidden',
        transition: 'all 0.3s ease'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      {...props}
    >
      <div
        ref={modalRef}
        className="modal-content"
        style={{
          background: '#ffffff',
          borderRadius: '12px',
          padding: '30px',
          width: '90%',
          ...sizes[size],
          transform: isOpen ? 'scale(1)' : 'scale(0.9)',
          transition: 'transform 0.3s ease',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        <div
          className="modal-header"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}
        >
          <h2
            className="modal-title"
            style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#000000',
              margin: 0,
              fontFamily: 'Inter, sans-serif'
            }}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#666666',
              padding: '0',
              transition: 'color 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.color = '#000000'}
            onMouseLeave={(e) => e.target.style.color = '#666666'}
          >
            &times;
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

// Enhanced Input Component
export const Input = ({
  label,
  error,
  helper,
  required,
  className = '',
  ...props
}) => {
  const [focused, setFocused] = useState(false);

  const inputStyles = {
    width: '100%',
    padding: '12px 16px',
    border: `1px solid ${error ? '#ff4757' : focused ? '#000000' : '#e5e5e5'}`,
    borderRadius: '8px',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    boxShadow: focused && !error ? '0 0 0 2px rgba(0,0,0,0.1)' : 'none'
  };

  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label
          className="form-label"
          style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#000000',
            fontFamily: 'Inter, sans-serif'
          }}
        >
          {label} {required && <span style={{ color: '#ff4757' }}>*</span>}
        </label>
      )}
      <input
        style={inputStyles}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      />
      {helper && !error && (
        <div
          className="form-helper"
          style={{
            fontSize: '12px',
            color: '#666666',
            marginTop: '4px',
            fontFamily: 'Inter, sans-serif'
          }}
        >
          {helper}
        </div>
      )}
      {error && (
        <div
          className="form-error"
          style={{
            fontSize: '12px',
            color: '#ff4757',
            marginTop: '4px',
            fontFamily: 'Inter, sans-serif'
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
};

// Enhanced Progress Bar Component
export const ProgressBar = ({
  value = 0,
  max = 100,
  color = '#000000',
  height = '8px',
  animated = true,
  className = '',
  ...props
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div
      className={`progress ${className}`}
      style={{
        width: '100%',
        height: height,
        background: '#f0f0f0',
        borderRadius: '4px',
        overflow: 'hidden',
        ...props
      }}
    >
      <div
        className="progress-bar"
        style={{
          height: '100%',
          background: color,
          borderRadius: '4px',
          width: `${percentage}%`,
          transition: animated ? 'width 0.3s ease' : 'none'
        }}
      />
    </div>
  );
};

// Enhanced Tooltip Component
export const Tooltip = ({
  children,
  text,
  position = 'top',
  className = '',
  ...props
}) => {
  const [visible, setVisible] = useState(false);

  const positions = {
    top: { bottom: '100%', left: '50%', transform: 'translateX(-50%) translateY(-5px)' },
    bottom: { top: '100%', left: '50%', transform: 'translateX(-50%) translateY(5px)' },
    left: { right: '100%', top: '50%', transform: 'translateY(-50%) translateX(-5px)' },
    right: { left: '100%', top: '50%', transform: 'translateY(-50%) translateX(5px)' }
  };

  return (
    <div
      className={`tooltip-container ${className}`}
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      {...props}
    >
      {children}
      {visible && (
        <div
          className="tooltip-content"
          style={{
            position: 'absolute',
            ...positions[position],
            background: '#000000',
            color: '#ffffff',
            padding: '6px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            whiteSpace: 'nowrap',
            zIndex: '1000',
            fontFamily: 'Inter, sans-serif',
            opacity: 0,
            animation: 'fadeInUp 0.3s ease-out forwards'
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default {
  LoadingSpinner,
  SkeletonLoader,
  Button,
  Card,
  Badge,
  Alert,
  Modal,
  Input,
  ProgressBar,
  Tooltip
};
