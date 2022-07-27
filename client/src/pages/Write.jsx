import { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../context/Context";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    // if (file) {
    //   const data =new FormData();
    //   const filename = Date.now() + file.name;
    //   data.append("name", filename);
    //   data.append("file", file);
    //   newPost.photo = filename;
    //   try {
    //     await axios.post("/upload", data);
    //   } catch (err) {}
    // }
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };
  return (
    <div className="w-full flex m-auto bg-red-50">
      <div className="w-full bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-8 m-8">
      {file && (
        <img className="" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="" className="flex items-center">
            <i className="fas fa-plus bg-blue-500 rounded-full m-3 p-3"></i>
            <span>Add a Picture to your post</span>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
        </div>
        <div className="">
          <textarea
            placeholder="What's on your mind...?"
            type="text"
            className="w-full px-2 py-2 text-gray-700 border rounded-lg focus:outline-none"
            rows="4"
            resize
            onChange={e=>setDesc(e.target.value)}
          ></textarea>
        </div>
        <div className='flex justify-center items-center mt-6'>
          <button 
            className={`bg-blue-500 py-2 px-4 w-1/2 text-white text-md rounded border border-yellow-200 focus:outline-none focus:border-darkBlue`} 
            type="submit"
            >
              Publish
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}
