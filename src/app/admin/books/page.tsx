"use client";

import React, { useEffect, useState } from "react";
import { BookCheck, FilePenLine, ScanEye, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface Libro {
  nombre: string;
  autor: string;
  descripcion: string;
}

// Datos que vienen de la API
interface LibroAPI {
  nombreLibro: string;
  autor: string;
  descripcion: string;
}

const LibroItem: React.FC<{
  libro: Libro;
  onEditar: () => void;
  onEliminar: () => void;
}> = ({ libro, onEditar, onEliminar }) => {
  const router = useRouter();

  const handleEditBook = () => {
    router.push("/admin/books/editBook");
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors">
      {/* Título */}
      <div className="sm:col-span-2 flex items-center">
        <div className="w-16 h-16 flex items-center justify-center bg-gray-300 rounded-md mr-4 font-bold text-white">
          {libro.nombre.charAt(0).toUpperCase()}
        </div>
        <div>
          <span className="text-gray-800 block font-semibold">
            {libro.nombre}
          </span>
          <span className="text-gray-600 block sm:hidden">{libro.autor}</span>
        </div>
      </div>

      {/* Autor */}
      <div className="hidden sm:flex items-center">
        <span className="text-gray-600">{libro.autor}</span>
      </div>

      {/* Descripción */}
      <div className="hidden sm:flex items-center">
        <p className="text-gray-600 text-sm">{libro.descripcion}</p>
      </div>

      {/* Acciones */}
      <div className="sm:col-span-2 flex items-center justify-center sm:justify-end space-x-4">
        <button
          className="text-blue-500 hover:text-blue-700 transition-colors"
          onClick={onEditar}
        >
          <ScanEye size={24} />
        </button>
        <button
          className="text-green-500 hover:text-[#008000] transition-colors"
          onClick={handleEditBook}
        >
          <FilePenLine size={24} />
        </button>
        <button
          className="text-red-500 hover:text-red-700 transition-colors"
          onClick={onEliminar}
        >
          <Trash2 size={24} />
        </button>
      </div>

      {/* Descripción móvil */}
      <div className="sm:hidden col-span-full">
        <p className="text-gray-600 text-sm">{libro.descripcion}</p>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [libros, setLibros] = useState<Libro[]>([]);
  const router = useRouter();

  const handleEliminar = (nombreLibro: string) => {
    alert(`Eliminar: ${nombreLibro}`);
  };

  const handleEditar = (nombreLibro: string) => {
    alert(`Editar: ${nombreLibro}`);
  };

  const handleAddBook = () => {
    router.push("/admin/books/addBook");
  };

  useEffect(() => {
    const fetchLibros = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/books/getBooks");
        const data: LibroAPI[] = await res.json();

        const adaptados: Libro[] = data.map((libro) => ({
          nombre: libro.nombreLibro.replaceAll('"', ''),
          autor: libro.autor.replaceAll('"', ''),
          descripcion: libro.descripcion.replaceAll('"', ''),
        }));

        setLibros(adaptados);
      } catch (error) {
        console.error("Error al cargar los libros:", error);
      }
    };

    fetchLibros();
  }, []);

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

      <h1 className="text-gray-800 text-center text-2xl font-bold mb-8">
        Libros
      </h1>

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
