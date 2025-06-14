import { User } from './user';

export interface Review {
    id: string;
    userId: string;
    productId: string;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
    user: User;
}

export interface ReviewStats {
    totalReviews: number;
    averageRating: number;
    totalUsers: number;
}

export interface ReviewOverview {
    latestReviews: Review[];
    stats: ReviewStats;
}
