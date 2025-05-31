import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';

const collections = [
    {
        title: 'Pc gamer',
        image: 'https://techspace.ma/cdn/shop/files/pc-gamer_500x.jpg?v=1617209079',
    },
    {
        title: 'Processeur',
        image: 'https://techspace.ma/cdn/shop/files/processeur_500x.jpg?v=1617204006',
    },
    {
        title: 'Ecran pc',
        image: 'https://techspace.ma/cdn/shop/files/asusrog-monitor_500x.jpg?v=1617203164',
    },
    {
        title: 'Carte mère',
        image: 'https://techspace.ma/cdn/shop/files/cartemere_500x.jpg?v=1617204593',
    },
    {
        title: 'Carte Graphique',
        image: 'https://techspace.ma/cdn/shop/files/carte-graphique_500x.jpg?v=1617209111',
    },
    {
        title: 'PC Portable',
        image: 'https://techspace.ma/cdn/shop/files/pc-portable_500x.jpg?v=1617208024',
    },
    {
        title: 'PC PRO',
        image: 'https://techspace.ma/cdn/shop/files/pc-pro_500x.jpg?v=1617208056',
    },
    {
        title: 'Clavier',
        image: 'https://techspace.ma/cdn/shop/files/clavier_500x.jpg?v=1617206406',
    },
    {
        title: 'Souris',
        image: 'https://techspace.ma/cdn/shop/files/souris_500x.jpg?v=1617210807',
    },
    {
        title: 'Enceinte PC',
        image: 'https://techspace.ma/cdn/shop/files/encente-pc_500x.jpg?v=1617210577',
    },
    {
        title: 'Chaise Gamer',
        image: 'https://techspace.ma/cdn/shop/files/chaise-gamer_500x.jpg?v=1617212933',
    },
];

const PopularCollection = () => {
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const swiperRef = useRef<any>(null);

    const prevRef = useRef<HTMLButtonElement | null>(null);
    const nextRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        const swiper = swiperRef.current;
        if (
            swiper &&
            typeof swiper.params.navigation === 'object' &&
            prevRef.current &&
            nextRef.current
        ) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
        }
    }, []);

    const updateNavState = () => {
        const swiper = swiperRef.current;
        if (swiper) {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="card-page-heading">Collections Populaires</h2>

            <div className="relative group">
                {/* Swiper */}
                <Swiper
                    modules={[Navigation]}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                        updateNavState();
                    }}
                    onSlideChange={updateNavState}
                    slidesPerView={6}
                    spaceBetween={20}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    breakpoints={{
                        0: { slidesPerView: 2 },
                        640: { slidesPerView: 3 },
                        1024: { slidesPerView: 6 },
                    }}
                >
                    {collections.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="text-center">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-48 w-48 rounded-full object-cover shadow hover:scale-105 transition-transform"
                                />
                                <p className="mt-2 text-sm font-medium text-[var(--heading-color)]">
                                    {item.title}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Left Button */}
                <button
                    ref={prevRef}
                    className={`absolute top-1/2 -translate-y-1/2 left-0 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-[var(--footer-body-text-color)] text-white transition-opacity ${
                        isBeginning
                            ? 'opacity-30 pointer-events-none'
                            : 'opacity-100'
                    }`}
                >
                    <FaAngleLeft className="text-xs" />
                </button>

                {/* Right Button */}
                <button
                    ref={nextRef}
                    className={`absolute top-1/2 -translate-y-1/2 right-0 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-[var(--footer-body-text-color)] text-white transition-opacity ${
                        isEnd ? 'opacity-30 pointer-events-none' : 'opacity-100'
                    }`}
                >
                    <FaAngleRight className="text-xs" />
                </button>
            </div>
        </div>
    );
};

export default PopularCollection;
