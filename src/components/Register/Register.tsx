"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { User, Mail, Lock, Phone, IdCard } from "lucide-react";
import Link from "next/link";

function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    matricula: "",
    nombre: "",
    telefono: "",
    email: "",
    password: "",
    carrera: "Estomatología",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación simple
    if (!formData.matricula || !formData.nombre || !formData.telefono || !formData.email || !formData.password) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    // Redirigir a la página de verificación
    router.push("/verification");
  };

  return (
    <div className="font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-6 m-4 shadow-lg rounded-md">
          <div className="md:max-w-md w-full px-6 py-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-12 flex items-center justify-between">
                <h3 className="text-gray-800 text-3xl font-extrabold text-center w-full">
                  Registro
                </h3>
                <img src="/udeaLogo2.jpg" alt="Logo" className="w-20 h-20 ml-auto" />
              </div>

              {/* Matricula */}
              <div>
                <label className="text-gray-800 text-base block mb-2">Matricula:</label>
                <div className="relative flex items-center">
                  <input
                    name="matricula"
                    type="number"
                    required
                    value={formData.matricula}
                    onChange={handleChange}
                    className="w-full pr-8 text-gray-800 text-lg border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                    placeholder="Matricula"
                  />
                  <IdCard className="absolute right-2 text-gray-500" size={24} />
                </div>
              </div>

              {/* Nombre Completo */}
              <div className="mt-10">
                <label className="text-gray-800 text-base block mb-2">Nombre completo:</label>
                <div className="relative flex items-center">
                  <input
                    name="nombre"
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full pr-8 text-gray-800 text-lg border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                    placeholder="Nombre completo"
                  />
                  <User className="absolute right-2 text-gray-500" size={24} />
                </div>
              </div>

              {/* Número Telefónico */}
              <div className="mt-8">
                <label className="text-gray-800 text-base block mb-2">Número telefónico:</label>
                <div className="relative flex items-center">
                  <input
                    name="telefono"
                    type="text"
                    required
                    value={formData.telefono}
                    onChange={handleChange}
                    pattern="\d{10}"
                    className="w-full pr-8 text-gray-800 text-lg border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                    placeholder="Número telefónico (10 dígitos)"
                  />
                  <Phone className="absolute right-2 text-gray-500" size={24} />
                </div>
              </div>

              {/* Correo Electrónico */}
              <div className="mt-10">
                <label className="text-gray-800 text-base block mb-2">Correo electrónico:</label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pr-8 text-gray-800 text-lg border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                    placeholder="Correo electrónico"
                  />
                  <Mail className="absolute right-2 text-gray-500" size={24} />
                </div>
              </div>

              {/* Contraseña */}
              <div className="mt-8">
                <label className="text-gray-800 text-base block mb-2">Contraseña:</label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pr-8 text-gray-800 text-lg border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                    placeholder="Contraseña"
                  />
                  <Lock className="absolute right-2 text-gray-500" size={24} />
                </div>
              </div>

              {/* Carrera */}
              <div className="mt-8">
                <label className="text-gray-800 text-base block mb-2">Carrera:</label>
                <div className="relative">
                  <select
                    name="carrera"
                    value={formData.carrera}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg bg-white focus:ring-2 focus:ring-blue-600 transition-all duration-300 ease-in-out"
                  >
                    <option value="Estomatología">Estomatología</option>
                    <option value="Fisioterapia">Fisioterapia</option>
                    <option value="Enfermería">Enfermería</option>
                    <option value="Nutrición">Nutrición</option>
                  </select>
                </div>
              </div>

              {/* Botón de registro */}
              <div className="mt-12 flex justify-center">
                <Link href={"/verification"} className="inline-block w-3/4">
                  <button
                  type="submit"
                  className="w-full shadow-xl py-3 px-4 text-lg tracking-wide rounded-tl-xl rounded-br-xl text-white bg-[#2a4856] hover:bg-[#03003f] focus:outline-none transition-all duration-300 transform hover:scale-105"
                  >
                  Registrarse
                  </button>
                </Link>
              </div>
            </form>
          </div>

          {/* Imagen decorativa */}
          <div className="md:h-full bg-[#000842] rounded-xl lg:p-12 p-8">
            <img src="https://readymadeui.com/signin-image.webp" className="w-full h-full object-contain" alt="login-image" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
