import { useAppearance } from '../../context/AppearanceContext';

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
    const { settings } = useAppearance();

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

    const getBorderRadius = () => {
        switch (settings.borderRadius) {
            case 'none':
                return 'rounded-none';
            case 'small':
                return 'rounded';
            case 'large':
                return 'rounded-xl';
            default:
                return 'rounded-lg';
        }
    };

    return (
        <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-200">
            <button
                className={`flex items-center space-x-2 cursor-pointer px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed ${getBorderRadius()}`}
                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
            >
                <svg
                    focusable="false"
                    className="w-4 h-4"
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
                <span>Previous</span>
            </button>

            <div className="flex items-center">
                {getPagination().map((item, index) =>
                    item === '...' ? (
                        <span key={index} className="mx-2 text-gray-500">
                            ...
                        </span>
                    ) : (
                        <button
                            key={index}
                            className={`px-3 py-1 mx-1 text-sm font-medium transition-colors ${getBorderRadius()} ${
                                item === currentPage
                                    ? 'text-white'
                                    : 'text-gray-700 hover:text-gray-900'
                            }`}
                            style={{
                                backgroundColor:
                                    item === currentPage
                                        ? settings.primaryColor
                                        : 'transparent',
                                border:
                                    item === currentPage
                                        ? 'none'
                                        : '1px solid #e5e7eb',
                            }}
                            onClick={() => onPageChange(item as number)}
                        >
                            {item}
                        </button>
                    )
                )}
            </div>

            <button
                className={`flex items-center space-x-2 cursor-pointer px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed ${getBorderRadius()}`}
                onClick={() =>
                    onPageChange(Math.min(currentPage + 1, totalPages))
                }
                disabled={currentPage === totalPages}
            >
                <span>Next</span>
                <svg
                    focusable="false"
                    className="w-4 h-4"
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
