import merchantImg from '../../../assets/location-merchant.png'

const BeMerchant = () => {
    return (
        <div data-aos="fade-up" className="bg-[#03373D] rounded-4xl p-20 max-w-6xl mx-auto mb-12 bg-[url(assets/be-a-merchant-bg.png)] bg-no-repeat">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img
                    src={merchantImg}
                    className="max-w-sm rounded-lg"
                />
                <div>
                    <h1 className="text-5xl text-white font-bold">Merchant and Customer Satisfaction is Our First Priority</h1>
                    <p className="py-6 text-white">
                        We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                    </p>
                    <button className="btn btn-primary text-black rounded-full">Become a Merchant</button>
                    <button className="btn btn-primary btn-outline hover:text-black rounded-full ms-2">Earn with Profast Courier</button>
                </div>
            </div>
        </div>
    );
};

export default BeMerchant;