import { AnnouncementDetails } from '../../../pages/CreateAnnouncementPage';
import { Product } from '../../../types/product';
import { Button } from '../../ui/Button';
import api from '../../../services/productsService';
import { uploadProductImages } from '../../../services/productImageService';
import { useAuth } from '../../../context/AuthContext';

interface Props {
    details: AnnouncementDetails;
    images: File[];
    onSubmit: () => void;
}

export const ReviewStep: React.FC<Props> = ({ details, images, onSubmit }) => {
    const { user } = useAuth();
    const selectedCategory =
        details.subCategory && details.subCategory !== ''
            ? details.subCategory
            : details.category;

    const handleSubmit = async () => {
        try {
            if (!user?.id) return;

            const payload = {
                name: details.title,
                description: details.description,
                price: parseFloat(details.price),
                stock: parseInt(details.stock),
                categoryId: selectedCategory,
                storeId: details.storeId ?? null,
                vendorId: user.id,
            };

            const createdProduct: Product = await api.createProduct(payload);

            console.log('Produit créé :', createdProduct);

            const result: any = await uploadProductImages(
                createdProduct.id,
                images
            );

            console.log(result);

            if (onSubmit) onSubmit();
        } catch (error) {
            console.error("Erreur lors de l'envoi du produit :", error);
            alert("Erreur lors de l'envoi du produit.");
        }
    };

    return (
        <div className="space-y-4">
            <p>
                <strong>Title:</strong> {details.title}
            </p>
            <p>
                <strong>Description:</strong> {details.description}
            </p>
            <p>
                <strong>Price:</strong> {details.price} dhs
            </p>
            <p>
                <strong>Store:</strong> {details.storeId}
            </p>
            <p>
                <strong>Category:</strong> {details.category}
            </p>
            <p>
                <strong>Sous - Category:</strong> {details.subCategory}
            </p>
            <p>
                <strong>Images:</strong>
            </p>
            <Button className="mt-4 w-full" onClick={handleSubmit}>
                Submit
            </Button>
        </div>
    );
};
