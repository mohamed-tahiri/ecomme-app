import HomeSlider from '../components/home/HomeSlider';
import Marques from '../components/home/Marques';
import PopularCollection from '../components/home/PopularCollection';
import Space from '../components/home/Space';
import Type from '../components/home/Type';

const HomePage: React.FC = () => {
    return (
        <div className="space-y-6 mb-5">
            <HomeSlider />
            <Type />
            <PopularCollection />
            <Space />
            <Space />
            <Space />
            <Space />
            <Marques />
        </div>
    );
};

export default HomePage;
