import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import useUserRole from '../../hooks/useUserRole';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useRemoveFromCart } from '../../hooks/useRemoveFromCart';
import { FaRegTrashAlt } from 'react-icons/fa';
import SkeletonTableLoader from '../../component/loader/SkeletonTableLoader';
import { usePaymentIntent } from '../../hooks/usePaymentIntent';
import CheckoutForm from '../../component/CheckoutForm';
import useAuth from '../../hooks/useAuth';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import useCart from '../../hooks/useCart';
const stripePromise = loadStripe(import.meta.env.VITE_stripe_PK);

export default function Cart() {
  const axiosSecure = useAxiosSecure();
  const { userId } = useUserRole();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [quantities, setQuantities] = useState({});
  const { mutate: removeFromCart, isPending: removing } = useRemoveFromCart();
  const [totalAmount, setTotalAmount] = useState(null);
  const { refetchCart } = useCart();

  const amountInCents = totalAmount ? Math.round(totalAmount * 100) : 0;
  const { clientSecret } = usePaymentIntent(amountInCents);

  const { data: cartItems = [], isLoading, refetch: refetchCartPage } = useQuery({
    queryKey: ['cartAggregate', userId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/cart/aggregate/${userId}`);
      const initialQuantities = {};
      res.data.forEach(item => {
        initialQuantities[item._id] = item.quantity;
      });
      setQuantities(initialQuantities);
      return res.data;
    },
    enabled: !!userId
  });

  const handleQuantityChange = (cartItem, delta) => {
    const cartId = cartItem._id;
    setQuantities(prev => {
      const newQty = (prev[cartId] || 1) + delta;
      cartItem.quantity = newQty;
      return {
        ...prev,
        [cartId]: newQty < 1 ? 1 : newQty
      };
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => {
      const qty = quantities[item._id] || 1;
      return sum + item.product.price * qty;
    }, 0);
  };

  const handlePayNow = () => {
    setShowModal(true);
    setTotalAmount(calculateTotal());
  };

  const handleRemoveFromCart = (product) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to Delete ${product.product.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, clear it!',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart({ userId, productId: product.product._id });
        refetchCartPage();
        refetchCart();
        Swal.fire('Remove!', `${product.product.name} Remove from cart`, 'success');
      }
    });


  };

  const { mutateAsync: clearCart, isLoading: isClearing } = useMutation({
    mutationFn: async () => {
      const res = await axiosSecure.delete(`/cart/${userId}/clear`);
      return res.data;
    },
  });
  const handleClearCart = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to clear your cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, clear it!',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart();
        refetchCartPage();
        refetchCart();
        Swal.fire('Cleared!', 'Your cart has been cleared.', 'success');
      }
    });
  }



  if (isLoading) return <div className="text-center py-8">
    <div className='max-w-4xl mx-auto px-6'>
      <SkeletonTableLoader></SkeletonTableLoader>
    </div>
  </div>;

  return (
    <section className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold mb-6">My Cart</h2>
        <button onClick={handleClearCart} disabled={isClearing} className='btn btn-sm btn-primary cursor-pointer'>Clear Cart</button>
      </div>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Quantity</th>
                <th className="px-6 py-3">Subtotal</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => {
                const qty = quantities[item._id] || 1;
                return (
                  <tr key={item._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <img src={item.product.productImageURL} alt={item.product.name} className="w-16 h-12 object-cover rounded" />
                    </td>
                    <td className="px-6 py-4">{item.product.name}</td>
                    <td className="px-6 py-4">${item.product.price}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button onClick={() => handleQuantityChange(item, -1)} className="px-2 bg-gray-300 rounded">-</button>
                        <span>{qty}</span>
                        <button onClick={() => handleQuantityChange(item, 1)} className="px-2 bg-gray-300 rounded">+</button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold">
                      ${(item.product.price * qty).toFixed(2)}
                    </td>
                    <td>
                      <div className='text-right pr-5'>
                        <button
                          disabled={removing}
                          onClick={() => handleRemoveFromCart(item)}
                          className="text-red-200 hover:text-red-100 text-xl h-10 w-10 rounded-md inline-flex items-center justify-center bg-black cursor-pointer"
                          title="Remove from Cart"
                        >
                          <FaRegTrashAlt />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan="4" className="px-6 py-4 text-right font-bold">Total:</td>
                <td className="px-6 py-4 font-bold text-green-700">${calculateTotal()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="text-right mt-4">
          <button
            onClick={handlePayNow}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Pay Now
          </button>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-[#000000de] bg-opacity-60 z-50 flex justify-center items-center p-6">
          <div className="bg-white p-8 rounded shadow max-w-sm w-full relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-xl"
            >
              &times;
            </button>
            <div>
              {clientSecret && (
                <Elements options={{ clientSecret }} stripe={stripePromise}>
                  <CheckoutForm clientSecret={clientSecret} amount={amountInCents} user={user} userId={userId} cartItems={cartItems} refetchCartPage={refetchCartPage} />
                </Elements>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
