import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../context/Context";
import Tiptap from "../components/TipTap";
import parser from 'html-react-parser'

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  // const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);

  const navigate = useNavigate();
  var updatedList = [...checked]; // Add/Remove checked item from list

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/api/categories");
      const sortedCats = res.data.sort((a, b) => 
        a.name.localeCompare(b.name));
      setCategories(sortedCats);
    };
    getCats();
    console.log(desc);
  }, []);

  const handleCheck = (event) => {
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
    console.log(updatedList)
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      categories: updatedList,
    };
    try {
      const res = await axios.post("/api/posts", newPost);
      {/* window.location.replace("/post/" + res.data._id); */}
      navigate("/")
      console.log(res.data);
    } catch (err) {}
  };


  return (
    <div className="w-full flex mx-auto">
      <div className="w-full bg-white rounded-md border border-primaryBorder shadow-default py-10 px-8 m-8">
      {/* {file && (
        <img className="" src={URL.createObjectURL(file)} alt="" />
      )} */}
      <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
        <div className="flex flex-wrap justify-between m-2">
          {categories.map((category, index) => (
            <div>
              <input key={index} type="checkbox" value={category.name} onChange={handleCheck} />
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
          
          <Tiptap setDesc={setDesc} type="button"/>
          
          {/* <textarea
            id="content"
            placeholder="Copy and paste or write your post here..."
            type="text"
            className="w-full px-2 py-2 text-gray-700 border rounded-lg focus:outline-none"
            rows="15"
            resize
            onChange={e=>setDesc(e.target.value)}
          ></textarea> */}
        </div>
        <div className='flex justify-center items-center mt-6'>
          <button 
            className={`bg-red-800 py-2 px-4 w-1/2 text-white text-md rounded border border-yellow-200 focus:outline-none focus:border-darkBlue`} 
            type="submit"
            >
              Publish
          </button>
        </div>
      </form>
      
      <div className="mt-5">
          <h1 className="flex text-2xl font-extrabold uppercase">
            {title}
          </h1>
          <p className="ProseMirror border-0">{parser(desc)}</p>
      </div>
      </div>
    </div>
  );
}
