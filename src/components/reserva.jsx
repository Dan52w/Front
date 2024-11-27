import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Passenger from "./passenger";

const Reserva = () => {
    const location = useLocation(); // Obtener los datos desde location.state
    const { flight } = location.state || {}; // Extraer los datos del vuelo seleccionado

    const [origin, setOrigin] = useState(flight?.origin || "");
    const [destiny] = useState(flight?.destination || "");
    const [date] = useState(flight?.departureDate || "");
    const [reservationDate, setReservationDate] = useState("");
    const [numberPassengers, setNumberPassengers] = useState(1);
    const [showPassenger, setShowPassenger] = useState(true);

    const incrementPassengers = () => {
        setNumberPassengers((prev) => prev + 1);
        setShowPassenger(true);
    };

    const decrementPassengers = () => {
        if (numberPassengers > 1) {
            setNumberPassengers((prev) => prev - 1);
            setShowPassenger(true);
        }
    };

    const handleSubmit = () => {
        if (!origin || !destiny) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        const reservationData = {
            origin,
            destiny,
            reservationDate,
            numberPassengers,
        };

        console.log("Datos de reserva enviados:", reservationData);
        navigate("/");
        alert("Reserva creada con éxito.");
    };

    return (
        <div className="mt-5">
            <div className="py-5 px-6 flex flex-col text-left justify-center rounded-lg shadow-md bg-white">
                <h2 className="text-gray-900 title-font text-lg font-medium mb-4">Reserve Data</h2>

                <div className="flex flex-wrap">
                    <div className="relative w-1/2 mb-4">
                        <label htmlFor="origin" className="leading-7 text-sm text-gray-900 mr-2">
                            Origin
                        </label>
                        <input type="text" id="origin" placeholder="Ciudad de origen" value={origin} readOnly
                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            onChange={(e) => setOrigin(e.target.value)}/>
                    </div>

                    <div className="relative w-1/2 mb-4">
                        <label htmlFor="destiny" className="leading-7 text-sm text-gray-900 mr-2">
                            Destination
                        </label>
                        <input type="text" id="destiny" value={destiny} readOnly
                            className="w-full ml-2 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                    </div>
                </div>

                <div className="flex items-center space-x-4 mt-4">
                    <button type="button" className="bg-red-500 text-white px-4 py-2 rounded"onClick={decrementPassengers}>
                        -
                    </button>
                    <span className="text-lg font-semibold">
                        {numberPassengers} Passenger {numberPassengers > 1 ? "s" : ""}
                    </span>
                    <button type="button" className="bg-green-500 text-white px-4 py-2 rounded" onClick={incrementPassengers}>
                        +
                    </button>
                </div>

                {showPassenger && (
                    <div className="mt-4">
                        <Passenger reservas={numberPassengers} flights={flight} dateReser={reservationDate} />
                    </div>
                )}

                <div className="mt-6">
                    <button type="button" className="bg-indigo-500 text-white px-6 py-2 rounded w-full hover:bg-indigo-600" onClick={handleSubmit}>
                        Confirm Reservation
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Reserva;
