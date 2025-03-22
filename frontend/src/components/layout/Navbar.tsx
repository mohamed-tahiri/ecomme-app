import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../../services/categoryService'; // Assurez-vous que ce service existe pour récupérer les catégories

const Navbar: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [activeCategory, setActiveCategory] = useState<string | null>(null); // Gère la catégorie active

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

    // Gère le survol des catégories
    const handleMouseEnter = (categoryId: string) => {
        setActiveCategory(categoryId);
    };

    const handleMouseLeave = () => {
        setActiveCategory(null);
    };

    return (
        <nav className="bg-[#ffffff] border border-b border-[#e1e3e4] text-[#677279]">
            <ul className="flex space-x-8 p-4">
                {categories.map((category) => (
                    <li
                        key={category.id}
                        className="relative"
                        onMouseEnter={() => handleMouseEnter(category.id)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Link
                            to={`/collections/${category.slug}`}
                            className="text-lg text-gray-800 hover:text-blue-500 transition-all duration-300"
                        >
                            {category.name}
                        </Link>

                        {/* Sous-catégories visibles uniquement si la catégorie est active */}
                        {category.subCategories.length > 0 &&
                            activeCategory === category.id && (
                                <ul className="absolute left-0 mt-2 space-y-2 bg-white text-black shadow-xl rounded-lg p-4 w-48">
                                    {category.subCategories.map(
                                        (subCategory) => (
                                            <li key={subCategory.id}>
                                                <Link
                                                    to={`/collections/${subCategory.slug}`}
                                                    className="block px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-500 rounded-md transition-all duration-300"
                                                >
                                                    {subCategory.name}
                                                </Link>
                                            </li>
                                        )
                                    )}
                                </ul>
                            )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
