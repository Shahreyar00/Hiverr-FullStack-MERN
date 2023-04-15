import React, { useState } from "react";
import "./Login.scss";
import newRequest from "../../utils/newRequest";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await newRequest.post("/api/auth/login", { username, password });
            localStorage.setItem("currentUser", JSON.stringify(res.data));
            navigate("/")
        } catch (err) {
            setError(err.response.data);
        }
    };

    return (
        <div className="loginContainer">
            <div className="loginWrapper">
                <h1 className="title">Sign in</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        id="username"
                        name="username"
                        placeholder="Username"
                        onChange={(e)=>setUsername(e.target.value)}    
                    />

                    <label htmlFor="pwd">Password</label>
                    <input 
                        type="password" 
                        id="pwd"
                        name="password"
                        placeholder="Password"
                        onChange={(e)=>setPassword(e.target.value)}    
                        />

                    <button type="submit">Login</button>
                    {error && (
                        <span className="errorSpan">{error}</span>
                    )}
                    <span className="forPass">DO NOT REMEMBER YOUR PASSWORD!</span>
                    <Link to="/register" className="link">
                        <span className="forReg">Not Registered! CREATE A NEW ACCOUNT</span>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Login;


// import React, { useState } from "react";
// import "./Login.scss";
// import newRequest from "../../utils/newRequest";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState(null);

//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await newRequest.post("/api/auth/login", { username, password });
//             localStorage.setItem("currentUser", JSON.stringify(res.data));
//             navigate("/")
//         } catch (err) {
//             setError(err.response.data);
//         }
//     };

//     return (
//         <div className="login">
//             <form onSubmit={handleSubmit}>
//                 <h1>Sign in</h1>
//                 <label htmlFor="">Username</label>
//                 <input
//                     name="username"
//                     type="text"
//                     placeholder="Username"
//                     onChange={(e) => setUsername(e.target.value)}
//                 />

//                 <label htmlFor="">Password</label>
//                 <input
//                     name="password"
//                     type="password"
//                     placeholder="Password"
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <button type="submit">Login</button>
//                 {error && error}
//             </form>
//         </div>
//     );
// }

// export default Login;
