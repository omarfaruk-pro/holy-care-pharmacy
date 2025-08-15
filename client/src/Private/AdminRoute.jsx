import FakeRole from "../component/FakeRole";
import Spiner from "../component/loader/Spiner";
import useUserRole from "../hooks/useUserRole";

export default function AdminRoute({ children }) {
    const { userRole, roleLoading } = useUserRole();
    if (roleLoading) {
        return <Spiner></Spiner>
    }
    if (userRole === 'admin') {
        return children;
    }
    return <FakeRole role="admin"></FakeRole>
}
