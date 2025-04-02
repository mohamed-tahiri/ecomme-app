import { useEffect, useRef, useState } from 'react';
import LoginCart from '../../auth/LoginCart';
import RegisterCart from '../../auth/RegisterCart';
import ForgetPasswordCart from '../../auth/ForgetPasswordCart';

const LoginLink: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeCart, setActiveCart] = useState<
        'login' | 'register' | 'forget'
    >('login');
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    // Ferme le dropdown si l'utilisateur clique en dehors
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative">
            <h2 className="header-element">Connexion / Inscription</h2>

            {/* Bouton cliquable */}
            <div
                className="flex items-center gap-2 cursor-pointer select-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <p>Mon compte</p>
                <div
                    className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                >
                    <svg
                        focusable="false"
                        className="icon icon--arrow-bottom"
                        viewBox="0 0 12 8"
                        role="presentation"
                    >
                        <path
                            stroke="currentColor"
                            strokeWidth="2"
                            d="M10 2L6 6 2 2"
                            fill="none"
                            strokeLinecap="square"
                        />
                    </svg>
                </div>
            </div>

            {/* Menu déroulant */}
            {isOpen && (
                <div
                    ref={dropdownRef}
                    className="absolute mt-2 w-[20rem] bg-white text-[var(--text-color)] shadow-lg rounded p-3 z-50 transition-opacity duration-300 opacity-100"
                >
                    {activeCart === 'login' && (
                        <LoginCart setActiveCart={setActiveCart} />
                    )}
                    {activeCart === 'register' && (
                        <RegisterCart setActiveCart={setActiveCart} />
                    )}
                    {activeCart === 'forget' && (
                        <ForgetPasswordCart setActiveCart={setActiveCart} />
                    )}
                </div>
            )}
        </div>
    );
};

export default LoginLink;
