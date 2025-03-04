"use client"
import React, { useState } from 'react';

import Modal from '@/components/Modals/CardModal'; // Asegúrate de importar el componente Modal

const Seccion2 = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const cards = [
    {
      image: "https://placehold.co/60",
      options: "Saber más.."
    },
    {
      image: "https://placehold.co/60",
      options: "Saber más.."
    },
    {
      image: "https://placehold.co/60",
      options: "Saber más.."
    }
  ];

  const openModal = (index: number) => {
    setSelectedCard(index);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedCard(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 text-left">
      <h1 className="text-5xl font-bold mb-4 text-blue-950">Bienvenido</h1>
      <p className="text-gray-600 max-w-full mb-10 text-justify">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem
        ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
      </p>

      <h2 className="text-2xl font-bold mb-2 text-gray-800 text-center">¿Quieres saber más?</h2>
      <p className="text-gray-600 mb-6 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <img
              src={card.image}
              alt="Imagen"
              className="w-full h-80 object-cover transition-transform duration-300 transform hover:scale-105"
            />
            <div
              className={`absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 transition-opacity duration-300 ${hoveredCard === index ? 'opacity-100' : 'opacity-0'}`}
            >
              <button
                className="px-4 py-2 bg-white text-gray-800 rounded-md hover:bg-gray-200 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  openModal(index);
                }}
              >
                {card.options}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Aquí se renderiza el Modal */}
      <Modal 
        isVisible={modalVisible} 
        closeModal={closeModal} 
        selectedCard={selectedCard} 
      />
    </div>
  );
};

export default Seccion2;
