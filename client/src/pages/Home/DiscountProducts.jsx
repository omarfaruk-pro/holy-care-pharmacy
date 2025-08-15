import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { FaShoppingCart, FaTags } from 'react-icons/fa';

const discountProducts = [
    {
        id: 1,
        name: "ImmunoBoost+ Capsules",
        image: "https://5.imimg.com/data5/SELLER/Default/2025/6/515620132/YO/KX/PD/246300942/product-jpeg-500x500.jpeg",
        originalPrice: 30,
        discountPrice: 21,
    },
    {
        id: 2,
        name: "Vitamin C Tablets",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZJZ3Wx8Gj_wMLcyeUtPw-Ed4dX_OPZ9p2nw&s",
        originalPrice: 18,
        discountPrice: 12,
    },
    {
        id: 3,
        name: "ZincPlus Syrup",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSylH-NVd-n3dgl2gFj02LG21U0BMGzP5p4Kg&s",
        originalPrice: 25,
        discountPrice: 20,
    },
    {
        id: 4,
        name: "Herbal Immune Tonic",
        image: "https://www.wintersun.com/cdn/shop/products/immune-tonic-herbal-tincture-winter-sun-2oz-2.jpg?v=1598737041",
        originalPrice: 40,
        discountPrice: 30,
    }
];

export default function DiscountProducts() {
    return (
        <section className="bg-gray-100 py-20 px-4">
            <div className="container">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 flex justify-center items-center gap-3">
                    <FaTags className="text-blue-600 hidden md:block" />
                    Discounted Medicines
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div className="max-w-sm w-full mx-auto px-5 md:px-0">
                        <Swiper
                            effect={'cards'}
                            grabCursor={true}
                            loop={true}
                            modules={[EffectCards]}
                            className="h-100"
                        >
                            {discountProducts.map(product => (
                                <SwiperSlide key={product.id}>
                                    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 group h-full">
                                        <div className="relative">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-60 object-cover"
                                            />
                                            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                                                -{((product.originalPrice - product.discountPrice)*100/product.originalPrice).toFixed(0)}%
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                                            <div className="mb-3">
                                                <span className="text-blue-600 font-bold text-lg">${product.discountPrice}</span>
                                                <span className="text-gray-500 line-through text-sm ml-2">${product.originalPrice}</span>
                                            </div>
                                            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                                                <FaShoppingCart /> Select
                                            </button>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* Right: Text Content */}
                    <div className="text-center md:text-left space-y-6">
                        <h3 className="text-3xl font-bold text-gray-800">
                            Save Big on Trusted Health Products
                        </h3>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Enjoy exclusive discounts on essential medicines and health supplements carefully curated for your well-being.
                            From vitamins to herbal tonics, our limited-time offers help you stay healthy without stretching your budget.
                        </p>
                        <ul className="text-gray-700 list-disc pl-5 text-left">
                            <li>Up to 40% off on immunity boosters</li>
                            <li>Clinically tested and safe products</li>
                            <li>Handpicked by certified sellers</li>
                        </ul>
                        <button className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
                            Browse All Deals
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
