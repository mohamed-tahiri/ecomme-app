import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Review } from '../../types/review';
import { getReviewsByProduct } from '../../services/reviewService';
import { FaUserCircle } from 'react-icons/fa';

interface ReviewScoreProps {
    productid: string;
}

const ReviewDetails: React.FC<ReviewScoreProps> = ({ productid }) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const data = await getReviewsByProduct(productid);
                setReviews(data);
            } catch (error) {
                console.error('Erreur lors du chargement des avis :', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [productid]);

    if (loading) {
        return (
            <div className="md:mt-8 md:px-0 px-[1.875rem]">
                <p className="text-gray-500">Chargement des avis...</p>
            </div>
        );
    }

    if (reviews.length === 0) {
        return null;
    }

    return (
        <div className="md:mt-8 md:px-0 px-[1.875rem]">
            <h2 className="card-page-heading">
                {reviews.length} Avis client{reviews.length > 1 ? 's' : ''}
            </h2>

            <div className="card space-y-4 h-[18rem] overflow-y-scroll">
                {reviews.map((review) => (
                    <div
                        key={review.id}
                        className="border-b border-[var(--heading-color)] mb-2 pb-2 last:border-b-0 last:mb-0 last:pb-0"
                    >
                        <div className="flex items-center mb-2 text-sm text-gray-600">
                            <FaUserCircle className="text-xl text-gray-400 mr-2" />
                            <span className="font-medium">
                                {review.user.name}
                            </span>
                            <span className="mx-2">|</span>
                            <span>{review.user.email}</span>
                        </div>

                        <p className="text-gray-800 mb-2">{review.comment}</p>

                        <p className="text-sm text-gray-500">
                            Publié le{' '}
                            {format(new Date(review.createdAt), 'dd MMM yyyy')}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewDetails;
