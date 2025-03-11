"use client";
import React from "react";
import { Pencil, User, ImagePlus, CircleX, Save, CloudUpload } from "lucide-react";

const AgregarLibro = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl flex flex-col md:flex-row gap-6">
            {/* Sección izquierda - Imagen */}
            <div className="flex flex-col items-center w-full md:w-1/2 relative">
            <div className="w-60 h-60 bg-gray-300 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-400">
                <ImagePlus size={70} className="text-gray-700" />
            </div>
            {/* Espaciado extra para bajar los botones */}
            <div className="flex-grow"></div>
            {/* Botones alineados horizontalmente más abajo */}
            <div className="flex w-full mt-16 gap-16 justify-center">
                <button className="bg-blue-600 text-white px-3 py-1 rounded-md flex items-center gap-2 justify-center text-sm hover:bg-blue-800">
                <CircleX size={18} /> Cancelar
                </button>
                <button className="bg-white text-blue-600 border border-blue-600 px-3 py-1 rounded-md flex items-center gap-2 justify-center text-sm hover:bg-gray-300">
                <Save size={18} className="text-blue-600" /> Agregar
                </button>
            </div>
            </div>

            {/* Sección derecha - Formulario */}
            <div className="flex-1 md:w-1/2">
            <h2 className="text-3xl font-bold mb-4 text-center md:text-left">Agregar libro</h2>
            
            <div className="mb-4">
                <label className="block text-gray-700">Nombre</label>
                <div className="relative">
                <input type="text" className="w-full p-2 border rounded-md pl-10 text-gray-500" placeholder="Estomatología" defaultValue="Estomatología" />
                <Pencil className="absolute left-3 top-2.5 text-gray-500" size={20} />
                </div>
            </div>
            
            <div className="mb-4">
                <label className="block text-gray-700">Autor</label>
                <div className="relative">
                <input type="text" className="w-full p-2 border rounded-md pl-10 text-gray-500" placeholder="Autor" defaultValue="Till Lindemann" />
                <User className="absolute left-3 top-2.5 text-gray-500" size={20} />
                </div>
            </div>
            
            <div className="mb-4">
                <label className="block text-gray-700">Descripción</label>
                <textarea 
                    className="w-full p-2 border rounded-md text-gray-500"
                    defaultValue="Gracias al esfuerzo de los profesores de varios departamentos de la Facultad de Estomatología, se tiene un texto integrado de Estomatología General para satisfacer los contenidos establecidos en el currículo de la carrera..."
                ></textarea>
            </div>
            
            <div className="mb-4 border-dashed border-2 border-gray-300 p-6 flex flex-col items-center cursor-pointer hover:border-gray-400">
                <CloudUpload size={40} className="text-gray-500" />
                <p className="text-gray-600 text-sm">Arrastra y suelta tu documento, o da clic para seleccionarlo</p>
            </div>
            </div>
        </div>
        </div>
    );
    };

export default AgregarLibro;