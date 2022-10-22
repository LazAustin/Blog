import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import parser from 'html-react-parser';

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  // const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState(post.title);
  const [desc, setDesc] = useState(post.desc);
  const [categories, setCategories] = useState([])
  const [postCategories, setPostCategories] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);
  const [checked, setChecked] = useState([])
  var updatedList = [...checked]

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/api/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(parser(res.data.desc));
      const sortedCats = res.data.categories.sort().join(" ");
      console.log(sortedCats)
      setPostCategories(sortedCats);
    };
    getPost();
  }, [path]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/api/categories");
      const sortedCats = res.data.sort((a, b) => 
        a.name.localeCompare(b.name));
      setCategories(sortedCats);
    };
    getCats();
  }, [categories]);

  const handleCheck = (event) => {
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
    console.log(updatedList)
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
        categories: updatedList,
      });
      setUpdateMode(false)
      setPostCategories(updatedList.join(" "))
    } catch (err) {}
  };

  return (
    <div className="flex rounded">
      <div className="w-full flex flex-col space-y-3 bg-white rounded-lg shadow-default py-10 px-8">

        {/* Title and edit/delete buttons */}
        <div className="">

          {/* {post.photo && (
            <img src={PF + post.photo} alt="" className="singlePostImg" />
          )} // for displaying/editing/attaching photo to post // will add later */}

          {updateMode ? (
            <div>
              <div className="flex items-center space-x-6 mb-4">
                <input
                  type="text"
                  value={title}
                  placeholder={post.title}
                  className={`w-full py-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out`}
                  autoFocus
                  onChange={(e) => setTitle(e.target.value)}
                />
                <button onClick={() => setUpdateMode(false)} className="py-2 px-4 rounded-lg bg-red-50 hover:bg-red-900 hover:text-white">Cancel</button>
              </div>  
                <br/>
              <div className="flex justify-between">
                  {categories.map((category, index) => (
                    <div>
                      <input key={index} type="checkbox" value={category.name} onChange={handleCheck} />
                      <label> {category.name}</label>
                    </div>
                  ))} 
              </div>
            </div>
          ) : (
              <div className="flex justify-between items-center rounded-lg">

                <span>
                    <h1 className="flex text-2xl font-extrabold uppercase">
                      {title}
                    </h1>
                </span>
                <span className="justify-end mr-1">
                  {post.username === user?.username && (
                    <div className="flex items-center space-x-5">
                      <button
                        className="py-2 px-4 rounded-xl text-white bg-darkBlue"
                        onClick={() => setUpdateMode(true)}
                      >Edit</button>
                      <button
                        className="py-2 px-4 rounded-xl text-white bg-red-500"
                        onClick={handleDelete}
                      >Delete</button>
                    </div>
                  )}
                </span>
              </div>
          )}

        </div> 
        <h2>{post.categories && post.categories.map((category) => 
                <Link to={`/?cat=${category}`}><span className="mx-2 italic text-darkBlue">{category}</span></Link>
              )}</h2>
        <div className="flex justify-between">

            <span className="singlePostAuthor">
              Author:
              <Link to={`/?user=${post.username}`} className="link">
                <b> {post.username}</b>
              </Link>
            </span>
            <span className="text-gray-500 italic">
              {new Date(post.createdAt).toDateString()}
            </span>
        </div>
      <div>

        {updateMode ? (
          <textarea
          className="w-full px-2 py-2 text-gray-700 border rounded-lg focus:outline-none"

            value={desc}
            placeholder={post.desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="mt-6">{desc}</p>
        )}
        {updateMode && (
          <div className="flex justify-center items-center mt-3">
            <button 
            className={`bg-blue-500 py-2 px-4 w-1/2 text-white text-md rounded border border-yellow-200 focus:outline-none focus:border-darkBlue`} 
            onClick={handleUpdate}>
              Update
            </button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}