import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    return (
        <div className="text-center mt-10">
            <h1 className="text-4xl font-bold">404 - Page non trouvée</h1>
            <p className="text-gray-500 mt-2">
                Désolé, cette page n'existe pas.
            </p>
            <Link to="/" className="text-blue-500 mt-4 inline-block">
                Retour à l'accueil
            </Link>
        </div>
    );
};

export default NotFoundPage;
