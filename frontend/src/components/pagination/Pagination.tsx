interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const getPagination = () => {
        const pageNumbers = [];
        const delta = 2;
        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 || // Première page
                i === totalPages || // Dernière page
                (i >= currentPage - delta && i <= currentPage + delta) // Pages proches de la page actuelle
            ) {
                pageNumbers.push(i);
            }
        }

        const paginationWithEllipses = [];
        for (let i = 0; i < pageNumbers.length; i++) {
            paginationWithEllipses.push(pageNumbers[i]);
            if (
                i < pageNumbers.length - 1 &&
                pageNumbers[i + 1] !== pageNumbers[i] + 1
            ) {
                paginationWithEllipses.push('...');
            }
        }

        return paginationWithEllipses;
    };

    return (
        <div className="flex justify-between items-center pt-4 mt-4 border-t border-[var(--border-color)]">
            <button
                className="pagination-button flex items-center space-x-2 cursor-pointer"
                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
            >
                <svg
                    focusable="false"
                    className="icon icon--arrow-left w-2 h-2"
                    viewBox="0 0 8 12"
                    role="presentation"
                >
                    <path
                        stroke="currentColor"
                        strokeWidth="2"
                        d="M6 10L2 6l4-4"
                        fill="none"
                        strokeLinecap="square"
                    ></path>
                </svg>
                <h2 className="m-0">Précédent</h2>
            </button>

            <div className="flex items-center">
                {getPagination().map((item, index) =>
                    item === '...' ? (
                        <span key={index} className="mx-2">
                            ...
                        </span>
                    ) : (
                        <button
                            key={index}
                            className={`px-3 py-1 ${item === currentPage ? 'pagination-button-selected' : 'bg-gray-300'} rounded mx-1`}
                            onClick={() => onPageChange(item as number)}
                        >
                            {item}
                        </button>
                    )
                )}
            </div>

            <button
                className="pagination-button flex items-center space-x-2 cursor-pointer"
                onClick={() =>
                    onPageChange(Math.min(currentPage + 1, totalPages))
                }
                disabled={currentPage === totalPages}
            >
                <h2 className="m-0">Suivant</h2>
                <svg
                    focusable="false"
                    className="pagination-icon icon icon--arrow-right w-2 h-2"
                    viewBox="0 0 8 12"
                    role="presentation"
                >
                    <path
                        stroke="currentColor"
                        strokeWidth="2"
                        d="M2 2l4 4-4 4"
                        fill="none"
                        strokeLinecap="square"
                    ></path>
                </svg>
            </button>
        </div>
    );
};

export default Pagination;
