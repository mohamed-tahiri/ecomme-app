import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Routes from './routes';
import { LivraisonProvider } from './context/LivraisonContext';
import { PaiementProvider } from './context/PaiementContext';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <CartProvider>
                <LivraisonProvider>
                    <PaiementProvider>
                        <Routes />
                    </PaiementProvider>
                </LivraisonProvider>
            </CartProvider>
        </AuthProvider>
    );
};

export default App;
