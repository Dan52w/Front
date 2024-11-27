import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "./heading";

const Login = () => {
    const inputClass = "w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out";
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            alert("Please enter both username and password.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/v1/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                alert(`Login successful! Welcome, ${data.username}`);
                
                localStorage.setItem("authToken", data.token);
                localStorage.setItem("isAuthenticated", "true");
                localStorage.setItem("username", data.username);
                
                navigate("/");
            } else {
                alert("Invalid username or password.");
            }
        } catch (error) {
            console.error("Error logging in:", error);
            alert("An error occurred while logging in.");
        }
    };

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
                <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                    <h1 className="title-font font-medium text-3xl text-gray-900">Welcome Back!</h1>
                    <p className="leading-relaxed mt-4">Log in to access your personalized dashboard.</p>
                </div>
                <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                    <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Login</h2>
                <div className="relative mb-4">
                    <label htmlFor="user" className="leading-7 text-sm text-gray-600">User / Email</label>
                    <input type="text" id="user" name="user" value={username} onChange={(e) => setUsername(e.target.value)} className={inputClass}/>
                </div>
                <div className="relative mb-4">
                    <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass}/>
                </div>
                    <button type="button" onClick={handleSubmit} className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Login</button>
                    <p className="text-xs text-gray-500 mt-3">Don't have an account? Sign up now!</p>
                </div>
            </div>
        </section>
    );
};

export default Login;
