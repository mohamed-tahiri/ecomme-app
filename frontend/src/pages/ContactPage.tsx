const ContactPage = () => {
    return (
        <div className="card">
            <div>
                <div className="grid grid-cols-2 gap-8 mb-6">
                    <input
                        placeholder="Votre nom"
                        type="text"
                        className="bg-[var(--background)] outline-0 border border-[var(--border-color)] py-3 px-2"
                    />
                    <input
                        placeholder="Votre email"
                        type="text"
                        className="bg-[var(--background)] outline-0 border border-[var(--border-color)] py-3 px-2"
                    />
                </div>
                <div className="mb-6">
                    <textarea
                        placeholder="Votre messaage"
                        className="w-full h-32 bg-[var(--background)] outline-0 border border-[var(--border-color)] py-3 px-2"
                    ></textarea>
                </div>
                <div className="flex items-center justify-center">
                    <button className="bg-[var(--primary-button-background)] text-white px-14 py-2 ">
                        Envoyer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
