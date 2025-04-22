import React, { useState } from "react";
import axios from "axios";
import ModalDesign from "./ModalDesign";
import { Lock, X, Save } from "lucide-react";

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: { nombreMateria: string; fkIdSemestre: number; fkIdArea: number }) => void; // ✅ Cambiado
  fkIdSemestre: number;
  fkIdArea: number;
}

const AddMaterials: React.FC<AddModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  fkIdSemestre,
  fkIdArea,
}) => {
  const [newItem, setNewItem] = useState("");

  const handleAdd = async () => {
    if (!newItem.trim()) {
      console.error("El nombre del material es obligatorio.");
      return;
    }

    if (!fkIdSemestre || fkIdSemestre <= 0) {
      console.error("El ID del semestre no es válido:", fkIdSemestre);
      return;
    }

    if (!fkIdArea || fkIdArea <= 0) {
      console.error("El ID del área no es válido:", fkIdArea);
      return;
    }

    try {
      console.log("Datos enviados al backend:", {
        nombreMateria: newItem,
        fkIdSemestre,
        fkIdArea,
      });

      await axios.post("http://localhost:4000/api/materias", {
        nombreMateria: newItem,
        fkIdSemestre,
        fkIdArea,
      });

      setNewItem("");
       // Llama a onAdd con los datos correctos
    onAdd({
      nombreMateria: newItem,
      fkIdSemestre,
      fkIdArea,
    }); 
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error del servidor:", error.response?.data);
      } else {
        console.error("Error desconocido:", error);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <ModalDesign title="Agregar Materiales" onClose={onClose}>
      <div className="relative w-full">
      <span className="absolute right-3 top-11 transform -translate-y-1/2 text-gray-400">
          <Lock size={20} />
        </span>
        <p className="text-center mb-1">Nombre</p>
        <input
          type="text"
          placeholder="Material"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className="w-full p-2 pr-10 border rounded-md"
        />
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={onClose}
          className="bg-gray-400 text-white px-4 py-2 mr-4 rounded-lg hover:bg-gray-500 flex items-center"
        >
          <X size={20} className="mr-2" />
          Cancelar
        </button>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-400 flex items-center"
        >
          <Save size={20} className="mr-2" />
          Agregar
        </button>
      </div>
    </ModalDesign>
  );
};

export default AddMaterials;