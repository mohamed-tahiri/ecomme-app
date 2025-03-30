import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    return (
        <div className="text-center mt-10">
            <div className="py-9">
                <h3 className="header-body-text">404 - Page non trouvée</h3>
                <p>Désolé, cette page n'existe pas.</p>
            </div>
            <Link to="/" className="product-desc-text mt-4 inline-block">
                Retour à l'accueil
            </Link>
        </div>
    );
};

export default NotFoundPage;
