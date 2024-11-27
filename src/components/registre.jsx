import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registre = () => {
    const inputClass = "w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out";
    const divRelative = "relative w-1/2";
    const labelClass = "leading-7 text-sm text-gray-600";

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [dob, setDob] = useState("");
    
    const navigate = useNavigate(); // Hook para redirigir

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evitar recargar la página

        if (!username || !password) {
            alert("Please enter both username and password.");
            return;
        }
    
        try {
            const response = await fetch("http://localhost:8080/api/v1/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password, firstName, lastName, email, phone, address, dob }),
            });
    
            if (response.ok) {
                const data = await response.json();
                alert(`Signup successful! Welcome, ${data.username}`);
                localStorage.setItem("authToken", data.token);
                navigate("/login");
            } else {
                // Extraer el mensaje del cuerpo de la respuesta
                const errorData = await response.json();
                alert(errorData.message || "An error occurred during signup.");
            }
        } catch (error) {
            console.error("Error logging in:", error);
            alert("An unexpected error occurred while signing up.");
        }
    };

    return (
        <section className="text-gray-600 body-font">
                <div className="flex flex-col items-center text-left justify-center min-h-screen">
                    <div className="w-1/2">
                        <div className="flex space-x-4">
                            <div className={divRelative}>
                                <label htmlFor="first-name" className={labelClass}>First Name</label>
                                <input type="text" id="first-name" name="first-name" value={firstName} onChange={(e) => setfirstName(e.target.value)} placeholder="First Name" className={inputClass}/>
                            </div>
                            <div className={divRelative}>
                                <label htmlFor="last-name" className={labelClass}>Last Name</label>
                                <input type="text" id="last-name" name="last-name" value={lastName} onChange={(e) => setlastName(e.target.value)} placeholder="Last Name" className={inputClass}/>
                            </div>
                            <div className={divRelative}>
                                <label htmlFor="phone" className={labelClass}>Tel</label>
                                <input type="tel" id="phone" name="phone" pattern="[0-9]{10}" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Tel" className={inputClass}/>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <div className={divRelative}>
                                <label htmlFor="email" className={labelClass}>Email</label>
                                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className={inputClass}/>
                            </div>
                            <div className={divRelative}>
                                <label htmlFor="username" className={labelClass}>Username</label>
                                <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className={inputClass}/>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <div className={divRelative}>
                                <label htmlFor="Dob" className={labelClass}>Dob</label>
                                <input type="date" id="Dob" name="Dob" value={dob} onChange={(e) => setDob(e.target.value)} placeholder="Dob" className={inputClass}/>
                            </div>
                            <div className={divRelative}>
                                <label htmlFor="password" className={labelClass}>Password</label>
                                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className={inputClass}/>
                            </div>
                        </div>
                        <div className="relative">
                                <label htmlFor="address" className={labelClass}>Address</label>
                                <input type="text" id="address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="address" className={inputClass}/>
                            </div>
                        <button type="button" onClick={handleSubmit} className="w-full mt-8 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
                    </div>
                </div>
        </section>
    )
}

export default Registre