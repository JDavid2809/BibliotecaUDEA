"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { User, Mail, Lock, Phone, IdCard } from "lucide-react";
import { motion } from "framer-motion"; 
import { toast } from "nextjs-toast-notify";
import 'react-toastify/dist/ReactToastify.css';

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
    if (!formData.matricula || !formData.nombre || !formData.telefono || !formData.email || !formData.password) {
      toast.error("¡Necesitas llenar todos los campos!", {
        duration: 4000,
        progress: true,
        position: "top-center",
        transition: "bounceIn",
        icon: '',
        sound: true,
      });
      return;
    }
    router.push("/verification");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }} 
      animate={{ opacity: 1, x: 0 }} 
      transition={{ duration: 0.8, ease: "easeOut" }} 
      className="font-[sans-serif] min-h-screen flex flex-col items-center justify-center bg-white"
    >
      <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-6 m-4 shadow-lg rounded-md">
        {/* Formulario */}
        <div className="md:max-w-md w-full px-6 py-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-12 flex items-center justify-between">
              <h3 className="text-gray-800 text-3xl font-extrabold text-center w-full">
                Registro
              </h3>
              <img src="/udeaLogo2.jpg" alt="Logo" className="w-20 h-20 ml-auto" />
            </div>

            {/* Matrícula */}
            <div>
              <label className="text-gray-800 text-base block mb-2">Matrícula:</label>
              <div className="relative flex items-center">
                <input
                  name="matricula"
                  type="text"
                  required
                  value={formData.matricula}
                  onChange={handleChange}
                  className="w-full pr-8 text-gray-800 text-lg border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                  placeholder="Matrícula"
                />
                <IdCard className="absolute right-2 text-gray-500" size={24} />
              </div>
            </div><br />
            <div>
              <label className="text-gray-800 text-base block mb-2">Confirma tu matrícula:</label>
              <div className="relative flex items-center">
                <input
                  name="matricula"
                  type="text"
                  required
                  value={formData.matricula}
                  onChange={handleChange}
                  className="w-full pr-8 text-gray-800 text-lg border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                  placeholder="Confirmar matrícula"
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
                  type="number"
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
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full shadow-xl py-3 px-4 text-lg tracking-wide rounded-xl text-white bg-[#0048ac] hover:bg-[#03003f] focus:outline-none transition-all duration-300 transform hover:scale-105"
                >
                  Registrarse
                </button>
            </div>
          </form>
        </div>

        {/* Imagen decorativa */}
        <div className="md:h-full rounded-xl lg:p-12 p-8">
          <img src="UdeaLogin.jpg" className="w-full h-full rounded-xl object-contain" alt="login-image" />
        </div>
      </div>
    </motion.div>
  );
}

export default RegisterPage;
