import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const BuscarVuelos = () => {
    const labelClass = "leading-7 text-sm text-gray-900 mr-2";
    const h2class = "text-gray-900 title-font text-lg font-medium mb-2";
    const divRelative = "relative w-1/2 mb-4";
    const inputClass = "w-50 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out";

    const [origin, setOrigin] = useState("");
    const [destiny, setDestiny] = useState("");
    const [flights, setFlights] = useState([]);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

    let url;

    // Define la URL dependiendo de los campos
    if (!origin && !destiny) {
        url = `http://localhost:8080/api/v1/flight`;
    } else if (!origin && destiny) {
        url = `http://localhost:8080/api/v1/flight/destiny/${destiny}`;
    } else if (origin && !destiny) {
        url = `http://localhost:8080/api/v1/flight/origin/${origin}`;
    } else {
        url = `http://localhost:8080/api/v1/flight/${origin}/${destiny}`;
    }

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            setFlights(data);
        } else {
            const errorData = await response.json();
            alert(errorData.message || "Error al obtener los vuelos.");
        }
    } catch (error) {
        console.error("Error buscando vuelos:", error);
        alert("Ocurrió un error inesperado al buscar los vuelos.");
        }
    };

    const handleSelectFlight = (flight) => {
        setSelectedFlight(flight);
        navigate("/reserva", { state: { flight } });
    };

    return (
        <div className="mt-5">
            <div className="py-5 px-6 flex flex-col text-left justify-center rounded-lg shadow-md bg-slate-200">
                <h2 className={h2class}>Buscar Vuelos</h2>
                <div className="flex flex-wrap">
                    <div className={divRelative}>
                        <label htmlFor="origin" className={labelClass}>Origen</label>
                        <input type="text" id="origin" placeholder="Ciudad de origen"className={inputClass}
                            value={origin}
                            onChange={(e) => setOrigin(e.target.value)}/>
                    </div>

                    <div className={divRelative}>
                        <label htmlFor="destiny" className={labelClass}>Destino</label>
                        <input type="text" id="destiny" placeholder="Ciudad de destino" className={inputClass}
                            value={destiny}
                            onChange={(e) => setDestiny(e.target.value)}/>
                    </div>
                </div>

                <div className="mt-6">
                    <button type="button" className="bg-indigo-500 text-white px-6 py-2 rounded w-full" onClick={handleSubmit}>
                        Buscar Vuelos
                    </button>
                </div>

                <div className="mt-4">
                    {flights.length > 0 ? (
                        <ul>
                            {flights.map((flight) => (
                                <div key={flight.id} className="mb-4">
                                    <button className="py-5 px-6 flex flex-col text-left justify-center rounded-lg shadow-md w-full bg-white"
                                        onClick={() => handleSelectFlight(flight)}>
                                        <li className="flex flex-wrap items-center justify-center text-gray-900">
                                            Origin: <h2 className="text-gray-900 title-font text-lg font-medium ml-1.5 mr-2">{flight.origin}</h2>
                                            Destino: <h2 className="text-gray-900 title-font text-lg font-medium ml-1.5 mr-2">{flight.destination}</h2>
                                            | {flight.departureDate} - {flight.idairline} - {flight.idairportOrigin} - {flight.idairportDestiny}
                                        </li>
                                    </button>
                                </div>
                            ))}
                        </ul>
                    ) : (
                        <div className="py-2 px-2 text-center justify-center rounded-lg shadow-md w-full bg-white">
                            <h2>No se encontraron vuelos.</h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BuscarVuelos;
