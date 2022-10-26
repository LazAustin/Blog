import { Link } from "react-router-dom";
import parser from 'html-react-parser'

export default function Post({ post }) {

  console.log(post);

  const firstThreeSentences = post.desc.split(".", 3).join() + "...";

  console.log(firstThreeSentences)

  const scrollPage = () => {
    window.scrollTo(0, 100);
  }


  return (
    <div className="rounded-lg bg-white my-6 px-8 py-3 pb-6 border shadow shadow-yellow-400/25">
      {/* {post.photo && <img className="postImg" src={PF + post.photo} alt="" />} */}
      <span className="flex justify-end text-blue-900 my-1">
            Author:<Link to={`/?user=${post.username}`} className="link mx-2 text-blue-800">
                      <b> {post.username}</b>
                    </Link>
      </span>
      <div className="flex flex-col mt-1">
        <Link to={`/post/${post._id}`} className="object-contain" onClick={scrollPage}>
          <div className="postTitle font-semibold text-2xl text-blue-900 mb-2 font-serif">{post.title}</div>
        </Link>
        {/* <hr></hr> */}
        <div className="flex justify-between">
          <span className="postDate text-yellow-400 w-1/3 mb-2">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
      </div>
      <div className="">
        <p className="postMirror font-normal text-lg">
          {parser(firstThreeSentences)}
        </p>
      </div>
      <div className="flex text-sm justify-between mt-5">
            {/* <span className="font-bold mx-1 italic">
              Categories: 
            </span> */}
            <div className="flex flex-wrap mr-2">
              <span className="text-blue-900 font-semibold">Categories:</span>
              {post.categories.sort().map((category) => 
                <Link to={`/?cat=${category}`}><span className="mx-2 italic text-red-800">{category}</span></Link>
              )}
            </div>
            <Link to={`/post/${post._id}`}>
            <span className="flex text-blue-900 text-lg font-semibold justify-end">Read more</span>
            </Link>
      </div>
    </div>
  );
};