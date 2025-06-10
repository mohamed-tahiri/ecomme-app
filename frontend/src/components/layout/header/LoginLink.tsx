import { useEffect, useRef, useState } from 'react';
import LoginCart from '../../auth/LoginCart';
import RegisterCart from '../../auth/RegisterCart';
import ForgetPasswordCart from '../../auth/ForgetPasswordCart';
import InfoCart from '../../auth/InfoCart';
import { useAuth } from '../../../context/AuthContext';
import { FaRegUser } from 'react-icons/fa6';

const LoginLink: React.FC = () => {
    const { activeCart, user, logout: contextLogout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const handleLogout = async () => {
        try {
            await contextLogout();

            setIsOpen(false);
        } catch (err) {
            console.log(err);
        }
    };

    const handleLoginSuccess = () => {
        setIsOpen(false);
    };

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
            <div className="hidden xl:block">
                <h2 className="header-element">
                    {user ? `Bonjour ${user.name}` : 'Connexion / Inscription'}
                </h2>

                {/* Bouton cliquable */}
                <div
                    className="flex items-center gap-2 cursor-pointer select-none"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <p className="font-semibold">Mon compte</p>
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
            </div>

            <div
                className="block xl:hidden cursor-pointer select-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <FaRegUser size={24} className="text-white" />
            </div>

            {/* Menu déroulant */}
            {isOpen && (
                <div
                    ref={dropdownRef}
                    className="absolute mt-2 w-[20rem] bg-white text-[var(--text-color)] shadow-lg rounded p-3 z-50 transition-opacity duration-300 opacity-100"
                >
                    {activeCart === 'info' && (
                        <InfoCart
                            onLogout={handleLogout}
                            setIsOpen={setIsOpen}
                        />
                    )}
                    {activeCart === 'login' && (
                        <LoginCart onLogin={handleLoginSuccess} />
                    )}
                    {activeCart === 'register' && <RegisterCart />}
                    {activeCart === 'forget' && <ForgetPasswordCart />}
                </div>
            )}
        </div>
    );
};

export default LoginLink;
