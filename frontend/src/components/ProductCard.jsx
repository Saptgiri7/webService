import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCardGrid = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col cursor-pointer w-full max-w-sm transition-transform duration-300 hover:scale-[1.02]"
      onClick={() => navigate(`/products/${product._id}`)}
    >
      {/* Image Section */}
      <div className="relative w-full h-64 bg-gray-100 rounded-xl overflow-hidden">
        <img
          src={product.images.largeDetail[0].url}
          alt={product.productName}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col mt-3 px-1">
        <h2 className="text-base font-semibold text-gray-800 truncate">
          {product.productName}
        </h2>

        <p className="text-sm text-gray-500 capitalize">
          {product.category}
        </p>

        <p className="text-yellow-600 font-bold text-lg mt-1">
          ₹{product.price[0]}{" "}
          <span className="text-sm text-gray-600">/{product.sizes[0]}</span>
        </p>

        <p
          className={`text-sm font-medium mt-1 ${
            product.inStock ? "text-green-600" : "text-red-500"
          }`}
        >
          {product.inStock ? "In Stock" : "Out of Stock"}
        </p>
      </div>
    </div>
  );
};

export default ProductCardGrid;
