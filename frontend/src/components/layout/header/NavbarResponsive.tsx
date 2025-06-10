import { useState, useEffect } from 'react';
import { getCategories } from '../../../services/categoryService';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
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
        <nav className="absolute top-[4.5rem] left-0 z-50 h-[100vh] w-full bg-white shadow-md border-t border-b border-[#e1e3e4] px-[1.875rem] py-4">
            <ul className="space-y-4">
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
                                className="text-[#677279] flex-grow"
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
        </nav>
    );
};

export default NavbarResponsive;
