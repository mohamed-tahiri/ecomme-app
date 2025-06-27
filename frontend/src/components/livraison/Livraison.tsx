const Livraison = () => {
    return (
        <div className="card">
            <h2 className="card-page-heading">Livraison et Retours</h2>
            <ul className="pt-8 space-y-6 text-[.8rem]">
                <li>
                    <h5 className="font-semibold">
                        Dans quelles villes faites-vous la livraison ?
                    </h5>
                    <p>
                        Nous livrons partout au Maroc ( Casa, Marrakech,
                        Casablanca, Rabat, Sale, Fès, Tanger, Tétouan,beni melal
                        , Tiznit , kenitra , Nador , Oujda, Dakhla, Agadir,
                        El-Jadida, Essaouira , Safi, Tanger…… ) via Sapres.
                    </p>
                </li>
                <li>
                    <h5 className="font-semibold">
                        Quel est le délai de l'expédition de la commande ?
                    </h5>
                    <p>
                        Après validation de votre commande (étapes de validation
                        de votre commande ?), elle est tout de suite prise en
                        charge par notre équipe. Ensuite, votre commande sera
                        expédiée soit le jour même, soit le lendemain.
                    </p>
                </li>
                <li>
                    <h5 className="font-semibold">
                        Combien s'élèvent les frais de livraison ?
                    </h5>
                    <p>
                        Les frais de livraison sont gratuits pour toute commande
                        dont le montant total dépasse 1500 dirhams.
                        <br />
                        Les frais de livraison sont à partir de 35 dirhams selon
                        le montant total de votre commande.
                    </p>
                </li>
                <li>
                    <h5 className="font-semibold">
                        Je souhaite retourner un article, que dois-je faire ?
                    </h5>
                    <p>
                        Nous vous invitons à (consulter la page sur les retours
                        et remboursements) ou de contacter notre service client.
                    </p>
                </li>
            </ul>
        </div>
    );
};

export default Livraison;
