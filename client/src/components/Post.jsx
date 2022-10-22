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
    <div className="rounded-lg bg-white my-6 px-8 py-3 pb-6 border shadow-xl">
      {/* {post.photo && <img className="postImg" src={PF + post.photo} alt="" />} */}
      <span className="flex justify-end text-blue-900 my-1">
            Author:<Link to={`/?user=${post.username}`} className="link mx-2">
                      <b> {post.username}</b>
                    </Link>
      </span>
      <div className="flex flex-col mt-1">
        <Link to={`/post/${post._id}`} className="object-contain" onClick={scrollPage}>
          <div className="postTitle font-semibold text-2xl">{post.title}</div>
        </Link>
        {/* <hr></hr> */}
        <div className="flex justify-between">
          <span className="postDate text-gray-500 w-1/3">
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
            <div>
              <span>Categories:</span>
              {post.categories.sort().map((category) => 
                <Link to={`/?cat=${category}`}><span className="mx-2 italic text-darkBlue">{category}</span></Link>
              )}
            </div>
            <Link to={`/post/${post._id}`}>
            <span className="flex text-darkBlue justify-end">Read more</span>
            </Link>
      </div>
    </div>
  );
};