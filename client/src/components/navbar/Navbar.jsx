import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Navbar.scss";

const Navbar = () => {
    const [active, setActive] = useState(false);
    const [open, setOpen] = useState(false);
    const { pathname } = useLocation();

    const isActive = () => {
        window.scrollY > 0 ? setActive(true) : setActive(false);
    };

    useEffect(() => {
        window.addEventListener("scroll", isActive);
        return () => {
            window.removeEventListener("scroll", isActive);
        };
    }, []);

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const navigate = useNavigate();
  
    const handleLogout = async() => {
        try {
            await newRequest.post("/api/auth/logout");
            localStorage.setItem("currentUser", null);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
            <div className="container">
                <div className="logo">
                    <Link className="link" to="/">
                        <span className="text">Hiverr</span>
                    </Link>
                    <span className="dot">.</span>
                </div>
                <div className="links">
                    <span>Hiverr Business</span>
                    <span>Explore</span>
                    <span>English</span>
                    {!currentUser?.isSeller && <span>Become a Seller</span>}
                    {currentUser ? (
                        <div className="user" onClick={()=>setOpen(!open)}>
                            <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
                            <span>{currentUser?.username}</span>
                            {open && <div className="options">
                                {currentUser.isSeller && (
                                    <>
                                        <Link to="/mygigs" className="link dropDown">Gigs</Link>
                                        <Link to="/add" className="link dropDown">Add New Gig</Link>
                                    </>
                                )}
                                <Link to="/orders" className="link dropDown">Orders</Link>
                                <Link to="/messages" className="link dropDown">Messages</Link>
                                <Link to="/" className="link dropDown" onClick={handleLogout}>Logout</Link>
                            </div>}
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="link">Sign in</Link>
                            <Link to="/register" className="link">
                                <button>Join</button>
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {(active || pathname!=="/") && (
                <>
                    <hr />
                    <div className="menu">
                        <Link className="link menuLink" to="/">
                            Graphics & Design
                        </Link>
                        <Link className="link menuLink" to="/">
                            Video & Animation
                        </Link>
                        <Link className="link menuLink" to="/">
                            Writing & Translation
                        </Link>
                        <Link className="link menuLink" to="/">
                            AI Services
                        </Link>
                        <Link className="link menuLink" to="/">
                            Digital Marketing
                        </Link>
                        <Link className="link menuLink" to="/">
                            Music & Audio
                        </Link>
                        <Link className="link menuLink" to="/">
                            Programming & Tech
                        </Link>
                        <Link className="link menuLink" to="/">
                            Business
                        </Link>
                        <Link className="link menuLink" to="/">
                            Lifestyle
                        </Link>
                    </div>
                    <hr />
                </>
            )}
        </div>
    );
};

export default Navbar;