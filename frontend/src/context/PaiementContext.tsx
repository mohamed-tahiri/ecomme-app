// src/context/PaiementContext.tsx
import React, { createContext, useState } from 'react';
import { PaymentCart } from '../types/paymentCart'; // Importez votre type PaymentCart

interface PaiementContextProps {
    paymentMethod: 'card' | 'cod';
    setPaymentMethod: (method: 'card' | 'cod') => void;
    savedCard: PaymentCart[] | null;
    setSavedCard: (card: PaymentCart[] | null) => void;
}

const PaiementContext = createContext<PaiementContextProps>({
    paymentMethod: 'cod',
    setPaymentMethod: () => {},
    savedCard: null,
    setSavedCard: () => {},
});

export const PaiementProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('cod');
    const [savedCard, setSavedCard] = useState<PaymentCart[] | null>(null);

    return (
        <PaiementContext.Provider
            value={{ paymentMethod, setPaymentMethod, savedCard, setSavedCard }}
        >
            {children}
        </PaiementContext.Provider>
    );
};

export const usePaiement = () => React.useContext(PaiementContext); // Custom hook pour utiliser le contexte

export { PaiementContext };
