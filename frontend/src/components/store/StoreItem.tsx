import { Store } from '../../types/store';

interface StoreItemProps {
    store: Store;
}

const StoreItem: React.FC<StoreItemProps> = ({ store }) => {
    return (
        <div className="p-2">
            <div className="bg-[#f9f9f9] p-2 rounded my-3">
                <h3 className="product-desc-title mb-3">
                    {store.name.slice(0, 30)}
                    {store.name.length > 30 ? '...' : ''}
                </h3>
                <p className="product-desc-text">
                    {store.description.slice(0, 60)}
                    {store.description.length > 60 ? '...' : ''}
                </p>
            </div>
        </div>
    );
};

export default StoreItem;
