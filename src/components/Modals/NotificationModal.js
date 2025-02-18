import React from "react";
import { X, Bell, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NotificationModal = ({ isOpen, onClose }) => {
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
                            <h2 className="text-lg font-semibold flex items-center gap-2">
                                <Bell className="w-5 h-5 text-gray-700" /> Notificaciones
                            </h2>
                            <button onClick={onClose}>
                                <X className="w-6 h-6 text-gray-700 hover:text-red-500" />
                            </button>
                        </div>

                        {/* Lista de Notificaciones */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            <div className="flex items-center gap-2 text-gray-600">
                                <Bell className="w-5 h-5 text-gray-500" /> Algo nuevo
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <Bell className="w-5 h-5 text-gray-500" /> Esto te puede interesar
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <Bot className="w-5 h-5 text-gray-500" /> ¿Necesitas ayuda?
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <Bell className="w-5 h-5 text-gray-500" /> Más....
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <Bell className="w-5 h-5 text-gray-500" /> Más...
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <Bell className="w-5 h-5 text-gray-500" /> Algo nuevo
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default NotificationModal;
