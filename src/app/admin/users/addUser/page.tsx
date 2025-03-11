"use client";

import React, { useRef } from "react";
import { User, Phone, Calendar, Mail, Lock, Save, Trash2, Edit } from "lucide-react"; // Importamos los iconos de lucide-react

const AddUser: React.FC = () => {
    // Referencia para el input de archivo (foto de perfil)
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Función para manejar el cambio de foto de perfil
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const image = e.target?.result as string;
                // Aquí puedes guardar la imagen en el estado o enviarla al servidor
                console.log("Nueva foto de perfil:", image);
            };
            reader.readAsDataURL(file);
        }
    };

    // Función para abrir el explorador de archivos al hacer clic en la imagen
    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="font-sans bg-gray-100 min-h-screen p-5">
            {/* Contenedor principal (foto de perfil + formulario) */}
            <div className="flex flex-col md:flex-row gap-6">
                {/* Foto de perfil (lado izquierdo) */}
                <div className="w-full md:w-1/3 flex justify-center md:justify-center items-center"> {/* Centrado en el lado izquierdo */}
                    {/* Círculo con lápiz (aparece al hacer hover) */}
                    <div className="group relative" onClick={handleImageClick}>
                        {/* Input oculto para seleccionar archivo */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        {/* Imagen de perfil */}
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" // URL de la foto de perfil
                            alt="Foto de perfil"
                            className="w-80 h-80 rounded-full object-cover" // Tamaño más grande (80x80)
                            style={{ aspectRatio: "1/1" }} // Asegura que sea completamente circular
                        />
                        {/* Lápiz y texto para cambiar la foto */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <Edit className="text-white mb-2" size={40} /> {/* Icono de lápiz más grande */}
                            <span className="text-white text-sm font-semibold">Editar perfil</span> {/* Texto centrado */}
                        </div>
                    </div>
                </div>

                {/* Formulario (lado derecho) */}
                <div className="w-full md:w-2/3 bg-white rounded-lg shadow-md p-8">
                    {/* Título "Editar usuario" (parte superior derecha) */}
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-gray-800 text-2xl font-bold">Agregar nuevo usuario</h1>
                    </div>

                    {/* Campo: Nombre */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">Nombre</label>
                        <div className="flex items-center">
                            <User className="text-gray-500 mr-2" size={20} /> {/* Icono de perfil */}
                            <input
                                type="text"
                                placeholder="Nombre del usuario"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Campo: Teléfono */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">Teléfono</label>
                        <div className="flex items-center">
                            <Phone className="text-gray-500 mr-2" size={20} /> {/* Icono de teléfono */}
                            <input
                                type="text"
                                placeholder="Numero telefonico"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Campo: Correo electrónico */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">Correo electrónico</label>
                        <div className="flex items-center">
                            <Mail className="text-gray-500 mr-2" size={20} /> {/* Icono de correo */}
                            <input
                                type="email"
                                placeholder="Correo electronico"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Campo: Contraseña */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">Contraseña</label>
                        <div className="flex items-center">
                            <Lock className="text-gray-500 mr-2" size={20} /> {/* Icono de candado */}
                            <input
                                type="password"
                                placeholder="Contraseña"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Campo: Confirmar Contraseña */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">Confirmar Contraseña</label>
                        <div className="flex items-center">
                            <Lock className="text-gray-500 mr-2" size={20} /> {/* Icono de candado */}
                            <input
                                type="password"
                                placeholder="Confirmar contraseña"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="flex justify-end space-x-4">
                        {/* Botón de Cancelar */}
                        <button className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors text-sm sm:text-base">
                            <Trash2 className="mr-2" size={20} /> {/* Icono de eliminar */}
                            Cancelar
                        </button>

                        {/* Botón de Guardar */}
                        <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm sm:text-base">
                            <Save className="mr-2" size={20} /> {/* Icono de guardar */}
                            Guardar cambios
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddUser;