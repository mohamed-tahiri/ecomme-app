import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const ContactLink = () => {
    const [isOpen, setIsOpen] = useState(false);
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
            {/* Titre */}
            <h2 className="header-element">Services Client</h2>

            {/* Bouton pour afficher les contacts */}
            <div
                className="flex items-center gap-2 cursor-pointer select-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <p>06XX XXX XXX / 06XX XXX XXX</p>
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

            {/* Infos de contact avec le triangle */}
            {isOpen && (
                <div
                    ref={dropdownRef}
                    className="absolute mt-2 w-[20rem] bg-white text-[var(--text-color)] shadow-lg rounded p-3 z-50 transition-opacity duration-300 opacity-100 space-y-4 before:absolute before:-top-2 before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-0 before:border-l-8 before:border-r-8 before:border-b-8 before:border-l-transparent before:border-r-transparent before:border-b-white"
                >
                    {/* Triangle en haut */}
                    <div className="flex flex-col items-center">
                        <h5 className="card-page-garantie-heading">
                            Appelez-nous au :
                        </h5>
                        <p>06XX XXX XXX </p>
                        <p>06XX XXX XXX </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h5 className="card-page-garantie-heading">Email :</h5>
                        <p>contact@example.com</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h5 className="card-page-garantie-heading">
                            Horaires :
                        </h5>
                        <p>Lun - Ven, 9h - 18h</p>
                    </div>
                    <div>
                        <Link to={'/contact'}>
                            <button className="font-semibold cursor-pointer w-full text-center flex items-center justify-center bg-[var(--primary-button-background)] text-white py-2 px-4 rounded flex-center">
                                Envoyer un message
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactLink;
