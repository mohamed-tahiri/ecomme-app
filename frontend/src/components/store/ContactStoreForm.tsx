import React, { useState } from 'react';
import Button from '../ui/Button';

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
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', form);
        // Appeler ici un service d’envoi réel
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
                    placeholder="Votre nom"
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
                    placeholder="exemple@mail.com"
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
                    placeholder="06 00 00 00 00"
                />
            </div>

            <div>
                <label className="block">Ajoutez un message (facultatif)</label>
                <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full border rounded px-3 py-2"
                    placeholder="Bonjour, je souhaite avoir plus d'infos..."
                />
            </div>

            <Button type="submit" className="w-full">
                Envoyer
            </Button>

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
