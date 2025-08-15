import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useMutation, useQuery } from "@tanstack/react-query";
import { uploadImageToImgbb } from "../../../utils/Photoupload";
import Spiner from "../../../component/loader/Spiner";
import useUserRole from "../../../hooks/useUserRole";

export default function AddProduct() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();

    const { userId, roleLoading } = useUserRole();

    const { data: categories = [], isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await axiosSecure.get('/categories');
            return res.data;
        },
    });


    const { mutateAsync: addProductMutation, isPending } = useMutation({
        mutationFn: async (productData) => {
            const res = await axiosSecure.post('/products', productData);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire('Success!', 'Product added successfully', 'success');
            reset();
        },
        onError: (error) => {
            Swal.fire('Error', error?.response?.data?.message || 'Something went wrong', 'error');
        }
    });

    const onSubmit = async (data) => {
        const productImageURL = await uploadImageToImgbb(data.productImage[0]);
        const product = {
            name: data.name,
            productImageURL,
            description: data.description,
            price: parseFloat(data.price),
            stock: parseInt(data.stock),
            category: data.category,
            features: (data.features || '')
                .split(',')
                .map(f => f.trim())
                .filter(f => f.length > 0),
            sellerId: userId,
            createdAt: new Date().toISOString(),
        };

        await addProductMutation(product);
    };


    const inputClass =
        'mt-1 py-2 px-3 block w-full rounded-md bg-gray-200 text-gray-900 border border-gray-300 focus:outline-none';
    const labelClass = 'block text-sm font-medium';

    if (roleLoading || isLoading) {
        return <Spiner />;
    }

    return (
        <section className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
            <h2 className="text-3xl font-bold mb-6">Add Product</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                <div>
                    <label className={labelClass}>Name</label>
                    <input
                        type="text"
                        {...register("name", { required: "Name is required" })}
                        className={inputClass}
                    />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>

                <div>
                    <label className={labelClass}>Product Image</label>
                    <input type="file" accept="image/*" {...register("productImage", { required: true })} className={inputClass} />
                </div>

                <div>
                    <label className={labelClass}>Price</label>
                    <input
                        type="number"
                        step="0.01"
                        {...register("price", { required: "Price is required" })}
                        className={inputClass}
                    />
                    {errors.price && <p className="text-red-500">{errors.price.message}</p>}
                </div>

                <div>
                    <label className={labelClass}>Stock</label>
                    <input
                        type="number"
                        {...register("stock", { required: "Stock is required" })}
                        className={inputClass}
                    />
                    {errors.stock && <p className="text-red-500">{errors.stock.message}</p>}
                </div>

                <div>
                    <label className={labelClass}>Category</label>
                    <select
                        {...register("category", { required: "Category is required" })}
                        className={inputClass}
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat.name}>{cat.name}</option>
                        ))}
                    </select>
                    {errors.category && <p className="text-red-500">{errors.category.message}</p>}
                </div>


                <div>
                    <label className={labelClass}>Description</label>
                    <textarea
                        rows={4}
                        {...register("description", { required: "Description is required" })}
                        className={inputClass}
                        placeholder="Write product description..."
                    />
                    {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                </div>

                <div>
                    <label className={labelClass}>Features (separate with commas)</label>
                    <textarea
                        rows={3}
                        {...register("features", { required: false })}
                        className={inputClass}
                        placeholder="e.g. Waterproof, Lightweight, Compact"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition flex justify-center items-center gap-2"
                >
                    {isPending ? (
                        <>
                            Adding Product <Spiner />
                        </>
                    ) : (
                        'Add Product'
                    )}
                </button>

            </form>
        </section>
    );
}
