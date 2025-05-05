import React, { useEffect, useRef, useState } from 'react';
import { Store } from '../../types/store';
import ContactStoreForm from './ContactStoreForm';

const DEFAULT_COVER = 'https://placehold.co/1200x200?text=Image+de+couverture';
const DEFAULT_LOGO = 'https://placehold.co/100?text=Logo';

interface Props {
    store: Store;
}

const StorePage: React.FC<Props> = ({ store }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (!containerRef.current) return;

        const boxes = containerRef.current.querySelectorAll('[data-box]');
        let maxBottom = 0;

        boxes.forEach((box) => {
            const rect = box.getBoundingClientRect();
            const parentTop = containerRef.current!.getBoundingClientRect().top;
            const bottom = rect.bottom - parentTop;
            maxBottom = Math.max(maxBottom, bottom);
        });

        setHeight(maxBottom);
    }, []);

    return (
        <div ref={containerRef} style={{ height }} className="relative mb-4">
            {/* Cover */}
            <div data-box className="absolute top-0 left-0 w-full h-64 z-10">
                <img
                    src={store.cover || DEFAULT_COVER}
                    alt="Couverture"
                    className="w-full h-full object-cover rounded-t-xl"
                />
            </div>

            {/* Store Info & Contact */}
            <div
                data-box
                className="absolute top-56 px-10 left-0 z-20 w-full grid grid-cols-3 gap-5"
            >
                <div className="col-span-2 bg-white rounded-xl p-6 space-y-6">
                    {/* Logo and Name */}
                    <div className="flex items-center space-x-4">
                        <img
                            src={store.logo || DEFAULT_LOGO}
                            alt="Logo"
                            className="w-16 h-16 border-2 border-white object-cover"
                        />
                        <div>
                            <h1 className="text-2xl font-bold">{store.name}</h1>
                            {store.description && (
                                <p className="text-sm">{store.description}</p>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <h2>Groupe Péricaud Automobiles</h2>
                        <h3 className="font-semibold">
                            Vente véhicules multi-marques
                        </h3>
                        <p>
                            Retrouvez nos concessions automobiles Alfa Romeo,
                            Audi, Jaguar, Land Rover, Jeep, Seat, Skoda, Suzuki,
                            Volkswagen, Volkswagen Utilitaires et Rent à Limoges
                            (Zone Nord)... etc.
                        </p>
                    </div>

                    {/* Info */}
                    <div className="text-sm text-gray-700">
                        <p>
                            <strong>SIREN :</strong> 320686454
                        </p>
                        <p>
                            <strong>Adresse :</strong> 1 rue Edouard Goursat,
                            87000 Limoges
                        </p>
                        <p>
                            <strong>Horaires :</strong> Lun-Ven 8h-12h /
                            14h-19h, Sam 9h-12h / 14h-18h30
                        </p>
                        <p>
                            <strong>Statut :</strong> Membre depuis juillet
                            2016, 17 abonnés, dernière activité il y a 20
                            heures.
                        </p>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white rounded-xl p-4">
                    <ContactStoreForm />
                </div>
            </div>
        </div>
    );
};

export default StorePage;
