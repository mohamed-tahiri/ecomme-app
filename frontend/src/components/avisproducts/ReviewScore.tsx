import React, { useEffect, useState } from 'react';
import { getReviewsByProduct } from '../../services/reviewService';
import { Review } from '../../types/review';

interface ReviewScoreProps {
    productid: string;
}

const ReviewScore: React.FC<ReviewScoreProps> = ({ productid }) => {
    const [averageRating, setAverageRating] = useState<number>(0);
    const [totalReviews, setTotalReviews] = useState<number>(0);

    const fetchReviews = async () => {
        try {
            const reviews: Review[] = await getReviewsByProduct(productid);
            const count = reviews.length;
            const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
            const average = count > 0 ? sum / count : 0;
            setAverageRating(average);
            setTotalReviews(count);
        } catch (err) {
            console.error('Erreur récupération avis:', err);
        }
    };
    useEffect(() => {
        fetchReviews();
    }, [productid]);

    const renderStars = (rating: number) => {
        const filledStars = Math.round(rating);
        const emptyStars = 5 - filledStars;
        return (
            <div className="flex">
                {[...Array(filledStars)].map((_, i) => (
                    <span key={`filled-${i}`} className="text-yellow-500">
                        ★
                    </span>
                ))}
                {[...Array(emptyStars)].map((_, i) => (
                    <span key={`empty-${i}`} className="text-gray-300">
                        ★
                    </span>
                ))}
            </div>
        );
    };

    return (
        <div className="flex items-center space-x-2 my-4">
            {renderStars(averageRating)}
            <p className="text-sm text-gray-600">
                {averageRating.toFixed(1)} / 5 - {totalReviews} avis
            </p>
        </div>
    );
};

export default ReviewScore;
