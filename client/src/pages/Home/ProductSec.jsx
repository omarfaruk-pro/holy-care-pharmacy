import { useQuery } from "@tanstack/react-query";
import { FaStar, FaRegStar } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ProductCard from "../../component/ProductCard";




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
        <section className="py-20">
            <div className="container">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold">Our Products</h2>
                    <p className=" mt-2 text-[#777]">
                        A highly efficient slip-ring scanner for today's diagnostic
                        requirements.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product}></ProductCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
