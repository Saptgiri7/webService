import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductGrid from "./Products";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts} from "../redux/products";
import { addToCart } from "../redux/cart";

const FALLBACK_IMAGE = "https://via.placeholder.com/800x600?text=No+Image";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {products,status : productsStatus} = useSelector((state)=> state.products)  
  const {isLoggedIn} = useSelector((state) => state.cart)
  const [show,setShow] = useState(false);

  useEffect(()=>{
    if(products.length == 0){
      dispatch(fetchProducts())
    }    
  },[])

  const product = products.find((item) => item._id === id);

  const otherProducts = products.filter((item) => item._id !== id);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);

  // gather valid image URLs from product (safe)
  const getImageUrls = (prod) => {
    if (!prod || !prod.images) return [];
    // prefer largeDetail if exists, otherwise collect any arrays available
    const candidates =
      prod.images.largeDetail ||
      prod.images.largeGrid ||
      prod.images.smallDetail ||
      prod.images.smallGrid ||
      [];
    return candidates
      .map((i) => (i && i.url ? i.url : null))
      .filter(Boolean); // keep only non-null, non-empty
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!product) return;

    const urls = getImageUrls(product);
    setSelectedImage(urls.length > 0 ? urls[0] : null);

    // reset selected size when product changes
    setSelectedSizeIndex(0);
  }, [id, product]);

  const triggerPopUp = () =>{
    setShow(true);
    setTimeout(()=> setShow(false),1000);
  }

  if(productsStatus === 'loading'){
    return (
      <div className="py-24 px-12 text-xl text-center text-gray-500 content-center min-h-screen">
        Loading...
      </div>
    )
  }

  if(productsStatus === 'failed'){
    return (
      <div className="py-24 px-12 text-3xl text-center text-red-600 min-h-screen">
        failed to fetch product
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Product not found.
      </div>
    );
  }


  const imageUrls = getImageUrls(product);
  const mainImageToRender = selectedImage || imageUrls[0] || FALLBACK_IMAGE;

  // ratings: allow product.rating to be number (0-5) or missing
  const rating = Number(product.rating) || 0;
  const ratingRounded = Math.max(0, Math.min(5, Math.round(rating)));
  

  const handleAddToGuestCart = (product) =>{
    product = {
      ...product,
      quantity : 1
    }
    const cartItems = JSON.parse(localStorage.getItem('guestCart'));


    const existing = cartItems.find((item) => (item.productId === product._id && item.size === product.sizes[selectedSizeIndex]))
    

    if(existing){
      existing.quantity += product.quantity;
      localStorage.setItem('guestCart',JSON.stringify(cartItems))
      triggerPopUp()
      return
    }
      const productToBeAdded = {
      productId : product._id,
      size : product.sizes[selectedSizeIndex],
      quantity : 1,
      images : [...(product.images.largeDetail)],
      price : product.price[selectedSizeIndex]
      }
  
    const updatedCart = [...cartItems,productToBeAdded]
    localStorage.setItem('guestCart',JSON.stringify(updatedCart));
    
    triggerPopUp();
  }


  const handleAddToCart = (product) =>{
    const productToBeAdded = {
      productId : product._id,
      size : product.sizes[selectedSizeIndex],
      quantity : 1,
      images : [...(product.images.largeDetail)],
      price : product.price[selectedSizeIndex]
    }
    dispatch(addToCart(productToBeAdded));
    triggerPopUp();
  }

  return (
    <div className="w-full pt-20">
      {/* Product Detail Section */}
      <section className="w-full flex flex-col md:flex-row items-center justify-center gap-10 px-4 md:px-12 py-10 bg-white">
        {/* Left: Image + Thumbnails */}
        <div className="flex-1 max-w-lg flex flex-col items-center">
          <div
            className="w-full h-[400px] bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center shadow-sm"
            aria-live="polite"
          >
            {/* only render image tag when we have a valid url (mainImageToRender will always be valid) */}
            <img
              src={mainImageToRender}
              alt={product.productName || "product image"}
              className="w-full h-full object-cover rounded-2xl"
              loading="lazy"
            />
          </div>

          {/* Thumbnail Images - only show if we have at least one real thumbnail */}
          {imageUrls.length > 0 && (
            <div className="flex gap-3 mt-4 flex-wrap justify-center">
              {imageUrls.map((url, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedImage(url)}
                  aria-pressed={selectedImage === url}
                  className={`w-20 h-20 rounded-md overflow-hidden border-2 transition-all duration-200 focus:outline-none ${
                    (selectedImage === url) || (!selectedImage && index === 0)
                      ? "border-gray-500"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  {/* only render img when url is truthy */}
                  {url ? (
                    <img
                      src={url}
                      alt={`${product.productName || "thumb"} ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info */}
        <div className="flex-1 max-w-lg flex flex-col justify-center">
          {/* Product Title */}
          <h1 className="text-3xl font-bold text-gray-800 mb-2 leading-snug">
            {product.productName}
          </h1>

          <p className="text-gray-500 text-sm capitalize mb-3">
            Category: {product.category}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  className={`${
                    i < ratingRounded ? "text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-gray-600">
              {rating ? `${rating.toFixed(1)}` : "No rating"}
            </div>
          </div>

          {/* Dynamic Price */}
          <p className="text-gray-600 font-semibold text-2xl mb-2">
            ₹{product.price?.[selectedSizeIndex] ?? product.price ?? "—"}
            <span className="text-gray-600 text-sm ml-1">
              /{product.sizes?.[selectedSizeIndex] ?? product.sizes?.[0] ?? ""}
            </span>
          </p>

          {/* Stock */}
          <p
            className={`text-sm font-medium ${
              product.inStock ? "text-green-600" : "text-red-600"
            } mb-5`}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </p>

          {/* Size Selector */}
          {Array.isArray(product.sizes) && product.sizes.length > 0 && (
            <div className="flex gap-3 mb-6 flex-wrap">
              {product.sizes.map((size, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSizeIndex(index)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
                    selectedSizeIndex === index
                      ? "bg-blue-500 text-white border-blue-500"
                      : "border-blue-300 text-blue-700 hover:border-blue-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}

          {/* Description */}
          {product.description && (
            <div className="text-gray-700 text-sm mb-6 leading-relaxed">
              <h3 className="font-semibold mb-2">Description</h3>
              <p>{product.description}</p>
            </div>
          )}

          {show && <div className="text-xl bg-white-600 rounded-md py-2 flex-1 font-medium text-center">
              added to cart
            </div>}

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              className="flex-1 bg-blue-500 text-white py-2.5 rounded-md font-medium hover:bg-blue-700 transition"
              aria-label="Add to cart" onClick={()=>(isLoggedIn ? handleAddToCart(product):handleAddToGuestCart(product))}
            >
              Add to Cart
            </button>
            <button
              className="flex-1 bg-yellow-500 text-black py-2.5 rounded-md font-medium hover:bg-yellow-700 transition"
              aria-label="Buy now"
            >
              Buy Now
            </button>
          </div>

        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-200 my-10"></div>

      {/* More Products Section */}
      <section className="max-w-6xl mx-auto px-4 pb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          You might also like
        </h2>
        <ProductGrid products={otherProducts} />
      </section>

    </div>
  );
};

export default ProductDetails;
