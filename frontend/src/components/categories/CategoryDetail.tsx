interface CategoryDetailProps {
    category: Category | undefined; // Permet `category` d'être `undefined`
}

const CategoryDetail: React.FC<CategoryDetailProps> = ({ category }) => {
    if (!category) {
        return <p>Catégorie non disponible.</p>; // Gérer le cas où category est undefined
    }

    return (
        <div className="border-b border-[var(--border-color)] mb-4">
            <h2 className="card-text-heading">{category?.name}</h2>
            <p>{category?.descripiton}</p>{' '}
            {/* Correction ici : 'description' au lieu de 'descripiton' */}
        </div>
    );
};

export default CategoryDetail;
