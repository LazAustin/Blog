import { Link } from "react-router-dom";

export default function Post({ post }) {
  const PF = "";
  return (
    <div className="post rounded-lg bg-white m-6 p-3">
      {/* {post.photo && <img className="postImg" src={PF + post.photo} alt="" />} */}
      <div className="postInfo flex flex-col">
        <div className="postCats">
          {post.categories.map((c) => (
            <span className="postCat">{c.name}</span>
          ))}
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle font-semibold text-2xl ">{post.title}</span>
        </Link>
        {/* <hr></hr> */}
        <div className="flex justify-between">
          <span className="postDate text-gray-500 w-1/3">
            {new Date(post.createdAt).toDateString()}
          </span>
          <span className="text-blue-900">
            Author: <Link to={`/?user=${post.username}`} className="link">
                      <b> {post.username}</b>
                    </Link>
          </span>
        </div>
      </div>
      <p className="postDesc font-normal text-lg">{post.desc}</p>
    </div>
  );
}