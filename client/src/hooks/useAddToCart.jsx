import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from './useAxiosSecure';
import useCart from './useCart';

export const useAddToCart = () => {
  const axiosSecure = useAxiosSecure();
  const { refetchCart } = useCart();


  return useMutation({
    mutationFn: async ({ userId, productId }) => {
      const res = await axiosSecure.post('/cart', {
        userId,
        productId,
        quantity: 1,
      });
      return res.data;
    },
    onSuccess: () => {
      refetchCart();
    },
    onError: (err) => {
      Swal.fire('Error', 'Failed to add to cart.', 'error');
      console.log(err)
    },
  });
};
