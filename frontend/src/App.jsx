import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Products from './pages/Products'
import Cart from './pages/Cart'
import { Provider } from 'react-redux'
import store from './store'
import ProductDetails from './pages/ProductDetails'
import Settings from './pages/Settings'
import CreateNewAccount from './pages/CreateNewAccount'
import ComingSoon from './pages/comingSoon'


const router = createBrowserRouter(
  [
    {
      path:'/', 
      element:
      <>
      <Navbar/>
      <Home/>
      <Footer/>
      </>
    },
    {
      path:'/login', 
      element:<Login/>
    },
    {
      path: '/about',
      element: 
      <>
        <Navbar/>
        <About/>
        <Footer/>
      </>
    },
    {
      path: '/contact',
      element: 
      <>
        <Navbar/>
        <Contact/>
        <Footer/>
      </>
    },
    {
      path: '/settings',
      element: <Settings/>
    },
    {
      path: '/products',
      element:
      <>
      <Navbar/>
      <Products/>
      <Footer/>
      </> 
    },
    {
      path: '/cart',
      element: 
      <>
      <Navbar/>
      <Cart/>
      <Footer/>
      </>
    },
    {
      path: '/products/:id',
      element: 
      <>
      <Navbar/>
      <ProductDetails/>
      <Footer/>
      </>
    },
    {
      path: '/register',
      element : <CreateNewAccount/>
    },
    {
      path: '/comingsoon',
      element : <>
      <Navbar/>
      <ComingSoon/>
      <Footer/>
      </>
    }
  ]
)


function App() {
  return (
    <div>
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
    </div>

  )
}

export default App
