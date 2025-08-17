import { useState } from "react";
import { FaShoppingCart, FaHeart, FaCheckCircle, FaExclamationTriangle, FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Button from "../../component/buttons/Button";

export default function ProductDetails() {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: product } = useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/${id}`);
            return res.data;
        }
    });


    if (!product) return <p className="text-center py-10">Loading...</p>;

    return (
        <section className="py-20">
            <div className="container">
                <Button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-3 mb-4"
                >
                    <FaArrowLeft /> Back
                </Button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

                    <div className="flex justify-center">
                        <img
                            src={product.productImageURL}
                            alt={product.name}
                            className="rounded-2xl shadow-lg w-full object-contain"
                        />
                    </div>

                    <div className="space-y-6">
                        <h1 className="text-3xl md:text-5xl font-bold">
                            {product.name}
                        </h1>

                        <div className="flex items-center space-x-4">
                            <span className="px-3 py-1 text-sm bg-green-100 text-primary rounded-full">
                                {product.category}
                            </span>
                            {product.stock > 0 ? (
                                <span className="flex items-center text-primary">
                                    <FaCheckCircle className="w-4 h-4 mr-1" /> In Stock ({product.stock})
                                </span>
                            ) : (
                                <span className="flex items-center text-red-600 text-sm">
                                    <FaExclamationTriangle className="w-4 h-4 mr-1" /> Out of Stock
                                </span>
                            )}
                        </div>

                        <p className="text-2xl font-semibold text-gray-900">${product.price}</p>
                      

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button className="flex items-center justify-center gap-3 ">
                                <FaShoppingCart />
                                Add to Cart
                            </Button>
                            <button className="flex items-center justify-center gap-2 px-6 py-3 border rounded-xl text-gray-700 hover:bg-gray-50 transition">
                                <FaHeart className="w-5 h-5" />
                                Add to Wishlist
                            </button>
                        </div>

                        <div className="text-sm text-gray-400">
                            <p>Seller ID: {product.sellerId}</p>
                            <p>
                                Added on:{" "}
                                {new Date(product.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </p>
                        </div>
                    </div>

                    <div className="col-span-2 mt-10">
                        <p className="text-[#777] leading-relaxed">{product.description}</p>

                        {product.features?.length > 0 && (
                            <div>
                                <h3 className="text-2xl font-semibold mb-2 mt-5">Key Features:</h3>
                                <ul className="list-disc font-semibold list-inside text-[#777] space-y-1">
                                    {product.features.map((feature, idx) => (
                                        <li key={idx}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
