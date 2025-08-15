import { useQuery } from '@tanstack/react-query';
import { FaMoneyCheckAlt, FaHourglassHalf, FaWallet, FaClipboardList } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router';
import CardSkeleton from '../../../component/loader/CardSkeleton';

const UserDashboard = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data = {}, isLoading } = useQuery({
        queryKey: ['user-summary', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/summary?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const { totalOrders = 0, paidSpend = 0, pendingSpend = 0, totalSpend = 0 } = data;

 

    return (
        <>
            <h1 className="text-4xl font-bold mb-10 text-center">User Dashboard</h1>
            {
                isLoading &&
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <CardSkeleton key={i} />
                    ))}
                </div>
            }
            {
                !isLoading &&
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <div className="card bg-base-100 shadow-md hover:shadow-xl cursor-default transition-transform duration-200 hover:scale-105r">
                        <div className="card-body">
                            <Link to='/dashboard/my-orders' className="flex flex-col gap-1 items-center justify-between">
                                <FaClipboardList className="text-4xl text-blue-500" />
                                <div className="text-center">
                                    <h2 className="text-2xl font-bold">{totalOrders}</h2>
                                    <p className="text-gray-500">Total Orders</p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-md hover:shadow-xl cursor-default transition-transform duration-200 hover:scale-105">
                        <div className="card-body">
                            <Link to='/dashboard/user-payments' className="flex flex-col gap-1 items-center justify-between">
                                <FaMoneyCheckAlt className="text-4xl text-green-500" />
                                <div className="text-center">
                                    <h2 className="text-2xl font-bold">${paidSpend}</h2>
                                    <p className="text-gray-500">Paid Spend</p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-md hover:shadow-xl cursor-default transition-transform duration-200 hover:scale-105">
                        <div className="card-body">
                            <Link to='/dashboard/user-payments' className="flex flex-col gap-1 items-center justify-between">
                                <FaHourglassHalf className="text-4xl text-orange-500" />
                                <div className="text-center">
                                    <h2 className="text-2xl font-bold">${pendingSpend}</h2>
                                    <p className="text-gray-500">Pending Spend</p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-md hover:shadow-xl cursor-default transition-transform duration-200 hover:scale-105">
                        <div className="card-body">
                            <Link to='/dashboard/user-payments' className="flex flex-col gap-1 items-center justify-between">
                                <FaWallet className="text-4xl text-purple-500" />
                                <div className="text-center">
                                    <h2 className="text-2xl font-bold">${totalSpend}</h2>
                                    <p className="text-gray-500">Total Spend</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default UserDashboard;
