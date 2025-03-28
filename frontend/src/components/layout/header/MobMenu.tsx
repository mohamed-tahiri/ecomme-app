import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';

interface SubMenu {
    name: string;
    icon?: React.ElementType;
}

interface MenuItem {
    name: string;
    subMenu?: SubMenu[];
}

interface MobMenuProps {
    Menus: MenuItem[];
}

export default function MobMenu({ Menus }: MobMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [clicked, setClicked] = useState<number | null>(null);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
        setClicked(null);
    };

    const subMenuDrawer = {
        enter: {
            height: 'auto',
            overflow: 'hidden' as const,
        },
        exit: {
            height: 0,
            overflow: 'hidden' as const,
        },
    };

    return (
        <div>
            <button
                className="lg:hidden z-[999] relative"
                onClick={toggleDrawer}
            >
                {isOpen ? <X /> : <Menu />}
            </button>

            <motion.div
                className="fixed left-0 right-0 top-16 overflow-y-auto h-full bg-[#18181A] backdrop-blur text-white p-6 pb-20"
                initial={{ x: '-100%' }}
                animate={{ x: isOpen ? '0%' : '-100%' }}
            >
                <ul>
                    {Menus.map(({ name, subMenu }, i) => {
                        const isClicked = clicked === i;
                        const hasSubMenu = subMenu?.length;
                        return (
                            <li key={name}>
                                <span
                                    className="flex-center-between p-4 hover:bg-white/5 rounded cursor-pointer relative"
                                    onClick={() =>
                                        setClicked(isClicked ? null : i)
                                    }
                                >
                                    {name}
                                    {hasSubMenu && (
                                        <ChevronDown
                                            className={`ml-auto ${isClicked ? 'rotate-180' : ''}`}
                                        />
                                    )}
                                </span>
                                {hasSubMenu && (
                                    <motion.ul
                                        initial="exit"
                                        animate={isClicked ? 'enter' : 'exit'}
                                        variants={subMenuDrawer}
                                        className="ml-5"
                                    >
                                        {subMenu.map(({ name, icon: Icon }) => (
                                            <li
                                                key={name}
                                                className="p-2 flex-center hover:bg-white/5 rounded gap-x-2 cursor-pointer"
                                            >
                                                {Icon && <Icon size={17} />}
                                                {name}
                                            </li>
                                        ))}
                                    </motion.ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </motion.div>
        </div>
    );
}
