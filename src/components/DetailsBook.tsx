"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, StarHalf, Download, Eye } from "lucide-react";

const BookDetailSection: React.FC = () => {
    return (
        <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="py-8"
        >
        <div className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row gap-6">

            <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex-shrink-0 flex justify-center"
            >
            <img
                src="8.jpg"
                alt="Portada del libro"
                className="w-80 h-auto object-cover rounded"
            />
            </motion.div>

            <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col justify-center flex-1"
            >
            <h2 className="text-2xl font-bold mb-1">Interstellar</h2>
            <p className="text-gray-600 mb-4">Autor: Pancho</p>

            <p className="text-gray-700 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.
            </p>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex flex-wrap items-center gap-4 mb-6"
            >
                <button className="bg-[#0048ac] text-white px-8 py-3 rounded-2xl flex items-center gap-2 hover:bg-[#3c7498] transition">
                Ver en linea
                <Eye size={24} />
                </button>
            </motion.div>
            </motion.div>
        </div>
        </motion.section>
    );
};

export default BookDetailSection;
