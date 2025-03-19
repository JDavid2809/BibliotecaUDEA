import React from "react";
import { motion } from "framer-motion";

interface ModalDesignProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

const ModalDesign: React.FC<ModalDesignProps> = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white rounded-lg shadow-lg p-6 w-[450px]"
      >
        <h2 className="text-center text-xl font-bold text-gray-800">{title}</h2>
        <div className="mt-4">{children}</div>
        <div className="flex justify-center mt-6"></div>
      </motion.div>
    </div>
  );
};

export default ModalDesign;
