import { FaShippingFast, FaCreditCard, FaGift } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";


export default function FeatureSection() {
    const features = [
        {
            icon: <FaShippingFast className="text-4xl text-black" />,
            title: "Free shipping",
            description: "On all orders over $49.00"
        },
        {
            icon: <FaSackDollar className="text-4xl text-black" />,
            title: "15 days returns",
            description: "Moneyback guarantee"
        },
        {
            icon: <FaCreditCard className="text-4xl text-black" />,
            title: "Secure checkout",
            description: "Protected by Paypal"
        },
        {
            icon: <FaGift className="text-4xl text-black" />,
            title: "Offer & gift here",
            description: "On all orders over"
        }
    ];

    return (
        <>
            <section className="bg-gray-100 py-8">
                <div className="container ">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <div>{feature.icon}</div>
                                <div>
                                    <h3 className="font-bold text-lg">{feature.title}</h3>
                                    <p className="text-gray-500 text-sm">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
