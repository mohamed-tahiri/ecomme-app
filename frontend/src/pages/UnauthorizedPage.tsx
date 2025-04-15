import { Link } from 'react-router-dom';

const UnauthorizedPage: React.FC = () => {
    return (
        <div className="text-center mt-10">
            <div className="py-9">
                <h3 className="header-body-text">403 - Accès non autorisé</h3>
                <p>
                    Désolé, vous n'avez pas les permissions nécessaires pour
                    accéder à cette page.
                </p>
            </div>
            <Link to="/" className="product-desc-text mt-4 inline-block">
                Retour à l'accueil
            </Link>
        </div>
    );
};

export default UnauthorizedPage;
