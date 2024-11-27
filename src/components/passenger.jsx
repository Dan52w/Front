import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layaut from "./layaut";

const Passenger = ({ reservas, flights }) => {
    const inputClass = "w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out";
    const divRelative = "relative w-1/2";
    const h2class = "text-gray-900 title-font text-lg font-medium mb-2";
    const labelClass = "leading-7 text-sm text-gray-600";
    const reservasCount = Math.max(Number(reservas) || 0, 1);
    const [passengerData, setPassengerData] = useState([]);

    useEffect(() => {
        setPassengerData(
            Array.from({ length: reservasCount }, () => ({
                firstName: "",
                lastName: "",
                phone: "",
                email: "",
                age: "",
                identification: "",
                gender: "",
            }))
        );
    }, [reservasCount]);

    const navigate = useNavigate();

    const handleInputChange = (i, field, value) => {
        const updatedPassengerData = [...passengerData];
        updatedPassengerData[i][field] = value;
        setPassengerData(updatedPassengerData);
    };

    const username = localStorage.getItem("username");

    const createPassenger = async (passenger) => {
        const { firstName, lastName, age, identification, email, phone, gender } = passenger;
        const flightdate = flights.departureDate;

        try {
            const response = await fetch(`http://localhost:8080/api/v1/passenger`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
                },
                body: JSON.stringify({ firstName, lastName, age, identification, email, phone, gender, flightdate }),
            });

            if (!response.ok) {
                alert("Error al crear el pasajero.");
                return;
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error:", error);
            alert("Ha ocurrido un error inesperado.");
        }
    };

    const searchUsername = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/user/username/${username}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
                },
            });

            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Ha ocurrido un error inesperado.");
        }
    };

    const handlePassengerConfirmation = async (i) => {
        const passenger = passengerData[i];

        if (!passenger) {
            alert(`No se encontraron datos para el pasajero en el índice ${i}.`);
            return;
        }

        if (Object.values(passenger).some((val) => val === "")) {
            alert("Por favor, rellene todos los campos.");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:8080/api/v1/passenger/identification/${passenger.identification}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
                    },
                }
            );

            const user = await searchUsername();
            const iduser = user?.id;
            const numberPassengers = reservasCount;
            const reservationDate = flights.departureDate;
            const idflight = flights.id;

            let idpassenger;

            if (!response.ok) {
                const data = await createPassenger(passenger);
                idpassenger = data?.id;
            } else {
                const data = await response.json();
                idpassenger = data.id;
            }

            const createBooking = await fetch(`http://localhost:8080/api/v1/booking`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
                },
                body: JSON.stringify({ iduser, reservationDate, numberPassengers, idflight, idpassenger }),
            });

            if (!createBooking.ok) {
                alert(`Error al crear la reserva para el pasajero ${passenger.firstName} ${passenger.lastName}`);
            } else {
                alert(`Reserva confirmada para el pasajero ${passenger.firstName} ${passenger.lastName}.`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Ha ocurrido un error inesperado.");
        }
    };

    const renderFlightDetails = () => (
        <div className="text-left mb-4 border p-4 rounded-lg shadow-md">
            <h2 className={h2class}>Flight Information</h2>
            <p><strong>Origin:</strong> {flights.origin}</p>
            <p><strong>Destination:</strong> {flights.destination}</p>
            <p><strong>Date:</strong> {flights.departureDate}</p>
        </div>
    );

    const renderPassengerForms = passengerData.map((_, i) => (
        <div key={i} className="flex flex-col items-center text-left justify-center border p-4 rounded-lg shadow-md my-2 mx-3">
            <div className="w-80">
                <div className="flex space-x-4">
                    <div className={divRelative}>
                        <label htmlFor={`firstName-${i}`} className={labelClass}>First Name</label>
                        <input type="text" id={`firstName-${i}`} className={inputClass} 
                            value={passengerData[i]?.firstName}
                            onChange={(e) => handleInputChange(i, "firstName", e.target.value)}/>
                    </div>
                    <div className={divRelative}>
                        <label htmlFor={`lastName-${i}`} className={labelClass}>Last Name</label>
                        <input type="text" id={`lastName-${i}`} className={inputClass}
                            value={passengerData[i]?.lastName}
                            onChange={(e) => handleInputChange(i, "lastName", e.target.value)}/>
                    </div>
                </div>
                <div className="flex space-x-4 mt-4">
                    <div className={divRelative}>
                        <label htmlFor={`phone-${i}`} className={labelClass}>Phone</label>
                        <input
                            type="tel"
                            id={`phone-${i}`}
                            className={inputClass}
                            value={passengerData[i]?.phone}
                            onChange={(e) => handleInputChange(i, "phone", e.target.value)}
                        />
                    </div>
                    <div className={divRelative}>
                        <label htmlFor={`email-${i}`} className={labelClass}>Email</label>
                        <input type="email" id={`email-${i}`} className={inputClass}
                            value={passengerData[i]?.email}
                            onChange={(e) => handleInputChange(i, "email", e.target.value)}/>
                    </div>
                </div>
                <div className="flex space-x-4 mt-4">
                    <div className={divRelative}>
                        <label htmlFor={`age-${i}`} className={labelClass}>Age</label>
                        <input type="number" id={`age-${i}`} className={inputClass}
                            value={passengerData[i]?.age}
                            onChange={(e) => handleInputChange(i, "age", e.target.value)}/>
                    </div>
                    <div className={divRelative}>
                        <label htmlFor={`identification-${i}`} className={labelClass}>Identification</label>
                        <input type="text" id={`identification-${i}`} className={inputClass}
                            value={passengerData[i]?.identification}
                            onChange={(e) => handleInputChange(i, "identification", e.target.value)}/>
                    </div>
                </div>
                <div className="flex space-x-4 mt-4">
                    <div className={divRelative}>
                        <label htmlFor={`gender-${i}`} className={labelClass}>Gender</label>
                        <select id={`gender-${i}`} className={inputClass}
                            value={passengerData[i]?.gender}
                            onChange={(e) => handleInputChange(i, "gender", e.target.value)}>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
                <div className="text-center mt-4">
                    <button onClick={() => handlePassengerConfirmation(i)} className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg">
                        Confirm Passenger
                    </button>
                </div>
            </div>
        </div>
    ));

    return (
        <Layaut>
            {renderFlightDetails()}
            <div className="w-full flex flex-wrap justify-center items-center">
                {renderPassengerForms}
            </div>
        </Layaut>
    );
};

export default Passenger;
