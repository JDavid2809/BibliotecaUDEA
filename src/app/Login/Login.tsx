import { User, Lock, IdCard } from "lucide-react";

function LoginPage() {
  return (
    <div className="font-sans min-h-screen flex items-center justify-center bg-gray-100">
      <div className="grid md:grid-cols-2 items-center gap-6 max-w-5xl w-full p-6 shadow-lg bg-white rounded-xl">
        {/* Formulario */}
        <div className="md:max-w-md w-full p-6">
          <h3 className="text-gray-900 text-3xl font-bold mb-6">Inicio de sesión</h3>

          <form>
            {/* Matrícula */}
            <div className="mt-10">
              <label htmlFor="matricula" className="text-gray-800 text-xs block mb-2">
                Matrícula
              </label>
              <div className="relative flex items-center">
                <IdCard className="absolute left-2 text-gray-500" size={18} />
                <input
                  id="matricula"
                  name="matricula"
                  type="number"
                  required
                  className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-8 py-3 outline-none"
                  placeholder="Ingresa tu matrícula"
                />
              </div>
            </div>

            {/* Contraseña */}
            <div className="mt-8">
              <label htmlFor="password" className="text-gray-800 text-xs block mb-2">
                Contraseña
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-2 text-gray-500" size={18} />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-8 py-3 outline-none"
                  placeholder="Ingresa tu contraseña"
                />
              </div>
            </div>

            {/* Opciones adicionales */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                  Recuérdame
                </label>
              </div>
              <div>
                <a href="#" className="text-blue-600 font-semibold text-sm hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>

            {/* Botón de acceso */}
            <div className="mt-12">
            <button
              type="submit"
              className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-tl-xl rounded-br-xl text-white bg-[#2a4856] hover:bg-[#03003f] focus:outline-none transition-all duration-300 transform hover:scale-105">
              Iniciar sesión
            </button>

              <p className="text-sm mt-4 text-gray-800">
                ¿No tienes cuenta?
                <a
                  href="#"
                  className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                >
                  Regístrate aquí
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* Imagen lateral */}
        <div className="md:h-full bg-[#03003f] rounded-xl lg:p-12 p-8">
          <img
            src="https://readymadeui.com/signin-image.webp"
            className="w-full h-full object-cover rounded-xl"
            alt="Login illustration"
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
