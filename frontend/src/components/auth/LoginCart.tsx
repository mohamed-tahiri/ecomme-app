type LoginCartProps = {
    setActiveCart: (cart: 'login' | 'register' | 'forget') => void;
};

const LoginCart: React.FC<LoginCartProps> = ({ setActiveCart }) => {
    return (
        <div className="space-y-4">
            <div className="flex flex-col items-center">
                <h5 className="card-page-garantie-heading">Connexion</h5>
                <p className="mt-2 text-center px-2">
                    Entrez votre email et votre mot de passe :
                </p>
            </div>
            <div className="mb-6 space-y-3">
                <input
                    placeholder="Votre email"
                    type="text"
                    className="w-full border border-gray-300 py-3 px-2"
                />
                <input
                    placeholder="Votre mot de passe"
                    type="password"
                    className="w-full border border-gray-300 py-3 px-2"
                />
            </div>
            <button className="w-full bg-[var(--primary-button-background)] text-white py-2 rounded">
                Se connecter
            </button>
            <div className="text-xs text-center space-y-2">
                <p>
                    Nouveau client ?{' '}
                    <span
                        className="text-[var(--secondary-button-background)] cursor-pointer"
                        onClick={() => setActiveCart('register')}
                    >
                        Créez votre compte
                    </span>
                </p>
                <p>
                    Mot de passe perdu ?{' '}
                    <span
                        className="text-[var(--secondary-button-background)] cursor-pointer"
                        onClick={() => setActiveCart('forget')}
                    >
                        Récupérer mon mot de passe
                    </span>
                </p>
            </div>
        </div>
    );
};

export default LoginCart;
