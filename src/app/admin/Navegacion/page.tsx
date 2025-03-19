"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ListaNavegacion from "@/components/NavigationList";
import AgregaCarrera from "../../../components/Modals/modalDesing/AgregaCarrera";
import AgregaSemestres from "../../../components/Modals/modalDesing/AgregaSemestres";
import AgregaMateria from "../../../components/Modals/modalDesing/AddMaterials";

type Materia = { id: number; nombre: string };
type Semestre = { id: number; nombre: string; materias: Materia[] };
type Carrera = { id: number; nombre: string; semestres: Semestre[] };

const carreras: Carrera[] = [
  {
    id: 1,
    nombre: "Estomatología",
    semestres: [
      {
        id: 1,
        nombre: "Primer Semestre",
        materias: [{ id: 1, nombre: "Anatomía Dental" }],
      },
    ],
  },
  {
    id: 2,
    nombre: "Fisioterapia",
    semestres: [
      {
        id: 2,
        nombre: "Primer Semestre",
        materias: [{ id: 2, nombre: "Biomecánica" }],
      },
    ],
  },
];

const Navigation: React.FC = () => {
  const router = useRouter(); // Hook para la navegación
  const [nivel, setNivel] = useState<"carreras" | "semestres" | "materias">("carreras");
  const [carrera, setCarrera] = useState<Carrera | null>(null);
  const [semestre, setSemestre] = useState<Semestre | null>(null);
  const [modalAbierto, setModalAbierto] = useState<"carrera" | "semestre" | "materia" | null>(null);

  const seleccionarCarrera = (c: Carrera) => {
    setCarrera(c);
    setNivel("semestres");
  };

  const seleccionarSemestre = (s: Semestre) => {
    setSemestre(s);
    setNivel("materias");
  };

  const seleccionarMateria = () => {
    router.push("/admin/books"); // Redirige a la página /books
  };

  const volverAtras = () => {
    if (nivel === "materias") setNivel("semestres");
    else if (nivel === "semestres") setNivel("carreras");
  };

  return (
    <>
      {nivel === "carreras" && (
        <ListaNavegacion
          titulo="Carreras"
          items={carreras}
          onSelect={seleccionarCarrera}
          onAgregar={() => setModalAbierto("carrera")}
        />
      )}
      {nivel === "semestres" && carrera && (
          <ListaNavegacion
            titulo={`Semestres - ${carrera.nombre}`}
            items={carrera.semestres}
            onSelect={seleccionarSemestre}
            onBack={volverAtras}
            onAgregar={() => setModalAbierto("semestre")}
          />
        )}

        {nivel === "materias" && semestre && (
          <ListaNavegacion
            titulo={`Materias - ${semestre.nombre}`}
            items={semestre.materias}
            onSelect={seleccionarMateria}
            onBack={volverAtras}
            onAgregar={() => setModalAbierto("materia")}
          />
        )}

      {modalAbierto === "carrera" && (
        <AgregaCarrera isOpen onClose={() => setModalAbierto(null)} onAdd={(item) => console.log(item)} />
      )}
      {modalAbierto === "semestre" && (
        <AgregaSemestres isOpen onClose={() => setModalAbierto(null)} onAdd={(item) => console.log(item)} />
      )}
      {modalAbierto === "materia" && (
        <AgregaMateria isOpen onClose={() => setModalAbierto(null)} onAdd={(item) => console.log(item)} />
      )}
    </>
  );
};

export default Navigation;