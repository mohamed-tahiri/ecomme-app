// components/CardPreview.tsx
import React from 'react';
import { PaymentCart } from '../../types/paymentCart';

type CardPreviewProps = {
    card: PaymentCart;
};

const CardPreview: React.FC<CardPreviewProps> = ({ card }) => {
    return (
        <div className="relative bg-gradient-to-r from-[#28313B] to-[#485563] text-white rounded-xl p-5 shadow-lg w-full max-w-sm">
            {/* Chip */}
            <div className="absolute top-4 left-4 w-10 h-7 bg-yellow-300 rounded-sm shadow-inner"></div>

            {/* Card number */}
            <div className="text-xl tracking-widest font-mono mt-8 mb-4 select-none">
                {card.cardNumber}
            </div>

            {/* Card info */}
            <div className="flex justify-between text-sm uppercase tracking-wide">
                <div>
                    <p className="text-xs text-gray-300">Nom</p>
                    <p className="font-semibold">{card.cardHolder}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-300">Exp</p>
                    <p className="font-semibold">{card.expiryDate}</p>
                </div>
            </div>

            {/* Card logo */}
            <div className="absolute bottom-4 right-4">
                <div className="flex space-x-1">
                    <div className="w-6 h-6 bg-red-500 rounded-full"></div>
                    <div className="w-6 h-6 bg-yellow-400 rounded-full -ml-2"></div>
                </div>
            </div>
        </div>
    );
};

export default CardPreview;
