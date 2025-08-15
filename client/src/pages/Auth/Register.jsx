
import { Link, useNavigate } from "react-router";
import Lottie from "lottie-react";
import registerAnimation from "../../assets/lottie-animation/register.json"
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { uploadImageToImgbb } from "../../utils/Photoupload";
import GoogleLogin from "./GoogleLogin";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import { ReTitle } from "re-title";

export default function Register() {
  const { register, watch, handleSubmit, formState: { errors }, reset } = useForm();
  const { userRegister } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);
  const watchPhoto = watch('photo');

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { mutateAsync: saveUser } = useMutation({
    mutationFn: async (userData) => {
      const res = await axiosSecure.post('/users', userData);
      return res.data;
    },
  });
  

  useEffect(() => {
    if (watchPhoto?.length > 0) {
      const upload = async () => {
        const uploadPhoto = await uploadImageToImgbb(watchPhoto[0]);
        setPhotoURL(uploadPhoto);
      }
      upload();
    }
  }, [watchPhoto]);

  const handleRegister = async (data) => {
    const displayName = data.name;
    const email = data.email;
    const password = data.password;
    const role = data.role;

    if (!photoURL) {
      return Swal.fire({ icon: 'error', title: 'Image upload failed' });
    }


    userRegister(email, password)
      .then(async() => {
        updateProfile(auth.currentUser, {
          displayName,
          photoURL,
        });

        const userData = {
          name: displayName,
          email,
          photoURL,
          role, 
        };
        await saveUser(userData);

        reset();
        Swal.fire({
          icon: "success",
          title: `${displayName} has been registered successfully`,
          timer: 3000,
        });

        navigate('/login');
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error.message,
          timer: 3000,
        })
      });
  }

  const inputClass =
    'mt-1 py-2 px-3 block w-full rounded-md bg-gray-200 text-gray-900 border-gray-300 border focus:outline-none';
  const labelClass = 'block text-sm font-medium';

  return (
    <>
    <ReTitle title="Register || Holy Care Pharmacy" />
      <section className="py-20 px-5">
        <h2 className="text-center text-4xl font-extrabold pb-5">Register</h2>
        <div className="lg:max-w-5xl md:max-w-3xl sm:max-w-xl px-5 mx-auto grid md:grid-cols-2 items-center gap-10 mt-10">
          <form onSubmit={handleSubmit(handleRegister)}
            className="p-6 bg-gray-900 shadow-md rounded-lg space-y-4 text-white dark:bg-gray-100 dark:text-gray-900"
          >

            <div>
              <label className={labelClass}>Upload Photo
                <img className="w-20 h-20 object-cover rounded-full" src={photoURL || 'https://www.w3schools.com/howto/img_avatar.png'} alt="" />
                <input
                  type="file"
                  accept="image/*"
                  {...register("photo", { required: true })}
                  className='hidden'
                />
              </label>
              {errors.photo && <p className="text-red-400 text-sm">Photo is required</p>}
            </div>

            <div>
              <label className={labelClass}>Name</label>
              <input
                type="text"
                {
                ...register("name", {
                  required: "Name is required",
                })
                }
                className={inputClass}
                required
              />
              {
                errors.name && <p className="text-red-500">{errors.name.message}</p>
              }
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                {
                ...register("email", {
                  required: "Email is required",
                })
                }
                className={inputClass}
                required
              />
              {
                errors.email && <p className="text-red-500">{errors.email.message}</p>
              }
            </div>

            <div>
              <label className={labelClass}>Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {
                  ...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })
                  }
                  className={`${inputClass} pr-10`}
                  required
                />
                {
                  errors.password && <p className="text-red-500">{errors.password.message}</p>
                }
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-xl text-gray-300 dark:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>


            <div>
              <label className={labelClass}>Join as</label>
              <div className="flex items-center gap-6 mt-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    {...register("role")}
                    value="user"
                    defaultChecked
                    className="accent-blue-600"
                  />
                  <span>User</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    {...register("role")}
                    value="seller"
                    className="accent-blue-600"
                  />
                  <span>Seller</span>
                </label>
              </div>
            </div>


            <button
              type="submit"
              className="cursor-pointer block w-full text-xl bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Register
            </button>
            <GoogleLogin></GoogleLogin>
            <p>Already have an account? <Link to="/login" className="font-semibold underline ml-1">Login here</Link></p>

          </form>
          <div>
            <Lottie animationData={registerAnimation} loop={true} className="w-full"></Lottie>
          </div>
        </div>
      </section>
    </>
  )
}
