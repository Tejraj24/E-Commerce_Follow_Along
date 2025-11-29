// Enhanced Utility Functions for Professional Finishing

// Loading State Management
export const createLoadingState = () => {
  let isLoading = false;
  const listeners = [];
  
  const setLoading = (state) => {
    isLoading = state;
    listeners.forEach(listener => listener(state));
  };
  
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) listeners.splice(index, 1);
    };
  };
  
  return { isLoading, setLoading, subscribe };
};

// Toast Notification System
export class ToastManager {
  constructor() {
    this.container = null;
    this.toasts = [];
    this.init();
  }
  
  init() {
    if (typeof window !== 'undefined') {
      this.container = document.createElement('div');
      this.container.className = 'toast-container';
      this.container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        pointer-events: none;
      `;
      document.body.appendChild(this.container);
    }
  }
  
  show(message, type = 'info', duration = 3000) {
    if (!this.container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toast.style.cssText = `
      margin-bottom: 10px;
      pointer-events: auto;
      transform: translateX(400px);
      transition: transform 0.3s ease;
    `;
    
    this.container.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
      toast.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove
    setTimeout(() => {
      toast.style.transform = 'translateX(400px)';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, duration);
  }
  
  success(message, duration) {
    this.show(message, 'success', duration);
  }
  
  error(message, duration) {
    this.show(message, 'error', duration);
  }
  
  warning(message, duration) {
    this.show(message, 'warning', duration);
  }
  
  info(message, duration) {
    this.show(message, 'info', duration);
  }
}

// Modal Management
export class ModalManager {
  constructor() {
    this.modals = new Map();
    this.activeModal = null;
    this.init();
  }
  
  init() {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.activeModal) {
          this.close(this.activeModal);
        }
      });
    }
  }
  
  create(id, content, options = {}) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = id;
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">${options.title || 'Modal'}</h2>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          ${content}
        </div>
      </div>
    `;
    
    // Event listeners
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.close(id);
      }
    });
    
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close(id));
    }
    
    document.body.appendChild(modal);
    this.modals.set(id, modal);
    
    return modal;
  }
  
  open(id) {
    const modal = this.modals.get(id);
    if (modal) {
      modal.classList.add('active');
      this.activeModal = id;
      document.body.style.overflow = 'hidden';
    }
  }
  
  close(id) {
    const modal = this.modals.get(id);
    if (modal) {
      modal.classList.remove('active');
      if (this.activeModal === id) {
        this.activeModal = null;
        document.body.style.overflow = '';
      }
    }
  }
  
  destroy(id) {
    const modal = this.modals.get(id);
    if (modal) {
      this.close(id);
      modal.remove();
      this.modals.delete(id);
    }
  }
}

// Smooth Scroll Enhancement
export const smoothScroll = (element, options = {}) => {
  const defaultOptions = {
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest'
  };
  
  const finalOptions = { ...defaultOptions, ...options };
  
  if (typeof element === 'string') {
    element = document.querySelector(element);
  }
  
  if (element) {
    element.scrollIntoView(finalOptions);
  }
};

// Intersection Observer for Animations
export const createIntersectionObserver = (callback, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const finalOptions = { ...defaultOptions, ...options };
  
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    return new IntersectionObserver(callback, finalOptions);
  }
  
  return null;
};

// Lazy Loading for Images
export const lazyLoadImages = () => {
  if (typeof window === 'undefined') return;
  
  const imageObserver = createIntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.dataset.src;
        
        if (src) {
          img.src = src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    img.classList.add('lazy');
    imageObserver.observe(img);
  });
};

// Form Validation
export const validateForm = (formElement) => {
  const inputs = formElement.querySelectorAll('input[required], select[required], textarea[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    const value = input.value.trim();
    const errorMsg = input.parentElement.querySelector('.form-error');
    
    if (!value) {
      input.classList.add('error');
      if (errorMsg) errorMsg.textContent = 'This field is required';
      isValid = false;
    } else {
      input.classList.remove('error');
      if (errorMsg) errorMsg.textContent = '';
    }
  });
  
  return isValid;
};

// Local Storage Helper
export const storage = {
  get(key, defaultValue = null) {
    if (typeof window === 'undefined') return defaultValue;
    
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error getting from localStorage:', error);
      return defaultValue;
    }
  },
  
  set(key, value) {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting to localStorage:', error);
    }
  },
  
  remove(key) {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },
  
  clear() {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
};

// Debounce Function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle Function
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Format Currency
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

// Format Date
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  const finalOptions = { ...defaultOptions, ...options };
  
  return new Intl.DateTimeFormat('en-US', finalOptions).format(new Date(date));
};

// Generate Random ID
export const generateId = (prefix = '', length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return prefix + result;
};

// Copy to Clipboard
export const copyToClipboard = async (text) => {
  if (typeof window === 'undefined') return false;
  
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const result = document.execCommand('copy');
      textArea.remove();
      return result;
    }
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    return false;
  }
};

// Check if Element is in Viewport
export const isInViewport = (element) => {
  if (typeof window === 'undefined') return false;
  
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// Get Device Type
export const getDeviceType = () => {
  if (typeof window === 'undefined') return 'unknown';
  
  const width = window.innerWidth;
  
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

// Initialize all utilities
export const initializeUtilities = () => {
  if (typeof window === 'undefined') return;
  
  // Initialize lazy loading
  lazyLoadImages();
  
  // Initialize intersection observers for animations
  const observer = createIntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  });
  
  // Observe elements for animation
  document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
    observer.observe(el);
  });
  
  // Add smooth scroll to anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        smoothScroll(target);
      }
    });
  });
};

// Export default utilities object
export default {
  createLoadingState,
  ToastManager,
  ModalManager,
  smoothScroll,
  createIntersectionObserver,
  lazyLoadImages,
  validateForm,
  storage,
  debounce,
  throttle,
  formatCurrency,
  formatDate,
  generateId,
  copyToClipboard,
  isInViewport,
  getDeviceType,
  initializeUtilities
};
