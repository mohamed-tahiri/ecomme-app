import React, { useEffect, useState } from 'react';
import { getGlobalReviewOverview } from '../../services/reviewService';
import { format } from 'date-fns';
import { Review, ReviewOverview } from '../../types/review';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FaUserCircle } from 'react-icons/fa';

const HomePageReviews: React.FC = () => {
    const [overview, setOverview] = useState<ReviewOverview | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOverview = async () => {
            try {
                const data = await getGlobalReviewOverview();
                console.log(data);
                setOverview(data);
            } catch (err) {
                setError('Erreur lors du chargement des avis.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOverview();
    }, []);

    if (loading) return <p className="p-4">Chargement des avis...</p>;
    if (error) return <p className="p-4 text-red-600">{error}</p>;
    if (!overview) return null;

    return (
        <div className="md:grid md:grid-cols-5 md:gap-3">
            <div className="mb-4 md:mb-0 card text-center space-y-4 border-b border-gray-300 pb-4">
                <div className="border-b border-[var(--header-border-color)] pb-4">
                    <h1 className="text-[1.2rem] font-semibold text-[var(--heading-color)]">
                        Avis des clients
                    </h1>
                </div>
                <div className="text-[.9rem] space-y-5">
                    <h2 className="">
                        <span className="font-semibold">
                            {overview.stats.totalReviews}
                        </span>{' '}
                        avis client{overview.stats.totalReviews > 1 ? 's' : ''}
                    </h2>

                    <p className="">
                        Note moyenne :{' '}
                        <span className="font-semibold">
                            {overview.stats.averageRating} ⭐
                        </span>
                    </p>

                    <p className="flex items-center justify-center space-x-2 ">
                        <FaUserCircle className="text-xl text-gray-400" />
                        <span>
                            <span className="font-semibold">
                                {overview.stats.totalUsers}
                            </span>{' '}
                            client{overview.stats.totalUsers > 1 ? 's' : ''} ont
                            laissé un avis
                        </span>
                    </p>
                </div>
            </div>

            <div className="card col-span-4 px-2">
                {overview.latestReviews.length === 0 ? (
                    <p className="text-gray-500">Aucun avis pour le moment.</p>
                ) : (
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={4}
                        slidesPerView={5}
                        navigation
                        pagination={{ clickable: true }}
                        breakpoints={{
                            1280: { slidesPerView: 4 },
                            768: { slidesPerView: 2 },
                            0: { slidesPerView: 1 },
                        }}
                        className=""
                    >
                        {overview.latestReviews.map((review: Review) => (
                            <SwiperSlide key={review.id} className="mb-10">
                                <div className="p-4 flex flex-col justify-between">
                                    <p className="text-gray-800 italic mb-3">
                                        "{review.comment}"
                                    </p>

                                    <div className="mt-auto pt-3 border-t border-[var(--header-border-color)] flex flex-col space-y-1">
                                        <span className="text-sm font-semibold text-gray-700">
                                            {review.user.name}
                                        </span>
                                        <a
                                            href={`mailto:${review.user.email}`}
                                            className="text-xs text-[var(--heading-color)] hover:underline truncate max-w-full"
                                            title={review.user.email}
                                        >
                                            {review.user.email}
                                        </a>
                                        <span className="text-xs text-gray-500">
                                            {format(
                                                new Date(review.createdAt),
                                                'dd MMM yyyy'
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </div>
    );
};

export default HomePageReviews;
