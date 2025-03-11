"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Seccion1() {
    const router = useRouter();

    const handleClick = () => {
        router.push('/pageSubject');
    }
    return (
        <div>
            {/* Sección 1 */}
            <div
                className="min-h-screen bg-cover bg-center relative"
                style={{ backgroundImage: "url('/udea.png')" }}
            >
                <motion.h1 
                    className="text-5xl text-[#0048ac] font-bold text-center pt-10"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    Estomatología
                </motion.h1>

                <motion.div
                    className="absolute top-1/3 right-10 bg-[#0048ac] p-10 rounded-lg shadow-lg max-w-lg bg-opacity-80"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    <p className="text-sm text-white uppercase mb-2">Recién llegado</p>
                    <h2 className="text-4xl text-white font-bold mb-3 leading-tight">
                        Algo nuevo que <br /> aprender!!
                    </h2>
                    <p className="text-white mb-6 leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleClick}
                        className="bg-white text-black font-semibold px-6 py-3 shadow hover:bg-gray-200 transition"
                    >
                        APRENDER MÁS
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
}
