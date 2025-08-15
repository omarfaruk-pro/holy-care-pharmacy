import { useQuery, useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import SkeletonTableLoader from '../../../component/loader/SkeletonTableLoader';

const ManagePayment = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch all payments (orders)
    const { data: payments = [], isLoading, refetch } = useQuery({
        queryKey: ['managePayments'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment-history?role=admin`);
            return res.data;
        },
    });

    // Mutation to update payment status
    const { mutateAsync: handleStatus } = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.patch(`/orders/${id}`, { status: 'paid' });
            return res.data;
        },
        onSuccess: () => {
            Swal.fire('Success!', 'Payment marked as paid.', 'success');
            refetch();
        },
        onError: () => {
            Swal.fire('Error!', 'Failed to update payment status.', 'error');
        },
    });

    const handleAcceptPayment = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This will mark the payment as PAID.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, confirm',
        }).then((result) => {
            if (result.isConfirmed) {
                handleStatus(id);
            }
        });
    };

    return (
        <>
            {
                isLoading && <SkeletonTableLoader></SkeletonTableLoader>
            }
            {
                !isLoading &&
                <div className="overflow-x-auto bg-white rounded shadow">
                    <table className="min-w-3xl w-full text-sm">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="px-4 py-3 text-left">#</th>
                                <th className="px-4 py-3 text-left">Transaction ID</th>
                                <th className="px-4 py-3 text-left">Amount</th>
                                <th className="px-4 py-3 text-left">Date</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((item, index) => (
                                <tr
                                    key={item._id}
                                    className="border-b border-gray-200 hover:bg-gray-100 last:border-b-0"
                                >
                                    <td className="px-4 py-3">{index + 1}</td>
                                    <td className="px-4 py-3">{item.paymentIntentId || 'N/A'}</td>
                                    <td className="px-4 py-3">${item.amount?.toFixed(2)}</td>
                                    <td className="px-4 py-3">{new Date(item.date).toLocaleString()}</td>
                                    <td className="px-4 py-3 capitalize">{item.status}</td>
                                    <td className="px-4 py-3">
                                        {item.status === 'pending' ? (
                                            <button
                                                onClick={() => handleAcceptPayment(item._id)}
                                                className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded"
                                            >
                                                Accept Payment
                                            </button>
                                        ) : (
                                            <span className="text-green-600 font-semibold">Accepted</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </>
    );
};

export default ManagePayment;
