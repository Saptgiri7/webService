import React, { useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginIndicator } from "../redux/cart";

import { API } from '../api/config';

export default function CreateNewAccount() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [form, setForm] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // { type: 'error'|'success', text }

  const updateField = (name, value) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  const validate = () => {
    if (!form.username || form.username.length < 3)
      return "Name must be at least 3 characters long";
    const EMAIL_REGEX =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!EMAIL_REGEX.test(form.email)) return "Please enter a valid email";
    if (!form.password || form.password.length < 6)
      return "Password must be at least 6 characters long";
    if (!form.phoneNumber || !/^\d{10}$/.test(form.phoneNumber))
      return "Please provide a valid 10-digit phone number";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      setMessage({ type: "error", text: error });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await axios.post( API.USER.REGISTER, {userDetails : form});
      
      if (res.data?.token) localStorage.setItem("token", res.data.token);

      setMessage({ type: "success", text: "Account created successfully 🎉" });

      setForm({
        username: "",
        email: "",
        phoneNumber: "",
        password: "",
    })
      dispatch(loginIndicator())
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Registration failed. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create New Account
        </h2>

        {message && (
          <div
            className={`mb-4 p-3 rounded text-sm ${
              message.type === "error"
                ? "bg-red-50 text-red-700"
                : "bg-green-50 text-green-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="flex items-center border rounded-lg px-3 py-2">
            <FaUser className="text-gray-500 mr-3" />
            <input
              type="text"
              placeholder="Full Name"
              value={form.username}
              onChange={(e) => updateField("username", e.target.value)}
              className="w-full outline-none text-gray-700"
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center border rounded-lg px-3 py-2">
            <FaEnvelope className="text-gray-500 mr-3" />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              className="w-full outline-none text-gray-700"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="flex items-center border rounded-lg px-3 py-2">
            <FaPhone className="text-gray-500 mr-3" />
            <input
              type="tel"
              placeholder="Phone Number"
              maxLength={10}
              value={form.phoneNumber}
              onChange={(e) => updateField("phoneNumber", e.target.value)}
              className="w-full outline-none text-gray-700"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center border rounded-lg px-3 py-2">
            <FaLock className="text-gray-500 mr-3" />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
              className="w-full outline-none text-gray-700"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading} 
            className={`w-full py-2 mt-4 rounded-lg font-semibold ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-400 hover:bg-blue-500 text-black"
            }`}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
