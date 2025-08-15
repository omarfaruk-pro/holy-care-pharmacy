import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useCart from "./useCart";

export function useRemoveFromCart() {
  const axiosSecure = useAxiosSecure();
  const { refetchCart } = useCart();

  return useMutation({
    mutationFn: async ({ userId, productId }) => {
      const res = await axiosSecure.delete(`/cart/${userId}/${productId}`);
      return res.data;
    },
    onSuccess: () => {
      refetchCart(); 
    }
  });
}
