import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaPhone,
    FaEnvelope,
} from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#ced4da] text-white py-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Section Contact */}
                    <div>
                        <h2 className="text-lg font-bold mb-3">
                            TECHSPACE MAROC
                        </h2>
                        <p>
                            📍 Casablanca: Magasin 15, BV Zerktouni Rue Agadir
                        </p>
                        <p>📍 Marrakech: Hay Charaf Al Manar 3, MAG RDC 5</p>
                        <p className="flex items-center mt-2">
                            <FaEnvelope className="mr-2 text-blue-400" />
                            techspace.ma@gmail.com
                        </p>
                        <p className="flex items-center">
                            <FaPhone className="mr-2 text-green-400" />
                            Service Client : 0664 578 111
                        </p>
                        <p className="flex items-center">
                            <FaPhone className="mr-2 text-red-400" />
                            Service Réclamation : 0669 881 999
                        </p>
                    </div>

                    {/* Section Informations Légales */}
                    <div>
                        <h2 className="text-lg font-bold mb-3">
                            INFORMATIONS FISCALES
                        </h2>
                        <p>TECHSPACE GROUP SARL AU</p>
                        <p>RC : 122587 - MARRAKECH</p>
                        <p>Taxe professionnelle : 45307423</p>
                        <p>CNSS : 4008035</p>
                        <p>IF : 51721336</p>
                        <p>ICE : 002999298000083</p>
                        <p className="mt-3">
                            📍 Adresse : MAGASIN RDC N°01 IMM 468 HAY CHARAF AL
                            MANAR 3 MARRAKECH
                        </p>
                    </div>

                    {/* Section Liens Rapides */}
                    <div>
                        <h2 className="text-lg font-bold mb-3">
                            Collections Populaires
                        </h2>
                        <ul className="space-y-2">
                            <li>💻 PC Gamer</li>
                            <li>🎮 Consoles</li>
                            <li>🖥️ Écran</li>
                            <li>🛠️ Carte graphique</li>
                            <li>🎧 Nanoleaf</li>
                            <li>🪑 Chaise Gamer</li>
                        </ul>
                        {/* Réseaux Sociaux */}
                        <div className="flex mt-4 space-x-4">
                            <FaFacebook className="text-blue-500 text-2xl cursor-pointer" />
                            <FaInstagram className="text-pink-500 text-2xl cursor-pointer" />
                            <FaLinkedin className="text-blue-400 text-2xl cursor-pointer" />
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center border-t border-gray-700 mt-6 pt-4 text-sm">
                    &copy; {new Date().getFullYear()} Techspace.ma - Tous droits
                    réservés.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
