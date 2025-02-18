"use client"
import React, { useState } from "react";
import NotificationsModal from "@/components/Modals/NotificationModal";
import ProfileModal from "@/components/Modals/ProfileModal";
import Image from "next/image";
import { Bell, User, Search } from "lucide-react";

const Navbar = () => {
    const [activeModal, setActiveModal] = useState<"notifications" | "profile" | null>(null);

    const openModal = (modal: "notifications" | "profile") => setActiveModal(modal);
    
  const closeModal = () => setActiveModal(null);

  return (
    <>
      <nav className="flex flex-wrap items-center justify-between bg-white shadow-md px-4 md:px-8 py-3 border-b border-gray-200 rounded-br-2xl rounded-bl-2xl">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Image
            src="/udea.png"
            alt="UDEA Logo"
            width={140}
            height={60}
            className="object-contain"
          />
        </div>

        {/* Barra de búsqueda */}
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

        {/* Iconos y opciones */}
        <div className="flex items-center space-x-4 md:space-x-8">
          <a
            href="#"
            className="hidden md:block text-gray-700 font-semibold hover:text-blue-500 transition-colors text-lg"
          >
            Semestres
          </a>

          <button
            onClick={() => openModal("notifications")}
            className="relative text-gray-700 hover:text-blue-50mmn0 transition-colors"
          >
            <Bell className="w-6 h-6 md:w-7 md:h-7" />
          </button>

          <button
            onClick={() => openModal("profile")}
            className="text-gray-700 hover:text-blue-500 transition-colors"
          >
            <User className="w-6 h-6 md:w-7 md:h-7" />
          </button>
        </div>
      </nav>

      {/* Renderizar modales según el estado */}
      <NotificationsModal isOpen={activeModal === "notifications"} onClose={closeModal} />
      <ProfileModal isOpen={activeModal === "profile"} onClose={closeModal} />
    </>
  );
};

export default Navbar;