import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

const Heading = (props) => {
    const linkStyle = "ml-1.5 pr-3.5 hover:text-primary cursor-pointer";
    const imgStyleBottun = "w-8 h-8 p-2";

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    const navigate = useNavigate(); // Hook para navegar

    useEffect(() => {
        const authStatus = localStorage.getItem("isAuthenticated") === "true";
        const storedUsername = localStorage.getItem("username");
        
        setIsAuthenticated(authStatus);
        if (authStatus && storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.setItem("isAuthenticated", "false");
        localStorage.removeItem("username");
        setIsAuthenticated(false);
        setUsername("");
        alert("Has cerrado sesión.");
    };

    const handleProfileClick = () => {
        navigate("/perfil");
    };

    return (
        <header className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-wrap p-1 flex-col md:flex-row items-center">
                <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <img src="./src/assets/viajar.png" alt="Logo" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"/>
                    <span className="ml-3 text-xl">PlaneTravel</span>
                </a>
                <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center">
                    <a className={linkStyle} href="/">Inicio</a>
                    <a className={linkStyle} href="/airlines">Aerolineas</a>
                </nav>
                
                {!isAuthenticated ? (
                    <>
                        <a href="/login">
                            <button className="justify-between flex items-center border-0 py-1 px-2 focus:outline-none hover:bg-gray-300 rounded hover:text-primary">
                                <img src="./src/assets/user.svg" alt="" className={imgStyleBottun}/>
                                Login
                            </button>
                        </a>
                        <a href="/registre">
                            <button className="justify-between flex items-center border-0 py-1 px-2 focus:outline-none hover:bg-gray-300 rounded hover:text-primary">
                                <img src="./src/assets/registre.svg" alt="" className={imgStyleBottun}/>
                                Registrarse
                            </button>
                        </a>
                    </>
                ) : (
                    <>
                        <button
                            className="justify-between flex items-center border-0 py-1 px-2 focus:outline-none hover:bg-gray-300 rounded hover:text-primary"
                            onClick={handleProfileClick}
                        >
                            <img src="./src/assets/user.svg" alt="User Icon" className={imgStyleBottun}/>
                            {username}
                        </button>
                        <button onClick={handleLogout} className="justify-between flex items-center border-0 py-1 px-2 focus:outline-none hover:bg-gray-300 rounded hover:text-primary">
                            Salir
                        </button>
                    </>
                )}
            </div>
        </header>
    );
};

export default Heading;
