import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Header: React.FC = () => {
    return (
        <>
            <div className="text-center">Info !</div>
            <header className="px-[1.875rem] py-6 bg-[#002fc4] text-[#ffffff]">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-xl font-bold">
                        SITE.COM
                    </Link>
                    <nav>
                        <ul className="flex space-x-4">
                            <li>
                                <Link to="/" className="hover:text-gray-300">
                                    Accueil
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/products"
                                    className="hover:text-gray-300"
                                >
                                    Produits
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/cart"
                                    className="hover:text-gray-300"
                                >
                                    Panier
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <Navbar />
        </>
    );
};

export default Header;
