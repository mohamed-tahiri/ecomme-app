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
                        <div className="flex" key={index}>
                            <li className="mr-4">
                                <span>/</span>
                            </li>
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
