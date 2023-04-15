import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import upload from "../../utils/upload";
import "./Register.scss";

const Register = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        img: "",
        country: "India",
        phone: "",
        desc: "",
        isSeller: false,
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        });
    };

    const handleSeller = (e) => {
        setUser((prev) => {
            return { ...prev, isSeller: e.target.checked };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = await upload(file);
        try {
            await newRequest.post("/api/auth/register", {
                ...user,
                img: url,
            });
            navigate("/")
        } catch (err) {
            console.log(err);
            setError(err.response.data);
        }
    };

    return (
        <div className="registerContainer">
            <div className="registerWrapper">
                <h1 className="title">Create a new account!</h1>
                <form onSubmit={handleSubmit}>
                    <div className="formBox">
                        <div className="left">
                            <label htmlFor="username">Username</label>
                            <input 
                                type="text" 
                                name="username"
                                id="username"
                                placeholder="Username"
                                onChange={handleChange}
                            />
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                name="email"
                                id="email"
                                placeholder="Email"
                                onChange={handleChange}    
                            />
                            <label htmlFor="pwd">Password</label>
                            <input 
                                type="password" 
                                name="password"
                                id="password"
                                placeholder="Password"
                                onChange={handleChange}    
                            />
                            <label htmlFor="profilePic">Profile Picture</label>
                            <input 
                                type="file" 
                                id="profilePic"
                                name="profilePic"
                                placeholder="Profile Picture"
                                onChange={(e)=>setFile(e.target.files[0])}    
                            />
                            <label htmlFor="country">Country</label>
                            <input 
                                type="text" 
                                name="country"
                                id="country"
                                placeholder="Country"
                                onChange={handleChange}    
                            />
                        </div>
                        <div className="right">
                            <h1 className="rightTitle">I want to become a seller</h1>
                            <div className="toggle">
                                <label htmlFor="">Activate the seller account</label>
                                <label htmlFor="tog" className="switch">
                                    <input id="tog" type="checkbox" onChange={handleSeller} />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                            <label htmlFor="phone">Phone Number</label>
                            <input 
                                type="text" 
                                name="phone"
                                id="phone"
                                placeholder="Phone Number"
                                onChange={handleChange}    
                            />
                            <label htmlFor="desc">Description</label>
                            <textarea
                                placeholder="A short description of yourself"
                                name="desc"
                                id="desc"
                                cols="30"
                                rows="10"
                                onChange={handleChange}
                            ></textarea>
                        </div>
                    </div>
                    <button type="submit">Register</button>
                    {error && (
                        <span className="errorSpan">{error}</span>
                    )}
                </form>
            </div>
        </div>
    )
}

export default Register;
