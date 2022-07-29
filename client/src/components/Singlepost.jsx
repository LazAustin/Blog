import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  // const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState(post.title);
  const [desc, setDesc] = useState(post.desc);
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("http://localhost:5000/api/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false)
    } catch (err) {}
  };

  return (
    <div className="flex bg-red-50 ">
      <div className="w-full flex flex-col space-y-3 bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-8">

        {/* Title and edit/delete buttons */}
        <div className="">

          {/* {post.photo && (
            <img src={PF + post.photo} alt="" className="singlePostImg" />
          )} // for displaying/editing/attaching photo to post // will add later */}

          {updateMode ? (
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
          ) : (
              <div className="flex justify-between items-center bg-red-50">

                <span>
                    <h1 className="flex text-2xl font-extrabold uppercase">
                      {title}
                    </h1>
                </span>
                <span className="justify-end mr-1">
                  {post.username === user?.username && (
                    <div className="flex items-center space-x-5">
                      <button
                        className="py-2 px-4 rounded-xl text-white bg-gray-400"
                        onClick={() => setUpdateMode(true)}
                      >Edit</button>
                      <button
                        className="py-2 px-4 rounded-xl text-white bg-gray-400"
                        onClick={handleDelete}
                      >Delete</button>
                    </div>
                  )}
                </span>
              </div>
          )}

        </div> 
        <div className="flex justify-between bg-yellow-50">

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