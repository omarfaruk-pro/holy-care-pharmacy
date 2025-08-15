import { useForm } from "react-hook-form";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { FaPlusCircle } from "react-icons/fa";
import { uploadImageToImgbb } from "../../../utils/Photoupload";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";

export default function AddPromotion() {
    const { user } = useAuth();
    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();

    const inputClass =
        'mt-1 py-2 px-3 block w-full rounded-md bg-gray-700 dark:bg-gray-200 dark:text-gray-700 dark:border-gray-300 border border-gray-600 text-gray-300';
    const labelClass = 'block text-sm font-medium';

   
    const {mutate} = useMutation({
        mutationFn: async (data) => {
            const res = await axiosSecure.post('/banners', data);
            return res.data;
        },
        onSuccess: () => {
            reset();
            Swal.fire('Success', 'Promotion submitted for approval', 'success');
            
        },
        onError: (error) => {
            console.error(error);
            Swal.fire('Error', 'Something went wrong', 'error');
        }
    })

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            const bgImageURL = await uploadImageToImgbb(data.bgImage[0]);
            const productImageURL = await uploadImageToImgbb(data.productImage[0]);

            const promotionData = {
                bgImage: bgImageURL,
                productImage: productImageURL,
                name: data.name,
                features: data.features.split(",").map(f => f.trim()),
                status: "inactive",
                sellerEmail: user?.email,
                date: new Date().toISOString(),
            };
            
            mutate(promotionData);


        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Something went wrong", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="container py-10">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-gray-800 ">
                <FaPlusCircle className="text-blue-600" />
                Submit a Promotional Banner
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-6 bg-gray-900 dark:bg-white p-6 rounded shadow">
                <div className="col-span-2 md:col-span-1">
                    <label className={labelClass}>Background Image</label>
                    <input type="file" accept="image/*" {...register("bgImage", { required: true })} className={inputClass} />
                </div>

                <div className="col-span-2 md:col-span-1">
                    <label className={labelClass}>Product Image</label>
                    <input type="file" accept="image/*" {...register("productImage", { required: true })} className={inputClass} />
                </div>

                <div className="col-span-2">
                    <label className={labelClass}>Product Name</label>
                    <input type="text" {...register("name", { required: true })} placeholder="e.g., ImmunoBoost+ Capsules" className={inputClass} />
                </div>

                <div className="col-span-2">
                    <label className={labelClass}>Feature List (comma separated)</label>
                    <textarea {...register("features", { required: true })} placeholder="e.g., Boosts immunity, Clinically tested, Safe for all ages" rows={4} className={inputClass} />
                </div>


                <div className="col-span-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 cursor-pointer text-white px-6 py-2 rounded hover:bg-blue-700 transition w-full"
                    >
                        {loading ? "Submitting..." : "Submit Promotion"}
                    </button>
                </div>
            </form>
        </section>
    );
}
