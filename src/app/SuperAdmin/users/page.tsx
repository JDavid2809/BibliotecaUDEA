"use client";

import React from "react";
import { UserPlus, Search, UserPen, Trash2, CircleUserRound } from "lucide-react";
import { useRouter } from "next/navigation";

const TableDesign = () => {
    const data = [
        {
        nombre: "Raúl Malo",
        telefono: "1234567899",
        edad: 34,
        correo: "example@gmail.com",
        },
        {
        nombre: "Raúl Malo",
        telefono: "1234567899",
        edad: 34,
        correo: "example@gmail.com",
        },
        {
        nombre: "Raúl Malo",
        telefono: "1234567899",
        edad: 34,
        correo: "example@gmail.com",
        },
        {
        nombre: "Raúl Malo",
        telefono: "1234567899",
        edad: 34,
        correo: "example@gmail.com",
        },
    ];

    const router = useRouter();

    const handleUpdateUser = () => {
        router.push("/SuperAdmin/users/editUser");
    }

    const handleAddeUser = () => {
        router.push("/SuperAdmin/users/addUser");
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <h2 className="text-2xl font-bold text-gray-900">Usuarios</h2>
            <p className="text-gray-900">
                Esta acción permitirá incorporar nuevos miembros al equipo académico de forma estructurada.
            </p>

            {/* Botón agregar usuario + Input búsqueda */}
            <div className="flex justify-between items-center mb-6 mt-12">
                <button 
                    className="bg-green-600 text-white px-5 py-3 text-lg rounded-xl flex items-center gap-2 hover:bg-green-800"
                    onClick={handleAddeUser}
                >
                    <UserPlus size={24} />
                    Agregar
                </button>

                <div className="relative w-72">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="w-full p-3 text-lg border rounded-md pr-12"
                    />
                    <Search
                        size={24}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                    />
                </div>
            </div>

            {/* Tabla para pantallas grandes */}
            <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
                <table className="min-w-full bg-gray-50 border border-gray-200 rounded-md hidden sm:table">
                    <thead className="bg-[#1e3a4c] text-white sticky top-0 z-10">
                        <tr className="text-lg">
                            <th className="py-4 px-6 border-b text-left">Foto</th>
                            <th className="py-4 px-6 border-b text-left">Nombre</th>
                            <th className="py-4 px-6 border-b text-left">Teléfono</th>
                            <th className="py-4 px-6 border-b text-left">Edad</th>
                            <th className="py-4 px-6 border-b text-left">Correo</th>
                            <th className="py-4 px-6 border-b text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((persona, index) => (
                            <tr key={index} className="border-b hover:bg-gray-300">
                                <td className="py-4 px-6">
                                    <div className="w-24 h-24 rounded-full flex items-center justify-center">
                                        <CircleUserRound size={90} />
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-lg">{persona.nombre}</td>
                                <td className="py-4 px-6 text-lg">{persona.telefono}</td>
                                <td className="py-4 px-6 text-lg">{persona.edad}</td>
                                <td className="py-4 px-6 text-lg">{persona.correo}</td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-4">
                                        <button
                                            className="text-blue-500 hover:text-blue-800 transition"
                                            onClick={handleUpdateUser}
                                        >
                                            <UserPen size={28} />
                                        </button>
                                        <button
                                            className="text-red-500 hover:text-red-700 transition"
                                        >
                                            <Trash2 size={28} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Vista en pantallas pequeñas */}
            <div className="sm:hidden">
                {data.map((persona, index) => (
                    <div 
                        key={index} 
                        className="mb-4 border bg-gray-200 p-4 rounded-md"
                    >
                        <div className="flex items-center mb-4">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center">
                                <CircleUserRound size={60} />
                            </div>
                            <div className="ml-4">
                                <p className="text-lg font-semibold">{persona.nombre}</p>
                                <p>{persona.telefono}</p>
                                <p>{persona.edad}</p>
                                <p>{persona.correo}</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button
                                className="text-blue-500 hover:text-blue-800 transition"
                                onClick={handleUpdateUser}
                            >
                                <UserPen size={28} />
                            </button>
                            <button
                                className="text-red-500 hover:text-red-700 transition"
                            >
                                <Trash2 size={28} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TableDesign;
