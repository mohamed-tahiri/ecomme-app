import React, { useState } from 'react';

const ContactStoreForm: React.FC = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', form);
        // Appeler ici un service d’envoi
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 text-sm text-black">
            <h2 className="text-lg font-semibold">Contacter la boutique</h2>

            <div>
                <label className="block">Nom*</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2"
                />
            </div>

            <div>
                <label className="block">E-mail*</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2"
                />
            </div>

            <div>
                <label className="block">Téléphone</label>
                <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />
            </div>

            <div>
                <label className="block mb-1">
                    Quel est l’objet de votre demande ?
                </label>
                <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="subject"
                            value="achat"
                            checked={form.subject === 'achat'}
                            onChange={handleChange}
                            required
                        />
                        <span>Un projet d’achat</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="subject"
                            value="essai"
                            checked={form.subject === 'essai'}
                            onChange={handleChange}
                        />
                        <span>Un essai de véhicule</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="subject"
                            value="reprise"
                            checked={form.subject === 'reprise'}
                            onChange={handleChange}
                        />
                        <span>Une reprise de véhicule</span>
                    </label>
                </div>
            </div>

            <div>
                <label className="block">Ajoutez un message (facultatif)</label>
                <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full border rounded px-3 py-2"
                />
            </div>

            <button
                type="submit"
                className="bg-[var(--primary-button-background)] text-white px-4 py-2 rounded"
            >
                Envoyer
            </button>

            <p className="text-xs text-gray-500 mt-2">
                Me renseigner sur les finalités du traitement de mes données
                personnelles, les destinataires, le responsable de traitement,
                les durées de conservation, les coordonnées du DPO et mes
                droits.
            </p>
        </form>
    );
};

export default ContactStoreForm;
