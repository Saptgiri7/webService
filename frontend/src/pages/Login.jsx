import axios from "axios";
import { useState } from "react";
import { FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchCart, loginIndicator } from "../redux/cart";

import { API } from '../api/config'

export default function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState(""); // 👈 for showing invalid credentials

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(""); // reset previous error

    try {
      const response = await axios.post(
        API.USER.LOGIN,
        userData
      );

      const {token} = response.data; 

      if(!token){
        setErrorMsg("something went wrong.Please try again")
      }

      localStorage.setItem('token',token);
      dispatch(loginIndicator());
      setUserData({ email: "", password: "" });
      navigate('/')

    } catch (error) {
      setErrorMsg("Invalid email or password. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-md rounded-2xl p-8 border border-gray-200">
        {/* Logo / Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-2 text-sm">
            Login to continue your journey with{" "}
            <span className="font-medium text-blue-600">Kalyani Foods</span>
          </p>
        </div>

        {/* Login Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                name="email"
                placeholder="Enter your email"
                className="w-full focus:outline-none text-gray-700 placeholder-gray-400"
                value={userData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                className="w-full focus:outline-none text-gray-700 placeholder-gray-400"
                value={userData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-gray-400 hover:text-gray-600 ml-2 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <p className="text-red-500 text-sm text-center">{errorMsg}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 rounded-lg shadow-sm transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200"></div>
          <p className="mx-3 text-gray-500 text-sm">or</p>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>
    
        {/* Register Link */}
        <p className="text-center text-sm text-gray-700">
          Don’t have an account?{" "}
          <Link to='/register' className="text-blue-600 font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
