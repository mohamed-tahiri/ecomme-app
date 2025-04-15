import { Link } from 'react-router-dom';

// InfoCart.tsx
interface InfoCartProps {
    onLogout: () => void;
    setIsOpen: React.Dispatch<boolean>;
}

const InfoCart: React.FC<InfoCartProps> = ({ onLogout, setIsOpen }) => {
    return (
        <div className="text-center">
            <h3 className="font-semibold mb-2 border-b border-[var(--border-color)] pb-4">
                Bienvenue 👋
            </h3>
            <ul className="space-y-4">
                <li>
                    <Link
                        to={'/account/commandes'}
                        onClick={() => {
                            setIsOpen(false);
                        }}
                        className="cursor-pointer"
                    >
                        Mes commandes
                    </Link>
                </li>
                <li>
                    <Link
                        to={'/account/annonces'}
                        onClick={() => {
                            setIsOpen(false);
                        }}
                        className="cursor-pointer"
                    >
                        Mes annonces
                    </Link>
                </li>
                <li className="text-red-500 cursor-pointer" onClick={onLogout}>
                    Déconnexion
                </li>
            </ul>
        </div>
    );
};

export default InfoCart;
