import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface SubMenu {
    name: string;
    slug: string;
    desc?: string;
    icon?: React.ElementType;
}

interface Menu {
    name: string;
    slug: string;
    subCategories?: SubMenu[];
    subMenuHeading?: string[];
    gridCols?: number;
}

interface DesktopMenuProps {
    menu: Menu;
}

export default function DesktopMenu({ menu }: DesktopMenuProps) {
    const [isHovered, setIsHovered] = useState(false);

    const subMenuVariants = {
        enter: {
            opacity: 1,
            rotateX: 0,
            transition: { duration: 0.3 },
            display: 'block' as const,
        },
        exit: {
            opacity: 0,
            rotateX: -10,
            transition: { duration: 0.3 },
            transitionEnd: { display: 'none' as const },
        },
    };

    const validSubCategories = menu.subCategories
        ? menu.subCategories.filter(
              (submenu) => submenu.name && submenu.name !== '0'
          )
        : [];

    const hasSubMenu = validSubCategories.length > 0;

    return (
        <motion.li
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative"
        >
            <span className="flex items-center gap-1 px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-md">
                <Link to={`/collections/${menu.slug}`}>{menu.name}</Link>
                {hasSubMenu && (
                    <ChevronDown className="mt-0.5 transition-transform duration-200" />
                )}
            </span>

            {hasSubMenu && (
                <motion.div
                    className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg p-4"
                    initial="exit"
                    animate={isHovered ? 'enter' : 'exit'}
                    variants={subMenuVariants}
                >
                    <div className="grid gap-4 grid-cols-1 w-72">
                        {menu.subCategories?.map((submenu, i) => (
                            <div key={i} className="cursor-pointer">
                                {menu.gridCols &&
                                    menu.gridCols > 1 &&
                                    menu?.subMenuHeading?.[i] && (
                                        <p className="text-sm mb-2 text-gray-500">
                                            {menu?.subMenuHeading?.[i]}
                                        </p>
                                    )}
                                <div className="flex items-center gap-3 group">
                                    {submenu.icon && (
                                        <div className="bg-gray-100 p-2 rounded-md group-hover:bg-gray-200 transition">
                                            <submenu.icon />
                                        </div>
                                    )}
                                    <Link to={`/collections/${submenu.slug}`}>
                                        <h6 className="font-semibold">
                                            {submenu.name}
                                        </h6>
                                        {submenu.desc && (
                                            <p className="text-sm text-gray-500">
                                                {submenu.desc}
                                            </p>
                                        )}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </motion.li>
    );
}
