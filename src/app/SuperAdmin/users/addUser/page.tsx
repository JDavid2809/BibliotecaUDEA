"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { User, Save, Trash2 } from "lucide-react";

const AddUser: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [areas, setAreas] = useState<{ id: number; nombreArea: string }[]>([]); // Lista de áreas
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    password: "",
    carrera: "", // Inicialmente vacío
  });

  // Cargar áreas desde el backend
  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/area");
        console.log("Datos recibidos del backend:", response.data);
        setAreas(response.data);

        // Actualiza el estado de `formData` solo si hay áreas disponibles
        if (response.data.length > 0) {
          setFormData((prev) => ({ ...prev, carrera: response.data[0].nombreArea }));
        }
      } catch (error) {
        console.error("Error al cargar áreas:", error);
        toast.error("Error al cargar las áreas.");
      }
    };

    fetchAreas();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { nombre, telefono, email, password, carrera } = formData;

    // Encuentra el ID del área seleccionada
    const areaSeleccionada = areas.find((area) => area.nombreArea === carrera);
    const areaId = areaSeleccionada ? areaSeleccionada.id : null;

    const requestData = {
      nombre,
      telefono,
      correo: email,
      password,
      area: areaId,
    };

    console.log("Datos enviados al backend:", requestData);

    // Validaciones básicas
    if (!nombre || !telefono || !email || !password || !carrera) {
      toast.error("Todos los campos son obligatorios.");
      return;
    }

    if (telefono.length !== 10) {
      toast.error("El teléfono debe tener 10 dígitos.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("El correo no es válido.");
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:4000/api/administrador/createAdmin", requestData);
      toast.success("¡Registro exitoso!");
      router.push("/LoginAdmin");
    } catch (error: unknown) {
      console.error("Error al registrar:", error);
      const msg =
        axios.isAxiosError(error) && error.response?.data?.errors?.[0]?.msg
          ? error.response.data.errors[0].msg
          : "Error al registrar.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans bg-gray-100 min-h-screen p-5">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Ícono de usuario */}
        <div className="w-full md:w-1/3 flex justify-center items-center">
          <div className="group relative">
            <div className="w-80 h-80 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="text-gray-500" size={120} />
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full md:w-2/3 bg-white rounded-lg shadow-md p-8"
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-gray-800 text-2xl font-bold">Agregar nuevo usuario</h1>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Nombre del usuario"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Área</label>
            <select
              name="carrera"
              value={formData.carrera}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              {areas.map((area) => (
                <option key={area.id} value={area.nombreArea}>
                  {area.nombreArea}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Teléfono</label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="Número telefónico"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Correo electrónico"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Contraseña"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors text-sm sm:text-base"
              onClick={() => router.push("/SuperAdmin/users")}
              disabled={loading}
            >
              <Trash2 className="mr-2" size={20} />
              Cancelar
            </button>

            <button
              type="submit"
              className={`flex items-center bg-blue-500 text-white px-4 py-2 rounded-md transition-colors text-sm sm:text-base ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
              }`}
              disabled={loading}
            >
              <Save className="mr-2" size={20} />
              {loading ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;