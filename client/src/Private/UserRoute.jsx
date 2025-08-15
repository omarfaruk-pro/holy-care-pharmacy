import FakeRole from "../component/FakeRole";
import Spiner from "../component/loader/Spiner";
import useUserRole from "../hooks/useUserRole";

export default function UserRoute({ children }) {
    const { userRole, roleLoading } = useUserRole();
    if (roleLoading) {
        return <Spiner></Spiner>
    }
    if (userRole === 'user') {
        return children;
    }
    return <FakeRole role="user"></FakeRole>
}
