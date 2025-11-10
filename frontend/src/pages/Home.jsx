import React from "react";
import { FaLeaf, FaTruck, FaBan } from "react-icons/fa";
import { GiChefToque } from "react-icons/gi";
import { Link } from "react-router-dom";

export default function Home() {

  const BASEURL = import.meta.env.VITE_APP_BASE_URL;

  console.log(BASEURL);


  return (
    <div className="w-full overflow-hidden bg-gray-50">
      {/* 🌟 Hero + Initiative (Full Viewport minus Navbar height) */}
      <section
        className="
          min-h-[calc(100vh-80px)]
          flex flex-col justify-center items-center
          text-center px-6 md:px-12 bg-white
          pt-20 md:pt-24
        "
      >
        <div className="flex flex-col md:flex-row items-center justify-center w-full gap-8 md:gap-16">
          {/* Left Side: Text */}
          <div className="md:w-1/2 flex flex-col justify-center items-center md:items-start">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-snug max-w-xl">
              Pure Taste, Homemade Goodness — No Chemicals, Just Love ❤️
            </h1>
            <Link
              to="/products"
              className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow-md transition duration-200"
            >
              Shop Now
            </Link>
          </div>

          {/* Right Side: Image */}
          <div className="md:w-1/2">
            <img
              src="https://res.cloudinary.com/daexjbyvz/image/upload/c_fill,q_auto,f_auto/v1737029535/IMG-20220928-WA0033_avrbyy.jpg"
              alt="Homemade Food"
              className="rounded-2xl shadow-md object-cover w-full h-72 md:h-[28rem]"
            />
          </div>
        </div>

        {/* Initiative Text */}
        <div className="mt-10 md:mt-16 text-center md:text-left max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Our Initiative
          </h2>
          <p className="text-gray-600 leading-relaxed">
            At <span className="font-semibold">Pengonda Kalyani Foods</span>, we
            believe food should be pure, homemade, and free from harmful
            chemicals. Every product we create comes straight from the heart —
            bringing health and happiness to your plate.
          </p>
        </div>
      </section>

      {/* ⚙️ USP Section */}
      <section className="px-6 md:px-16 py-16 text-center bg-white">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-transform hover:scale-105">
            <GiChefToque className="text-4xl text-blue-500 mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">
              Made by Local Chefs
            </h3>
            <p className="text-gray-600 text-sm">
              Crafted with love and tradition.
            </p>
          </div>

          <div className="flex flex-col items-center bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-transform hover:scale-105">
            <FaLeaf className="text-4xl text-blue-500 mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">
              100% Natural Ingredients
            </h3>
            <p className="text-gray-600 text-sm">
              Fresh, healthy, and chemical-free.
            </p>
          </div>

          <div className="flex flex-col items-center bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-transform hover:scale-105">
            <FaBan className="text-4xl text-blue-500 mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">No Chemicals</h3>
            <p className="text-gray-600 text-sm">
              Pure goodness with zero additives.
            </p>
          </div>

          <div className="flex flex-col items-center bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-transform hover:scale-105">
            <FaTruck className="text-4xl text-blue-500 mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">
              Fast & Fresh Delivery
            </h3>
            <p className="text-gray-600 text-sm">Delivered straight to your door.</p>
          </div>
        </div>
      </section>

      {/* 🔻 Bottom CTA Section */}
      <section className="text-center py-16 md:py-20 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Join thousands who’ve chosen purity and taste
        </h2>
        <p className="text-gray-700 mb-8">
          Discover our full range of homemade products today.
        </p>
        <Link
          to="/products"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow-md transition duration-200"
        >
          Explore More
        </Link>
      </section>
    </div>
  );
}
