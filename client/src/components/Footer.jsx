import logo2 from "../img/lazPng2.png";
import axios from "axios"
import { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom"
import emailjs from "@emailjs/browser";
import { Context } from "../context/Context";


export default function Footer(second) {

    const [cats, setCats] = useState([]);
    const [done, setDone] = useState(false);
    const formRef = useRef();
    const { user } = useContext(Context); 


    const handleSubmit = (e) => {
        e.preventDefault();
        emailjs
          .sendForm(
            "blog_contact_service",
            "blog_template",
            formRef.current,
            "BHdTw7doJu0GGI8qd"
          )
          .then(
            (result) => {
              console.log(result.text);
              setDone(true)
            },
            (error) => {
              console.log(error.text);
            }
          );
      };

    useEffect(() => {
        const getCats = async () => {
          const res = await axios.get("/api/categories");
          const sortedCats = res.data.sort((a, b) => 
          a.name.localeCompare(b.name))
          console.log(sortedCats)
          setCats(sortedCats);
        };
        getCats();
      }, []);

    return (
        <div className="border-t-4 border-yellow-400 mt-10 bg-gradient-to-l from-blue-900 to-blue-700">
            <div className="container mx-auto">
                <div className="pt-2 mt-2 flex">
                    <div  className=" max-w-[15%] my-auto"><img src={logo2} alt="" className=""/></div>
                    <div className="container flex-col mx-12">
                        <div className="container flex justify-around my-auto py-2">
                            <div className="flex flex-col text-white">        
                                <div className="underline font-bold italic text-yellow-400">MENU</div>
                                <Link to="/"><ul>Home</ul></Link>
                                <Link to="/about"><ul>About</ul></Link>
                                <Link to="/settings"><ul>Settings</ul></Link>
                                {!user && <Link to="/login"><ul>Login</ul></Link>}
                                {!user && <Link to="/register"><ul>Register</ul></Link>}
                            </div>
                            <div className="flex flex-col text-white">
                                <div className="underline font-bold italic text-yellow-400">AFFILLIATED LINKS</div>
                                    <a href="https://lazthedev.com"><ul>Laz's Portfolio Website</ul></a>
                                    <a href="https://github.com/lazaustin"><ul>Github</ul></a>
                                    <a href="https://stackoverflow.com/users/12333367/laz-austin"><ul>Stack Overflow</ul></a>
                                    <a href="https://www.linkedin.com/in/lazaustin/"><ul>LinkedIn</ul></a>
                            </div>
                            <div className="flex flex-col text-white">
                                <div className="underline font-bold italic text-yellow-400">CATEGORIES</div>
                                {cats.map((category) => (
                                    <Link to={`/?cat=${category.name}`} key={category._id} className="">
                                        <ul>{category.name}</ul>                
                                    </Link>  
                                ))}
                            </div>
                        </div>
                        <div className="px-20">
                            <div className="flex text-white">
                                <h1 className="text-xl font-bold mx-2 mt-6">Need to contact me?</h1>
                                <p className="mt-7">Send me an email below.</p>
                            
                            </div>
                            <form className="flex flex-col" ref={formRef} onSubmit={handleSubmit}>
                                <input type="text" placeholder="Name" name="user_name" className="bg-inherit w-1/2 h-8 my-1 pl-3 rounded outline-none border-b border-yellow-400 text-blue-500 italic"/>
                                <input type="text" placeholder="Subject" name="user_subject" className="bg-inherit w-1/2 h-8 my-1 pl-3 rounded outline-none border-b border-yellow-400 text-blue-500 italic"/>
                                <input type="text" placeholder="Email" name="user_email" className="bg-inherit w-1/2 h-8 my-1 pl-3 rounded outline-none border-b border-yellow-400 text-blue-500 italic"/>
                                <textarea rows="6" placeholder="Enter your message here." name="message" className="bg-gray-200 w-[100%] h-12 mt-4 mb-6 pl-3 py-2 rounded"></textarea>
                                {done &&
                                    <div class="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 mb-5" role="alert">
                                        <p class="font-bold">Success!</p>
                                        <p class="text-sm">Thank you for reaching out. An email has been sent, and we will get back to you as soon as possible.</p>
                                    </div>
                                }
                                <button className="w-28 h-10 bg-yellow-400 rounded font-bold cursor-pointer mb-5">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    )
}