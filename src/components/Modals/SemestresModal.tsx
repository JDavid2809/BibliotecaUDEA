import React from "react";
import ReusableModal from "./ReusableModal";
import { useRouter } from "next/navigation";


interface SemestersModalProps {
    isOpen: boolean;
    onClose: () => void;
    
}

const SemestersModal: React.FC<SemestersModalProps> = ({ isOpen, onClose }) => {
    const router = useRouter();

    const handleSemesterClick = () => {
        router.push(`/estudiante/pageSubject`);
        onClose();
    };
    const semesters = ["Semestre 1", "Semestre 2", "Semestre 3", "Semestre 4", "Semestre 5"];

    return (
        <ReusableModal isOpen={isOpen} onClose={onClose} title="Semestres">
        <div className="flex flex-col gap-3">
            {semesters.map((semester, index) => (
            <button
                key={index}
                onClick={handleSemesterClick}
                className="flex justify-between items-center bg-gray-300 text-gray-700 p-3 rounded-lg"
            >
                <span className="text-lg">{semester}</span>
                <span className="text-gray-500 text-xl">▶</span>
            </button>
            ))}
        </div>
        </ReusableModal>
    );
};

export default SemestersModal;