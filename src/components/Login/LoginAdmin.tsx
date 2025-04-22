"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Lock, Eye, EyeOff, Mail } from "lucide-react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/effect-fade"
import { Pagination, Autoplay, EffectFade } from "swiper/modules"
import { toast } from "nextjs-toast-notify"
import "react-toastify/dist/ReactToastify.css"

const schema = yup.object().shape({
  correo: yup
    .string()
    .email("Correo no válido")
    .required("El correo es obligatorio"),
  password: yup
    .string()
    .min(6, "Debe tener al menos 6 caracteres")
    .max(20, "Máximo 20 caracteres")
    .matches(/^[a-zA-Z0-9]+$/, "Solo letras y números")
    .required("La contraseña es obligatoria"),
})

interface FormData {
  correo: string
  password: string
}

function LoginAdmin() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("http://localhost:4000/api/administrador/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data), // ya usamos "correo" directamente
      })

      if (!response.ok) {
        toast.error("Credenciales incorrectas", {
          duration: 4000,
          position: "top-center",
        })
        return
      }

      const result = await response.json()
      console.log("Login exitoso:", result)

      toast.success("¡Inicio de sesión exitoso!", {
        duration: 4000,
        progress: true,
        position: "top-center",
      })

      router.push("/admin")
    } catch (error) {
      console.error("Error en login:", error)
      toast.error("Error de conexión", {
        duration: 4000,
        position: "top-center",
      })
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="font-[sans-serif] min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <div className="grid md:grid-cols-2 items-center gap-0 max-w-6xl w-full mx-auto my-8 overflow-hidden rounded-2xl shadow-2xl bg-white">
        <div className="w-full px-8 py-10 md:px-12">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src="/udeaLogo2.jpg" alt="Logo" width={60} height={60} className="rounded-lg shadow-md" />
              <h3 className="text-gray-800 text-3xl font-bold">Bienvenido</h3>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Inicio de sesión</h2>
              <p className="text-gray-500">Ingresa tus credenciales para continuar</p>
            </div>

            {/* Correo */}
            <div className="mt-10">
              <label className="text-gray-800 text-base block mb-2">Correo electrónico:</label>
              <div className="relative flex items-center">
                <input
                  {...register("correo")}
                  type="email"
                  className={`w-full pr-8 text-gray-800 text-lg border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none ${
                    errors.correo ? "border-red-500" : ""
                  }`}
                  placeholder="Correo electrónico"
                />
                <Mail className="absolute right-2 text-gray-500" size={24} />
              </div>
              {errors.correo && <p className="text-red-500 text-sm font-medium mt-1">{errors.correo.message}</p>}
            </div>

            {/* Contraseña */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-gray-700 font-medium block">Contraseña</label>
                <a href="#" className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="text-gray-400" size={20} />
                </div>
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  className={`w-full pl-10 pr-12 py-3 text-gray-800 bg-gray-50 border ${
                    errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:ring-blue-500"
                  } rounded-lg focus:outline-none focus:ring-2 transition-all duration-200`}
                  placeholder="Ingresa tu contraseña"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm font-medium">{errors.password.message}</p>}
            </div>

            {/* Recuérdame */}
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Recuérdame
              </label>
            </div>

            {/* Botón de acceso */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-4 text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg transition-all duration-200"
            >
              Iniciar sesión
            </motion.button>

            <p className="text-sm mt-4 text-gray-600 text-center">
              {/*
              ¿No tienes cuenta?{" "}
              
              <Link href="/RegisterAdmin" className="text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                Regístrate aquí
              </Link>
*/}
            </p>
          </form>
        </div>

        {/* Carrusel */}
        <div className="hidden md:block h-full bg-gradient-to-br from-blue-800 to-indigo-900 rounded-l-none rounded-r-2xl">
          <div className="h-full flex flex-col justify-center p-8">
            <div className="text-white mb-8 px-4">
              <h2 className="text-3xl font-bold mb-3">UDEA Biblioteca Virtual</h2>
              <p className="text-blue-100 text-lg">
                Accede a tu portal académico y gestiona tus estudios de manera eficiente.
              </p>
            </div>

            <Swiper
              modules={[Pagination, Autoplay, EffectFade]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              effect="fade"
              className="w-full h-[300px] rounded-xl overflow-hidden shadow-2xl"
            >
              <SwiperSlide>
                <div className="relative w-full h-full">
                  <Image src="/home.jpg" fill alt="Campus universitario" className="object-cover" />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="relative w-full h-full">
                  <Image src="/UdeaPrincipal.jpg" fill alt="Biblioteca" className="object-cover" />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="relative w-full h-full">
                  <Image src="/UdeaLogin.jpg" fill alt="Laboratorios" className="object-cover" />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default LoginAdmin
