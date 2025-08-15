import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function GoogleLogin() {
    const { googleLogin } = useAuth();
    const { state } = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const { mutateAsync: saveUser } = useMutation({
        mutationFn: async (userData) => {
            const res = await axiosSecure.post("/users", userData);
            return res.data;
        },
    });

    const handleGoogleLogin = async () => {
        try {
            const result = await googleLogin();
            const loggedUser = result.user;

            const userData = {
                email: loggedUser.email,
                name: loggedUser.displayName,
                photoURL: loggedUser.photoURL,
            };

            await saveUser(userData); 

            Swal.fire({
                icon: "success",
                title: "Login successful",
                timer: 3000,
            });

            navigate(state?.from || "/");

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: error.message,
                timer: 3000,
            });
        }
    };

    return (
        <button
            onClick={handleGoogleLogin}
            type="button"
            className="cursor-pointer flex justify-center items-center gap-2 rounded-md w-full text-xl py-2 bg-white text-black border-[#e5e5e5]"
        >
            <FcGoogle />
            Login with Google
        </button>
    );
}
