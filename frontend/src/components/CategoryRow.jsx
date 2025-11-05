import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CategoryRow = () => {
  const categories = [
    {
      id: 1,
      title: 'Bestsellers',
      image: 'https://www.allbirds.com/cdn/shop/files/25Q4_Waterproof_Site_Homepage_CategoryRow_Bestsellers_US_Desktop-Mobile_2x3_c979b13f-b473-47c6-a535-dcdcf0473a75.jpg?v=1758837700&width=1024',
      links: [
        { text: 'Shop Men', url: '/collections/mens-bestsellers' },
        { text: 'Shop Women', url: '/collections/womens-bestsellers' }
      ]
    },
    {
      id: 2,
      title: 'Mens',
      image: 'https://www.allbirds.com/cdn/shop/files/25Q4_Waterproof_Site_Homepage_CategoryRow_Waterproof_US_Desktop-Mobile_2x3_Onbody_2x_1cccdf0f-618f-46e5-b281-9c2c009eac43.jpg?v=1759200814&width=1024',
      links: [
        { text: 'Shop Men', url: '/collections/mens' }
      ]
    },
    {
      id: 3,
      title: 'Womens',
      image: 'https://www.allbirds.com/cdn/shop/files/25Q4_Waterproof_Site_Homepage_CategoryRow_Bestsellers_US_Desktop-Mobile_2x3_Onbody_2x_24aa7f18-6255-48ba-8f32-7340aba41512.jpg?v=1759200814&width=1024',
      links: [
        { text: 'Shop Women', url: '/collections/womens' }
      ]
    },
    {
      id: 4,
      title: 'Shop Waterproof',
      image: 'https://www.allbirds.com/cdn/shop/files/25Q4_Waterproof_Site_Homepage_CategoryRow_Waterproof_US_Desktop-Mobile_2x3_699e688d-7253-4b00-b4dd-aee9b76211c4.jpg?v=1758837700&width=1024',
      links: [
        { text: 'Shop Men', url: '/collections/mens-mizzles' },
        { text: 'Shop Women', url: '/collections/womens-mizzles' }
      ]
    }
  ];

  return (
    <section id="category-row" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1.2}
          breakpoints={{
            640: {
              slidesPerView: 1.5,
            },
            768: {
              slidesPerView: 2.5,
            },
            1024: {
              slidesPerView: 3.5,
            },
          }}
          navigation
          pagination={{ clickable: true }}
          className="!overflow-visible"
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <div className="group relative aspect-[0.77] rounded-3xl overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex flex-col items-center justify-center p-4 text-center text-white">
                  <h3 className="text-2xl font-bold mb-4">{category.title}</h3>
                  <div className="flex flex-col space-y-2 w-full max-w-[200px]">
                    {category.links.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        className="bg-white text-black py-2 px-4 rounded-full font-medium hover:bg-gray-100 transition-colors"
                      >
                        {link.text}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CategoryRow;
