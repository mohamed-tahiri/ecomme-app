import HomePageReviews from '../components/avisproducts/ProductsReviews';
import HomeSlider from '../components/home/HomeSlider';
import Marques from '../components/home/Marques';
import PopularCollection from '../components/home/PopularCollection';
import Space from '../components/home/Space';
import Type from '../components/home/Type';

const HomePage: React.FC = () => {
    return (
        <div className="space-y-6 mb-5">
            <HomeSlider />
            <div className="px-[1.875rem] md:px-0 space-y-6">
                <Type />
                <PopularCollection />
            </div>
            <Space />
            <Space />
            <Space />
            <Space />
            <div className="px-[1.875rem] md:px-0 space-y-6">
                <HomePageReviews />
                <Marques />
            </div>
        </div>
    );
};

export default HomePage;
