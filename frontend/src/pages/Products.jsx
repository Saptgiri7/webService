import React, { useState, useMemo, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/products";

const ProductGrid = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const {products,status,error} = useSelector((state)=> state.products); 
  const dispatch = useDispatch();

  useEffect(()=>{
    if(status === 'idle'){
        dispatch(fetchProducts());
    }
  },[status,dispatch])

  // derive distinct categories (memoized)
  const categories = useMemo(() => {
    const set = new Set();
    products.forEach((p) => p.category && set.add(p.category));
    return ["all", ...Array.from(set)];
  }, [products]);

  // Filter + search + sort
  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let list = products.filter((product) =>
      (product.productName || product.name || "")
        .toLowerCase()
        .includes(q)
    );

    if (selectedCategory !== "all") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // sort
    list = list.slice(); // copy
    list.sort((a, b) => {
      // handle price arrays (prefer first index) or number
      const aPrice = Array.isArray(a.price) ? Number(a.price[0]) : Number(a.price);
      const bPrice = Array.isArray(b.price) ? Number(b.price[0]) : Number(b.price);

      if (sortOption === "price-low-high") return (aPrice || 0) - (bPrice || 0);
      if (sortOption === "price-high-low") return (bPrice || 0) - (aPrice || 0);

      const aName = (a.productName || a.name || "").toString().toLowerCase();
      const bName = (b.productName || b.name || "").toString().toLowerCase();
      if (sortOption === "name-asc") return aName.localeCompare(bName);
      if (sortOption === "name-desc") return bName.localeCompare(aName);

      return 0;
    });
    return list;
  }, [products, searchQuery, selectedCategory, sortOption]);


  if(status === 'loading') {
    return <div className="pt-20 text-center text-gray-600">
      Loading Products...
    </div>
  }

  if (status === 'failed') {
    return (
      <div className="pt-20 text-center text-red-500">
        Failed to load products: {error}
      </div>
    );
  }


  return (
    <div className="max-w-6xl mx-auto px-4 py-6 pt-20">
      {/* Controls container (compact & professional) */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-col md:flex-row items-center gap-3">
        {/* Left: Title (optional) */}
        <div className="hidden md:block md:pr-4">
          <h2 className="text-lg font-semibold text-gray-800">Products</h2>
          <p className="text-sm text-gray-500">Browse & discover</p>
        </div>

        {/* Controls group (keeps compact width) */}
        <div className="flex-1 min-w-0 flex flex-col sm:flex-row items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-0">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
              <FiSearch />
            </span>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm bg-gray-50"
            />
          </div>

          {/* Category filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-44 px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? "All Categories" : c}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full sm:w-44 px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="default">Sort</option>
            <option value="price-low-high">Price: Low → High</option>
            <option value="price-high-low">Price: High → Low</option>
            <option value="name-asc">Name: A → Z</option>
            <option value="name-desc">Name: Z → A</option>
          </select>
        </div>

        {/* Right: count / reset (small) */}
        <div className="mt-3 md:mt-0 md:ml-4 flex items-center gap-3">
          <div className="text-sm text-gray-600">
            {filteredProducts.length} result{filteredProducts.length !== 1 ? "s" : ""}
          </div>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setSortOption("default");
            }}
            className="text-sm px-3 py-1 border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div
        className="
          grid
          grid-cols-2
          md:grid-cols-2
          lg:grid-cols-3
          gap-5
          justify-items-center
        "
      >
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No products available.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
