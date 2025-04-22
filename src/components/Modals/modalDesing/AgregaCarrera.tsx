import React, { useState } from "react";
import ModalDesign from "./ModalDesign";
import { Lock, X, Save } from "lucide-react";
import Swal from "sweetalert2";

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newCarrera: { nombreArea: string }) => void; // Pasa el objeto completo
}

const AddCarrera: React.FC<AddModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [newItem, setNewItem] = useState("");

  const handleAdd = async () => {
    if (newItem.trim() !== "") {
      try {
        const response = await fetch("http://localhost:4000/api/area/createArea", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nombreArea: newItem }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error al crear el área:", errorData);
          return;
        }

        const data = await response.json();

        Swal.fire({
          title: "¡Éxito!",
          text: `Área "${data.area.nombreArea}" creada exitosamente.`,
          icon: "success",
          confirmButtonText: "Aceptar",
        });

        onAdd(data.area); // ✅ Enviamos el objeto completo
        setNewItem("");
        onClose();
      } catch (error) {
        console.error("Error en la solicitud:", error);
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al crear el área.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    }
  };

  if (!isOpen) return null;

  return (
    <ModalDesign title="Agregar Area" onClose={onClose}>
      <div className="relative w-full">
        <span className="absolute right-3 top-11 transform -translate-y-1/2 text-gray-400">
          <Lock size={20} />
        </span>
        <p className="text-center">Nombre</p>
        <input
          type="text"
          placeholder="Carrera"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className="w-full p-2 pr-10 border rounded-md"
        />
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={onClose}
          className="bg-gray-400 text-white px-4 py-2 mr-10 rounded-lg hover:bg-gray-500 relative flex items-center"
        >
          <span className="mr-2">
            <X size={20} />
          </span>
          Cancelar
        </button>

        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-400 relative flex items-center"
        >
          <span className="mr-2">
            <Save size={20} />
          </span>
          Agregar
        </button>
      </div>
    </ModalDesign>
  );
};

export default AddCarrera;
