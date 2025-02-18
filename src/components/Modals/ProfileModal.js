import React from "react";
import { useRouter } from "next/navigation";
import { X, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ProfileModal = ({ isOpen, onClose }) => {
    const router = useRouter();

    const handleEditProfile = () => {
        router.push("/editProfile");
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-30 flex justify-end"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white w-80 sm:w-96 h-full shadow-lg p-4 flex flex-col rounded-lg"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    >
                        {/* Encabezado */}
                        <div className="flex justify-between items-center border-b pb-2">
                            <h2 className="text-lg font-semibold">Mi perfil</h2>
                            <button onClick={onClose}>
                                <X className="w-6 h-6 text-gray-700 hover:text-red-500" />
                            </button>
                        </div>

                        {/* Contenido */}
                        <div className="flex-1 p-4">
                            <button
                                className="flex items-center gap-3 p-3 rounded-lg bg-gray-200 w-full text-left"
                                onClick={handleEditProfile}
                            >
                                <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center">
                                    <User className="w-8 h-8 text-black" />
                                </div>
                            
                                <span className="text-gray-700 font-medium">Editar mi perfil</span>
                            </button>
                        </div>

                        {/* Botón de Cerrar Sesión */}
                        <div className="p-4">
                            <button className="w-full border border-gray-400 text-gray-700 py-2 rounded-lg hover:bg-gray-100">
                                Cerrar sesión
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ProfileModal;
