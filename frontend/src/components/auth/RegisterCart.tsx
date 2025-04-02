type RegisterCartProps = {
    setActiveCart: (cart: 'login' | 'register' | 'forget') => void;
};

const RegisterCart: React.FC<RegisterCartProps> = ({ setActiveCart }) => {
    return (
        <div className="space-y-4">
            <div className="flex flex-col items-center">
                <h5 className="card-page-garantie-heading">
                    Création de compte
                </h5>
                <p className="mt-2 text-center px-2">
                    Entrez les informations suivantes :
                </p>
            </div>
            <div className="mb-6 space-y-3">
                <input
                    placeholder="Prenom"
                    type="text"
                    className="w-full border border-gray-300 py-3 px-2"
                />
                <input
                    placeholder="Nom"
                    type="password"
                    className="w-full border border-gray-300 py-3 px-2"
                />
                <input
                    placeholder="Email"
                    type="text"
                    className="w-full border border-gray-300 py-3 px-2"
                />
                <input
                    placeholder="Mot de passe"
                    type="password"
                    className="w-full border border-gray-300 py-3 px-2"
                />
            </div>
            <button className="w-full bg-[var(--primary-button-background)] text-white py-2 rounded">
                Créer mon compte
            </button>
            <div className="text-xs text-center space-y-2">
                <p>
                    Vous avez déjà un compte ?{' '}
                    <span
                        className="text-[var(--secondary-button-background)] cursor-pointer"
                        onClick={() => setActiveCart('login')}
                    >
                        Se connecter
                    </span>
                </p>
            </div>
        </div>
    );
};

export default RegisterCart;
