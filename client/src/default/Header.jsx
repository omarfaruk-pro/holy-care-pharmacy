import { Link, NavLink } from 'react-router';
import { FaShoppingCart } from 'react-icons/fa';
import LanguageDropdown from '../component/Language';
import useAuth from '../hooks/useAuth';
import userImg from '../assets/images/user.png';
import useCart from '../hooks/useCart';
import useUserRole from '../hooks/useUserRole';
import { useState } from 'react';
import { MdMenuOpen } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";



const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const {user, userLogout} = useAuth();
    const {cartCount} = useCart();
    const {userRole} = useUserRole();


    return (
        <>
            <header className="navbar bg-base-100 shadow-md sticky top-0 z-50">
                <div className="navbar container">
                    <div className="navbar-start">
                        <Link to="/" className="text-2xl font-bold text-primary">
                            Holy Care
                        </Link>
                    </div>

                    <div className={`lg:navbar-center flex flex-col p-10 lg:p-0 lg:flex-row fixed lg:static w-80 lg:w-auto h-screen lg:h-auto z-30 top-20 lg:top-0 -left-full lg:left-0 bg-base-100 duration-300 ease-in-out ${showMenu && "left-0 shadow-md"}`}>
                        <ul className="menu lg:menu-horizontal px-1 font-medium">
                            <li><NavLink className={({isActive}) => isActive ? "border-b rounded-none" : ""} to="/">Home</NavLink></li>
                            <li><NavLink className={({isActive}) => isActive ? "border-b rounded-none" : ""} to="/shop">Shop</NavLink></li>
                        </ul>
                        <div className='lg:hidden'>
                            <LanguageDropdown />
                        </div>
                    </div>

                    <div className="navbar-end flex items-center gap-5 lg:gap-3">
                        <Link to="/cart" className="btn btn-ghost relative">
                            <FaShoppingCart className="text-xl" />
                            <span className="badge badge-sm badge-primary absolute -top-1 -right-1">{cartCount}</span>
                        </Link>

                        <div className='hidden lg:block'>
                            <LanguageDropdown />
                        </div>
                        <button onClick={() => setShowMenu(!showMenu)} className='lg:hidden'>
                            {
                                showMenu ? (
                                    <IoCloseSharp className='text-2xl'/>
                                ) : (
                                    <MdMenuOpen className='text-2xl'/>
                                )
                            }
                        </button>

                        {!user ? (
                            <Link to="/login" className="btn btn-primary btn-sm ml-2">
                                Join Us
                            </Link>
                        ) : (
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <img
                                        src={user.photoURL || userImg}
                                        alt="user"
                                        className="w-10 rounded-full"
                                    />
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                                >
                                    <li className='px-2.5 font-semibold capitalize'>Role: {userRole}</li>
                                    <li><Link to="/dashboard/update-profile">Update Profile</Link></li>
                                    <li><Link to="/dashboard">Dashboard</Link></li>
                                    <li><button onClick={userLogout}>Logout</button></li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
