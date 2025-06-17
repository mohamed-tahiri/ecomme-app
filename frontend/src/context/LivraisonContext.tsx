// src/context/LivraisonContext.tsx
import React, { createContext, useState } from 'react';
import { Address } from '../types/address'; // Importez votre type Address

interface LivraisonContextProps {
    selectedAddress: Address | null;
    setSelectedAddress: (address: Address | null) => void;
}

const LivraisonContext = createContext<LivraisonContextProps>({
    selectedAddress: null,
    setSelectedAddress: () => {},
});

export const LivraisonProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(
        null
    );

    return (
        <LivraisonContext.Provider
            value={{ selectedAddress, setSelectedAddress }}
        >
            {children}
        </LivraisonContext.Provider>
    );
};

export const useLivraison = () => React.useContext(LivraisonContext); // Custom hook pour utiliser le contexte

export { LivraisonContext };
