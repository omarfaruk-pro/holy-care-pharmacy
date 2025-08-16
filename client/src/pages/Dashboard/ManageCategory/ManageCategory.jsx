import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { uploadImageToImgbb } from '../../../utils/Photoupload';
import Spiner from '../../../component/loader/Spiner';
import { HiOutlineRefresh } from 'react-icons/hi';
import Button from '../../../component/buttons/Button';


export default function ManageCategory() {
    const axiosSecure = useAxiosSecure();
    const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState({
        open: false,
        category: null
    });

    const { register, handleSubmit, reset } = useForm();

    const { data: categories = [], refetch, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await axiosSecure.get('/categories');
            return res.data;
        },
    });

    const onSubmit = async (data) => {
        try {
            const image = await uploadImageToImgbb(data.image[0]);
            data.image = image;

            const response = await axiosSecure.post('/categories', data);
            if (response.data.insertedId) {
                Swal.fire('Added!', 'Category added successfully.', 'success');
            }

            reset();
            setShowModal(false);
            refetch();
        } catch (err) {
            console.error(err);
            Swal.fire('Error', err.response?.data?.error || 'Something went wrong', 'error');
        }
    };



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
            const response = await axiosSecure.delete(`/categories/${id}`);
            if(response.data.deletedCount){
                Swal.fire('Deleted!', 'Category has been deleted.', 'success');
                refetch();
            }else{
                Swal.fire('Error', 'Failed to delete category.', 'error');
            }
        }
    };

    const handleEdit = (cat) => {
        setEditModal({
            open: true,
            category: cat
        });
    };

    const { mutateAsync: updateCategory, isPending: isUpdating } = useMutation({
        mutationFn: async (updatedCategory) => {
            const res = await axiosSecure.put(`/categories/${editModal.category._id}`, updatedCategory);
            return res.data;
        },

        onSuccess: () => {
            refetch();
            setEditModal({
                open: false,
                category: null
            });
            Swal.fire('Updated!', `${editModal.category.name} updated successfully`, 'success');
        }
    });
    const onUpdate = async (data) => {
        const newImageFile = data.image?.[0]; // image is a FileList

        let imageUrl;

        if (newImageFile) {
            imageUrl = await uploadImageToImgbb(newImageFile); // Upload logic here
        } else {
            imageUrl = editModal.category.image; // Use existing image
        }

        const updatedCategory = {
            ...data,
            image: imageUrl
        };
        updateCategory(updatedCategory);

    };



    const inputClass =
        'mt-1 py-2 px-3 block w-full rounded-md bg-gray-200 text-gray-900 border-gray-300 border focus:outline-none';
    const labelClass = 'block text-sm font-medium';

    return (
        <div className="lg:p-6 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Manage Categories</h2>
                <button
                    onClick={() => {
                        reset();
                        setShowModal(true);
                    }}
                    className="btn btn-primary"
                >
                    Add Category
                </button>
            </div>

            {isLoading ? (
                <Spiner></Spiner>
            ) : (
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="min-w-2xl w-full text-left text-sm">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="px-6 py-3">#</th>
                                <th className="px-6 py-3">Category</th>
                                <th className="px-6 py-3">Image</th>
                                <th className='px-6 py-3 text-center'>Medicine</th>
                                <th className='px-6 py-3 text-right'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((cat, i) => (
                                <tr key={cat._id} className="border-b hover:bg-gray-50 last:border-b-0">
                                    <td className="px-6 py-4">{i + 1}</td>
                                    <td>{cat.name}</td>
                                    <td>
                                        <img src={cat.image} alt={cat.name} className="w-16 h-12 object-cover rounded" />
                                    </td>
                                    <td className='text-center'>
                                        {cat.medicineCount}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                onClick={() => handleEdit(cat)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                onClick={() => handleDelete(cat._id)}
                                                className=" btn-sm bg-red-400 !text-white"
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {
                                categories.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="text-center">
                                            No categories found.
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-[#000000ed] bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-md w-[90%] max-w-md relative">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-2 right-2 text-xl"
                        >
                            &times;
                        </button>
                        <h3 className="text-lg font-bold mb-4">
                            {'Add Category'}
                        </h3>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className={labelClass}>Category Name</label>
                                <input
                                    type="text"
                                    {...register('name', { required: true })}
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Image URL</label>
                                <input
                                    type="file"
                                    {...register('image', { required: true })}
                                    className={inputClass}
                                />
                            </div>
                            <div className="text-right">
                                <button type="submit" className="btn btn-primary">
                                    {'Add'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {editModal.open && (
                <div className="fixed inset-0 bg-[#000000ec] bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-md w-[90%] max-w-md relative">
                        <button
                            onClick={() => setEditModal({
                                open: false,
                                category: null
                            })}
                            className="absolute top-2 right-2 text-xl"
                        >
                            &times;
                        </button>
                        <h3 className="text-lg font-bold mb-4">
                            {'Add Category'}
                        </h3>

                        <form onSubmit={handleSubmit(onUpdate)} className="space-y-4">
                            <div>
                                <label className={labelClass}>Category Name</label>
                                <input
                                    type="text"
                                    defaultValue={editModal.category.name}
                                    {...register('name', { required: true })}
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Image URL</label>
                                <input
                                    type="file"
                                    {...register('image', { required: false })}
                                    className={inputClass}
                                />
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
        </div >
    );
}
