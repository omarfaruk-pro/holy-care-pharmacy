import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

export default function useUserRole() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userData, isPending: roleLoading } = useQuery({
    queryKey: ['userRole', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/role?email=${user?.email}`);
      return res.data;
    },
    retry: false,
  });


  const userId = userData?._id || null;
  const userRole = userData?.role || null;

  return { userId, userRole, roleLoading };
}
