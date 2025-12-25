import Banner from '../Banner/Banner';
import BeMerchant from '../BeMerchant/BeMerchant';
import FeatureCards from '../FeatureCards/FeatureCards';
import LogoMarquee from '../LogoMarquee/LogoMarquee';

const Home = () => {
    return (
        <div>
            <Banner />
            <LogoMarquee />
            <FeatureCards />
            <BeMerchant/>
        </div>
    );
};

export default Home;