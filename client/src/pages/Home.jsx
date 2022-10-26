import Posts from "../components/Posts";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router";

export default function Home() {

  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("api/posts" + search);
      console.log(res);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      <div className="flex flex-col mx-auto w-full px-6 pt-12 mr-10"> {/* bg-yellow-400 */}
            <Posts posts={posts} className="border-3 "/> {/* border-black */}
      </div>
    </>
  )
}
