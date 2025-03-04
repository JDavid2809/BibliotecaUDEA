import React from "react";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";
import ReusableModal from "./ReusableModal";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  const handleEditProfile = () => {
    router.push("/editProfile");
    onClose();
  };

  return (
    <ReusableModal isOpen={isOpen} onClose={onClose} title="Mi perfil">
      <button
        className="flex items-center gap-3 p-3 rounded-lg bg-gray-200 w-full text-left"
        onClick={handleEditProfile}
      >
        <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center">
          <User className="w-8 h-8 text-black" />
        </div>
        <span className="text-gray-700 font-medium">Editar mi perfil</span>
      </button>
      <button className="w-full border border-gray-400 text-gray-700 py-2 rounded-lg mt-4 hover:bg-gray-100">
        Cerrar sesión
      </button>
    </ReusableModal>
  );
};

export default ProfileModal;