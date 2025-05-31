const types = [
    {
        title: 'Image & Son',
        text: 'Les meilleures nouveautés de produits audio et vidéo dédiés aux Gamers et Professionnels...',
        img: 'https://techspace.ma/cdn/shop/files/asu-ro-strix-xg32vqr_x800.png?v=1617461542',
    },
    {
        title: 'Multi-tâches sans effort',
        text: 'Choisissez votre ordinateur portable multimédia parmi les gammes phares...',
        img: 'https://techspace.ma/cdn/shop/files/lenovo-ideapad-s145_x800.png?v=1617454897',
    },
    {
        title: 'Offrez-vous le meilleur du son',
        text: 'Destiné aux gamers souhaitant échanger avec leurs coéquipiers...',
        img: 'https://techspace.ma/cdn/shop/files/logitech-g733_x800.png?v=1617466220',
    },
];

const Type = () => {
    return (
        <div className="space-y-6">
            <h2 className="card-page-heading text-2xl font-bold text-gray-800">
                PC GAMER
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {types.map((item, index) => (
                    <div
                        key={index}
                        className="relative bg-[#e7ebee] p-8 h-80 overflow-hidden rounded-lg shadow"
                    >
                        <div className="z-10 relative">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 mb-4">{item.text}</p>
                            <button className="px-6 py-2 bg-[var(--heading-color)] text-white text-sm rounded hover:bg-opacity-90 transition">
                                Voir plus
                            </button>
                        </div>
                        <img
                            src={item.img}
                            alt={item.title}
                            className="absolute bottom-0 right-0 w-64 h-64 object-contain opacity-90 hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Type;
