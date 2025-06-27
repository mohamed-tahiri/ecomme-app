import { useEffect, useState } from 'react';
import { Product } from '../../../types/product';
import api from '../../../services/productsService';
import SpaceProductList from './SpaceProductList';
import { useNavigate } from 'react-router-dom';

interface CollectionCardProps {
    title: string;
    description: string;
    imageUrl: string;
    slug?: string;
    buttonLabel?: string;
}

const CollectionCard: React.FC<CollectionCardProps> = ({
    title,
    description,
    imageUrl,
    slug = 'pc-gamer',
    buttonLabel = 'Voir plus',
}) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const page = 1;
    const limit = 4;

    const fetchProducts = async () => {
        try {
            if (slug) {
                const response = await api.getProductsBySlugCategory(slug, {
                    page,
                    limit,
                });

                setProducts(response.data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (slug) {
            fetchProducts();
        }
    }, [slug, page]);

    const handleClick = () => {
        navigate(`/collections/${slug}`);
    };

    return (
        <div
            className="w-full h-[400px] bg-[#e7ebee] grid grid-cols-3"
            style={{
                backgroundImage: `url("${imageUrl}")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'bottom left',
                backgroundSize: '600px auto',
            }}
        >
            {/* Colonne gauche avec image de fond */}
            <div className="relative p-4 flex flex-col justify-between">
                <div>
                    <h2 className="text-lg md:text-xl font-semibold mb-2">
                        {title}
                    </h2>
                    <p className="text-[.8rem] md:text-[.9rem] mb-4">
                        {description}
                    </p>
                    <button
                        onClick={handleClick}
                        className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
                    >
                        {buttonLabel}
                    </button>
                </div>
            </div>

            {/* Colonne droite */}
            <div className="flex overflow-y-hidden overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 p-2 col-span-2 lg:col-span-2">
                <SpaceProductList products={products} />
            </div>
        </div>
    );
};

export default CollectionCard;
