import React, { useEffect, useState } from "react";

const Perfil = () => {
    const [userData, setUserData] = useState(null);
    const [editMode, setEditMode] = useState(false); // Estado para controlar el modo de edición
    const [formData, setFormData] = useState({}); // Datos temporales para edición

    useEffect(() => {
        const username = localStorage.getItem("username");

        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/user/username/${username}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                    setFormData(data);
                } else {
                    console.error("Error al obtener los datos del usuario:", response.statusText);
                }
            } catch (error) {
                console.error("Error al realizar la solicitud:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/user/${userData.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Datos actualizados correctamente.");
                setUserData(formData);
                setEditMode(false);
            } else {
                console.error("Error al actualizar los datos:", response.statusText);
            }
        } catch (error) {
            console.error("Error al realizar la solicitud:", error);
        }
    };

    return (
        <div className="container mx-auto p-5 bg-slate-200 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Perfil del Usuario</h2>
            <div className="py-5 px-6 flex flex-col text-left justify-center rounded-lg shadow-md bg-white">
                {userData ? (
                    <>
                        <div className="mb-4">
                            <label className="block font-semibold mb-2">Nombre</label>
                            <input type="text" name="firstName" value={formData.firstName || ""} disabled={!editMode}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded"/>
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold mb-2">Apellido</label>
                            <input type="text" name="lastName" value={formData.lastName || ""} disabled={!editMode}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded"/>
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold mb-2">Correo</label>
                            <input type="email" name="email" value={formData.email || ""} disabled={!editMode}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded"/>
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold mb-2">Teléfono</label>
                            <input type="text" name="phone" value={formData.phone || ""} disabled={!editMode}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded"/>
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold mb-2">Dirección</label>
                            <input type="text" name="address" value={formData.address || ""} disabled={!editMode}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded"/>
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold mb-2">Fecha de Nacimiento</label>
                            <input type="date" name="dob" value={formData.dob || ""} disabled={!editMode}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded"/>
                        </div>
                        <div className="flex justify-end">
                            {!editMode ? (
                                <button onClick={() => setEditMode(true)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                    Editar
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={handleSave}
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2">
                                        Guardar
                                    </button>
                                    <button onClick={() => {
                                            setEditMode(false);
                                            setFormData(userData); // Revertir cambios
                                        }}
                                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                                        Cancelar
                                    </button>
                                </>
                            )}
                        </div>
                    </>
                ) : (
                    <p>Cargando datos del usuario...</p>
                )}
            </div>

            <h3 className="text-xl font-bold mt-5">Reservas</h3>
            <div className="py-5 px-6 flex flex-col text-left justify-center rounded-lg shadow-md bg-slate-400">
                {userData && userData.bookings && userData.bookings.length > 0 ? (
                    <ul>
                        {userData.bookings.map((booking, index) => (
                            <li key={index} className="py-5 px-6 my-3 flex flex-col text-left justify-center rounded-lg shadow-md bg-white">
                                {booking}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No tienes reservas registradas.</p>
                )}
            </div>
        </div>
    );
};

export default Perfil;
