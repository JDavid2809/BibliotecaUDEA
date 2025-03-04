"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IdCard, Lock } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion"; // Importamos Framer Motion

function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    matricula: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.matricula || !formData.password) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    router.push("/pageArea");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Animación inicial (oculto y más abajo)
      animate={{ opacity: 1, y: 0 }} // Estado final (visible y en su posición)
      transition={{ duration: 0.6, ease: "easeOut" }} // Duración y suavidad
      className="font-[sans-serif] min-h-screen flex items-center justify-center bg-white"
    >
      <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-6 m-4 shadow-lg rounded-md">
        {/* Formulario */}
        <div className="md:max-w-md w-full px-6 py-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-12 flex items-center justify-between">
              <h3 className="text-gray-800 text-3xl font-extrabold text-center w-full">
                Inicio de sesión
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
                  placeholder="Ingresa tu matrícula"
                />
                <IdCard className="absolute right-2 text-gray-500" size={24} />
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
                  placeholder="Ingresa tu contraseña"
                />
                <Lock className="absolute right-2 text-gray-500" size={24} />
              </div>
            </div>

            {/* Opciones adicionales */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                  Recuérdame
                </label>
              </div>
              <div>
                <a href="#" className="text-blue-600 font-semibold text-sm hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>

            {/* Botón de acceso */}
            <div className="mt-12 flex justify-center">
              <button
                type="submit"
                className="w-3/4 shadow-xl py-3 px-4 text-lg tracking-wide rounded-tl-xl rounded-br-xl text-white bg-[#2a4856] hover:bg-[#03003f] focus:outline-none transition-all duration-300 transform hover:scale-105"
              >
                Iniciar sesión
              </button>
            </div>

            <p className="text-sm mt-4 text-gray-800 text-center">
              ¿No tienes cuenta?
              <Link href="/registro" className="text-blue-600 font-semibold hover:underline ml-1">
                Regístrate aquí
              </Link>
            </p>
          </form>
        </div>

        {/* Imagen lateral */}
        <div className="md:h-full bg-[#000842] rounded-xl lg:p-12 p-8">
          <img
            src="https://readymadeui.com/signin-image.webp"
            className="w-full h-full object-contain"
            alt="Login illustration"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default LoginPage;
