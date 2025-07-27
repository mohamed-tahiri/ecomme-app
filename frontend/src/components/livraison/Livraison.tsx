import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const questions = [
    {
        question: 'Dans quelles villes faites-vous la livraison ?',
        answer: 'Nous livrons partout au Maroc (Casa, Marrakech, Casablanca, Rabat, Sale, Fès, Tanger, Tétouan, Beni Mellal, Tiznit, Kénitra, Nador, Oujda, Dakhla, Agadir, El-Jadida, Essaouira, Safi, Tanger…) via Sapres.',
    },
    {
        question: "Quel est le délai de l'expédition de la commande ?",
        answer: 'Après validation de votre commande, elle est tout de suite prise en charge par notre équipe. Ensuite, votre commande sera expédiée soit le jour même, soit le lendemain.',
    },
    {
        question: "Combien s'élèvent les frais de livraison ?",
        answer: 'Les frais de livraison sont gratuits pour toute commande dont le montant total dépasse 1500 dirhams.\nLes frais de livraison sont à partir de 35 dirhams selon le montant total de votre commande.',
    },
    {
        question: 'Je souhaite retourner un article, que dois-je faire ?',
        answer: 'Nous vous invitons à consulter la page sur les retours et remboursements ou à contacter notre service client.',
    },
];

const Livraison = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleIndex = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="card">
            <h2 className="card-page-heading">Livraison et Retours</h2>
            <ul className="pt-8 space-y-6 text-[.8rem]">
                {questions.map((item, index) => (
                    <li key={index}>
                        <div
                            onClick={() => toggleIndex(index)}
                            className="flex items-center justify-between cursor-pointer"
                        >
                            <h5 className="font-semibold">{item.question}</h5>
                            <span className="ml-4">
                                {openIndex === index ? (
                                    <FaChevronUp className="text-xs" />
                                ) : (
                                    <FaChevronDown className="text-xs" />
                                )}
                            </span>
                        </div>
                        {openIndex === index && (
                            <p className="mt-2 whitespace-pre-line">
                                {item.answer}
                            </p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Livraison;
