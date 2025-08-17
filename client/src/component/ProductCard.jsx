import { FaCartPlus, FaEye } from "react-icons/fa";
import Button from "./buttons/Button";

const ProductCard = ({ product }) => {
    return (
        <div className="max-w-sm bg-gray-50 rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col">
            
            <div className="w-full h-48 flex justify-center items-center overflow-hidden rounded-lg bg-white">
                <img
                    src={product.productImageURL}
                    alt={product.name}
                    className="object-contain h-full"
                />
            </div>

            {/* Content */}
            <div className="mt-4 flex-1">
                <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
                <p className="text-sm text-gray-500">{product.category}</p>

                {/* Price & Stock */}
                <div className="flex justify-between items-center mt-2">
                    <span className="text-xl font-semibold text-green-600">
                        ${product.price}
                    </span>
                    <span className="text-sm text-gray-500">
                        Stock: {product.stock}
                    </span>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 mt-4">
                <Button className="flex items-center justify-center gap-2 w-full">
                    <FaCartPlus /> Add to Cart
                </Button>
                <button className="flex items-center justify-center bg-gray-200 text-gray-700 py-2 px-5 rounded-lg hover:bg-gray-300 transition">
                    <FaEye />
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
