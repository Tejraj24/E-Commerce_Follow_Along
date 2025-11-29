// Utility functions converted from overmode

export const isWebp = () => {
  function testWebp(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  }
  testWebp(function (support) {
    let className = support === true ? 'webp' : 'no-webp';
    document.documentElement.classList.add(className);
  });
};

export const screenType = () => {
  const isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    }
  };

  return {
    isMobile: isMobile.any(),
    isDesktop: !isMobile.any()
  };
};

export const allowOnlyDigits = (event) => {
  if (!/[0-9]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Delete' && event.key !== 'Tab' && event.key !== 'Enter') {
    event.preventDefault();
  }
};

export const emailTest = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const lazyLoading = () => {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
};

export const menuBurger = () => {
  const menuBurger = document.querySelector('.menu__burger');
  const menuBody = document.querySelector('.menu__body');
  
  if (menuBurger && menuBody) {
    menuBurger.addEventListener('click', function() {
      menuBurger.classList.toggle('active');
      menuBody.classList.toggle('active');
      document.body.classList.toggle('lock');
    });
  }
};

export const moveElement = (element, target) => {
  if (element && target) {
    target.appendChild(element);
  }
};

export const replaceProductDivTagWithAnchor = () => {
  const productDivs = document.querySelectorAll('.prod-card');
  
  productDivs.forEach(div => {
    const anchor = document.createElement('a');
    anchor.href = div.dataset.href || '#';
    anchor.className = div.className;
    anchor.innerHTML = div.innerHTML;
    
    // Copy all attributes except data-href
    Array.from(div.attributes).forEach(attr => {
      if (attr.name !== 'data-href') {
        anchor.setAttribute(attr.name, attr.value);
      }
    });
    
    div.parentNode.replaceChild(anchor, div);
  });
};

export const videoPlayer = () => {
  const videos = document.querySelectorAll('video');
  
  videos.forEach(video => {
    video.addEventListener('click', function() {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });
  });
};

export const diagram = () => {
  // Placeholder for diagram functionality
  console.log('Diagram functionality not yet implemented');
};
