import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Airline = () => {
    const h2class = "text-gray-900 title-font text-lg font-medium mb-2";
    const liclass = "py-5 px-6 my-2 flex flex-col text-left justify-center rounded-lg shadow-md w-full font-medium text-gray-900";
    const [airlines, setAirlines] = useState([]); // Lista de aerolíneas
    const [selectedAirline, setSelectedAirline] = useState(null); // Aerolínea seleccionada
    const navigate = useNavigate(); // Hook para navegar

    const fetchAllAirlines = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/v1/airline", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setAirlines(data);
            } else {
                console.error("Error al obtener las aerolíneas:", response.statusText);
            }
        } catch (error) {
            console.error("Error al realizar la solicitud:", error);
        }
    };

    useEffect(() => {
        fetchAllAirlines();
    }, []);
    const handleAirlineClick = (airline) => {
        setSelectedAirline(selectedAirline === airline ? null : airline);
    };

    const handleFlightClick = (flight) => {
        navigate("/reserva", { state: { flight } });
    };

    return (
        <div className="mt-5">
            <h2 className={h2class}>Aerolíneas</h2>
            <div className="py-5 px-6 flex flex-col text-left justify-center rounded-lg shadow-md bg-slate-200">
                {airlines.length > 0 ? (
                    <ul>
                        {airlines.map((airline) => (
                            <li key={airline.id} className="py-2 px-4 border-b border-gray-200">
                                <button className="text-indigo-600 hover:text-indigo-300 font-semibold" onClick={() => handleAirlineClick(airline)}>
                                    {airline.name} ({airline.countryOrigin})
                                </button>

                                {selectedAirline === airline && airline.flights && airline.flights.length > 0 && (
                                    <ul className="ml-4 mt-2">
                                        {airline.flights.map((flight) => (
                                            <li key={flight.id} className={`${liclass} hover:bg-gray-100 cursor-pointer bg-white`} onClick={() => handleFlightClick(flight)}>
                                                <p>
                                                    Vuelo: {flight.id} | Origen: {flight.origin} | Destino: {flight.destination} | Fecha:{" "}
                                                    {flight.departureDate}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {selectedAirline === airline && (!airline.flights || airline.flights.length === 0) && (
                                    <p className="ml-4 mt-2 text-gray-500">No hay vuelos disponibles para esta aerolínea.</p>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No se encontraron aerolíneas.</p>
                )}
            </div>
        </div>
    );
};

export default Airline;
