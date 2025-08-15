import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
// import { Spinner } from 'flowbite-react'; 
import { FaCapsules } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Spiner from '../../component/loader/Spiner';

const CategorySection = () => {
    const axiosSecure = useAxiosSecure();
    const { data: categories = [], isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/categories?home=true`);
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-40">
                <Spiner />
            </div>
        );
    }

    return (
        <section className="my-10 px-4 md:px-10">
            <div className="container">
                <h2 className="text-2xl font-bold mb-6 text-center">Browse Categories</h2>
                <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    {categories.slice(0, 6).map((category) => (
                        <Link
                            to={`/category/${category.name}`}
                            key={category._id}
                            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group overflow-hidden"
                        >
                            <div className="overflow-hidden">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="h-25 md:h-35 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="px-4 py-2">
                                <h3 className="text-lg font-semibold mb-1">{category.name}</h3>
                                <p className="text-sm text-gray-600 flex items-center gap-2">
                                    <FaCapsules className="text-orange-500" />
                                    {category.medicineCount || 0} medicines
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategorySection;
