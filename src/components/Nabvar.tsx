"use client";
import React, { useState } from "react";
import NotificationsModal from "@/components/Modals/NotificationModal";
import ProfileModal from "@/components/Modals/ProfileModal";
import Image from "next/image";
import { Bell, User, Search, BookMarked } from "lucide-react";
import SemestresModal from "./Modals/SemestresModal";
import Link from "next/link";

type ModalType = "notifications" | "profile" | "semesters" | null;

const Navbar = () => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const openModal = (modal: ModalType) => setActiveModal(modal);
  const closeModal = () => setActiveModal(null);

  return (
    <>
      <nav className="flex flex-wrap items-center justify-between bg-white shadow-md px-4 md:px-8 py-3 border-b border-gray-200 rounded-br-2xl rounded-bl-2xl">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Link href="/pageArea">
            <Image
              src="/udea.png"
              alt="UDEA Logo"
              width={140}
              height={60}
              className="object-contain cursor-pointer"
            />
          </Link>
        </div>

        {/* Barra de búsqueda */}
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
          <button
            onClick={() => openModal("semesters")}
            className="text-gray-700 font-semibold hover:text-blue-500 transition-colors text-lg"
          >
            {/* Visible solo en escritorio */}
            <span className="hidden md:inline">Semestres</span>

            {/* Visible solo en móvil */}
            <span className="inline md:hidden">
              <BookMarked className="w-6 h-6 md:w-7 md:h-7" />
            </span>
          </button>

          <button
            onClick={() => openModal("notifications")}
            aria-label="Abrir notificaciones"
            className="relative text-gray-700 hover:text-blue-500 transition-colors"
          >
            <Bell className="w-6 h-6 md:w-7 md:h-7" />
          </button>

          <button
            onClick={() => openModal("profile")}
            aria-label="Abrir perfil"
            className="text-gray-700 hover:text-blue-500 transition-colors"
          >
            <User className="w-6 h-6 md:w-7 md:h-7" />
          </button>
        </div>
      </nav>

      {/* Modales reutilizables */}
      {activeModal === "notifications" && (
        <NotificationsModal isOpen onClose={closeModal} />
      )}
      {activeModal === "profile" && (
        <ProfileModal isOpen onClose={closeModal} />
      )}
      {activeModal === "semesters" && (
        <SemestresModal isOpen onClose={closeModal} />
      )}
    </>
  );
};

export default Navbar;