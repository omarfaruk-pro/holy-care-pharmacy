import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useUserRole from '../../../hooks/useUserRole';
import SkeletonTableLoader from '../../../component/loader/SkeletonTableLoader';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { uploadImageToImgbb } from '../../../utils/Photoupload';
import { useForm } from 'react-hook-form';
import { HiOutlineRefresh } from 'react-icons/hi';

export default function MyMedicines() {
    const axiosSecure = useAxiosSecure();
    const { userId } = useUserRole();
    const [editProduct, setEditProduct] = useState(null);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();


    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['myMedicines', userId],
        enabled: !!userId,
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/`);
            return res.data;
        }
    });

    
    const { data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await axiosSecure.get('/categories');
            return res.data;
        },
    });

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'This category will be permanently deleted!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        });

        if (confirm.isConfirmed) {
            const response = await axiosSecure.delete(`/products/${id}`);
            if (response.data.deletedCount) {
                Swal.fire('Deleted!', 'Category has been deleted.', 'success');
                refetch();
            } else {
                Swal.fire('Error', 'Failed to delete category.', 'error');
            }
        }
    };

    const { mutateAsync: updateProduct, isPending: isUpdating } = useMutation({
        mutationFn: async (updatedProduct) => {
            const res = await axiosSecure.put(`/products/${editProduct._id}`, updatedProduct);
            return res.data;
        },

        onSuccess: () => {
            refetch();
            setEditProduct(null);
            reset();
            Swal.fire('Updated!', `${editProduct.name} updated successfully`, 'success');
        }
    });
    const onUpdate = async (data) => {
        const  { productImage, ...dataWithoutImage } = data;
        const newImageFile = productImage?.[0];
        let imageUrl;

        if (newImageFile) {
            imageUrl = await uploadImageToImgbb(newImageFile);
        } else {
            imageUrl = editProduct?.productImageURL;
        }

        const updatedProduct = {
            ...dataWithoutImage,
            productImageURL: imageUrl,
            features:editProduct?.features
        };
        updateProduct(updatedProduct);
        // console.log(updatedProduct);

    };

    if (isLoading) {
        return (
            <div className="max-w-5xl mx-auto px-4 py-10">
                <SkeletonTableLoader />
            </div>
        );
    }
    const inputClass =
        'mt-1 py-2 px-3 block w-full rounded-md bg-gray-200 text-gray-900 border-gray-300 border focus:outline-none';
    const labelClass = 'block text-sm font-medium';

    return (
        <section className="max-w-5xl mx-auto p-4">
            <h2 className="text-3xl font-bold mb-6">My Medicines</h2>

            {products.length === 0 ? (
                <p className="text-gray-500">You have no products yet.</p>
            ) : (
                <div className="overflow-x-auto bg-white rounded shadow">
                    <table className="min-w-xl w-full text-sm">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="px-4 py-3 text-left">SL NO.</th>
                                <th className="px-4 py-3 text-left">Image</th>
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Category</th>
                                <th className="px-4 py-3 text-left">Price</th>
                                <th className="px-4 py-3 text-left">Stock</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={product._id} className="border-b border-gray-200 last:border-b-0">
                                    <td className="px-4 py-3">{index + 1}</td>
                                    <td className="px-4 py-3">
                                        <img src={product.productImageURL} alt={product.name} className="w-16 h-16 object-cover" /></td>
                                    <td className="px-4 py-3 font-semibold text-green-700">{product.name}</td>
                                    <td className="px-4 py-3 capitalize text-green-700">{product.category}</td>
                                    <td className="px-4 py-3 capitalize text-green-700">${product.price}</td>
                                    <td className="px-4 py-3 capitalize text-green-700">{product.stock} Unit</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => setEditProduct(product)}
                                                className="btn btn-sm btn-warning"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product._id)}
                                                className="btn btn-sm btn-error"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {editProduct && (
                <div className="fixed inset-0 bg-[#000000ec] bg-opacity-40 flex items-center justify-center z-50 p-10 h-screen">
                    <div className="bg-white p-6 rounded shadow-md w-full max-w-lg relative h-full overflow-hidden">
                        <button
                            onClick={() => setEditProduct(null)}
                            className="absolute top-2 right-2 text-xl"
                        >
                            &times;
                        </button>
                        <h3 className="text-lg font-bold mb-4">
                            {'Add Category'}
                        </h3>

                        <form onSubmit={handleSubmit(onUpdate)} className="space-y-4 overflow-y-auto h-[calc(100%-40px)]">

                            <div>
                                <label className={labelClass}>Name</label>
                                <input
                                    type="text"
                                    defaultValue={editProduct.name}
                                    {...register("name", { required: "Name is required" })}
                                    className={inputClass}
                                />
                                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                            </div>

                            <div>
                                <label className={labelClass}>Product Image</label>
                                <input type="file" accept="image/*" {...register("productImage", { required: false })} className={inputClass} />
                            </div>

                            <div>
                                <label className={labelClass}>Price</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    defaultValue={editProduct.price}
                                    {...register("price", { required: "Price is required" })}
                                    className={inputClass}
                                />
                                {errors.price && <p className="text-red-500">{errors.price.message}</p>}
                            </div>

                            <div>
                                <label className={labelClass}>Stock</label>
                                <input
                                    type="number"
                                    defaultValue={editProduct.stock}
                                    {...register("stock", { required: "Stock is required" })}
                                    className={inputClass}
                                />
                                {errors.stock && <p className="text-red-500">{errors.stock.message}</p>}
                            </div>

                            <div>
                                <label className={labelClass}>Category</label>
                                <select
                                    defaultValue={editProduct.category}
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
                                    defaultValue={editProduct.description}
                                    {...register("description", { required: "Description is required" })}
                                    className={inputClass}
                                    placeholder="Write product description..."
                                />
                                {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                            </div>

                            <div className="text-right">
                                <button type="submit" disabled={isUpdating} className="btn btn-primary flex justify-center gap-4">
                                    Update
                                    {
                                        isUpdating && (
                                            <HiOutlineRefresh className="text-lg" />
                                        )
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )
            }
        </section>
    );
}
