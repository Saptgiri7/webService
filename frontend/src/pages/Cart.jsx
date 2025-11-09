import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCart, removeFromCart } from "../redux/cart";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const {isLoggedIn} = useSelector((state) => state.cart)
  const [tempData,setTempData] = useState(JSON.parse(localStorage.getItem('guestCart')) || []);  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleRemoveFromGuestCart = (product) =>{
    const updatedCart = JSON.parse(localStorage.getItem('guestCart')).filter((item) => !(item.productId === product.productId && item.size === product.size))
    setTempData(updatedCart);
    localStorage.setItem('guestCart',JSON.stringify(updatedCart));
  }

  const handleRemoveItem = (product) =>{
    dispatch(removeFromCart(product))
  }

  const {items : cartItems,status : cartStatus} = useSelector((state)=>state.cart)

  useEffect(()=>{
      if(cartStatus === 'idle' && isLoggedIn){
        dispatch(fetchCart())
      }
  },[])


  const handleAddToGuestCart = (product) =>{
    setTempData((prevState)=>{
      const updated = prevState.map((item)=> (
        item.productId === product.productId && item.size === product.size ? {...item,quantity : item.quantity + product.quantity} : item
      ))
      localStorage.setItem('guestCart',JSON.stringify(updated));
      return updated
    })
  }

  const handleAddToCart = (product) =>{
    dispatch(addToCart(product));
  }

  const handleCheckOut = () =>{
    navigate('/comingsoon')
  }


  if(cartStatus === 'loading'){
    return <div className="text-3xl text-center text-blue-600 py-24 px-4">fetching cart please wait</div>
  }
  
  
  if(cartStatus === 'failed'){
    return (
      <div className="text-3xl text-center text-red-700 py-24 px-4">
        Failed to fetch cart
      </div>
    )
  }

  if((isLoggedIn ? cartItems : tempData).length == 0){
    return (
      <div className="text-3xl text-center text-blue-600 py-24 px-4 h-lvh content-center">
        Your cart is empty
        <Link to='/products'  className="bg-blue-600 text-white px-5 py-2 ml-2 rounded-xl font-semibold shadow-md hover:bg-blue-700 transition-all duration-300 sm:w-auto">
            Shop Now
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-blue-600">
          Shopping Cart
        </h1>

        <div className="space-y-6">
          {(isLoggedIn ? (cartItems) : (tempData)).map((item) => (
            <div
              key={`${item.productId}+${item.size}`}
              className="border-b pb-4 sm:pb-2"
            >
              {/* ✅ Small screens: 2-column layout, image left, details right */}
              <div className="grid grid-cols-[90px_1fr] gap-3 sm:flex sm:flex-row sm:items-start sm:justify-between">
                {/* Image */}
                <div className="flex justify-center sm:mr-4">
                  <img
                    src={item.images[0].url}
                    alt={item.productName}
                    className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-md"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  {/* Left section (name, and for small: stacked details) */}
                  <div className="flex-1 mb-2 sm:mb-0">
                    <p className="text-lg font-semibold text-gray-900">
                      {item.name}
                    </p>

                    {/* Mobile stacked details */}
                    <div className="block sm:hidden mt-2 space-y-1 text-gray-700 text-sm">
                      <p>Size: {item.size}</p>

                      <div className="flex items-center gap-2">
                        <span>Qty:</span>
                        <div className="flex items-center border rounded">
                          <button className="px-2 py-1 hover:cursor-pointer" onClick={()=> (isLoggedIn ? handleAddToCart({...item,quantity : -1}):handleAddToGuestCart({...item,quantity : -1}))}>-</button>
                          <input
                            type="number"
                            value={item.quantity}
                            className="w-10 text-center border-l border-r outline-none"
                            readOnly
                          />
                          <button className="px-2 py-1 hover:cursor-pointer" onClick={()=>(isLoggedIn ? handleAddToCart({...item,quantity : 1}):handleAddToGuestCart({...item,quantity : 1}))}>+</button>
                        </div>
                      </div>

                      <p>Price: ₹{item.price}</p>

                      <button className="text-red-500 text-sm hover:underline" onClick={(()=> (isLoggedIn ? handleRemoveItem(item):handleRemoveFromGuestCart(item)))}>
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* ✅ Desktop/tablet table-style layout */}
                  <div className="hidden sm:grid sm:grid-cols-5 sm:gap-4 sm:items-center w-full text-gray-700">
                    <p className="text-center">{item.size}</p>

                    <div className="flex justify-center items-center">
                      <div className="flex items-center border rounded">
                        <button className="px-2 py-1 hover:cursor-pointer" onClick={()=> (isLoggedIn ? handleAddToCart({...item,quantity : -1}):handleAddToGuestCart({...item,quantity : -1}))}>-</button>
                        <input
                          type="number"
                          value={item.quantity}
                          className="w-12 text-center border-l border-r outline-none"
                          readOnly
                        />
                        <button className="px-2 py-1 hover:cursor-pointer" onClick={()=>(isLoggedIn ? handleAddToCart({...item,quantity : 1}):handleAddToGuestCart({...item,quantity : 1}))}>+</button>
                      </div>
                    </div>

                    <p className="text-center font-semibold text-blue-700">
                      ₹{item.price}
                    </p>

                    <button className="text-red-500 text-sm hover:underline text-center" onClick={()=> (isLoggedIn ? handleRemoveItem(item) : handleRemoveFromGuestCart(item))}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Total & Checkout */}
       <div className="mt-10 border-t pt-6">
  <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
    {/* Left: Price Summary */}
    <div className="flex flex-col space-y-2 text-gray-800 ">
      <h2 className="text-lg font-semibold tracking-wide text-gray-700">Price Summary</h2>
      <div className="flex justify-between w-64 max-w-full text-sm">
        <span className="text-gray-600">Subtotal:</span>
        <span className="font-medium text-gray-800">
          ₹{(isLoggedIn ? cartItems : tempData).reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
        </span>
      </div>
      <div className="flex justify-between w-64 max-w-full text-sm">
        <span className="text-gray-600">Delivery Charges:</span>
        <span className="font-medium text-gray-800">
          ₹{(isLoggedIn ? cartItems : tempData).length > 0 ? 49 : 0}
        </span>
      </div>
      <div className="border-t mt-2 pt-2 flex justify-between w-64 max-w-full text-base font-semibold">
        <span className="text-gray-700">Total:</span>
        <span className="text-blue-700">
          ₹{(
            (isLoggedIn ? cartItems : tempData).reduce((acc, item) => acc + item.price * item.quantity, 0) +
            (cartItems.length > 0 ? 49 : 0)
          ).toFixed(2)}
        </span>
      </div>
    </div>

    {/* Right: Checkout Button */}
    <div className="flex flex-col items-end w-full sm:w-auto">
      <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 transition-all duration-300 w-full sm:w-auto" onClick={handleCheckOut}>
        Proceed to Checkout →
      </button>
      <p className="text-xs text-gray-500 mt-2">
        Safe and secure payments · 100% authentic products
      </p>
    </div>
  </div>
</div>
      </div>
    </div>
  );
};

export default Cart;
