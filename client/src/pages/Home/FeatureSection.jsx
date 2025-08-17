import { FaShippingFast, FaCreditCard, FaGift } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";


export default function FeatureSection() {
    const features = [
        {
            icon: <FaShippingFast className="text-4xl text-primary" />,
            title: "Free shipping",
            description: "On all orders over $49.00"
        },
        {
            icon: <FaSackDollar className="text-4xl text-primary" />,
            title: "15 days returns",
            description: "Moneyback guarantee"
        },
        {
            icon: <FaCreditCard className="text-4xl text-primary" />,
            title: "Secure checkout",
            description: "Protected by Paypal"
        },
        {
            icon: <FaGift className="text-4xl text-primary" />,
            title: "Offer & gift here",
            description: "On all orders over"
        }
    ];

    return (
        <>
            <section className="bg-gray-50 py-15">
                <div className="container ">
                    <div className="flex justify-between gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <div>{feature.icon}</div>
                                <div>
                                    <h3 className="font-bold text-xl">{feature.title}</h3>
                                    <p className="text-[#777] text-sm">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
