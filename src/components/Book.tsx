"use client";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { motion } from "framer-motion";

const books = [
  {
    title: "Integral",
    subtitle: "Matematicas para enfermos",
    author: "Mtro..........",
    image: "https://placehold.co/400x600",
  },
  {
    title: "Integral",
    subtitle: "Doctor house",
    author: "Mtro..........",
    image: "https://placehold.co/400x600",
  },
  {
    title: "Integral ",
    subtitle: "Literas",
    author: "Mtro..........",
    image: "https://placehold.co/400x600",
  },
  {
    title: "Integral",
    subtitle: "Matematicas para enfermos",
    author: "Mtro..........",
    image: "https://placehold.co/400x600",
  },
  {
    title: "Integral",
    subtitle: "Doctor house",
    author: "Mtro..........",
    image: "https://placehold.co/400x600",
  },
  {
    title: "Integral ",
    subtitle: "Literas",
    author: "Mtro..........",
    image: "https://placehold.co/400x600",
  },
];

export default function Book() {
    const [hoveredBook, setHoveredBook] = useState<number | null>(null);
    const router = useRouter();

    const handlerPage = () => {
        router.push("/pageBook");
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.map((book, index) => (
            <motion.div
            key={index}
            onClick={handlerPage}
            className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer"
            onMouseEnter={() => setHoveredBook(index)}
            onMouseLeave={() => setHoveredBook(null)}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.08, transition: { duration: 0.15 } }} // Hover más rápido y fluido
            >
            <img src={book.image} alt={book.title} className="w-full h-80 object-cover" />
            {hoveredBook === index && (
                <motion.div
                className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }} // Hacer que el icono aparezca más rápido
                >
                <span className="text-white text-lg">
                    <Eye size={40} />
                </span>
                </motion.div>
            )}
            <div className="p-4 bg-white text-center">
                <h2 className="text-lg font-bold">{book.title}</h2>
                <p className="text-sm text-gray-600">{book.subtitle}</p>
                <p className="text-sm text-gray-500 mt-1">{book.author}</p>
            </div>
            </motion.div>
        ))}
        </div>
    );
}
