import { useQuery } from "@tanstack/react-query";
import { FaStar, FaRegStar } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";




const RatingStars = ({ rating }) => {
    return (
        <div className="flex text-yellow-400 text-sm mb-1">
            {[...Array(5)].map((_, i) => {
                if (i < rating) return <FaStar key={i} />;
                else return <FaRegStar key={i} />;
            })}
        </div>
    );
};

export default function ProductSec() {
    const axiosSecure = useAxiosSecure();
    const { data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products?home=${true}`);
            return res.data;
        }
    });
    return (
        <section className="py-12 md:px-12 bg-white">
            <div className="container">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-800">Our Products</h2>
                    <p className="text-gray-500 mt-2">
                        A highly efficient slip-ring scanner for today's diagnostic
                        requirements.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="relative bg-white border rounded-2xl p-4 shadow hover:shadow-lg transition"
                        >

                          
                                <span className="absolute top-3 right-3 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                                    {product.category}
                                </span>
                            

                            {/* Image */}
                            <img
                                src={product.productImageURL}
                                alt={product.name}
                                className="w-full h-40 object-contain mb-4"
                            />

                            {/* Rating */}
                            <RatingStars rating={product.rating} />

                            {/* Title */}
                            <h3 className="font-semibold text-gray-800 mb-2">
                                {product.name}
                            </h3>

                            {/* Price */}
                            <div className="flex items-center gap-2">
                                <span className="text-green-600 font-bold text-lg">
                                    ${product.price}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
