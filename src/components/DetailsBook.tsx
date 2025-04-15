"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import Image from "next/image";

interface BookDetail {
  nombreLibro: string;
  autor: string;
  descripcion: string;
  portadaUrl: string;
  archivoUrl: string;
}

const BookDetailSection: React.FC = () => {
  const params = useParams();
  const id = params?.id;
  const [book, setBook] = useState<BookDetail | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchBook = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/books/getBooks/${id}`);
        const data = await res.json();

        const cleanBook: BookDetail = {
          nombreLibro: data.nombreLibro.replaceAll('"', ''),
          autor: data.autor.replaceAll('"', ''),
          descripcion: data.descripcion.replaceAll('"', ''),
          portadaUrl: data.portadaUrl,
          archivoUrl: data.archivoUrl,
        };

        setBook(cleanBook);
      } catch (err) {
        console.error("Error al obtener detalles del libro:", err);
      }
    };

    fetchBook();
  }, [id]);

  if (!book) return <p className="text-center py-10">Cargando...</p>;

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
          <Image
            src={`http://localhost:4000${book.portadaUrl}`}
            width={200}
            height={200}
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
          <h2 className="text-2xl font-bold mb-1">{book.nombreLibro}</h2>
          <p className="text-gray-600 mb-4">Autor: {book.autor}</p>

          <p className="text-gray-700 mb-6">{book.descripcion}</p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap items-center gap-4 mb-6"
          >
            <a
              href={`http://localhost:4000${book.archivoUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0048ac] text-white px-8 py-3 rounded-2xl flex items-center gap-2 hover:bg-[#3c7498] transition"
            >
              Ver en línea
              <Eye size={24} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default BookDetailSection;
