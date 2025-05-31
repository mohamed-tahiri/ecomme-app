const Estimation = () => {
    return (
        <div className="card">
            <div className="flex-center space-x-4">
                <div className="w-6 h-6">
                    <svg
                        focusable="false"
                        viewBox="0 0 24 22"
                        role="presentation"
                    >
                        <g
                            transform="translate(1 1)"
                            strokeWidth="2"
                            fill="none"
                            fillRule="evenodd"
                        >
                            <path
                                d="M5 10H2M5 15H4"
                                stroke="#00badb"
                                strokeLinecap="square"
                            ></path>
                            <path
                                stroke="#002fc4"
                                d="M16.829 16H22v-6l-4-2-1-4H9v12h2.171"
                            ></path>
                            <path
                                d="M0 5h5"
                                stroke="#00badb"
                                strokeLinecap="square"
                            ></path>
                            <path
                                stroke="#002fc4"
                                strokeLinecap="square"
                                d="M0 0h9v4"
                            ></path>
                            <circle
                                stroke="#002fc4"
                                strokeLinecap="square"
                                cx="14"
                                cy="17"
                                r="3"
                            ></circle>
                            <path
                                stroke="#002fc4"
                                strokeLinecap="square"
                                d="M13 7v2h2"
                            ></path>
                        </g>
                    </svg>
                </div>
                <h2 className="estimation-heading">Estimer la livraison</h2>
            </div>
        </div>
    );
};

export default Estimation;
