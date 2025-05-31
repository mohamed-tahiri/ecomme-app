import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const images = [
    'https://techspace.ma/cdn/shop/files/Mini_Console_1800x.jpg?v=1736800852',
    'https://techspace.ma/cdn/shop/files/X68_1800x.jpg?v=1745352014',
    'https://techspace.ma/cdn/shop/files/GIGABYTE_1800x.jpg?v=1745533867',
    'https://techspace.ma/cdn/shop/files/Skilchairs_1800x.jpg?v=1746460432',
    'https://techspace.ma/cdn/shop/files/XTRMLAB_XG2522F_24.5_f0d04476-8a9b-41c7-834f-0d499a4e837f_1800x.jpg?v=1746554244',
    'https://techspace.ma/cdn/shop/files/Razer_1800x.jpg?v=1747666023',
    'https://techspace.ma/cdn/shop/files/Manette_1800x.jpg?v=1747666157',
];

const HomeSlider = () => {
    return (
        <div className="w-full mx-auto">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                loop
                className="overflow-hidden"
            >
                {images.map((img, idx) => (
                    <SwiperSlide key={idx}>
                        <img
                            src={img}
                            alt={`Slide ${idx + 1}`}
                            className="w-[100%] h-[400px]"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HomeSlider;
