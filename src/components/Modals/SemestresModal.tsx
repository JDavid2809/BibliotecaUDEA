"use client"

import type React from "react"
import { useEffect, useState } from "react"
import ReusableModal from "./ReusableModal"
import { useRouter } from "next/navigation"

interface Area {
  id: number
  nombreArea: string
}

interface Materia {
  idMateria: number
  nombreMateria: string
  fkIdSemestre: number
  fkIdArea: number
}

interface Semestre {
  idSemestre: number
  nombreSemestre: string
  fkIdArea: number
  area: Area
  materias: Materia[]
}

interface SemestersModalProps {
  isOpen: boolean
  onClose: () => void
}

const SemestersModal: React.FC<SemestersModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter()
  const [semesters, setSemesters] = useState<Semestre[]>([])
  // const [selectedSemester, setSelectedSemester] = useState<Semestre | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Cargar semestres cuando el modal se abre
    if (isOpen) {
      setIsLoading(true)
      fetch("http://localhost:4000/api/semestre/")
        .then((res) => res.json())
        .then((data) => {
          console.log("Semestres recibidos: ", data)
          setSemesters(data)
          setIsLoading(false)
        })
        .catch((error) => {
          console.error("Error al obtener semestres:", error)
          setIsLoading(false)
        })
    }
  }, [isOpen])

  useEffect(() => {
    // Verificar si hay un semestre seleccionado en localStorage al recargar la página
    const storedSemester = localStorage.getItem("selectedSemester")
    if (storedSemester) {
      try {
  
      } catch (error) {
        console.error("Error parsing stored semester:", error)
      }
    }
  }, [])

  // Function to fetch complete semester data including materias
  const fetchCompleteSemesterData = async (semesterId: number): Promise<Semestre | null> => {
    try {
      const response = await fetch(`http://localhost:4000/api/semestre/${semesterId}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch semester: ${response.status}`)
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error fetching semester details:", error)
      return null
    }
  }

  const handleSemesterClick = async (semester: Semestre) => {
    try {
      setIsLoading(true)

      // Fetch complete semester data to ensure we have materias
      const completeSemester = await fetchCompleteSemesterData(semester.idSemestre)

      // Use complete data if available, otherwise use the clicked semester
      const semesterToStore = completeSemester || semester

      // Guardar el semestre seleccionado en localStorage
      // localStorage.setItem("selectedSemester", JSON.stringify(semesterToStore))

      // Log para ver si el semestre seleccionado es el correcto
      console.log("Semestre seleccionado: ", semesterToStore)

      // Redirigir a otra página con los parámetros necesarios
      const query = new URLSearchParams({
        semestre: String(semesterToStore.idSemestre),
        nombre: semesterToStore.nombreSemestre,
      }).toString()

      router.push(`/estudiante/pageSubject?${query}`)
      onClose()
    } catch (error) {
      console.error("Error selecting semester:", error)
      setIsLoading(false)
    }
  }

  return (
    <ReusableModal isOpen={isOpen} onClose={onClose} title="Semestres">
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {/* Mostrar semestres */}
          {semesters.map((semester) => (
            <button
              key={semester.idSemestre}
              onClick={() => handleSemesterClick(semester)}
              className="flex justify-between items-center bg-gray-300 text-gray-700 p-3 rounded-lg hover:bg-gray-400 transition-colors"
            >
              <span className="text-lg">{semester.nombreSemestre}</span>
              <span className="text-gray-500 text-xl">▶</span>
            </button>
          ))}
        </div>
      )}

      {/* Mostrar el semestre seleccionado y sus materias */}
      {/* {selectedSemester && (
        <div className="mt-5">
          <h3 className="text-xl font-bold">Semestre seleccionado: {selectedSemester.nombreSemestre}</h3>
          {selectedSemester.materias && selectedSemester.materias.length > 0 ? (
            <ul className="mt-3">
              {selectedSemester.materias.map((materia) => (
                <li key={materia.idMateria} className="text-gray-700 py-1">
                  {materia.nombreMateria}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-gray-500">No hay materias disponibles para este semestre.</p>
          )}
        </div>
      )} */}
    </ReusableModal>
  )
}

export default SemestersModal
