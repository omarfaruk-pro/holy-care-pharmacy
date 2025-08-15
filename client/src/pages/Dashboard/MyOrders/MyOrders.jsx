import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useUserRole from '../../../hooks/useUserRole';
import SkeletonTableLoader from '../../../component/loader/SkeletonTableLoader';

export default function MyOrders() {
    const axiosSecure = useAxiosSecure();
    const { userId } = useUserRole();

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ['myOrders', userId],
        enabled: !!userId,
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/user/${userId}`);
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="max-w-5xl mx-auto px-4 py-10">
                <SkeletonTableLoader />
            </div>
        );
    }

    return (
        <section className="max-w-5xl mx-auto p-4">
            <h2 className="text-3xl font-bold mb-6">My Orders</h2>

            {orders.length === 0 ? (
                <p className="text-gray-500">You have no orders yet.</p>
            ) : (
                <div className="overflow-x-auto bg-white rounded shadow">
                    <table className="min-w-xl w-full text-sm">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="px-4 py-3 text-left">SL NO.</th>
                                <th className="px-4 py-3 text-left">Date</th>
                                <th className="px-4 py-3 text-left">Amount</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Items</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={order._id} className="border-b border-gray-200 last:border-b-0">
                                    <td className="px-4 py-3">{index + 1}</td>
                                    <td className="px-4 py-3">{new Date(order.date).toLocaleString()}</td>
                                    <td className="px-4 py-3 font-semibold text-green-700">${(order.amount).toFixed(2)}</td>
                                    <td className="px-4 py-3 capitalize text-blue-600">{order.status}</td>
                                    <td className="px-4 py-3 space-y-2">
                                        {order.cartItems.map(item => (
                                            <div key={item._id} className="flex items-center gap-2 border-b last:border-b-0 pb-1 border-gray-200">
                                                <img src={item.product.productImageURL} alt={item.product.name} className="w-10 h-10 object-cover rounded" />
                                                <div>
                                                    <p className="font-medium">{item.product.name}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}
