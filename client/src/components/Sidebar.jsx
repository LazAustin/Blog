import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="hidden flex-col w-1/4 bg-white rounded-lg md:flex m-3">

      <div className="flex flex-col items-center p-4">
        <span className="text-center border-y-2 w-[60%]">ABOUT ME</span>
        <div className="w-3/4 my-2">
            <img
            src={require("../img/lazProf.jpg")}
            alt=""
            className="rounded-full"
            />
        </div>
          <p>
            I am a software developer with a passion for building stuff and doing dorky things.
          </p>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-center border-y-2 w-[60%]">CATEGORIES</span>
        <ul className="flex flex-wrap mt-2">
          {cats.map((c) => (
            <Link to={`/?cat=${c.name}`} key={c._id} className="p-1">
              <li className="">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="flex flex-col items-center p-4">
        <span className="text-center border-y-2 w-[60%]">FOLLOW ME</span>
        <div className="flex space-x-3 mt-2">
          <i className="fab fa-facebook-square"></i>
          <i className="fab fa-twitter-square"></i>
          <i className="fab fa-pinterest-square"></i>
          <i className="fab fa-instagram-square"></i>
        </div>
      </div>
    </div>
  );
}
