interface CategoryDetailProps {
    category: Category | undefined; // Permet `category` d'être `undefined`
}

const CategoryDetail: React.FC<CategoryDetailProps> = ({ category }) => {
    if (!category) {
        return <p>Catégorie non disponible.</p>; // Gérer le cas où category est undefined
    }

    return (
        <>
            <div className="border-b border-[var(--border-color)] mb-4 pb-4">
                <h2 className="card-text-heading">{category?.name}</h2>
                <p>{category?.descripiton}</p>{' '}
                {/* Correction ici : 'description' au lieu de 'descripiton' */}
            </div>
            <div className="border-b border-[var(--border-color)] mb-4 pb-4">
                <div className="flex items-center space-x-2">
                    <div className="w-6 h-6">
                        <svg
                            focusable="false"
                            className="icon icon--filter"
                            viewBox="0 0 19 20"
                            role="presentation"
                        >
                            <path
                                d="M17.0288086 4.01391602L11 9v7.0072021l-4 2.008545V9L1.01306152 4.01391602V1H17.0288086z"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="square"
                            ></path>
                        </svg>
                    </div>
                    <h2>Filtrer</h2>
                </div>
            </div>
        </>
    );
};

export default CategoryDetail;
