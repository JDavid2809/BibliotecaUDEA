"use client"

import { useRouter } from "next/navigation"
import type React from "react"
import { useState } from "react"
import { User, Mail, Lock, Phone, BadgeIcon as IdCard } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "nextjs-toast-notify"
import "react-toastify/dist/ReactToastify.css"
import Image from "next/image"
import * as yup from "yup"

// Define validation schema with Yup
const validationSchema = yup.object({
  matricula: yup
    .string()
    .required("La matrícula es obligatoria")
    .length(11, "La matrícula debe tener exactamente 11 caracteres"),
  nombre: yup.string().required("El nombre es obligatorio").min(3, "El nombre debe tener al menos 3 caracteres"),
  telefono: yup
    .string()
    .required("El número telefónico es obligatorio")
    .matches(/^\d{10}$/, "El número telefónico debe tener 10 dígitos"),
  email: yup.string().required("El correo electrónico es obligatorio").email("Ingresa un correo electrónico válido"),
  password: yup
    .string()
    .required("La contraseña es obligatoria")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  carrera: yup.string().required("La carrera es obligatoria"),
  matriculaConfirmacion: yup
    .string()
    .required("La confirmación de matrícula es obligatoria")
    .oneOf([yup.ref("matricula")], "Las matrículas no coinciden"),
})

function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    matricula: "",
    matriculaConfirmacion: "",
    nombre: "",
    telefono: "",
    email: "",
    password: "",
    carrera: "Estomatología",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })

    // Clear error for this field when user types
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate form data against schema
      await validationSchema.validate(formData, { abortEarly: false })

      // Prepare data for API
      const userData = {
        matricula: formData.matricula,
        nombre: formData.nombre,
        telefono: formData.telefono,
        email: formData.email,
        password: formData.password,
        carrera: formData.carrera,
      }

      console.log(userData)
      // Send data to API using fetch
      const response = await fetch("http://localhost:4000/api/alumno/CreateUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      // Check if response is ok
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`)
      }

      // Handle successful response
      toast.success("Registro exitoso", {
        duration: 4000,
        progress: true,
        position: "top-center",
        transition: "bounceIn",
        icon: "",
        sound: true,
      })

      // Redirect to verification page after successful registration
      router.push("/verification")
    } catch (error) {
      // Handle validation errors
      if (error instanceof yup.ValidationError) {
        // Transform Yup errors into a more usable format
        const validationErrors: Record<string, string> = {}
        error.inner.forEach((err) => {
          if (err.path) {
            validationErrors[err.path] = err.message
          }
        })

        setErrors(validationErrors)

        // Show toast with first error message
        const firstError = error.inner[0]?.message || "Por favor verifica los campos del formulario"
        toast.error(firstError, {
          duration: 4000,
          progress: true,
          position: "top-center",
          transition: "bounceIn",
          icon: "",
          sound: true,
        })
      } else {
        // Handle API and other errors
        toast.error(error instanceof Error ? error.message : "Ocurrió un error inesperado", {
          duration: 4000,
          progress: true,
          position: "top-center",
          transition: "bounceIn",
          icon: "",
          sound: true,
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

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
              <h3 className="text-gray-800 text-3xl font-extrabold text-center w-full">Registro</h3>
              <Image src="/udeaLogo2.jpg" alt="Logo" width={80} height={80} className="ml-auto" />
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
                  className={`w-full pr-8 text-gray-800 text-lg border-b ${errors.matricula ? "border-red-500" : "border-gray-300"} focus:border-blue-600 px-2 py-3 outline-none`}
                  placeholder="Matrícula (11 caracteres)"
                  maxLength={11}
                />
                <IdCard className="absolute right-2 text-gray-500" size={24} />
              </div>
              {errors.matricula && <p className="text-red-500 text-sm mt-1">{errors.matricula}</p>}
            </div>
            <br />
            <div>
              <label className="text-gray-800 text-base block mb-2">Confirma tu matrícula:</label>
              <div className="relative flex items-center">
                <input
                  name="matriculaConfirmacion"
                  type="text"
                  required
                  value={formData.matriculaConfirmacion}
                  onChange={handleChange}
                  className={`w-full pr-8 text-gray-800 text-lg border-b ${errors.matriculaConfirmacion ? "border-red-500" : "border-gray-300"} focus:border-blue-600 px-2 py-3 outline-none`}
                  placeholder="Confirmar matrícula"
                  maxLength={11}
                />
                <IdCard className="absolute right-2 text-gray-500" size={24} />
              </div>
              {errors.matriculaConfirmacion && (
                <p className="text-red-500 text-sm mt-1">{errors.matriculaConfirmacion}</p>
              )}
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
                  className={`w-full pr-8 text-gray-800 text-lg border-b ${errors.nombre ? "border-red-500" : "border-gray-300"} focus:border-blue-600 px-2 py-3 outline-none`}
                  placeholder="Nombre completo"
                />
                <User className="absolute right-2 text-gray-500" size={24} />
              </div>
              {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
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
                  className={`w-full pr-8 text-gray-800 text-lg border-b ${errors.telefono ? "border-red-500" : "border-gray-300"} focus:border-blue-600 px-2 py-3 outline-none`}
                  placeholder="Número telefónico (10 dígitos)"
                  maxLength={10}
                />
                <Phone className="absolute right-2 text-gray-500" size={24} />
              </div>
              {errors.telefono && <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>}
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
                  className={`w-full pr-8 text-gray-800 text-lg border-b ${errors.email ? "border-red-500" : "border-gray-300"} focus:border-blue-600 px-2 py-3 outline-none`}
                  placeholder="Correo electrónico"
                />
                <Mail className="absolute right-2 text-gray-500" size={24} />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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
                  className={`w-full pr-8 text-gray-800 text-lg border-b ${errors.password ? "border-red-500" : "border-gray-300"} focus:border-blue-600 px-2 py-3 outline-none`}
                  placeholder="Contraseña"
                />
                <Lock className="absolute right-2 text-gray-500" size={24} />
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Carrera */}
            <div className="mt-8">
              <label className="text-gray-800 text-base block mb-2">Carrera:</label>
              <div className="relative">
                <select
                  name="carrera"
                  value={formData.carrera}
                  onChange={handleChange}
                  className={`w-full border ${errors.carrera ? "border-red-500" : "border-gray-300"} rounded-lg px-4 py-3 text-lg bg-white focus:ring-2 focus:ring-blue-600 transition-all duration-300 ease-in-out`}
                >
                  <option value="Estomatología">Estomatología</option>
                  <option value="Fisioterapia">Fisioterapia</option>
                  <option value="Enfermería">Enfermería</option>
                  <option value="Nutrición">Nutrición</option>
                </select>
              </div>
              {errors.carrera && <p className="text-red-500 text-sm mt-1">{errors.carrera}</p>}
            </div>

            {/* Botón de registro */}
            <div className="mt-12 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full shadow-xl py-3 px-4 text-lg tracking-wide rounded-xl text-white bg-[#0048ac] hover:bg-[#03003f] focus:outline-none transition-all duration-300 transform hover:scale-105 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {isSubmitting ? "Procesando..." : "Registrarse"}
              </button>
            </div>
          </form>
        </div>

        {/* Imagen decorativa */}
        <div className="md:h-full rounded-xl lg:p-12 p-8 relative w-full h-[400px]">
          <Image src="/UdeaLogin.jpg" alt="login-image" fill className="rounded-xl object-cover" />
        </div>
      </div>
    </motion.div>
  )
}

export default RegisterPage
