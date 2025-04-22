"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { User, Phone, Mail, Lock, Save, Trash2, Edit } from "lucide-react";
import axios from "axios";

const EditarUsuario: React.FC = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const email = searchParams.get("email");

    const [admin, setAdmin] = useState({
        nombre: "",
        telefono: "",
        correo: "",
        password: "", // Incluye el campo de contraseña
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAdmin({ ...admin, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            await axios.put(`http://localhost:4000/api/administrador/updateAdminByEmail/${email}`, {
                nombre: admin.nombre,
                telefono: admin.telefono,
            });
            alert("Administrador actualizado correctamente");
            router.push("/SuperAdmin/users");
        } catch (error) {
            console.error("Error al actualizar", error);
            alert("Error al actualizar administrador");
        }
    };

    useEffect(() => {
        if (email) {
            axios.get(`http://localhost:4000/api/administrador/getAdminByEmail/${email}`)
                .then(res => {
                    console.log("Datos obtenidos del backend:", res.data);
                    const data = res.data; // Accede directamente a los datos
                    if (data) {
                        setAdmin({
                            nombre: data.nombre || "",
                            telefono: data.telefono || "",
                            correo: data.correo || "",
                            password: data.password || "********", // Mapea la contraseña o usa un valor predeterminado
                        });
                    } else {
                        console.error("No se encontró el administrador");
                    }
                })
                .catch(err => {
                    console.error("Error al obtener administrador", err);
                });
        }
    }, [email]);

    if (!admin.nombre && !admin.telefono) {
        return <div>Cargando datos...</div>;
    }

    return (
        <div className="font-sans bg-gray-100 min-h-screen p-5">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Ícono de usuario */}
                <div className="w-full md:w-1/3 flex justify-center items-center">
                    <div className="group relative">
                        <div className="w-80 h-80 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="text-gray-500" size={120} />
                        </div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <Edit className="text-white mb-2" size={40} />
                            <span className="text-white text-sm font-semibold">Editar perfil</span>
                        </div>
                    </div>
                </div>

                {/* Formulario */}
                <div className="w-full md:w-2/3 bg-white rounded-lg shadow-md p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-gray-800 text-2xl font-bold">Editar usuario</h1>
                    </div>

                    {/* Nombre */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">Nombre</label>
                        <div className="flex items-center">
                            <User className="text-gray-500 mr-2" size={20} />
                            <input
                                type="text"
                                name="nombre"
                                value={admin.nombre}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Teléfono */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">Teléfono</label>
                        <div className="flex items-center">
                            <Phone className="text-gray-500 mr-2" size={20} />
                            <input
                                type="text"
                                name="telefono"
                                value={admin.telefono}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Correo */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">Correo electrónico</label>
                        <div className="flex items-center">
                            <Mail className="text-gray-500 mr-2" size={20} />
                            <input
                                type="email"
                                value={admin.correo}
                                disabled
                                className="w-full p-2 bg-gray-100 border border-gray-300 rounded-md text-gray-500"
                            />
                        </div>
                    </div>

                    {/* Contraseña */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">Contraseña</label>
                        <div className="flex items-center">
                            <Lock className="text-gray-500 mr-2" size={20} />
                            <input
                                type="password"
                                value={admin.password}
                                disabled
                                className="w-full p-2 bg-gray-100 border border-gray-300 rounded-md text-gray-500"
                            />
                        </div>
                    </div>

                    {/* Botones */}
                    <div className="flex justify-end space-x-4">
                        <button
                            onClick={() => router.push("/SuperAdmin/users")}
                            className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors text-sm sm:text-base"
                        >
                            <Trash2 className="mr-2" size={20} />
                            Cancelar
                        </button>

                        <button
                            onClick={handleSubmit}
                            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm sm:text-base"
                        >
                            <Save className="mr-2" size={20} />
                            Guardar cambios
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditarUsuario;