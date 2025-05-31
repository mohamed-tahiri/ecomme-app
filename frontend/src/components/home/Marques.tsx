const brandImages = [
    'https://techspace.ma/cdn/shop/files/nvidia_280x.png?v=1616269533',
    'https://techspace.ma/cdn/shop/files/toshiba_280x.png?v=1616269646',
    'https://techspace.ma/cdn/shop/files/Intel_280x.png?v=1616269702',
    'https://techspace.ma/cdn/shop/files/msi_280x.png?v=1616269784',
    'https://techspace.ma/cdn/shop/files/microsoft_280x.png?v=1616269810',
    'https://techspace.ma/cdn/shop/files/samsung_280x.png?v=1616269849',
];

const Marques = () => {
    return (
        <div className="space-y-4">
            <h2 className="card-page-heading">Nos Marques</h2>
            <div className="flex overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300">
                {brandImages.map((src, idx) => (
                    <div
                        key={idx}
                        className="min-w-[120px] flex items-center justify-center bg-white border border-[var(--border-color)] p-4 shadow-sm"
                    >
                        <img
                            src={src}
                            alt={`Marque ${idx + 1}`}
                            className="h-16 object-contain"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Marques;
