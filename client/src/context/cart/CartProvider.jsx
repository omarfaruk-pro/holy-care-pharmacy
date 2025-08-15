
import { useQuery } from "@tanstack/react-query";
import CartContext from "./CartContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserRole from "../../hooks/useUserRole";


export const CartProvider = ({ children }) => {
  const axiosSecure = useAxiosSecure();
  const { userId } = useUserRole();

  const { data: cart = [], refetch } = useQuery({
    queryKey: ['cart', userId],
    queryFn: async () => {
      if (!userId) return [];
      const res = await axiosSecure.get(`/cart/${userId}`);
      return res.data;
    },
    enabled: !!userId,
  });

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartInfo = {
    cart,
    cartCount,
    refetchCart: refetch,
  };

  return (
    <CartContext value={cartInfo}>
      {children}
    </CartContext>
  );
};

