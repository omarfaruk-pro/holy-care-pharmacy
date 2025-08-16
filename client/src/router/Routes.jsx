
import Home from "../pages/Home/Home";
import MainLayouts from "../Layouts/MainLayouts";
import { createBrowserRouter } from "react-router";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Shop from "../pages/Shop/Shop";
import UpdateProfile from "../pages/Profile/UpdateProfile";
import DashboardLayout from "../Layouts/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import Cart from "../pages/Cart/Cart";
import ManageUser from "../pages/Dashboard/ManageUser/ManageUser";
import ManageBanner from "../pages/Dashboard/ManageBanner/ManageBanner";
import AddPromotion from "../pages/Dashboard/AddPromotion/AddPromotion";
import AddProduct from "../pages/Dashboard/AddProduct/AddProduct";
import MyOrders from "../pages/Dashboard/MyOrders/MyOrders";
import Invoice from "../pages/Invoice/Invoice";
import ManageCategory from "../pages/Dashboard/ManageCategory/ManageCategory";
import CategorySingle from "../pages/Category/CategorySingle";
import UserPayment from "../pages/Dashboard/UserPayment/UserPayment";
import ManagePayment from "../pages/Dashboard/ManagePayment/ManagePayment";
import SalesReport from "../pages/Dashboard/SalesReport/SalesReport";
import PrivateRoute from "../Private/PrivateRoute";
import AdminRoute from "../Private/AdminRoute";
import UserRoute from "../Private/UserRoute";
import Error from "../pages/Error/Error";
import MyMedicines from "../pages/Dashboard/MyMedicines/MyMedicines";


const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayouts,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'shop',
                Component: Shop
            },
            {
                path: 'category/:name',
                Component: CategorySingle
            },
            {
                path: 'cart',
                Component: Cart
            },
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                index: true,
                Component: DashboardHome
            },
            {
                path: 'update-profile',
                Component: UpdateProfile
            },
            {
                path: 'manage-users',
                element: <AdminRoute><ManageUser></ManageUser></AdminRoute>
            },
            {
                path: 'manage-category',
                element: <AdminRoute><ManageCategory></ManageCategory></AdminRoute>
            },
            {
                path: 'manage-banners',
                element: <AdminRoute><ManageBanner></ManageBanner></AdminRoute>
            },
            {
                path: 'manage-payments',
                element: <AdminRoute><ManagePayment></ManagePayment></AdminRoute>
            },
            {
                path: 'sales-report',
                element: <AdminRoute><SalesReport></SalesReport></AdminRoute>
            },
            {
                path: 'add-product',
                element: <AdminRoute><AddProduct></AddProduct></AdminRoute>
            },

            {
                path: 'add-promotion',
                element: <AdminRoute><AddPromotion></AddPromotion></AdminRoute>
            },
            {
                path: 'my-medicines',
                element: <AdminRoute><MyMedicines></MyMedicines></AdminRoute>
            },
            {
                path: 'my-orders',
                element: <UserRoute><MyOrders></MyOrders></UserRoute>

            },
            {
                path: 'user-payments',
                element: <UserRoute><UserPayment></UserPayment></UserRoute>
            },
            {
                path: 'invoice/:orderId',
                Component: Invoice
            }
        ]
    },
    {
        path: '*',
        Component: Error
    }
]);
export default router;