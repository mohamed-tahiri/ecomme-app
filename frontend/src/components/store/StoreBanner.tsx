import React, { useRef, useEffect, useState } from 'react';
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
            if (bottom > maxBottom) {
                maxBottom = bottom;
            }
        });

        setHeight(maxBottom);
    }, []);

    return (
        <div ref={containerRef} style={{ height }} className="relative">
            <div
                data-box
                className="h-64 rounded-xl bg-indigo-500 absolute z-10 top-0 left-0 flex items-center justify-center text-white"
            >
                <img
                    src={store.cover || DEFAULT_COVER}
                    alt="Cover"
                    className="w-full h-64 object-cover"
                />
            </div>
            <div
                data-box
                className="h-auto rounded-xl absolute z-20 top-56 left-0 items-start justify-center grid grid-cols-3 gap-5"
            >
                <div className="col-span-2">
                    <div className=" flex items-center space-x-4">
                        <img
                            src={store.logo || DEFAULT_LOGO}
                            alt="Logo"
                            className="w-16 h-16 rounded-full border-2 border-white object-cover"
                        />
                        <div className="text-white">
                            <h1 className="text-2xl font-bold">{store.name}</h1>
                            {store.description && (
                                <p className="text-sm">{store.description}</p>
                            )}
                        </div>
                    </div>
                    <div className="p-6 bg-white shadow-md mt-8">
                        <h2>Test</h2>
                    </div>
                </div>
                <div className="">
                    <ContactStoreForm />
                </div>
            </div>
        </div>
    );
};

export default StorePage;
