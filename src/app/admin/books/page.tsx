"use client"; // Asegura que el componente sea un Client Component

import React from "react";
import { BookCheck, FilePenLine, ScanEye, Search, Trash2, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";


// Datos de los libros
const libros = [
    {
        imagen: "https://www.esferalibros.com/wp-content/uploads/2021/04/principal-portada-historia-curiosa-de-la-medicina-es.jpg",
        nombre: "Interestelar",
        autor: "Pancho",
        descripcion: "Una emocionante historia de viajes espaciales y exploración interestelar.",
    },
    {
        imagen: "https://www.esferalibros.com/wp-content/uploads/2021/04/principal-portada-historia-curiosa-de-la-medicina-es.jpg",
        nombre: "Cosmos",
        autor: "Carl Sagan",
        descripcion: "Un viaje al conocimiento del universo explicado de manera magistral.",
    },
    {
        imagen: "https://www.esferalibros.com/wp-content/uploads/2021/04/principal-portada-historia-curiosa-de-la-medicina-es.jpg",
        nombre: "Breve historia del tiempo",
        autor: "Stephen Hawking",
        descripcion: "Una exploración accesible sobre el tiempo, el espacio y el universo.",
    },
];



// Componente para representar un libro
const LibroItem: React.FC<{ libro: typeof libros[0]; onEditar: () => void; onEliminar: () => void }> = ({ libro, onEditar, onEliminar }) => {
    const router = useRouter();

    const handleEditBook = () => {
        router.push("/admin/books/editBook");
    };
    return (
        
        
        <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors">
            {/* Imagen y nombre del libro */}
            
            <div className="sm:col-span-2 flex items-center">
                <img src={libro.imagen} alt={`Portada de ${libro.nombre}`} className="w-24 h-24 object-cover rounded-md mr-4" />
                <div>
                    <span className="text-gray-800 block font-semibold">{libro.nombre}</span>
                    <span className="text-gray-600 block sm:hidden">{libro.autor}</span>
                </div>
            </div>

            {/* Autor (oculto en móviles) */}
            <div className="hidden sm:flex items-center">
                <span className="text-gray-600">{libro.autor}</span>
            </div>

            {/* Descripción (oculta en móviles) */}
            <div className="hidden sm:flex items-center">
                <p className="text-gray-600 text-sm">{libro.descripcion}</p>
            </div>

            {/* Acciones (Editar y Eliminar) */}
            <div className="sm:col-span-2 flex items-center justify-center sm:justify-end space-x-4">
                <button className="text-blue-500 hover:text-blue-700 transition-colors" onClick={onEditar}>
                    <ScanEye size={24} />
                </button>
                <button className="text-green-500 hover:text-[#008000] transition-colors" onClick={handleEditBook}>
                    <FilePenLine size={24} />
                </button>
                <button className="text-red-500 hover:text-red-700 transition-colors" onClick={onEliminar}>
                    <Trash2 size={24} />
                </button>
            </div>

            {/* Descripción visible solo en móviles */}
            <div className="sm:hidden col-span-full">
                <p className="text-gray-600 text-sm">{libro.descripcion}</p>
            </div>
        </div>
    );
};

// Componente principal
const App: React.FC = () => {
    const handleEliminar = (nombreLibro: string) => {
        alert(`Eliminar: ${nombreLibro}`);
    };

    const handleEditar = (nombreLibro: string) => {
        alert(`Editar: ${nombreLibro}`);
    };

    const router = useRouter();
    const handleAddBook = () => {
        router.push("/admin/books/addBook");
    };

    

    return (
        <div className="font-sans bg-gray-100 min-h-screen p-5">
            <div className="flex justify-between items-center mb-6 mt-12">
                <button 
                    className="bg-green-600 text-white px-5 py-3 text-lg rounded-md flex items-center gap-2 hover:bg-green-800"
                    onClick={handleAddBook}
                >
                    <BookCheck size={24} />
                    Agregar
                </button>
            </div>

            
            <h1 className="text-gray-800 text-center text-2xl font-bold mb-8">Libros</h1>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="hidden sm:grid grid-cols-6 gap-4 p-4 border-b bg-gray-50">
                    <div className="col-span-2 font-semibold">Libro</div>
                    <div className="font-semibold">Autor</div>
                    <div className="font-semibold">Descripción</div>
                    <div className="col-span-2 font-semibold text-right">Acciones</div>
                </div>

                {libros.map((libro) => (
                    <LibroItem
                        key={libro.nombre}
                        libro={libro}
                        onEditar={() => handleEditar(libro.nombre)}
                        onEliminar={() => handleEliminar(libro.nombre)}
                    />
                ))}
            </div>
        </div>
    );
};

export default App;
