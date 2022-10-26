import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../img/lazPng1.png";

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/api/categories");
      const sortedCats = res.data.sort((a, b) => 
        a.name.localeCompare(b.name));
      console.log(sortedCats)
      setCats(sortedCats);
    };
    getCats();
  }, []);
  return (
    <div className="flex-col w-1/4 hidden md:flex my-3 ml-10"> {/*border-l-2 border-blue-800*/}

      <div className="flex flex-col items-center p-4">
        <span className="text-center border-y-2 border-yellow-400">ABOUT ME</span>
        <div className="my-2 ">
          <img
            src={require("../img/lazProf.jpg")}
            alt=""
            className="rounded-full w-3/4 mx-auto my-3 shadow-lg "
            />
        </div>
        <p className="text-center">
          I am a software developer with a passion for building stuff and doing nerdy things.
        </p>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-center border-y-2 border-yellow-400">CATEGORIES</span>
        <ul className="flex flex-wrap mt-2 justify-between">
          {cats.sort().map((c) => (
            <Link to={`/?cat=${c.name}`} key={c._id} className="p-1">
              <span className="">{c.name}</span>
            </Link>
          ))}
        </ul>
      </div>
      <div className="flex flex-col text-center items-center p-4">
        <span className="text-center border-y-2 border-yellow-400">FOLLOW ME</span>
        <div className="flex space-x-3 mt-2">
          <a href="https://github.com/lazaustin"><i className="fab fa-github-square mt-1"></i></a>
          <a href="https://www.linkedin.com/in/lazaustin/"><i className="fab fa-linkedin mt-1"></i></a>
          {/* <i><img src={logo} alt="" className="max-h-6"/></i> */}
          <a href="https://stackoverflow.com/users/12333367/laz-austin"><i className="fab fa-stack-overflow mt-1"></i></a>
        </div>
      </div>
    </div>
  );
}
