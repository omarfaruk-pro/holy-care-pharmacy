
import useAuth from '../hooks/useAuth'
import Spiner from '../component/loader/Spiner'
import { Navigate, useLocation } from 'react-router';

export default function PrivateRoute({ children }) {
    const { user, loading } = useAuth()
    const { pathname } = useLocation();
    if (loading) {
        return <Spiner></Spiner>
    }
    if (!user) {
        return <Navigate state={pathname} to={'/login'}></Navigate>
    }
    return children;
}
