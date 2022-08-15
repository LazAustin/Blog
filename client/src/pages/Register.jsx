import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("/api/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/api/login");
      console.log("handleSubmit issue", res.data);
    } catch (err) {
      setError(true)
      console.log("handleSubmit issue", err);
    }
  };
  return (
    <div className="h-full flex m-auto bg-red-50">
      <div className="w-full max-w-md m-auto bg-white rounded-lg shadow-default py-10 px-16">
        <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>
                    Register here for an account
        </h1>
        <form className="registerForm" onSubmit={handleSubmit}>
          <div>
            <label className="font-bold">Username</label>
            <input
              type="text"
              className={`enabled:hover:border-yellow-400 w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              placeholder="Enter your username..."
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className="font-bold">Email</label>
            <input
              type="text"
              className={`enabled:hover:border-yellow-400 w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              placeholder="Enter your email..."
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="font-bold">Password</label>
            <input
              type="password"
              className={`enabled:hover:border-yellow-400 w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              placeholder="Enter your password..."
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className='flex justify-center items-center mt-6'>
              <button 
                className={`bg-blue-900 py-2 px-4 w-1/2 text-white text-md rounded border border-yellow-200 focus:outline-none focus:border-darkBlue`} 
                type="submit">
                Register
              </button>
            </div>
          </div>
        </form>
        {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
      </div>
    </div>
  );
}
