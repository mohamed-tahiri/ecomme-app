import React, { useState, useEffect } from 'react';
import { getCategories } from '../../../services/categoryService';
import DesktopMenu from './DesktopMenu';

const Navbar: React.FC = () => {
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
        <nav className="px-[1.875rem] py-2 bg-[#ffffff] header-body-text border border-b border-[#e1e3e4]">
            <ul className="gap-x-1 flex-center">
                {categories.map((category) => (
                    <DesktopMenu key={category.id} menu={category} />
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
