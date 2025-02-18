    import Image from "next/image"
    import { X, Save, Pencil, Phone, Mail, CircleX } from "lucide-react"

    export default function EditProfile() {
    return (
        <div className="min-h-screen p-6 flex bg-[#f0f0f0] items-center justify-center">
        <div className="w-full max-w-4xl rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-8">
            {/* Columna Izquierda - Perfil Actual */}
            <div className="flex flex-col items-center space-y-6">
                <div className="relative">
                <img
                src="https://img.freepik.com/vector-premium/icono-perfil-usuario-estilo-plano-ilustracion-vector-avatar-miembro-sobre-fondo-aislado-concepto-negocio-signo-permiso-humano_157943-15752.jpg?semt=ais_hybrid"
                className="rounded-full w-[220px] h-[220px] border-gray-500"
                />

                <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md">
                    <Pencil className="h-4 w-4 text-gray-700" />
                </button>
                </div>

                <div className="w-full space-y-4 text-slate-300">
                <div className="flex items-center gap-2">
                    <span className="text-[#b3b3b3] w-24">Nombre:</span>
                    <span className="text-[#b3b3b3]">Jesús</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[#b3b3b3]  w-24">Teléfono:</span>
                    <span className="text-[#b3b3b3]">666-666-66-66</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[#b3b3b3]  w-24">Correo:</span>
                    <span className="text-[#b3b3b3]">example@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[#b3b3b3]  w-24">Matrícula:</span>
                    <span className="text-[#b3b3b3]">12345678</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[#b3b3b3]  w-24">Carrera:</span>
                    <span className="text-[#b3b3b3]">Estomatología</span>
                </div>
                </div>
            </div>

            {/* Columna Derecha - Formulario de Edición */}
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-black text-center">Editar perfil</h1>
                <form className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm text-black font-semibold" >Nombre: </label>
                    <div className="relative">
                    <input  
                        type="text"
                        placeholder="Nombre"
                        className="w-full p-2 bg-[#f0f0f0] border border-slate-700 text-black rounded-md pr-10"
                    />
                    <Pencil className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#343a40]" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm text-black font-semibold">Teléfono: </label>
                    <div className="relative">
                    <input
                        type="tel"
                        placeholder="Teléfono"
                        className="w-full p-2 bg-[#f0f0f0] border border-slate-700 text-black rounded-md pr-10"
                    />
                    <Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#343a40]" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm text-black font-semibold">Correo electrónico: </label>
                    <div className="relative">
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        className="w-full p-2 bg-[#f0f0f0] border border-slate-700 text-black rounded-md pr-10"
                    />
                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#343a40]" />
                    </div>
                </div>

                <div className="flex gap-4 justify-end">
                    <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-white shadow-xl bg-[#2a4856] hover:bg-red-700">
                    Cancelar
                    <CircleX  className="h-4 w-4 text-white" />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white text-gray-900 rounded-lg shadow-xl hover:bg-gray-300">
                    Guardar
                    <Save className="h-4 w-4 text-[#2a4856]" />
                    </button>
                </div>
                </form>
            </div>
            </div>
        </div>
        </div>
    )
    }