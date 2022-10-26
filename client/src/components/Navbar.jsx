import { Context } from "../context/Context";
import axios from "axios";
import logo from "../img/lazPng1.png";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  // const PF = "http://localhost:5000/images/"

  const [cats, setCats] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { user, dispatch } = useContext(Context); 

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    if (isOpen) {
      toggle();
    }
  };

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/api/categories");
      const sortedCats = res.data.sort((a, b) => 
      a.name.localeCompare(b.name))
      console.log(sortedCats)
      setCats(sortedCats);
    };
    getCats();
  }, []);

  return (
    <>
      <div className="border-b-4 border-yellow-400 bg-blue-900 text-white"> {/*bg-yellow-400*/}
      <nav className="relative container mx-auto">
        {/* Flex Container */}
        <div className="flex justify-between items-center"> {/* bg-yellow-400 ?*/}
          {/* Logo */}
          <div className="pt-2 ml-3 flex items-center space-x-5">
            <div className="flex">
              <Link to="/"><img src={logo} alt="" className="h-20" /></Link>
            </div>
            <div className="text-2xl font-mono">
              The<span class=" ml-2 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-yellow-400 relative inline-block">
                    <span class="relative text-blue-900">Commenhater</span>
                  </span>
            </div>
            {/* <div className="flex-col">
              <h1 className="text-xl">The Hater Aid</h1>
              <h5 className="text-sm">Commenhatery by an everyday commenhater.</h5>  
            </div>         */}
          </div>
          {/* Menu Items */}
          <div className="flex items-center space-x-10">
          <div className="hidden md:flex space-x-12">
            <Link to="/" className="hover:text-yellow-400 font-bold">Home</Link>
            <Link to="/about" className="hover:text-yellow-400 font-bold">About</Link>
            {/* <Link to="#" className="hover:text-blue-900 font-bold">Contact</Link> */}
            <Link to="/settings" className={`hover:text-yellow-400 font-bold ${!user ? "hidden" : ""}`}>Settings</Link>
            <Link to="/write" className={`hover:text-yellow-400 font-bold ${!user ? "hidden" : ""}`}>Write</Link>
          </div>
          <div className="hidden md:flex text-white m-3 space-x-2">
            <Link to="/login" className={` rounded-full baseline p-3 mx- pt-2  font-bold bg-yellow-400 text-blue-900 ${user ? "hidden" : ""}`}>Login</Link>
            <Link to="/register" className={` rounded-full baseline p-3 mx- pt-2  font-bold bg-yellow-400 text-blue-900 ${user ? "hidden" : ""}`}>Register</Link>
            <button onClick={handleLogout} className={` rounded-full baseline p-3 mx-3 pt-2 bg-yellow-400 text-blue-900 font-bold ${!user ? "hidden" : ""}`}>Logout</button>
          </div>
        {/* Hamburger Icon */}
          <button id="menu-btn" className={`block hamburger md:hidden focus:outline-none m-6 mb-3 ${isOpen ? "open" : ""}`} onClick={toggle}>
              <span className="hamburger-top"></span>
              <span className="hamburger-middle"></span>
              <span className="hamburger-bottom"></span>
          </button>
          </div>
        </div>
        {/* Mobile Menu */}
        <div className="md:hidden">
          <div id='menu' className={`absolute flex-col items-center self-end py-8 mt-10 space-y-6 font-bold bg-yellow-500 rounded-xl ${isOpen ? "flex" : "hidden"} sm:w-auto sm:self-center left-6 right-6 drop-shadow-md z-10`}>
            <Link to="/" onClick={toggle} className="hover:text-blue-900 font-bold">Home</Link>
            <Link to="#" onClick={toggle} className="hover:text-blue-900 font-bold">About</Link>
            <Link to="#" onClick={toggle} className="hover:text-blue-900 font-bold">Contact</Link>
            <Link to="/settings" onClick={toggle} className="hover:text-blue-900 font-bold">Settings</Link>
            <Link to="/write" onClick={toggle} className={`hover:text-blue-900 font-bold ${!user ? "hidden" : ""}`}>Write</Link>
            <Link to="/login" onClick={toggle} className={` rounded-xl baseline p-3 mx- pt-2 text-white  font-bold ${user ? "hidden" : ""}`}>Login</Link>
            <Link to="/register" onClick={toggle} className={` rounded-xl baseline p-3 mx- pt-2 text-white font-bold first-line:${user ? "hidden" : ""}`}>Register</Link>
            <button onClick={handleLogout} className= {`rounded-xl baseline p-3 mx-3 pt-2 text-white font-bold ${!user ? "hidden" : ""}`}>Logout</button>
          </div>
        </div>
      </nav>
      </div>
        {/* Category Menu */}
      <nav className="container w-full flex justify-between space-x-6 mx-auto px-auto py-2"> {/* bg-gray-200 */}
        <div className="hidden md:flex w-full justify-between mx-auto">
          {cats.map((category) => (
            <div className="flex justify-between mx-auto items-center">
              <Link to={`/?cat=${category.name}`} key={category._id} className="p-1">
                <div  className="flex flex-row">
                  <i className="text-blue-800 font-bold">{category.name}</i>
                </div>              
              </Link>  
            </div>
            ))}
          </div>
      </nav> 
       
    </>
  );
}
