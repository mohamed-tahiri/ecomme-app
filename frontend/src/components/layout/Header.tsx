import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="bg-gray-800 text-white py-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">
                    MyShop
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
                            <Link to="/cart" className="hover:text-gray-300">
                                Panier
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
