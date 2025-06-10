import Header from '../components/layout/Header';
import Breadcrumb from '../components/layout/Breadcrumb';
import Footer from '../components/layout/Footer';

const ConfigurateurPCWithoutLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="text-[15px] md:px-[1.875rem] text-[var(--text-color)] bg-[var(--background)]">
                <div className="hidden my-6 md:block">
                    <Breadcrumb />
                </div>
                <div></div>
            </div>
            <Footer />
        </div>
    );
};

export default ConfigurateurPCWithoutLayout;
