// src/pages/account/MesStoresPage.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Store } from '../types/store';
import api from '../services/storeService';
import NotFound from '../components/NotFound';
import Pagination from '../components/pagination/Pagination';
import StoreList from '../components/store/StoreList';

const MesStoresPage: React.FC = () => {
    const { user } = useAuth();
    const [stores, setStores] = useState<Store[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [limit] = useState<number>(12);
    const [totalPages, setTotalPages] = useState<number>(1);

    const fetchStores = async () => {
        setLoading(true);
        setError(null);

        try {
            if (user?.id) {
                const response = await api.getStoresByOwner(user.id, {
                    page,
                    limit,
                });

                setStores(response.data);
                setTotalPages(response.totalPages);
            }
        } catch (err) {
            console.error(err);
            setError('Erreur lors du chargement des stores');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStores();
    }, [page]);

    return (
        <div>
            <h2 className="card-text-heading border-b border-[var(--border-color)] pb-2">
                Mes boutiques
            </h2>
            <div className="mt-2">
                {loading ? (
                    <p>Chargement en cours...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : stores.length === 0 ? (
                    <NotFound
                        message="Aucune store"
                        buttonLabel="Créer votre 1ère store"
                        redirectTo="/account/stores/new"
                    />
                ) : (
                    <>
                        <StoreList stores={stores} />
                        {totalPages > 1 && (
                            <Pagination
                                currentPage={page}
                                totalPages={totalPages}
                                onPageChange={setPage}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default MesStoresPage;
