import Post from "./Post";
import { useState } from "react";
import ReactPaginate from 'react-paginate';

export default function Posts({ posts }) {

  const [pageNumber, setPageNumber] = useState(0);

  const postsPerPage = 5;
  const pagesVisited = pageNumber * postsPerPage;
  const pageCount = Math.ceil(posts.length / postsPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected);
    window.scrollTo(0, 100);
  }

  return (
    <div className="container flex flex-col h-full justify-between">
      {/* <div className="my-10 text-2xl font-serif ">Welcome to my blog! This is where I post all my commenhatery. Feel free to drink the haterade.</div> */}
      <div class="bg-blue-200 border border-darkBlue text-blue-700 px-4 py-3 mx-10 mb-10" role="alert">
        <p class="font-bold">Under Construction</p>
        <p class="text-sm">Undergoing significant changes. Next up: Added a WYSIWYG text editor to the Write page for registered users, but still need to add it to the post edit functionality. Next, adding better error handling for logging in and updating settings. Then adding article tags. After this site has been up a while, I will add Next.js for better SEO, but I want to have a "slow opening" to work out the kinks.</p>
        <br/>
        <p class="font-bold">Employers</p>
        <p class="text-sm">If you are here to check out my work, feel free to sign in and out or play around (test account: "employer" pass: "Pword")</p>
      </div>
      <div className="">
        <h1 className="flex justify-center text-blue-900 text-2xl font-bold font-serif align-top">Posts</h1>
        <div className="posts">
          {posts.sort( (a,b) => {return new Date(b.createdAt) - new Date(a.createdAt);}).slice(pagesVisited, pagesVisited + postsPerPage).map((p) => (
              <Post key={p._id} post={p}/>
          ))}
        </div>
      </div>
      <ReactPaginate
        previousLabel = {"Previous"}
        nextLabel = {"Next"}
        pageCount = {pageCount}
        onPageChange = {changePage}
        containerClassName = {"paginationButtons"}
        previousLinkClassName = {"previousButton"}
        nextLinkClassName = {"nextButton"}
        disabledClassName = {"paginationDisabled"}
        activeClassName = {"paginationActive"}
      />
    </div>
  );
}
