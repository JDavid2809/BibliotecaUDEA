"use client";
import React, { useEffect, useState } from "react";
import { Pencil, User, ImagePlus, CircleX, Save } from "lucide-react";
import { toast } from "nextjs-toast-notify";
import Image from "next/image"; // Importación de Next.js Image

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

const AgregarLibro = () => {
  const [nombreLibro, setNombreLibro] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [autor, setAutor] = useState("");

  const [areas, setAreas] = useState<Area[]>([]);
  const [semestres, setSemestres] = useState<Semestre[]>([]);
  const [materias, setMaterias] = useState<Materia[]>([]);

  const [fkIdArea, setFkIdArea] = useState<number | null>(null);
  const [fkIdSemestre, setFkIdSemestre] = useState<number | null>(null);
  const [fkIdMateria, setFkIdMateria] = useState<number | null>(null);

  const [portada, setPortada] = useState<File | null>(null);
  const [archivo, setArchivo] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [previewPdf, setPreviewPdf] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [areaRes, semestreRes, materiaRes] = await Promise.all([
          fetch("http://localhost:4000/api/area/"),
          fetch("http://localhost:4000/api/semestre/"),
          fetch("http://localhost:4000/api/materias/"),
        ]);

        const areaData = await areaRes.json();
        const semestreData = await semestreRes.json();
        const materiaData = await materiaRes.json();

        setAreas(areaData);
        setSemestres(semestreData);
        setMaterias(materiaData);
      } catch (error) {
        toast.error("Error al cargar datos del backend.");
        console.error(error);
      }
    };

    fetchData();
  }, []);

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
    if (!nombreLibro || !descripcion || !autor || !fkIdArea || !fkIdSemestre || !fkIdMateria || !portada || !archivo) {
      toast.error("Por favor llena todos los campos.");
      return;
    }

    const formData = new FormData();
    formData.append("nombreLibro", nombreLibro);
    formData.append("descripcion", descripcion);
    formData.append("autor", autor);
    formData.append("fkIdArea", fkIdArea.toString());
    formData.append("fkIdSemestre", fkIdSemestre.toString());
    formData.append("fkIdMateria", fkIdMateria.toString());
    formData.append("portada", portada);
    formData.append("archivo", archivo);

    try {
      const res = await fetch("http://localhost:4000/api/books/create", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        toast.success("¡Libro agregado correctamente!");
        setNombreLibro("");
        setDescripcion("");
        setAutor("");
        setFkIdArea(null);
        setFkIdSemestre(null);
        setFkIdMateria(null);
        setPortada(null);
        setArchivo(null);
        setPreviewImg(null);
        setPreviewPdf(null);
      } else {
        toast.error("Error al registrar el libro.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error de red.");
    }
  };

  const filteredSemestres = semestres.filter(s => s.fkIdArea === fkIdArea);
  const filteredMaterias = materias.filter(m => m.fkIdSemestre === fkIdSemestre);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl flex flex-col md:flex-row gap-6">
        {/* Sección izquierda - Imagen */}
        <div className="flex flex-col items-center w-full md:w-1/2 relative">
          <label className="w-60 h-60 bg-gray-300 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-400 overflow-hidden">
            {previewImg ? (
              <Image 
                src={previewImg} 
                alt="Previsualización" 
                width={240} 
                height={240} 
                className="object-cover rounded-full"
              />
            ) : (
              <ImagePlus size={70} className="text-gray-700" />
            )}
            <input type="file" accept="image/*" onChange={handlePortadaChange} className="hidden" />
          </label>

          <div className="my-6 text-center">
            <input type="file" accept="application/pdf" onChange={handleArchivoChange} />
            {previewPdf && (
              <iframe src={previewPdf} className="w-60 h-60 mt-4 border rounded" title="PDF preview" />
            )}
          </div>

          <div className="flex w-full mt-6 gap-16 justify-center">
            <button className="bg-blue-600 text-white px-3 py-1 rounded-md flex items-center gap-2 justify-center text-sm hover:bg-blue-800" onClick={() => {}}>
              <CircleX size={18} /> Cancelar
            </button>
            <button className="bg-white text-blue-600 border border-blue-600 px-3 py-1 rounded-md flex items-center gap-2 justify-center text-sm hover:bg-gray-300" onClick={handleSubmit}>
              <Save size={18} className="text-blue-600" /> Agregar
            </button>
          </div>
        </div>

        {/* Sección derecha - Formulario */}
        <div className="flex-1 md:w-1/2">
          <h2 className="text-3xl font-bold mb-4 text-center md:text-left">Agregar libro</h2>

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
              {filteredMaterias.map((mat) => (
                <option key={mat.idMateria} value={mat.idMateria}>
                  {mat.nombreMateria}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgregarLibro;
