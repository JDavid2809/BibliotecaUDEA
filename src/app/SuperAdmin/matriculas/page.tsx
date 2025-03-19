"use client";

import React, { useState } from "react";
import { Search, Pencil, Trash2, UserRoundPlus } from "lucide-react";
import AgregarModal from "../../../components/Modals/modalDesing/AgregaModal";
import EditarModal from "../../../components/Modals/modalDesing/EditarModal";
import EliminarModal from "../../../components/Modals/modalDesing/EliminarModal";

interface Matricula {
  id: number;
  numero: string;
}

type ModalType = "Agregar" | "Editar" | "Eliminar" | null;

const MatriculasComponent: React.FC = () => {
  const [matriculas, setMatriculas] = useState<Matricula[]>(Array.from({ length: 8 }, (_, i) => ({
    id: i + 1, numero: "123456789"
  })));
  const [busqueda, setBusqueda] = useState<string>("");
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedMatricula, setSelectedMatricula] = useState<Matricula | null>(null);

  const openModal = (modal: ModalType, matricula?: Matricula) => {
    setSelectedMatricula(matricula || null);
    setActiveModal(modal);
  };
  const closeModal = () => setActiveModal(null);

  const handleAgregar = (numero: string) => {
    const nuevaMatricula = { id: matriculas.length + 1, numero };
    setMatriculas((prev) => [...prev, nuevaMatricula]);
    closeModal(); // Cierra el modal después de agregar
  };
  

  const handleEditar = (id: number, nuevoNumero: string) => {
    setMatriculas(matriculas.map(m => (m.id === id ? { ...m, numero: nuevoNumero } : m)));
  };

  const handleEliminar = (id: number) => {
    setMatriculas((prev) => prev.filter((m) => m.id !== id));
    closeModal(); // Cierra el modal después de eliminar
  };
  

  const matriculasFiltradas = matriculas.filter((m) => m.numero.includes(busqueda));

  return (
    <div className="min-h-screen p-4 font-sans">
          <h2 className="text-2xl font-bold text-gray-900">Registro Matricula</h2>
      <div className="flex justify-between items-center mb-4 mt-1">
        <button
          onClick={() => openModal("Agregar")}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
        >
          <UserRoundPlus className="w-5 h-5" /> Agregar
        </button>

        <div className="relative w-64">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="bg-blue-900 text-white font-bold p-3 rounded-t-lg">Matrículas</div>
      <div className="bg-gray-100 divide-y divide-gray-300 rounded-b-lg">
        {matriculasFiltradas.map((matricula) => (
          <div key={matricula.id} className="flex justify-between items-center px-4 py-3">
            <span className="text-gray-900">{matricula.numero}</span>
            <div className="flex gap-4">
              <button
                onClick={() => openModal("Editar", matricula)}
                className="text-blue-500 hover:text-blue-700"
              >
                <Pencil className="w-5 h-5" />
              </button>
              <button
                onClick={() => openModal("Eliminar", matricula)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modales */}
      {activeModal === "Agregar" && (
  <AgregarModal
    isOpen
    onClose={closeModal}
    onAdd={(numero) => {
      handleAgregar(numero);
      closeModal(); // Asegura que el modal se cierre
    }}
  />
)}
      {activeModal === "Editar" && selectedMatricula && (
        <EditarModal
          isOpen
          onClose={closeModal}
          onSave={(nuevoNumero) => handleEditar(selectedMatricula.id, nuevoNumero)}
          currentData={selectedMatricula.numero}
        />
      )}
     {activeModal === "Eliminar" && selectedMatricula && (
  <EliminarModal
    isOpen
    onClose={closeModal}
    onConfirm={() => {
      handleEliminar(selectedMatricula.id);
      closeModal(); // Asegura que el modal se cierre
    }}
  />
      )}
    </div>
  );
};

export default MatriculasComponent;
