import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
        <footer className="footer-body-text">
            <div className="bg-[var(--background)] grid grid-cols-4 px-[1.875rem] py-8">
                <div className="flex items-center justify-center">
                    <div className="w-12 h-12">
                        <svg
                            focusable="false"
                            viewBox="0 0 24 22"
                            role="presentation"
                        >
                            <g
                                transform="translate(1 1)"
                                stroke-width="1.5"
                                fill="none"
                                fill-rule="evenodd"
                            >
                                <path
                                    d="M5 10H2M5 15H4"
                                    stroke="#00badb"
                                    stroke-linecap="square"
                                ></path>
                                <path
                                    stroke="#002fc4"
                                    d="M16.829 16H22v-6l-4-2-1-4H9v12h2.171"
                                ></path>
                                <path
                                    d="M0 5h5"
                                    stroke="#00badb"
                                    stroke-linecap="square"
                                ></path>
                                <path
                                    stroke="#002fc4"
                                    stroke-linecap="square"
                                    d="M0 0h9v4"
                                ></path>
                                <circle
                                    stroke="#002fc4"
                                    stroke-linecap="square"
                                    cx="14"
                                    cy="17"
                                    r="3"
                                ></circle>
                                <path
                                    stroke="#002fc4"
                                    stroke-linecap="square"
                                    d="M13 7v2h2"
                                ></path>
                            </g>
                        </svg>
                    </div>
                    <div className="px-4">
                        <h2 className="footer-header-text">
                            Livraison à domicile
                        </h2>
                        <p>Votre commande est preparée et livrée chez vous</p>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <div className="w-12 h-12">
                        <svg
                            focusable="false"
                            viewBox="0 0 24 23"
                            role="presentation"
                        >
                            <g
                                stroke-width="1.5"
                                fill="none"
                                fill-rule="evenodd"
                            >
                                <path
                                    d="M17 1c-2.1 0-3.9 1.1-5 2.7C10.9 2.1 9.1 1 7 1 3.7 1 1 3.7 1 7c0 6 11 15 11 15s11-9 11-15c0-3.3-2.7-6-6-6z"
                                    stroke="#002fc4"
                                    stroke-linecap="square"
                                ></path>
                                <path
                                    d="M16 5c1.65 0 3 1.35 3 3"
                                    stroke="#00badb"
                                    stroke-linecap="round"
                                ></path>
                            </g>
                        </svg>
                    </div>
                    <div className="px-4">
                        <h2 className="footer-header-text">
                            Satisfaction garantie
                        </h2>
                        <p>
                            Toujours là pour que vous soyez satisfait de vos
                            achats
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-center ">
                    <div className="w-12 h-12">
                        <svg
                            focusable="false"
                            viewBox="0 0 24 24"
                            role="presentation"
                        >
                            <g
                                stroke-width="1.5"
                                fill="none"
                                fill-rule="evenodd"
                                stroke-linecap="square"
                            >
                                <path
                                    d="M10 17H4c-1.7 0-3 1.3-3 3v3h12v-3c0-1.7-1.3-3-3-3zM7 14c-1.7 0-3-1.3-3-3v-1c0-1.7 1.3-3 3-3s3 1.3 3 3v1c0 1.7-1.3 3-3 3z"
                                    stroke="#002fc4"
                                ></path>
                                <path
                                    stroke="#00badb"
                                    d="M13 1v10l4-3h6V1z"
                                ></path>
                            </g>
                        </svg>
                    </div>
                    <div className="px-4">
                        <h2 className="footer-header-text">
                            Assistance client
                        </h2>
                        <p>Nous somme à votre disposition toute la semaine</p>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <div className="w-12 h-12">
                        <svg
                            focusable="false"
                            viewBox="0 0 24 24"
                            role="presentation"
                        >
                            <g
                                stroke-width="1.5"
                                fill="none"
                                fill-rule="evenodd"
                                stroke-linecap="square"
                            >
                                <path
                                    d="M1 5h22M1 9h22M9 17H3c-1.105 0-2-.895-2-2V3c0-1.105.895-2 2-2h18c1.105 0 2 .895 2 2v10M5 13h5"
                                    stroke="#002fc4"
                                ></path>
                                <path
                                    stroke="#00badb"
                                    d="M13 16h8v7h-8zM15 16v-2c0-1.1.9-2 2-2s2 .9 2 2v2M17 19v1"
                                ></path>
                            </g>
                        </svg>
                    </div>
                    <div className="px-4">
                        <h2 className="footer-header-text">
                            Paiment sécurisés
                        </h2>
                        <p>
                            Les moyens de paiement proposés sont tous sécurisés
                        </p>
                    </div>
                </div>
            </div>
            <div className="bg-[#e7ebee] px-[1.875rem] py-10">
                <div className="">
                    <div className="grid grid-cols-1 md:grid-cols-4 mb-10">
                        <div className="p-4 space-y-2">
                            <h2 className="footer-header-text">SITE.COM</h2>
                            <p>CITY1: XXX XXX, XXX XXXX XXX XXX</p>
                            <p>CITY2: XXX XXX XXX XXX , XXX XXX XXX</p>
                            <p>SITE.COM@gmail.com</p>
                            <p className="flex items-center">
                                Service Client : XXXX XXX XXX
                            </p>
                            <p className="flex items-center">
                                Service Réclamation : XXXX XXX XXX
                            </p>
                        </div>

                        <div className="p-4 space-y-2">
                            <h2 className="footer-header-text">
                                INFORMATIONS FISCALES
                            </h2>
                            <p>SITE.COM GROUP SARL AU</p>
                            <p>RC : XXXX-XXXX - CITY</p>
                            <p>Taxe professionnelle : XXXX-XXXX-XXXX</p>
                            <p>CNSS : XXXX-XXXX</p>
                            <p>IF : XXXX-XXXX</p>
                            <p>ICE : XXXX-XXXX-XXXX-XXXX</p>
                            <p>
                                Adresse : XXXX-XXXX-XXXX-XXXX
                                XXXX-XXXX-XXXX-XXXX
                            </p>
                        </div>

                        <div className="p-4 space-y-2">
                            <h2 className="footer-header-text">INFORMATIONS</h2>
                            <p>Qui sommes-nous ?</p>
                            <p>Conditions d'utilisation</p>
                            <p>Politique de retour</p>
                            <p>Paiement sécurisé</p>
                            <p>Nos Marques</p>
                            <p>Contact</p>
                            <p>Blog</p>
                        </div>

                        <div className="p-4 space-y-2">
                            <h2 className="footer-header-text">
                                Collections Populaires
                            </h2>
                            <ul className="space-y-2">
                                <li>PC Gamer</li>
                                <li>Consoles</li>
                                <li>Écran</li>
                                <li>Carte graphique</li>
                                <li>Nanoleaf</li>
                                <li>Chaise Gamer</li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-left">
                            &copy; {new Date().getFullYear()} site.com
                        </div>
                        <div>
                            <h2 className="mb-2">Suivez-nous</h2>
                            <div className="flex space-x-2">
                                <FaFacebook className="text-2xl" />
                                <FaInstagram className="text-2xl" />
                                <FaLinkedin className="text-2xl" />
                                <FaLinkedin className="text-2xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
