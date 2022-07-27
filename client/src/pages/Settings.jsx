import { useContext, useState } from "react";
import { Context } from "../context/Context";
import axios from "axios";

export default function Settings() {

  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);
  // const PF = "http://localhost:5000/images/"

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  return (
    <div className="h-full flex mx-auto bg-red-50">
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
        <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>
          Update Your Account
        </h1>
        <form className="flex flex-col p-6 bg-yellow-50 border-1 rounded-xl" onSubmit={handleSubmit}>
          <div>
            <div className="shrink-0 m-2 flex items-center space-x-3">
              <img 
                className="h-16 w-16 object-cover rounded-full"
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
                alt="Current profile photo" 
              />
              <span htmlFor="sr-only">
                Change Profile Photo
              </span>
            </div>
            <label className="block space-y-2 mb-3 cursor-pointer">
              <input
                id="fileInput"
                type="file"
                // style={{ display: "none" }}
                className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-900
                hover:file:bg-blue-100"
              />
            </label>
            <label>Username</label>
            <input 
              type="text" 
              placeholder={user.username} 
              value={user.username}
              name="name" 
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              onChange={(e) => setUsername(e.target.value)}
              />
            <label>Email</label>
            <input 
              type="email" 
              placeholder={user.email} 
              value={user.email}
              name="email" 
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              onChange={(e) => setEmail(e.target.value)}
              />
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Enter new password" 
              value={password}
              name="password" 
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              onChange={(e) => setPassword(e.target.value)}
              />
            <div className='flex justify-center items-center mt-6'>
              <button 
                className={`bg-blue-500 py-2 px-4 w-1/2 text-white text-md rounded border border-yellow-200 focus:outline-none focus:border-darkBlue`} 
                type="submit"
                >
                  Update
              </button>
              {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}