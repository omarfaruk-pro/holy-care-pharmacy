import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

export const usePaymentIntent = (amount) => {
  const axiosSecure = useAxiosSecure();
  const { data: clientSecret, isPending, error } = useQuery({
    queryKey: ['create-payment-intent', amount],
    enabled: !!amount, 
    queryFn: async () => {
      const res = await axiosSecure.post('/create-payment-intent', { amount });
      return res.data.clientSecret;
    },
  });
  return { clientSecret, isPending, error };
};
