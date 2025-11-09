import { useState, useRef, useEffect } from "react";
import { FiMenu, FiSettings, FiLogOut, FiArrowLeft, FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutIndicator } from "../redux/cart";

export default function Navbar() {
  const {isLoggedIn} = useSelector((state)=> state.cart);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const navigate = useNavigate()
  const profileRef = useRef(null);
  const hamburgerRef = useRef(null);
  const dispatch = useDispatch()

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileMenuOpen(false);
      }
      if (hamburgerRef.current && !hamburgerRef.current.contains(e.target)) {
        setHamburgerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Hide navbar on scroll down, show at top
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY === 0) setShowNavbar(true);
      else if (window.scrollY > lastScrollY) setShowNavbar(false);
      lastScrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () =>{
    dispatch(logoutIndicator());
    navigate('/');
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 bg-white shadow-md transition-transform duration-300  ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3 md:px-8">
        {/* LEFT: Hamburger (mobile only) + Company name */}
        <div className="flex items-center space-x-4">
          {/* Hamburger - visible only on small screens */}
          <div className="relative lg:hidden" ref={hamburgerRef}>
            <button
              onClick={() => {
                setHamburgerOpen(!hamburgerOpen);
                setProfileMenuOpen(false);
              }}
              className="text-2xl text-gray-700"
            >
              <FiMenu className="cursor-pointer"/>
            </button>

            {/* HAMBURGER MENU (popup style like profile menu) */}
            {hamburgerOpen && (
              <div className="absolute left-0 mt-2 w-44 bg-white border rounded-xl shadow-md py-2 z-50">
                <button
                  className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left"
                  onClick={() => setHamburgerOpen(false)}
                >
                  <FiArrowLeft className="mr-2" /> Back
                </button>
                <Link
                  to ="/"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setHamburgerOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setHamburgerOpen(false)}
                >
                  Products
                </Link>
                <Link
                  to="/about"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setHamburgerOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setHamburgerOpen(false)}
                >
                  Contact
                </Link>
              </div>
            )}
          </div>

          <div className="text-xl font-semibold text-black cursor-pointer" onClick={()=> navigate('/about')}>
            Pengonda Kalyani Foods
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center space-x-4 lg:space-x-6">
          {/* Large screen links */}
          <div className="hidden lg:flex items-center space-x-6 text-gray-700">
            <Link to="/" className="hover:text-blue-500 transition">
              Home
            </Link>
            <Link to="/products" className="hover:text-blue-500 transition">
              Products
            </Link>
            <Link to="/about" className="hover:text-blue-500 transition">
              About
            </Link>
            <Link to="/contact" className="hover:text-blue-500 transition">
              Contact
            </Link>
          </div>
          {/* Cart icon */}
          <Link
            to="/cart"
            className="text-gray-700 text-2xl hover:text-blue-500 transition"
          >
            <FiShoppingCart />
          </Link>

          {/* Profile/Login */}
          {isLoggedIn ? (
            <div className="relative" ref={profileRef}>
              <img
                src="https://unsplash.com/photos/people-enjoying-a-sunset-on-a-crowded-beach-df6mBgDIY0U"
                alt="Profile"
                className="w-9 h-9 rounded-full border border-blue-500 cursor-pointer"
                onClick={() => {
                  setProfileMenuOpen(!profileMenuOpen);
                  setHamburgerOpen(false);
                }}
              />
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded-xl shadow-md py-2 z-50">
                  <button
                    className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    <FiArrowLeft className="mr-2" /> Back
                  </button>
                  <Link to='/settings' className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left">
                    <FiSettings className="mr-2" /> Settings
                  </Link>
                  <button className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left" onClick={handleLogout}>
                    <FiLogOut className="mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to='/login' className="text-white bg-blue-500 hover:bg-blue-700 px-3 py-1 rounded-full text-sm">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
