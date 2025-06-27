import HomePageReviews from '../components/avisproducts/ProductsReviews';
import HomeSlider from '../components/home/HomeSlider';
import Marques from '../components/home/Marques';
import PopularCollection from '../components/home/PopularCollection';
import CollectionCard from '../components/home/space/Space';
import Type from '../components/home/Type';

const HomePage: React.FC = () => {
    return (
        <div className="space-y-6 mb-5">
            <HomeSlider />
            <div className="px-[1.875rem] md:px-0 space-y-6">
                <Type />
                <PopularCollection />
            </div>
            <CollectionCard
                title="ORDI SPACE"
                description="
                    Que vous êtes Architecte, Infographiste, Modeleur ou Gamer, découvrez une large sélection d'ordinateurs choisi par site.ma
                "
                slug="pc-gamer-booster"
                imageUrl="https://techspace.ma/cdn/shop/files/ordispace-collection_1000x.png?v=1617485269"
            />
            <CollectionCard
                title="SCREEN SPACE"
                description="
                    Écrans dédiés aux Gamers et Professionnels qui cherchent la performance et de la haute qualité d'affichage.
                "
                slug="ecran-pc"
                imageUrl="https://techspace.ma/cdn/shop/files/screenspace-collection_1000x.png?v=1617485230"
            />
            <CollectionCard
                title="NOTRE COLLECTION DE PÉRIPHÉRIQUES"
                description="
                    Nos spécialistes de Techspace.ma ont sélectionné pour vous un large choix de périphériques informatiques.
                "
                slug="peripheriques"
                imageUrl="https://techspace.ma/cdn/shop/files/peripheriques-collection_1000x.png?v=1617485298"
            />
            <CollectionCard
                title="PC Portable Multimédia"
                description="
                    Site vous offre une large collection des PC portable multimédia destiné à vos besoins.
                "
                slug="pc-portable-multimedia"
                imageUrl="https://techspace.ma/cdn/shop/files/Sans_titre-1_1b288622-e90e-44bb-ada5-172b601ef9c0_1000x.png?v=1677515446"
            />
            <div className="px-[1.875rem] md:px-0 space-y-6">
                <HomePageReviews />
                <Marques />
            </div>
        </div>
    );
};

export default HomePage;
