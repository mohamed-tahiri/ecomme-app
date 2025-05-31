import { useEffect, useState } from 'react';
import { Product } from '../../types/product';
import api from '../../services/productsService';
import SpaceProductList from './SpaceProductList';

const Space = () => {
    const slug = 'pc-gamer';
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [limit] = useState<number>(4);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [priceRange, setPriceRange] = useState<string>('');
    const [totalPages, setTotalPages] = useState<number>(1);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);

        try {
            if (slug) {
                const response = await api.getProductsBySlugCategory(slug, {
                    page,
                    limit,
                    name: searchTerm,
                    price: priceRange,
                });

                setProducts(response.data);
                setTotalPages(response.totalPages);
            }
        } catch (err) {
            console.error(err);
            setError('Erreur lors du chargement des produits');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (slug) {
            fetchProducts();
        }
    }, [slug, page, searchTerm, priceRange]);

    return (
        <div
            className="w-full h-[400px] bg-[#e7ebee] grid grid-cols-3"
            style={{
                backgroundImage:
                    'url("https://techspace.ma/cdn/shop/files/ordispace-collection_1000x.png?v=1617485269")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'bottom left',
                backgroundSize: '600px auto',
            }}
        >
            {/* Colonne gauche avec image de fond */}
            <div className="relative p-4 flex flex-col justify-between">
                <div>
                    <h2 className="text-xl font-bold mb-2">ORDI SPACE</h2>
                    <p className="mb-4">
                        Que vous êtes Architecte, Infographiste, Modeleur ou
                        Gamer, découvrez une large sélection d'ordinateurs
                        choisi par Techspace.ma
                    </p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded">
                        Voir plus
                    </button>
                </div>
            </div>

            {/* Colonne droite */}
            <div className="col-span-2 p-2">
                <SpaceProductList products={products} />
            </div>
        </div>
    );
};

export default Space;
