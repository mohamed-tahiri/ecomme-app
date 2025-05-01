import React, { useState } from 'react';

const PaiementInfo: React.FC = () => {
    const [paymentMethod, setPaymentMethod] = useState('cod');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentMethod(event.target.value);
    };

    return (
        <div className="bg-white border border-[#e1e3e4] rounded p-6 space-y-4">
            <h3 className="estimation-heading">Méthode de paiement</h3>

            {/* Options de paiement */}
            <div className="space-y-3">
                <label className="flex items-center gap-3">
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={handleChange}
                    />
                    <span>Paiement par carte</span>
                </label>

                <label className="flex items-center gap-3">
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={handleChange}
                    />
                    <span>Paiement à la livraison (Cash on Delivery)</span>
                </label>
            </div>

            {/* Champs pour carte bancaire */}
            {paymentMethod === 'card' && (
                <div className="space-y-3 border-t pt-4">
                    <div>
                        <label className="block text-sm font-medium">
                            Numéro de carte
                        </label>
                        <input
                            type="text"
                            placeholder="**** **** **** ****"
                            className="input w-full outline-0 border border-[var(--border-color)] p-2"
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium">
                                Date d'expiration
                            </label>
                            <input
                                type="text"
                                placeholder="MM/AA"
                                className="input w-full outline-0 border border-[var(--border-color)] p-2"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium">
                                Code CVV
                            </label>
                            <input
                                type="text"
                                placeholder="123"
                                className="input w-full outline-0 border border-[var(--border-color)] p-2"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">
                            Nom du titulaire
                        </label>
                        <input
                            type="text"
                            placeholder="Nom sur la carte"
                            className="input w-full outline-0 border border-[var(--border-color)] p-2"
                        />
                    </div>
                </div>
            )}

            {/* Message pour Cash on Delivery */}
            {paymentMethod === 'cod' && (
                <p className="text-sm text-gray-600 italic">
                    Vous paierez en espèces à la réception de votre commande.
                </p>
            )}
        </div>
    );
};

export default PaiementInfo;
