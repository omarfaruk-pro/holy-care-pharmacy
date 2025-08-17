import axios from "axios";

const axiosInstence = axios.create({
  baseURL: `${import.meta.env.VITE_base_url}`
});

export default axiosInstence;