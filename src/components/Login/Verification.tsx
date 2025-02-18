import { Lock, IdCard } from "lucide-react";
import Link from "next/link";

function VerificationPage() {
    return (
        <div className="font-sans min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 max-w-5xl w-full p-6 shadow-lg bg-white rounded-xl">
                <div className="w-full p-6">
                    <h3 className="text-gray-900 text-2xl md:text-3xl text-center font-bold mb-6">Código de Verificación</h3>
                    <p className="text-gray-700 mb-4 text-center text-sm md:text-base">
                        Hemos enviado un correo de verificación. Por favor, revisa tu bandeja de entrada y sigue las instrucciones del mensaje
                        para completar el proceso de validación de acceso. Si no encuentras el correo, revisa tu carpeta de spam o intenta reenviar la verificación.
                    </p>
                    
                    <div className="flex justify-center gap-2 md:gap-3 mb-6 mt-8">
                        {[...Array(3)].map((_, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                className="w-10 h-10 md:w-12 md:h-12 text-center text-lg md:text-xl border border-gray-300 bg-gray-300 rounded-md focus:border-blue-600 outline-none"
                            />
                        ))}
                        <div className="w-4 md:w-6"></div>
                        {[...Array(3)].map((_, index) => (
                            <input
                                key={index + 3}
                                type="text"
                                maxLength={1}
                                className="w-10 h-10 md:w-12 md:h-12 text-center text-lg md:text-xl border border-gray-300 bg-gray-300 rounded-md focus:border-blue-600 outline-none"
                            />
                        ))}
                    </div>

                    <div className="mt-10 flex justify-center">
                        <Link href="/login" className="inline-block w-full md:w-3/4">
                            <button
                                type="submit"
                                className="w-full shadow-xl py-3 px-4 text-lg tracking-wide rounded-tl-xl rounded-br-xl text-white bg-[#2a4856] hover:bg-[#03003f] focus:outline-none transition-all duration-300 transform hover:scale-105"
                            >
                                Verificar
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="hidden md:block md:h-full bg-[#03003f] rounded-xl p-6 md:p-12">
                    <img
                        src="https://readymadeui.com/signin-image.webp"
                        className="w-full h-full object-cover rounded-xl"
                        alt="Verification illustration"
                    />
                </div>
            </div>
        </div>
    );
}

export default VerificationPage;
