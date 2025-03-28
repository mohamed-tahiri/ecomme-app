import { Link, useLocation } from 'react-router-dom';

const Breadcrumb: React.FC = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x); // Split the path into parts

    return (
        <nav aria-label="breadcrumb">
            <ol className="flex space-x-2 text-sm text-gray-700">
                <li>
                    <Link to="/" className="hover:text-blue-500">
                        Home
                    </Link>
                </li>
                {pathnames.map((value, index) => {
                    // Skip rendering the breadcrumb for "collections"
                    if (value === 'collections') return null;

                    const to = `/${pathnames.slice(0, index + 1).join('/')}`; // Construct the link path
                    return (
                        <div
                            className="flex items-center space-x-2"
                            key={index}
                        >
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
                            <li>
                                {index === pathnames.length - 1 ? (
                                    <span>{value}</span> // Display current page as plain text
                                ) : (
                                    <Link
                                        to={to}
                                        className="hover:text-blue-500"
                                    >
                                        {value}
                                    </Link>
                                )}
                            </li>
                        </div>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
