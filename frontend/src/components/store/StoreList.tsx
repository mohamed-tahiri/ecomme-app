import React from 'react';
import { Store } from '../../types/store';
import StoreItemAnnonce from './StoreItem';

interface StoreListProps {
    stores: Store[];
}

const StoreList: React.FC<StoreListProps> = ({ stores }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            {stores.map((store) => (
                <StoreItemAnnonce key={store.id} store={store} />
            ))}
        </div>
    );
};

export default StoreList;
