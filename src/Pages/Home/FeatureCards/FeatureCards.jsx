import Benefit1 from '../../../assets/Benefit/Businessman taking cargo insurance.png'
import Benefit2 from '../../../assets/Benefit/Online user support.png'
import Benefit3 from '../../../assets/Benefit/safe-delivery.png'


const features = [
  {
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    image: Benefit1,
  },
  {
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    image: Benefit2,
  },
  {
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    image: Benefit3,
  },
];

const FeatureCards = () => {
  return (
    <div style={{
      borderTop: "1px solid transparent",
      borderBottom: "1px solid transparent",
      borderImage:
        "repeating-linear-gradient(to right, #000 0 5px, transparent 5px 10px) 1",
    }} className="max-w-6xl mx-auto py-16 space-y-6  my-12 ">
      {features.map((item, index) => (
        <div
          key={index}
          className="card bg-base-100 shadow-xl flex flex-row items-center p-12"
        >
          {/* ✅ IMAGE SECTION (Vertically Centered) */}
          <div className="flex items-center justify-center w-40">
            <img
              src={item.image}
              alt={item.title}
              className="h-20 object-contain"
            />
          </div>

          {/* ✅ MIDDLE VERTICAL DASHED BORDER */}
          <div className="h-24 border-l-2 border-dashed border-gray-300 mx-6"></div>

          {/* ✅ TEXT SECTION (Vertically Centered) */}
          <div className="flex flex-col justify-center">
            <h2 className="card-title mb-2">{item.title}</h2>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureCards;