"use client"

import { useState } from "react"
import NotificationsModal from "@/components/Modals/NotificationModal"
import SemestresModal from "./Modals/SemestresModal"
import Image from "next/image"
import { User, BookMarked, LogOut, PencilIcon } from "lucide-react"
import { useAuth } from "../../hooks/useAuth"
import { useRouter } from "next/navigation"
import { toast, Toaster } from "react-hot-toast"

type ModalType = "notifications" | "semesters" | null

const Navbar = () => {
  const [activeModal, setActiveModal] = useState<ModalType>(null)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const { user, logout, isAuthenticated } = useAuth()
  const router = useRouter()

  const openModal = (modal: ModalType) => setActiveModal(modal)
  const closeModal = () => setActiveModal(null)

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen)
  }

  const handleLogout = async () => {
    try {
      setIsProfileOpen(false)
      logout()
      toast.success("Sesión cerrada correctamente")

      setTimeout(() => {
        if (user?.role === "alumno") {
          router.push("/")
        } else {
          router.push("/")
        }
      }, 1500)
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
      toast.error("Error al cerrar sesión")
    }
  }

  return (
    <>
      <Toaster position="top-center" />
      <nav className="flex flex-wrap items-center justify-between bg-white shadow-md px-4 md:px-8 py-3 border-b border-gray-200 rounded-br-2xl rounded-bl-2xl">
        
        {/* Logo */}
        <div className="flex items-center space-x-4">
            <Image src="/udea.png" alt="UDEA Logo" width={140} height={60} className="object-contain" />
        </div>

        {/* Barra de búsqueda solo si está autenticado */}
        {/* {isAuthenticated && (
          <div className="hidden md:flex relative flex-1 max-w-lg">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full pl-12 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-gray-700"
            />
          </div>
        )} */}

        {/* Iconos y opciones */}
        <div className="flex items-center space-x-4 md:space-x-8">

          {/* Botón de Semestres solo si está autenticado */}
          {isAuthenticated && (
            <button
              onClick={() => openModal("semesters")}
              className="text-gray-700 font-semibold hover:text-blue-500 transition-colors text-lg"
            >
              {/* Visible solo en escritorio */}
              <span className="hidden md:inline">Semestres</span>

              {/* Visible solo en móvil */}
              <span className="inline md:hidden">
                <BookMarked className="w-6 h-6 md:w-7 md:h-7" />
              </span>
            </button>
          )}

          {/* Perfil con dropdown solo si está autenticado */}
          {isAuthenticated && user && (
            <div className="relative">
              <button
                onClick={toggleProfile}
                aria-label="Abrir perfil"
                className="text-gray-700 hover:text-blue-500 transition-colors"
              >
                <User className="w-6 h-6 md:w-7 md:h-7" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                  <div className="px-4 py-3 border-b">
                    <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    <span className="inline-block mt-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                      {user.role === "alumno" ? "Estudiante" : user.role}
                    </span>
                  </div>
                  <button
                    onClick={() => router.push("/estudiante/editProfile")}
                    className="block w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-gray-100 flex items-center"
                  >
                    <PencilIcon className="mr-2 h-4 w-4" />
                    Editar perfil
                  </button>

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </nav>

      {/* Modales reutilizables */}
      {activeModal === "notifications" && <NotificationsModal isOpen onClose={closeModal} />}
      {activeModal === "semesters" && <SemestresModal isOpen onClose={closeModal} />}
    </>
  )
}

export default Navbar
