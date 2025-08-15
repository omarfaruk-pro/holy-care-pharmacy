import { NavLink } from 'react-router';
import {
  FaTachometerAlt,
  FaUserCog,
  FaBoxOpen,
  FaClipboardList,
  FaFileInvoiceDollar,
  FaTags,
  FaBullhorn,
  FaRocket,
  FaFirstOrder,
  FaMoneyCheckAlt
} from 'react-icons/fa';
import useUserRole from '../../hooks/useUserRole';
import Spiner from '../../component/loader/Spiner';

export default function DashboardSidebar() {

  const { userRole, roleLoading } = useUserRole();

  if (roleLoading) return <Spiner></Spiner>;
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-md transition text-sm font-medium
     ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-100'}`;

  return (
    <aside className="w-full p-4">

      <nav className="space-y-1">
        {/* Shared or role-independent links */}
        <NavLink to="/dashboard" end className={linkClass}>
          <FaTachometerAlt /> Dashboard Home
        </NavLink>

        {/* Admin Links */}
        {
          userRole === 'admin' && (
            <>
              <NavLink to="/dashboard/manage-users" className={linkClass}>
                <FaUserCog /> Manage Users
              </NavLink>
              <NavLink to="/dashboard/manage-category" className={linkClass}>
                <FaTags /> Manage Categories
              </NavLink>
              <NavLink to="/dashboard/manage-payments" className={linkClass}>
                <FaMoneyCheckAlt /> Manage Payment
              </NavLink>
              <NavLink to="/dashboard/manage-banners" className={linkClass}>
                <FaClipboardList /> Manage Banners
              </NavLink>
              <NavLink to="/dashboard/sales-report" className={linkClass}>
                <FaFileInvoiceDollar /> Sales Report
              </NavLink>
            </>
          )
        }


        {/* Seller Links */}
        {
          userRole === 'seller' && (
            <>
              <NavLink to="/dashboard/my-medicines" className={linkClass}>
                <FaBoxOpen /> My Medicines
              </NavLink>
              <NavLink to="/dashboard/add-product" className={linkClass}>
                <FaRocket />
                Add Products
              </NavLink>
              <NavLink to="/dashboard/add-promotion" className={linkClass}>
                <FaBullhorn /> Add Promotion
              </NavLink>
            </>
          )
        }


        {/* User Links */}
        {
          userRole === 'user' && (
            <>
              <NavLink to="/dashboard/user-payments" className={linkClass}>
                <FaFileInvoiceDollar /> My Payments
              </NavLink>
              <NavLink to="/dashboard/my-orders" className={linkClass}>
                <FaFirstOrder /> My Orders
              </NavLink>
            </>
          )
        }
        <NavLink to="/dashboard/update-profile" className={linkClass}>
          <FaUserCog /> Update Profile
        </NavLink>

      </nav>
    </aside>
  );
}
