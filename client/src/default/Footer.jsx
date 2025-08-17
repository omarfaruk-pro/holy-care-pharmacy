import { Link } from "react-router";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-200 py-10">
            <div className="container">
                <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">

                    {/* Brand Info */}
                    <div>
                        <h1 className="text-2xl font-bold text-white">Holy Care</h1>
                        <p className="mt-2">
                            Your trusted partner in health & wellness. Buy genuine medicines from multiple vendors securely.
                        </p>
                    </div>

                    <div className="md:px-10 ">
                        <h2 className="text-lg font-semibold text-white mb-2">Quick Links</h2>
                        <ul className="space-y-2">
                            <li><Link to="/" className="hover:underline">Home</Link></li>
                            <li><Link to="/shop" className="hover:underline">Shop</Link></li>
                            <li><Link to="/cart" className="hover:underline">Cart</Link></li>
                            <li><Link to="/dashboard" className="hover:underline">Dashboard</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h2 className="text-lg font-semibold text-white mb-2">Categories</h2>
                        <ul className="space-y-2">
                            <li><Link to="/category/tablet" className="hover:underline">Tablet</Link></li>
                            <li><Link to="/category/syrup" className="hover:underline">Syrup</Link></li>
                            <li><Link to="/category/injection" className="hover:underline">Injection</Link></li>
                            <li><Link to="/category/others" className="hover:underline">Others</Link></li>
                        </ul>
                    </div>

                    {/* Contact + Social */}
                    <div>
                        <h2 className="text-lg font-semibold text-white mb-2">Contact</h2>
                        <p>
                            Email:{" "}
                            <a href="mailto:support@holycare.com" className="hover:underline">
                                support@holycare.com
                            </a>
                        </p>
                        <p>Phone: +880 1234-567890</p>

                        <div className="mt-4 flex gap-4 text-xl">
                            <a href="https://facebook.com/omarfaruk56305" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                                <FaFacebookF />
                            </a>
                            <a href="https://twitter.com/omarfaruk56305" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400">
                                <FaTwitter />
                            </a>
                            <a href="https://instagram.com/omarfaruk56305" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">
                                <FaInstagram />
                            </a>
                            <a href="https://linkedin.com/in/omarfaruk56305" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
                                <FaLinkedinIn />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom copyright */}
                <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400 text-xs">
                    &copy; {new Date().getFullYear()} Holy Care Pharmacy. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
