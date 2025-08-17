import { FaCartPlus, FaEye, FaRegTrashAlt } from "react-icons/fa";
import Button from "./buttons/Button";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { useAddToCart } from "../hooks/useAddToCart";
import useUserRole from "../hooks/useUserRole";
import useCart from "../hooks/useCart";
import { useRemoveFromCart } from "../hooks/useRemoveFromCart";
import { Link } from "react-router";

const ProductCard = ({ product }) => {
    const { user } = useAuth();
    const { userId } = useUserRole();
    const { cart = [] } = useCart();
    const { mutate: addToCart, isPending: adding } = useAddToCart();
    const { mutate: removeFromCart, isPending: removing } = useRemoveFromCart();

    const handleAddToCart = (product) => {
        if (!user) {
            return Swal.fire('Error', 'Please login first to add product on cart', 'error');
        }
        addToCart({ userId, productId: product._id });
        Swal.fire('Added!', `${product.name} added to cart`, 'success');
    };

    const handleRemoveFromCart = (product) => {
        removeFromCart({ userId, productId: product._id });
        Swal.fire('Remove!', `${product.name} Remove from cart`, 'success');
    };

    const isInCart = (id) => cart.some(item => item.productId === id);
    return (
        <div className="w-full bg-gray-50 rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col h-full">

            <div className="w-full h-48 flex justify-center items-center overflow-hidden rounded-lg bg-white">
                <img
                    src={product.productImageURL}
                    alt={product.name}
                    className="object-contain h-full"
                />
            </div>

            <div className="mt-4 flex-1">
                <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
                <p className="text-sm text-gray-500">{product.category}</p>

       
                <div className="flex justify-between items-center mt-2">
                    <span className="text-xl font-semibold text-green-600">
                        ${product.price}
                    </span>
                    <span className="text-sm text-gray-500">
                        Stock: {product.stock}
                    </span>
                </div>
            </div>


            <div className="flex gap-2 mt-4">
                {isInCart(product._id) ? (
                    <Button
                        disabled={removing}
                        onClick={() => handleRemoveFromCart(product)}
                        className="flex items-center justify-center gap-2 w-full "
                    >
                        Remove from Cart
                    </Button>
                ) : (
                    <Button
                        disabled={adding}
                        onClick={() => handleAddToCart(product)}
                        className="flex items-center justify-center gap-2 w-full"
                    >
                        <FaCartPlus className="-mt-1" /> Add to Cart
                    </Button>
                )}
                <Link to={`/product/${product._id}`} className="flex items-center justify-center bg-gray-200 text-gray-700 py-2 px-5 rounded-lg hover:bg-gray-300 transition">
                    <FaEye />
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;
