const Garantie = () => {
    return (
        <div>
            <h2 className="card-page-heading">Nos garanties</h2>
            <div className="grid grid-cols-3 divide-x divide-[#e1e3e4] border border-[#e1e3e4] rounded">
                <div className="flex flex-col items-center p-4 space-y-3">
                    <div className="w-8 h-8">
                        <svg
                            focusable="false"
                            viewBox="0 0 24 23"
                            role="presentation"
                        >
                            <g
                                strokeWidth="1.5"
                                fill="none"
                                fillRule="evenodd"
                                strokeLinecap="square"
                            >
                                <path
                                    stroke="#00badb"
                                    d="M23 5v13h-4v4l-6-4h-1"
                                ></path>
                                <path
                                    stroke="#002fc4"
                                    d="M19 1H1v13h4v5l7-5h7z"
                                ></path>
                            </g>
                        </svg>
                    </div>
                    <h3 className="card-page-garantie-heading">
                        Assistance 7j/7
                    </h3>
                    <p className="footer-body-text text-center">
                        Disponible quand vous avez besoin de nous, par chat,
                        email ou téléphone
                    </p>
                </div>
                <div className="flex flex-col items-center p-4 space-y-3 border-l border-[#e1e3e4]">
                    <div className="w-8 h-8">
                        <svg
                            focusable="false"
                            viewBox="0 0 24 22"
                            role="presentation"
                        >
                            <g strokeWidth="1.5" fill="none" fillRule="evenodd">
                                <path
                                    stroke="#002fc4"
                                    d="M5 6.1L1 9v12h22V9l-4-2.9M1 9l22 12M23 9l-11 6"
                                ></path>
                                <path
                                    d="M13.8461533 1C13.0769224 1 12.3846149 1.3846154 12 2c-.3846159-.6153846-1.0769234-1-1.8461542-1C8.9230766 1 8 2 8 3.2307687c0 2.1538463 4 5.4615388 4 5.4615388s4-3.3076925 4-5.4615388C16 2 15.0769224 1 13.8461533 1z"
                                    stroke="#00badb"
                                    strokeLinecap="square"
                                ></path>
                            </g>
                        </svg>
                    </div>
                    <h3 className="card-page-garantie-heading">
                        Nos clients nous aiment
                    </h3>
                    <p className="footer-body-text text-center">
                        Plus de 10 000 abonnés sur nos pages de réseaux sociaux
                    </p>
                </div>
                <div className="flex flex-col items-center p-4 space-y-3 border-l border-[#e1e3e4]">
                    <div className="w-8 h-8">
                        <svg
                            focusable="false"
                            viewBox="0 0 20 24"
                            role="presentation"
                        >
                            <g
                                transform="translate(1 1)"
                                strokeWidth="1.5"
                                fill="none"
                                fillRule="evenodd"
                                strokeLinecap="square"
                            >
                                <path stroke="#002fc4" d="M9 9v4h4"></path>
                                <circle
                                    stroke="#002fc4"
                                    cx="9"
                                    cy="13"
                                    r="9"
                                ></circle>
                                <path d="M6 0h6M9 0v1" stroke="#00badb"></path>
                            </g>
                        </svg>
                    </div>
                    <h3 className="card-page-garantie-heading">
                        Livraison rapide
                    </h3>
                    <p className="footer-body-text text-center">
                        Des envois 100% livrés sous 24-48h jusqu'à votre
                        domicile
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Garantie;
