import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { AppearanceProvider } from './context/AppearanceContext';
import { SEOSettingsProvider } from './context/SEOSettingsContext';
import Routes from './routes';
import { LivraisonProvider } from './context/LivraisonContext';
import { PaiementProvider } from './context/PaiementContext';

const App: React.FC = () => {
    return (
        <SEOSettingsProvider>
            <AppearanceProvider>
                <AuthProvider>
                    <CartProvider>
                        <LivraisonProvider>
                            <PaiementProvider>
                                <Routes />
                            </PaiementProvider>
                        </LivraisonProvider>
                    </CartProvider>
                </AuthProvider>
            </AppearanceProvider>
        </SEOSettingsProvider>
    );
};

export default App;
