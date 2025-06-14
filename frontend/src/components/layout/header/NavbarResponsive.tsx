import { useState, useEffect } from 'react';
import { getCategories } from '../../../services/categoryService';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { RiFacebookFill } from 'react-icons/ri';
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
interface NavbarResponsiveProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavbarResponsive = ({ setIsOpen }: NavbarResponsiveProps) => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                console.error(
                    'Erreur lors du chargement des catégories:',
                    error
                );
            }
        };

        fetchCategories();
    }, []);

    return (
        <nav className="w-full max-h-[calc(100vh-4.5rem)] overflow-y-auto bg-white shadow-md border-t border-b border-[#e1e3e4] px-[1.875rem] py-4">
            <ul className="space-y-4 border-b border-[var(--header-border-color)] mb-4 pb-4">
                {categories.map((category) => {
                    const hasSubMenu =
                        category.subCategories &&
                        category.subCategories.length > 0;

                    return (
                        <li
                            key={category.id}
                            className="flex justify-between items-center"
                        >
                            <Link
                                to={`/collections/${category.slug}`}
                                className="text-[#677279] flex-grow text-[.8rem]"
                                onClick={() => setIsOpen(false)}
                            >
                                {category.name}
                            </Link>

                            {hasSubMenu && (
                                <ChevronRight className="text-gray-400 w-4 h-4" />
                            )}
                        </li>
                    );
                })}
            </ul>
            <div className="space-y-4 border-b border-[var(--header-border-color)] mb-4 pb-4">
                <h3 className="text-[var(--heading-color)]">Besoin d'aide ?</h3>
                <div className="space-y-5">
                    <div className="flex items-center space-x-3">
                        <div className="w-7 h-7">
                            <svg
                                focusable="false"
                                className="icon icon--bi-phone"
                                viewBox="0 0 24 24"
                                role="presentation"
                            >
                                <g
                                    strokeWidth="2"
                                    fill="none"
                                    fillRule="evenodd"
                                    strokeLinecap="square"
                                >
                                    <path
                                        d="M17 15l-3 3-8-8 3-3-5-5-3 3c0 9.941 8.059 18 18 18l3-3-5-5z"
                                        stroke="#002fc4"
                                    ></path>
                                    <path
                                        d="M14 1c4.971 0 9 4.029 9 9m-9-5c2.761 0 5 2.239 5 5"
                                        stroke="#00badb"
                                    ></path>
                                </g>
                            </svg>
                        </div>
                        <h2 className="text-[#677279] flex-grow text-[.8rem]">
                            06XX XXX XXX
                        </h2>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="w-7 h-7">
                            <svg
                                focusable="false"
                                className="icon icon--bi-email"
                                viewBox="0 0 22 22"
                                role="presentation"
                            >
                                <g fill="none" fillRule="evenodd">
                                    <path
                                        stroke="#00badb"
                                        d="M.916667 10.08333367l3.66666667-2.65833334v4.65849997zm20.1666667 0L17.416667 7.42500033v4.65849997z"
                                    ></path>
                                    <path
                                        stroke="#002fc4"
                                        strokeWidth="2"
                                        d="M4.58333367 7.42500033L.916667 10.08333367V21.0833337h20.1666667V10.08333367L17.416667 7.42500033"
                                    ></path>
                                    <path
                                        stroke="#002fc4"
                                        strokeWidth="2"
                                        d="M4.58333367 12.1000003V.916667H17.416667v11.1833333m-16.5-2.01666663L21.0833337 21.0833337m0-11.00000003L11.0000003 15.5833337"
                                    ></path>
                                    <path
                                        d="M8.25000033 5.50000033h5.49999997M8.25000033 9.166667h5.49999997"
                                        stroke="#00badb"
                                        strokeWidth="2"
                                        strokeLinecap="square"
                                    ></path>
                                </g>
                            </svg>
                        </div>
                        <h2 className="text-[#677279] flex-grow text-[.8rem]">
                            site.ma@gmail.com
                        </h2>
                    </div>
                </div>
            </div>
            <div className="space-y-4 border-b border-[var(--header-border-color)] mb-4 pb-4">
                <h3 className="text-[var(--heading-color)]">Suivez-nous</h3>
                <div className="space-y-5">
                    <div className="flex items-center space-x-3">
                        <RiFacebookFill size={24} />
                        <h2 className="text-[#677279] flex-grow text-[.8rem]">
                            Facebook
                        </h2>
                    </div>
                    <div className="flex items-center space-x-3">
                        <FaInstagram size={24} />
                        <h2 className="text-[#677279] flex-grow text-[.8rem]">
                            Instagram
                        </h2>
                    </div>
                    <div className="flex items-center space-x-3">
                        <FaYoutube size={24} />
                        <h2 className="text-[#677279] flex-grow text-[.8rem]">
                            YouTube
                        </h2>
                    </div>
                    <div className="flex items-center space-x-3">
                        <FaTiktok size={24} />
                        <h2 className="text-[#677279] flex-grow text-[.8rem]">
                            TikTok
                        </h2>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavbarResponsive;
