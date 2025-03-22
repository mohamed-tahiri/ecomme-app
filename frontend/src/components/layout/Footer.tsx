import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
        <>
            <div className="bg-[var(--background)] grid grid-cols-4">
                <div>
                    <h2>Livraison à domicile</h2>
                    <p>Votre commande est preparée et livrée chez vous</p>
                </div>
                <div>
                    <h2>Satisfaction garantie</h2>
                    <p>
                        Toujours là pour que vous soyez satisfait de vos achats
                    </p>
                </div>
                <div>
                    <h2>Assistance client</h2>
                    <p>Nous somme à votre disposition toute la semaine</p>
                </div>
                <div>
                    <h2>Paiment sécurisés</h2>
                    <p>Les moyens de paiement proposés sont tous sécurisés</p>
                </div>
            </div>
            <footer className="bg-[#e7ebee] text-[#677279]">
                <div className="">
                    <div className="grid grid-cols-1 md:grid-cols-4">
                        {/* Section Contact */}
                        <div>
                            <h2 className="text-lg font-bold text-[#002fc4]">
                                SITE.COM
                            </h2>
                            <p>
                                Casablanca: Magasin 15, BV Zerktouni Rue Agadir
                            </p>
                            <p>Marrakech: Hay Charaf Al Manar 3, MAG RDC 5</p>
                            <p className="flex items-center ">
                                SITE.COM@gmail.com
                            </p>
                            <p className="flex items-center">
                                Service Client : 0664 578 111
                            </p>
                            <p className="flex items-center">
                                Service Réclamation : 0669 881 999
                            </p>
                        </div>

                        {/* Section Informations Légales */}
                        <div>
                            <h2 className="text-lg font-bold text-[#002fc4]">
                                INFORMATIONS FISCALES
                            </h2>
                            <p>SITE.COM GROUP SARL AU</p>
                            <p>RC : 122587 - MARRAKECH</p>
                            <p>Taxe professionnelle : 45307423</p>
                            <p>CNSS : 4008035</p>
                            <p>IF : 51721336</p>
                            <p>ICE : 002999298000083</p>
                            <p className="-3">
                                Adresse : MAGASIN RDC N°01 IMM 468 HAY CHARAF AL
                                MANAR 3 MARRAKECH
                            </p>
                        </div>

                        {/* Section Informations Légales */}
                        <div>
                            <h2 className="text-lg font-bold text-[#002fc4]">
                                INFORMATIONS
                            </h2>
                            <p>SITE.COM GROUP SARL AU</p>
                            <p>RC : 122587 - MARRAKECH</p>
                            <p>Taxe professionnelle : 45307423</p>
                            <p>CNSS : 4008035</p>
                            <p>IF : 51721336</p>
                            <p>ICE : 002999298000083</p>
                            <p className="-3">
                                Adresse : MAGASIN RDC N°01 IMM 468 HAY CHARAF AL
                                MANAR 3 MARRAKECH
                            </p>
                        </div>

                        {/* Section Liens Rapides */}
                        <div>
                            <h2 className="text-lg font-bold text-[#002fc4]">
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
                            {/* Réseaux Sociaux */}
                            <div className="flex space-x-4">
                                <FaFacebook className="text-2xl cursor-pointer" />
                                <FaInstagram className="text-2xl cursor-pointer" />
                                <FaLinkedin className="text-2xl cursor-pointer" />
                            </div>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="text-left">
                        &copy; {new Date().getFullYear()} site.com
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
