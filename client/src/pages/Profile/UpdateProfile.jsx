import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { FaCamera, FaSave } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { uploadImageToImgbb } from "../../utils/Photoupload";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [photoURL, setPhotoURL] = useState(null);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const watchPhoto = watch("photo");

  useEffect(() => {
    setPhotoURL(user?.photoURL);
    if (watchPhoto?.length > 0) {
      const upload = async () => {
        const uploadPhoto = await uploadImageToImgbb(watchPhoto[0]);
        setPhotoURL(uploadPhoto);
      }
      upload();
    }
  }, [watchPhoto, user]);


  const { mutateAsync: updateMongoProfile, isPending } = useMutation({
    mutationFn: async (updatedUser) => {
      const res = await axiosSecure.patch(`/users/${user?.email}`, updatedUser);
      return res.data;
    },
    onError: () => {
      Swal.fire({ icon: "error", title: "Failed to update MongoDB user" });
    },
    onSuccess: () => {
      Swal.fire({ icon: "success", title: "Profile updated successfully" });
    }
  });


  // Handle form submission
  const onSubmit = async (data) => {
    if (!photoURL) {
      return Swal.fire({ icon: 'error', title: 'Image upload failed' });
    }

    await updateProfile(auth.currentUser, {
      displayName: data.name,
      photoURL: photoURL,
    });

    const updatedUser = {
      name: data.name,
      photoURL
    };
    await updateMongoProfile(updatedUser);
  };

  return (
    <div className="h-full">
      <h2 className="text-3xl font-bold mb-10">Update Profile</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" bg-white p-8 rounded-lg shadow space-y-6"
      >
        {/* Profile Photo */}
        <div className="flex flex-col items-center space-y-2">
          <label className="relative cursor-pointer">
            <img
              src={
                photoURL ||
                "https://www.w3schools.com/howto/img_avatar.png"
              }
              alt={user?.displayName}
              className="w-28 h-28 object-cover rounded-full border"
            />
            <input
              type="file"
              accept="image/*"
              {...register("photo")}
              className="hidden"
            />
            <span className="absolute bottom-1 right-2 bg-blue-600 text-white p-1 rounded-full">
              <FaCamera size={16} />
            </span>
          </label>
          <p className="text-sm text-gray-500">Click to change photo</p>
        </div>

        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-full">
            <label className="block mb-1 font-semibold">Full Name</label>
            <input
              type="text"
              defaultValue={user?.displayName}
              {...register("name", { required: "Name is required" })}
              className="w-full border px-4 py-2 rounded-md focus:outline-blue-500"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="w-full">
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              readOnly
              defaultValue="user@example.com"
              className="w-full border bg-gray-100 px-4 py-2 rounded-md cursor-not-allowed text-gray-600"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className={`flex cursor-pointer items-center gap-2 mx-auto bg-blue-600 text-white px-6 py-3 rounded-md transition ${isPending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
        >
          <FaSave />
          {isPending ? "Saving..." : "Save Changes"}
        </button>

      </form>
    </div>
  );
}
