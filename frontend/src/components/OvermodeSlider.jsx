import { useEffect, useRef } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import Swiper from 'swiper';
import iconsSprite from '../assets/img/icons/icons.svg?url';

const spriteHref = (id) => `${iconsSprite}#${id}`;

const OvermodeSlider = ({ 
  children, 
  className = 'promo-main__slider',
  navigation = {
    prevEl: '.promo-main__prev',
    nextEl: '.promo-main__next',
    disabledClass: 'disabled',
    lockClass: 'lock'
  },
  pagination = {
    type: 'bullets',
    clickable: true,
    el: '.promo-main__pagination',
    bulletClass: 'promo-main__bullet',
    bulletActiveClass: 'promo-main__bullet_active'
  },
  options = {}
}) => {
  const swiperRef = useRef(null);
  const swiperInstance = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      const defaultOptions = {
        modules: [Navigation, Pagination],
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        loop: true,
        grabCursor: true,
        slidesPerView: 1,
        navigation,
        pagination,
        ...options
      };

      swiperInstance.current = new Swiper(swiperRef.current, defaultOptions);
    }

    return () => {
      if (swiperInstance.current) {
        swiperInstance.current.destroy(true, true);
      }
    };
  }, [navigation, pagination, options]);

  return (
    <div className={className} ref={swiperRef}>
      <div className="swiper-wrapper">
        {children}
      </div>
      
      {navigation && (
        <>
          <button type="button" className={navigation.prevEl}>
            <svg>
              <use href={spriteHref('arrow-left')}></use>
            </svg>
          </button>
          <button type="button" className={navigation.nextEl}>
            <svg>
              <use href={spriteHref('arrow-right')}></use>
            </svg>
          </button>
        </>
      )}
      
      {pagination && (
        <div className={pagination.el}></div>
      )}
    </div>
  );
};

export default OvermodeSlider;
