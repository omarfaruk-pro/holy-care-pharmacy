
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router';
import { FaMoneyBillWave, FaHourglassHalf, FaShoppingBag, FaClock, FaBox, FaThList, FaImage, FaUsers, FaStore, FaUserShield } from "react-icons/fa";
import CardSkeleton from '../../../component/loader/CardSkeleton';

export default function AdminDashboard() {
    const axiosSecure = useAxiosSecure();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['adminSummary'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/summary');
            return res.data;
        }
    });

    if (isError)
        return (
            <div className="p-6 text-red-600">
                Error: {error?.message || 'Failed to load dashboard summary'}
            </div>
        );

    const stats = data || {};

    return (
        <div className="p-8 bg-base-200">
            <h1 className="text-4xl font-bold mb-10 text-center">Admin Dashboard</h1>

            {
                isLoading &&
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                        <CardSkeleton key={i} />
                    ))}
                </div>
            }
            {
                !isLoading &&
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <div className="card bg-base-100 shadow-md hover:shadow-xl cursor-default transition-transform duration-200 hover:scale-105">
                        <Link to="/dashboard/sales-report" className="flex flex-col gap-2 px-4 py-5 text-center items-center justify-between h-full">
                            <FaMoneyBillWave className="text-3xl text-green-600" />
                            <h2 className="card-title text-gray-600 uppercase text-sm tracking-wider">Paid Revenue</h2>
                            <p className="text-3xl font-extrabold">${stats.paidRevenue ?? 0}</p>
                        </Link>
                    </div>

                    <div className="card bg-base-100 shadow-md hover:shadow-xl cursor-default transition-transform duration-200 hover:scale-105">
                        <Link to="/dashboard/manage-payments" className="flex flex-col gap-2 px-4 py-5 text-center items-center justify-between h-full">
                            <FaHourglassHalf className="text-3xl text-orange-500" />
                            <h2 className="card-title text-gray-600 uppercase text-sm tracking-wider">Pending Revenue</h2>
                            <p className="text-3xl font-extrabold">${stats.pendingRevenue ?? 0}</p>
                        </Link>
                    </div>

                    <div className="card bg-base-100 shadow-md hover:shadow-xl cursor-default transition-transform duration-200 hover:scale-105">
                        <Link to="/dashboard/manage-payments" className="flex flex-col gap-2 px-4 py-5 text-center items-center justify-between h-full">
                            <FaShoppingBag className="text-3xl text-blue-600" />
                            <h2 className="card-title text-gray-600 uppercase text-sm tracking-wider">Paid Orders</h2>
                            <p className="text-3xl font-extrabold">{stats.paidOrders ?? 0}</p>
                        </Link>
                    </div>

                    <div className="card bg-base-100 shadow-md hover:shadow-xl cursor-default transition-transform duration-200 hover:scale-105">
                        <Link to="/dashboard/manage-payments" className="flex flex-col gap-2 px-4 py-5 text-center items-center justify-between h-full">
                            <FaClock className="text-3xl text-yellow-600" />
                            <h2 className="card-title text-gray-600 uppercase text-sm tracking-wider">Pending Orders</h2>
                            <p className="text-3xl font-extrabold">{stats.pendingOrders ?? 0}</p>
                        </Link>
                    </div>

                    <div className="card bg-base-100 shadow-md hover:shadow-xl cursor-default transition-transform duration-200 hover:scale-105">
                        <Link to="/dashboard/manage-products" className="flex flex-col gap-2 px-4 py-5 text-center items-center justify-between h-full">
                            <FaBox className="text-3xl text-indigo-600" />
                            <h2 className="card-title text-gray-600 uppercase text-sm tracking-wider">Total Products</h2>
                            <p className="text-3xl font-extrabold">{stats.totalProducts ?? 0}</p>
                        </Link>
                    </div>

                    <div className="card bg-base-100 shadow-md hover:shadow-xl cursor-default transition-transform duration-200 hover:scale-105 h-full">
                        <Link to="/dashboard/manage-category" className="flex flex-col gap-2 px-4 py-5 text-center items-center justify-between">
                            <FaThList className="text-3xl text-purple-600" />
                            <h2 className="card-title text-gray-600 uppercase text-sm tracking-wider">Total Categories</h2>
                            <p className="text-3xl font-extrabold">{stats.totalCategories ?? 0}</p>
                        </Link>
                    </div>

                    <div className="card bg-base-100 shadow-md hover:shadow-xl cursor-default transition-transform duration-200 hover:scale-105">
                        <Link to="/dashboard/manage-banners" className="flex flex-col gap-2 px-4 py-5 text-center items-center justify-between h-full">
                            <FaImage className="text-3xl text-pink-500" />
                            <h2 className="card-title text-gray-600 uppercase text-sm tracking-wider">Total Banners</h2>
                            <p className="text-3xl font-extrabold">{stats.totalBanners ?? 0}</p>
                        </Link>
                    </div>

                    <div className="card bg-base-100 shadow-md hover:shadow-xl cursor-default transition-transform duration-200 hover:scale-105">
                        <Link to="/dashboard/manage-users" className="flex flex-col gap-2 px-4 py-5 text-center items-center justify-between h-full">
                            <FaUsers className="text-3xl text-blue-700" />
                            <h2 className="card-title text-gray-600 uppercase text-sm tracking-wider">Total Users</h2>
                            <p className="text-3xl font-extrabold">{stats.totalUsers ?? 0}</p>
                        </Link>
                    </div>

                    <div className="card bg-base-100 shadow-md hover:shadow-xl cursor-default transition-transform duration-200 hover:scale-105">
                        <Link to="/dashboard/manage-users" className="flex flex-col gap-2 px-4 py-5 text-center items-center justify-between h-full">
                            <FaStore className="text-3xl text-green-600" />
                            <h2 className="card-title text-gray-600 uppercase text-sm tracking-wider">Total Sellers</h2>
                            <p className="text-3xl font-extrabold">{stats.totalSellers ?? 0}</p>
                        </Link>
                    </div>

                    <div className="card bg-base-100 shadow-md hover:shadow-xl cursor-default transition-transform duration-200 hover:scale-105">
                        <Link to="/dashboard/manage-users" className="flex flex-col gap-2 px-4 py-5 text-center items-center justify-between h-full">
                            <FaUserShield className="text-3xl text-gray-700" />
                            <h2 className="card-title text-gray-600 uppercase text-sm tracking-wider">Total Admins</h2>
                            <p className="text-3xl font-extrabold">{stats.totalAdmins ?? 0}</p>
                        </Link>
                    </div>
                </div>
            }
        </div>
    );
}
