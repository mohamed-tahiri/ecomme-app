import { useEffect, useState } from 'react';
import { Product } from '../types/product';

const RECENTLY_VIEWED_KEY = 'recentlyViewed';

export const useRecentlyViewed = () => {
    const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

    useEffect(() => {
        const storedProducts = localStorage.getItem(RECENTLY_VIEWED_KEY);
        if (storedProducts) {
            setRecentlyViewed(JSON.parse(storedProducts));
        }
    }, []);

    const addRecentlyViewed = (product: Product) => {
        setRecentlyViewed((prev) => {
            const updatedList = [
                product,
                ...prev.filter((p) => p.slug !== product.slug),
            ].slice(0, 12);
            localStorage.setItem(
                RECENTLY_VIEWED_KEY,
                JSON.stringify(updatedList)
            );
            return updatedList;
        });
    };

    return { recentlyViewed, addRecentlyViewed };
};
