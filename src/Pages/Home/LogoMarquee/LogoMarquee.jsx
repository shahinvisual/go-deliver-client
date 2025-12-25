import Marquee from "react-fast-marquee";
import logo1 from '../../../assets/brands/amazon.png'
import logo2 from '../../../assets/brands/amazon_vector.png'
import logo3 from '../../../assets/brands/casio.png'
import logo4 from '../../../assets/brands/moonstar.png'
import logo5 from '../../../assets/brands/randstad.png'
import logo6 from '../../../assets/brands/start-people 1.png'
import logo7 from '../../../assets/brands/start.png'

const LogoMarquee = () => {
    const Logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7]
    return (
        <div className="text-center py-12 max-w-6xl mx-auto">
            <h2 className="mb-8 text-xl font-semibold text-[#03373D]">We've helped thousands of sales teams</h2>
            <Marquee speed={50} pauseOnHover={true}>
                {
                    Logos.map((logo, idx) => (
                        <div key={idx} className="flex items-center mx-24">
                            <img className="h-6 object-contain" src={logo} alt="" />
                        </div>
                    ))
                }
            </Marquee>
        </div>
    );
};

export default LogoMarquee;