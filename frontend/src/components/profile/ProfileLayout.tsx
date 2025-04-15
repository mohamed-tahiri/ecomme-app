import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import RecentlyViewedProducts from '../products/RecentlyViewedProducts';
import { useRecentlyViewed } from '../../hooks/useRecentlyViewed';

const ProfileLayout: React.FC = () => {
    const { recentlyViewed } = useRecentlyViewed();
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

    return (
        <>
            <div className="grid grid-cols-4 gap-8">
                <div className="card">
                    <ul className="space-y-4">
                        <li>
                            <Link
                                to={'/account/commandes'}
                                className="cursor-pointer"
                            >
                                Mes commandes
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={'/account/annonces'}
                                className="cursor-pointer"
                            >
                                Mes annonces
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
                <div className="col-span-3 card">
                    <Outlet />
                </div>
            </div>
            <RecentlyViewedProducts products={recentlyViewed} />
        </>
    );
};

export default ProfileLayout;
