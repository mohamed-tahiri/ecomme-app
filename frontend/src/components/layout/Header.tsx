import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './header/Navbar';
import CartLink from './header/CartLink';
import SearchBar from './header/SearchBar';
import ContactLink from './header/ContactLink';
import LoginLink from './header/LoginLink';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineMenuOpen } from 'react-icons/md';
import NavbarResponsive from './header/NavbarResponsive';

const urgentMessages = [
    "🔥 Promo spéciale aujourd'hui !",
    "🚀 Livraison offerte dès 50€ d'achat !",
    '🎉 Nouveau produit disponible !',
];

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const threshold = 20;

        const handleScroll = () => {
            setIsScrolled(window.scrollY > threshold);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % urgentMessages.length);
        }, 4000); //
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="h-[2.5rem] bg-white text-black flex items-center justify-center">
                <p>{urgentMessages[index]}</p>
            </div>

            {/* Le div devient fixed au scroll, mais header garde son style */}
            <div
                className={`transition-all duration-300 
                ${isScrolled ? 'fixed top-0 left-0 w-full z-40' : 'relative'}`}
            >
                {/* Header garde son background */}
                <header className="flex justify-between items-center bg-[#002fc4] text-[#ffffff] px-[1.875rem] py-2 md:py-4">
                    <div className="flex items-center">
                        {/* Bouton hamburger */}
                        <div
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-3xl focus:outline-none md:hidden mr-2 cursor-pointer"
                        >
                            {isOpen ? <IoMdClose /> : <MdOutlineMenuOpen />}
                        </div>

                        {/* Logo + site link */}
                        <Link to="/" className="text-xl font-bold">
                            SITE.COM
                        </Link>
                    </div>
                    <div className="hidden md:block flex-grow px-8">
                        <SearchBar />
                    </div>
                    <nav>
                        <ul className="flex items-center space-x-4 h-14">
                            <li className="header-title xl:px-[2rem] flex flex-col justify-center h-full">
                                <ContactLink />
                            </li>
                            <li className="header-title xl:px-[2rem] xl:border-l border-gray-300 flex flex-col justify-center h-full">
                                <LoginLink />
                            </li>
                            <li className="header-title xl:px-[2rem] xl:border-l border-gray-300 flex items-center space-x-2 h-full">
                                <CartLink />
                            </li>
                        </ul>
                    </nav>
                </header>
                <div className="hidden md:block">
                    <Navbar />
                </div>
                {isOpen ? (
                    <div className="block md:hidden">
                        <NavbarResponsive setIsOpen={setIsOpen} />
                    </div>
                ) : (
                    <></>
                )}
            </div>

            <div className={isScrolled ? 'pt-[140px]' : ''}>
                {/* Contenu de la page */}
            </div>
        </>
    );
};

export default Header;
