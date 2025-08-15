
import useUserRole from "../../hooks/useUserRole";
import Spiner from "../../component/loader/Spiner";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import SellerDashboard from "./SellerDashboard/SellerDashboard";
import UserDashboard from "./UserDashboard/UserDashboard";
import { useNavigate } from "react-router";

export default function DashboardHome() {
  const navigate = useNavigate();
  const {userRole, roleLoading} = useUserRole();
  if(roleLoading){
    return <Spiner></Spiner>
  }
  if(userRole === 'admin'){
    return  <AdminDashboard></AdminDashboard>
  } else if(userRole === 'seller'){
    return <SellerDashboard></SellerDashboard>
  } else if(userRole === 'user'){
    return <UserDashboard></UserDashboard>
  } else{
     navigate('/')
  }
}
