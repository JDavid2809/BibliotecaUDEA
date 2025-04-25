"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"

interface Materia {
    idMateria: number
    nombreMateria: string
    area: {
        nombreArea: string
    }
    semestre: {
        nombreSemestre: string
    }
}

export default function MateriasGrid() {
    const [materias, setMaterias] = useState<Materia[]>([])

    useEffect(() => {
        const fetchMaterias = async () => {
            try {
                const res = await fetch("http://localhost:4000/api/materias/")
                const data = await res.json()
                setMaterias(data)
            } catch (error) {
                console.error("Error al cargar materias:", error)
            }
        }

        fetchMaterias()
    }, [])

    return (
        <motion.div 
            className="container mx-auto px-12 py-12"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.8 }}
        >
            <motion.h1 
                className="text-4xl font-bold mb-12 text-center"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                Materias
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {materias.map((materia, index) => (
                        <motion.div 
                            key={materia.idMateria} 
                            className="bg-white rounded-lg shadow-md overflow-hidden p-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="relative h-52">
                                <Image
                                    src="/portadaMateria.png"
                                    alt={materia.nombreMateria}
                                    width={200}
                                    height={200}
                                    className="w-full h-full object-cover rounded-md"
                                />
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-semibold mb-2">{materia.nombreMateria}</h3>
                                <p className="text-gray-600 mb-2 text-base">Área: {materia.area.nombreArea}</p>
                                <p className="text-gray-600 mb-4 text-base">Semestre: {materia.semestre.nombreSemestre}</p>
                                <div className="flex justify-center">
                                <Link
                                    href={{
                                        pathname: `/estudiante/librosPorMateria/${materia.idMateria}`,
                                        query: { materiaNombre: materia.nombreMateria }
                                    }}
                                    className="inline-block bg-[#0048ac] text-white font-semibold px-5 py-2 rounded-full hover:bg-[#02013f] transition-colors text-base"
                                    >
                                    VER MÁS
                                </Link>

                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div 
                    className="bg-[#0048ac] text-white rounded-lg p-6"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <h2 className="text-2xl font-bold mb-5">¡Siempre hay algo nuevo!</h2>
                    <div className="relative h-56 mb-5">
                        <Image
                            src="/8.jpg"
                            alt="Nuevos cursos"
                            width={200}
                            height={200}
                            className="w-full h-full object-cover rounded-md"
                        />
                    </div>
                    <p className="text-gray-200 text-base">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                    </p>
                </motion.div>
            </div>
        </motion.div>
    )
}
