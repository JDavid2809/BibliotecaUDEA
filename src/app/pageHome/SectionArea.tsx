import React from 'react'

export default function Seccion1() {
    return (
        <div>
        {/* Sección 1 */}
        <div
        className="min-h-screen bg-cover bg-center relative"
        style={{ backgroundImage: "url('/udea.png')" }}
        >
        <h1 className="text-5xl text-[#2a4856] font-bold text-center pt-10">
            Estomatología
        </h1>

        <div className="absolute top-1/3 right-10 bg-[#2a4856] p-8 rounded-lg shadow-lg max-w-lg">
            <p className="text-sm text-white uppercase mb-2">New Arrival</p>
            <h2 className="text-4xl text-white font-bold mb-3 leading-tight">
            Algo nuevo que <br /> aprender!!
            </h2>
            <p className="text-white mb-6 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
            </p>
            <button className="bg-white text-black font-semibold px-6 py-3 shadow hover:bg-gray-200 transition">
            APRENDER MÁS
            </button>
        </div>
        </div>
    </div>
    )
}
