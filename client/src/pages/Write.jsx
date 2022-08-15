import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Context } from "../context/Context";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  // const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  const [cats, setCats] = useState([]);
  const [checked, setChecked] = useState([]);


  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/api/categories");
      setCats(res.data);
    };
    getCats();
  }, []);

  const handleChecked = (e) => {
    if (e.target.checked) {
      setCats([...checked, {
        name: cats.name,
      }]);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      cats,
    };
    try {
      const res = await axios.post("/api/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };


  return (
    <div className="w-full flex mx-auto">
      <div className="w-full bg-white rounded-md border border-primaryBorder shadow-default py-10 px-8 m-8">
      {/* {file && (
        <img className="" src={URL.createObjectURL(file)} alt="" />
      )} */}
      <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
        <div className="flex justify-between">
          {cats.map((category, index) => (
            <div>
              <input key={index} type="checkbox" value={cats} onChanged={e => handleChecked(e.target.value)}/>
              <label> {category.name}</label>
            </div>
          ))} 
          
        </div>
        <div className="">
          <label htmlFor="title" className="font-bold m-1">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Title"
            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
        </div>
        <div className="">
        <label htmlFor="content" className="font-bold m-1">Content</label>
          <textarea
            id="content"
            placeholder="Copy and paste or write your post here..."
            type="text"
            className="w-full px-2 py-2 text-gray-700 border rounded-lg focus:outline-none"
            rows="15"
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
