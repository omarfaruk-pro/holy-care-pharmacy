import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import SkeletonTableLoader from '../../../component/loader/SkeletonTableLoader';
import useUserRole from '../../../hooks/useUserRole';

const UserPayment = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { userRole } = useUserRole();

    const { data: payments = [], isPending } = useQuery({
        enabled: !loading,
        queryKey: ['user-payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment-history?email=${user?.email}&role=${userRole}`);
            return res.data;
        },
    });

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">My Payment History</h2>
            {isPending ? (
                <SkeletonTableLoader></SkeletonTableLoader>
            ) : payments.length === 0 ? (
                <p>No payment history found.</p>
            ) : (
                <div className="overflow-x-auto bg-white rounded shadow">
                    <table className="min-w-2xl w-full text-sm">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="px-4 py-3 text-left">#</th>
                                <th className="px-4 py-3 text-left">Transaction ID</th>
                                <th className="px-4 py-3 text-left">Amount</th>
                                <th className="px-4 py-3 text-left">Date</th>
                                <th className="px-4 py-3 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((item, index) => (
                                <tr key={item._id} className="border-b border-gray-200 hover:bg-gray-100 last:border-b-0">
                                    <td className="px-4 py-3">{index + 1}</td>
                                    <td className="px-4 py-3">{item.paymentIntentId || 'N/A'}</td>
                                    <td className="px-4 py-3">${item.amount?.toFixed(2)}</td>
                                    <td className="px-4 py-3">{new Date(item.date).toLocaleString()}</td>
                                    <td className="px-4 py-3 capitalize">{item.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserPayment;
