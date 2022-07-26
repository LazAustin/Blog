import Post from "./Post";

export default function Posts({ posts }) {
  return (
    <>
        <h1 className="flex justify-center text-blue-900 text-2xl font-bold">Blog Posts</h1>
        <div className="posts">
          {posts.map((p) => (

              <Post key={p._id} post={p}/>
          ))}
        </div>
    </>
  );
}
