"use client";

import React, { useEffect, useState } from "react";
import { Pencil, User, ImagePlus, CircleX, Save } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "nextjs-toast-notify";
import Image from "next/image";

interface Area {
    id: number;
    nombreArea: string;
    }

    interface Semestre {
    idSemestre: number;
    nombreSemestre: string;
    fkIdArea: number;
    }

    interface Materia {
    idMateria: number;
    nombreMateria: string;
    fkIdSemestre: number;
    }

    const EditarLibro = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const idLibro = searchParams.get("id");

    const [nombreLibro, setNombreLibro] = useState("");
    const [autor, setAutor] = useState("");
    const [descripcion, setDescripcion] = useState("");

    const [portada, setPortada] = useState<File | null>(null);
    const [archivo, setArchivo] = useState<File | null>(null);
    const [previewImg, setPreviewImg] = useState<string | null>(null);
    const [previewPdf, setPreviewPdf] = useState<string | null>(null);

    const [fkIdArea, setFkIdArea] = useState<number | null>(null);
    const [fkIdSemestre, setFkIdSemestre] = useState<number | null>(null);
    const [fkIdMateria, setFkIdMateria] = useState<number | null>(null);

    const [areas, setAreas] = useState<Area[]>([]);
    const [semestres, setSemestres] = useState<Semestre[]>([]);
    const [materias, setMaterias] = useState<Materia[]>([]);

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const [areaRes, semestreRes, materiaRes] = await Promise.all([
                    fetch("http://localhost:4000/api/area/"),
                    fetch("http://localhost:4000/api/semestre/"),
                    fetch("http://localhost:4000/api/materias/"),
                ]);
    
                setAreas(await areaRes.json());
                setSemestres(await semestreRes.json());
                setMaterias(await materiaRes.json());
            } catch {
                toast.error("Error al cargar información del backend");
            }
        };
    
        fetchInfo();
    }, []);
    
    useEffect(() => {
        if (idLibro) {
            const fetchLibro = async () => {
                try {
                    const res = await fetch(`http://localhost:4000/api/books/getBooks/${idLibro}`);
                    const data = await res.json();
    
                    setNombreLibro(data.nombreLibro || "");
                    setAutor(data.autor || "");
                    setDescripcion(data.descripcion || "");
                    setFkIdArea(data.fkIdArea);
                    setFkIdSemestre(data.fkIdSemestre);
                    setFkIdMateria(data.fkIdMateria);
                } catch {
                    toast.error("Error al obtener los datos del libro.");
                }
            };
    
            fetchLibro();
        }
    }, [idLibro]);

    const handlePortadaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
        setPortada(file);
        setPreviewImg(URL.createObjectURL(file));
        }
    };

    const handleArchivoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
        setArchivo(file);
        setPreviewPdf(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        if (!nombreLibro || !autor || !descripcion || !fkIdArea || !fkIdSemestre || !fkIdMateria) {
        toast.error("Por favor llena todos los campos.");
        return;
        }

        const formData = new FormData();
        formData.append("nombreLibro", nombreLibro);
        formData.append("autor", autor);
        formData.append("descripcion", descripcion);
        formData.append("fkIdArea", fkIdArea.toString());
        formData.append("fkIdSemestre", fkIdSemestre.toString());
        formData.append("fkIdMateria", fkIdMateria.toString());
        formData.append("idLibro", idLibro!); // Añadido idLibro a la solicitud

        if (portada) formData.append("portada", portada);
        if (archivo) formData.append("archivo", archivo);

        try {
        console.log("Datos a enviar:", {
            nombreLibro,
            autor,
            descripcion,
            fkIdArea,
            fkIdSemestre,
            fkIdMateria,
            portada,
            archivo,
        });

        const res = await fetch(`http://localhost:4000/api/books/updateBook/${idLibro}`, {
            method: "PUT",
            body: formData,
        });

        if (res.ok) {
            toast.success("Libro actualizado correctamente");
            router.push("/admin/books"); 
        } else {
            const errorText = await res.text();
            toast.error(`Error al actualizar el libro: ${errorText}`);
        }
        } catch (err) {
        console.error(err);
        toast.error("Error de red al actualizar");
        }
    };

    const filteredSemestres = semestres.filter((s) => s.fkIdArea === fkIdArea);
    const filteredMaterias = materias.filter((m) => m.fkIdSemestre === fkIdSemestre);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl flex flex-col md:flex-row gap-6">
            {/* Sección izquierda */}
            <div className="flex flex-col items-center w-full md:w-1/2 relative">
            <label className="w-60 h-60 bg-gray-300 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-400 overflow-hidden">
            {previewImg ? (
                <Image
                    src={previewImg}
                    alt="Previsualización"
                    className="rounded-full object-cover"
                    width={240}
                    height={240}
                />
                ) : (
                <ImagePlus size={70} className="text-gray-700" />
                )}
                <input type="file" accept="image/*" onChange={handlePortadaChange} className="hidden" />
            </label>

            <div className="my-6 text-center">
                <input type="file" accept="application/pdf" onChange={handleArchivoChange} />
                {previewPdf && <iframe src={previewPdf} className="w-60 h-60 mt-4 border rounded" title="PDF preview" />}
            </div>

            <div className="flex w-full mt-6 gap-16 justify-center">
                <button
                className="bg-blue-600 text-white px-3 py-1 rounded-md flex items-center gap-2 justify-center text-sm hover:bg-blue-800"
                onClick={() => router.back()}
                >
                <CircleX size={18} /> Cancelar
                </button>
                <button
                className="bg-white text-blue-600 border border-blue-600 px-3 py-1 rounded-md flex items-center gap-2 justify-center text-sm hover:bg-gray-300"
                onClick={handleSubmit}
                >
                <Save size={18} className="text-blue-600" /> Guardar
                </button>
            </div>
            </div>

            {/* Sección derecha */}
            <div className="flex-1 md:w-1/2">
            <h2 className="text-3xl font-bold mb-4 text-center md:text-left">Editar libro</h2>

            <div className="mb-4">
                <label className="block text-gray-700">Nombre</label>
                <div className="relative">
                <input
                    type="text"
                    value={nombreLibro}
                    onChange={(e) => setNombreLibro(e.target.value)}
                    className="w-full p-2 border rounded-md pl-10 text-gray-700"
                    placeholder="Nombre del libro"
                />
                <Pencil className="absolute left-3 top-2.5 text-gray-500" size={20} />
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Autor</label>
                <div className="relative">
                <input
                    type="text"
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                    className="w-full p-2 border rounded-md pl-10 text-gray-700"
                    placeholder="Autor"
                />
                <User className="absolute left-3 top-2.5 text-gray-500" size={20} />
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Descripción</label>
                <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full p-2 border rounded-md text-gray-700"
                placeholder="Descripción del libro"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Área</label>
                <select
                className="w-full p-2 border rounded-md text-gray-700"
                value={fkIdArea ?? ""}
                onChange={(e) => {
                    const selected = parseInt(e.target.value);
                    setFkIdArea(selected);
                    setFkIdSemestre(null);
                    setFkIdMateria(null);
                }}
                >
                <option value="">Selecciona un área</option>
                {areas.map((area) => (
                    <option key={area.id} value={area.id}>
                    {area.nombreArea}
                    </option>
                ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Semestre</label>
                <select
                className="w-full p-2 border rounded-md text-gray-700"
                value={fkIdSemestre ?? ""}
                onChange={(e) => {
                    const selected = parseInt(e.target.value);
                    setFkIdSemestre(selected);
                    setFkIdMateria(null);
                }}
                disabled={!fkIdArea}
                >
                <option value="">Selecciona un semestre</option>
                {filteredSemestres.map((sem) => (
                    <option key={sem.idSemestre} value={sem.idSemestre}>
                    {sem.nombreSemestre}
                    </option>
                ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Materia</label>
                <select
                className="w-full p-2 border rounded-md text-gray-700"
                value={fkIdMateria ?? ""}
                onChange={(e) => setFkIdMateria(parseInt(e.target.value))}
                disabled={!fkIdSemestre}
                >
                <option value="">Selecciona una materia</option>
                {filteredMaterias.map((materia) => (
                    <option key={materia.idMateria} value={materia.idMateria}>
                    {materia.nombreMateria}
                    </option>
                ))}
                </select>
            </div>
            </div>
        </div>
        </div>
    );
};

export default EditarLibro;
