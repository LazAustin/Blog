import { useContext } from "react";
import { Context } from "./context/Context";
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import About from "./pages/About"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Write from "./pages/Write"
import Settings from "./pages/Settings"
import Single from "./pages/Single"
import Sidebar from "./components/Sidebar"
import Footer from "./components/Footer"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";



function App() {

  const { user } = useContext(Context);  

  return (
    <Router>
      <Navbar />
      <div className="container flex flex-row relative rounded-lg mx-auto "> {/* bg-gray-50 */}
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/login" element={user ? <Home /> : <Login /> }/>
          <Route path="/register" element={user ? <Home /> : <Register />}/>
          {/* <Route path="/write" element={user ? <Write /> : <Register />}/> */}
          <Route path="/write" element={<Write />}/>
          <Route path="/settings" element={user ? <Settings /> : <Register />}/>
          <Route path="/post/:postId" element={<Single />}/>          
        </Routes>
        <Sidebar />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
