import { Link } from 'react-router-dom';

const NoProductFound = () => {
    return (
        <div className="flex flex-col justify-center items-center p-[4rem] space-y-12">
            <div className="flex flex-col justify-center items-center">
                <div className="relative w-12 h-12">
                    <svg
                        focusable="false"
                        className="icon icon--package w-full h-full"
                        viewBox="0 0 46 46"
                        role="presentation"
                    >
                        <g
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            fillRule="evenodd"
                        >
                            <path d="M11 8l24 14m10-6L25 28 1 14m24 14v16"></path>
                            <path
                                strokeLinecap="square"
                                d="M45 16v14L25 44 1 30V14L21 2z"
                            ></path>
                        </g>
                    </svg>
                    <div className="absolute top-1 -right-2 bg-[var(--secondary-button-background)] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        0
                    </div>
                </div>
                <h3 className="text-[.8rem]">
                    Aucun produit trouvé dans cette catégorie
                </h3>
            </div>
            <div>
                <Link
                    to={'/'}
                    className="bg-[var(--primary-button-background)] text-white px-6 py-4 font-semibold text-[.9rem]"
                >
                    Explorer les produits
                </Link>
            </div>
        </div>
    );
};

export default NoProductFound;
