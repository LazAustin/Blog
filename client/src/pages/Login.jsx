import axios from "axios";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { LoginFailure, LoginStart, LoginSuccess } from "../context/Actions";
import { Context, ContextProvider } from "../context/Context";

export default function Login() {
    
  const userRef = useRef();
  const passwordRef = useRef();
  const { state, dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(LoginStart);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch(LoginSuccess(res.data));
    } catch (err) {
      dispatch(LoginFailure);
    }
  };

  return (
    <div className="h-full flex m-auto bg-red-50">
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
        <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>
                    Log in to your account 🔐
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input
              type="text"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              placeholder="Enter your username..."
              ref={userRef}
            />
            <label>Password</label>
            <input
              type="password"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              placeholder="Enter your password..."
              ref={passwordRef}
            />
            <div className='flex justify-center items-center mt-6'>
              <button 
                className={`bg-blue-500 py-2 px-4 w-1/2 text-white text-md rounded border border-yellow-200 focus:outline-none focus:border-darkBlue`} 
                type="submit" 
                disabled={isFetching}
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}