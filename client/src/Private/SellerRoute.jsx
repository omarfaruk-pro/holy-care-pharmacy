import FakeRole from "../component/FakeRole";
import Spiner from "../component/loader/Spiner";
import useUserRole from "../hooks/useUserRole";

export default function SellerRoute({ children }) {
    const { userRole, roleLoading } = useUserRole();
    if (roleLoading) {
        return <Spiner></Spiner>
    }
    if (userRole === 'seller') {
        return children;
    }
    return <FakeRole role="seller"></FakeRole>
}
