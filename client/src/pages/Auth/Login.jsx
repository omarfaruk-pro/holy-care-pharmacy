import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router';
import Lottie from 'lottie-react';
import loginAnimation from '../../assets/lottie-animation/login.json';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useState } from 'react';
import GoogleLogin from './GoogleLogin';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { ReTitle } from 're-title';

export default function Login() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { userLogin } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const axiosSecure = useAxiosSecure();


  const onSubmit = (data) => {
    userLogin(data.email, data.password)
      .then(async () => {
        Swal.fire({
          icon: 'success',
          title: 'Login successful',
          timer: 3000,
        });
        await axiosSecure.post('/users', {
          email: data.email,
        });
        reset();
        navigate(state?.from || '/');
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: error.message,
          timer: 3000,
        });
      });
  };



  const inputClass =
    'mt-1 py-2 px-3 block w-full rounded-md bg-gray-700 dark:bg-gray-200 dark:text-gray-700 dark:border-gray-300 border border-gray-600 text-gray-300';
  const labelClass = 'block text-sm font-medium';

  return (
    <section className="py-20">
      <ReTitle title="Login || Holy Care Pharmacy" />
      <h2 className="text-center text-4xl font-extrabold pb-5">Login</h2>
      <div className="lg:max-w-5xl md:max-w-3xl sm:max-w-xl px-5 mx-auto grid md:grid-cols-2 items-center">
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-xl mx-auto p-6 bg-gray-900 dark:bg-gray-100 shadow-md rounded-lg space-y-4 text-white dark:text-gray-800"
          >
            {/* Email */}
            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                className={inputClass}
              />
              {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className={labelClass}>Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Minimum 6 characters' }
                  })}
                  className={`${inputClass} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-xl text-gray-300 dark:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="cursor-pointer block w-full text-xl bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>

            {/* Google Login */}
            <GoogleLogin></GoogleLogin>

            <p>
              Don't have an account?
              <Link to="/register" className="font-semibold underline ml-1">Sign up here</Link>
            </p>
          </form>
        </div>
        <div>
          <Lottie animationData={loginAnimation} loop={true} className="w-full" />
        </div>
      </div>
    </section>
  );
}
