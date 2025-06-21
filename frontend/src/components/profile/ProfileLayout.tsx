import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import RecentlyViewedProducts from '../recentlyviewed/RecentlyViewedProducts';
import { FaPlus } from 'react-icons/fa';

const ProfileLayout: React.FC = () => {
    const { logout: contextLogout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await contextLogout();
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };

    const isActive = (path: string) => location.pathname.startsWith(path);

    const activeClass = 'text-[var(--heading-color)] font-semibold';

    return (
        <>
            <div className="grid md:grid-cols-4 gap-8 p-[1.875rem] md:p-0">
                <div className="card">
                    <ul className="space-y-4">
                        <li className="cursor-pointer">
                            <Link
                                to={'/account/commandes'}
                                className={`${isActive('/account/commandes') ? activeClass : ''}`}
                            >
                                Mes commandes
                            </Link>
                        </li>
                        <li className="flex items-center space-x-2 cursor-pointer">
                            <Link
                                to={'/account/annonces'}
                                className={`${isActive('/account/annonces') ? activeClass : ''}`}
                            >
                                Mes annonces
                            </Link>
                            <Link to={'/account/annonces/new'}>
                                <div className="bg-[var(--primary-button-background)] text-white p-1 rounded">
                                    <FaPlus />
                                </div>
                            </Link>
                        </li>
                        <li className="flex items-center space-x-2 cursor-pointer">
                            <Link
                                to={'/account/stores'}
                                className={`${isActive('/account/stores') ? activeClass : ''}`}
                            >
                                Mes stores
                            </Link>
                            <Link to={'/account/stores/new'}>
                                <div className="bg-[var(--primary-button-background)] text-white p-1 rounded">
                                    <FaPlus />
                                </div>
                            </Link>
                        </li>
                        <li
                            className="text-red-500 cursor-pointer"
                            onClick={handleLogout}
                        >
                            Déconnexion
                        </li>
                    </ul>
                </div>
                <div className="md:col-span-3 card">
                    <Outlet />
                </div>
            </div>
            <RecentlyViewedProducts />
        </>
    );
};

export default ProfileLayout;
