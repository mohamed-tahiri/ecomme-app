// src/components/order/PaiementInfo.tsx
import React, { useState, useEffect, useCallback, useContext } from 'react';
import CardPreview from './CardPreview';
import { PaymentCart } from '../../types/paymentCart';
import {
    createPaymentCart,
    getPaymentCartByUser,
} from '../../services/paymentCartService';
import { useAuth } from '../../context/AuthContext';
import { PaiementContext } from '../../context/PaiementContext'; // Import du contexte

interface CardForm {
    cardNumber: string;
    expiry: string;
    cvv: string;
    cardName: string;
}

const initialForm: CardForm = {
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardName: '',
};

const PaiementInfo: React.FC = () => {
    const { auth } = useAuth();
    const userId = auth?.user.id ?? '';

    const [showCardForm, setShowCardForm] = useState(false);
    const [form, setForm] = useState<CardForm>(initialForm);
    const [validationErrors, setValidationErrors] = useState<{
        [key: string]: string;
    }>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { paymentMethod, setPaymentMethod, savedCard, setSavedCard } =
        useContext(PaiementContext); // Utilisation du contexte

    const loadSavedCard = useCallback(async () => {
        if (paymentMethod !== 'card') {
            setSavedCard(null);
            setShowCardForm(false);
            return;
        }

        try {
            const card = await getPaymentCartByUser(userId);
            if (card) {
                setSavedCard(card);
                setShowCardForm(false);
            } else {
                setSavedCard(null);
                setShowCardForm(true);
            }
        } catch {
            setSavedCard(null);
            setShowCardForm(true);
        }
    }, [paymentMethod, userId, setSavedCard, setShowCardForm]);

    useEffect(() => {
        loadSavedCard();
    }, [loadSavedCard]);

    const validateForm = () => {
        const errors: { [key: string]: string } = {};
        const cardNumberNoSpaces = form.cardNumber.replace(/\s+/g, '');

        if (!/^\d{16}$/.test(cardNumberNoSpaces)) {
            errors.cardNumber = 'Numéro de carte invalide (16 chiffres requis)';
        }
        if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(form.expiry)) {
            errors.expiry = "Date d'expiration invalide (format MM/AA)";
        }
        if (!/^\d{3,4}$/.test(form.cvv)) {
            errors.cvv = 'Code CVV invalide';
        }
        if (form.cardName.trim().length < 2) {
            errors.cardName = 'Nom du titulaire trop court';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setError(null);
        try {
            const newCard = await createPaymentCart({
                userId,
                cardNumber: form.cardNumber.replace(/\s+/g, ''),
                expiryDate: form.expiry,
                cvv: form.cvv,
                cardHolder: form.cardName,
            });
            // Update saved cards
            setSavedCard([newCard]);
            setShowCardForm(false);
            setForm(initialForm);
            setValidationErrors({});
        } catch (err) {
            setError("Erreur lors de l'enregistrement de la carte.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white border border-[#e1e3e4] rounded p-6 space-y-6">
            <h3 className="estimation-heading">Méthode de paiement</h3>

            <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                    />
                    <span>Paiement par carte</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                    />
                    <span>Paiement à la livraison (Cash on Delivery)</span>
                </label>
            </div>

            {paymentMethod === 'card' && (
                <div className="space-y-4 border-t pt-4">
                    {savedCard && savedCard.length > 0 && !showCardForm ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {savedCard.map((card) => (
                                    <CardPreview card={card} key={card.id} />
                                ))}
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowCardForm(true)}
                                className="mt-3 text-sm text-blue-600 hover:underline"
                            >
                                Utiliser une autre carte
                            </button>
                        </>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label
                                    htmlFor="cardNumber"
                                    className="block mb-1 text-sm font-medium text-gray-700"
                                >
                                    Numéro de carte
                                </label>
                                <input
                                    id="cardNumber"
                                    name="cardNumber"
                                    type="text"
                                    placeholder="1234 5678 9012 3456"
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                                        validationErrors.cardNumber
                                            ? 'border-red-500 focus:ring-red-500'
                                            : 'border-gray-300 focus:ring-blue-500'
                                    }`}
                                    value={form.cardNumber}
                                    onChange={handleChange}
                                    maxLength={19}
                                    required
                                    inputMode="numeric"
                                    pattern="[0-9\s]*"
                                    autoComplete="cc-number"
                                />
                                {validationErrors.cardNumber && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {validationErrors.cardNumber}
                                    </p>
                                )}
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label
                                        htmlFor="expiry"
                                        className="block mb-1 text-sm font-medium text-gray-700"
                                    >
                                        Date d'expiration (MM/AA)
                                    </label>
                                    <input
                                        id="expiry"
                                        name="expiry"
                                        type="text"
                                        placeholder="MM/AA"
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                                            validationErrors.expiry
                                                ? 'border-red-500 focus:ring-red-500'
                                                : 'border-gray-300 focus:ring-blue-500'
                                        }`}
                                        value={form.expiry}
                                        onChange={handleChange}
                                        maxLength={5}
                                        required
                                        pattern="^(0[1-9]|1[0-2])\/?([0-9]{2})$"
                                        autoComplete="cc-exp"
                                    />
                                    {validationErrors.expiry && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {validationErrors.expiry}
                                        </p>
                                    )}
                                </div>

                                <div className="w-24">
                                    <label
                                        htmlFor="cvv"
                                        className="block mb-1 text-sm font-medium text-gray-700"
                                    >
                                        Code CVV
                                    </label>
                                    <input
                                        id="cvv"
                                        name="cvv"
                                        type="text"
                                        placeholder="123"
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                                            validationErrors.cvv
                                                ? 'border-red-500 focus:ring-red-500'
                                                : 'border-gray-300 focus:ring-blue-500'
                                        }`}
                                        value={form.cvv}
                                        onChange={handleChange}
                                        maxLength={4}
                                        required
                                        inputMode="numeric"
                                        autoComplete="cc-csc"
                                    />
                                    {validationErrors.cvv && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {validationErrors.cvv}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="cardName"
                                    className="block mb-1 text-sm font-medium text-gray-700"
                                >
                                    Nom du titulaire
                                </label>
                                <input
                                    id="cardName"
                                    name="cardName"
                                    type="text"
                                    placeholder="Nom sur la carte"
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                                        validationErrors.cardName
                                            ? 'border-red-500 focus:ring-red-500'
                                            : 'border-gray-300 focus:ring-blue-500'
                                    }`}
                                    value={form.cardName}
                                    onChange={handleChange}
                                    required
                                    minLength={2}
                                    autoComplete="cc-name"
                                />
                                {validationErrors.cardName && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {validationErrors.cardName}
                                    </p>
                                )}
                            </div>

                            {error && <p className="text-red-600">{error}</p>}

                            <button
                                type="submit"
                                disabled={loading}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                            >
                                {loading
                                    ? 'Enregistrement...'
                                    : 'Enregistrer la carte'}
                            </button>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
};

export default PaiementInfo;
