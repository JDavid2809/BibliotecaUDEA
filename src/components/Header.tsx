"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Header: React.FC = () => {
  const pathname = usePathname();
  
  // Convertimos el pathname en un array de rutas limpias
  const rutas = pathname
    .split("/")
    .filter(Boolean)
    .map((segmento) => {
      // Mapear nombres personalizados
      const mapeo: Record<string, string> = {
        PageSubject: "Materiales",
        pageLibrary: "Libros",
        PageBook: "Muestra de libro",
      };
      return mapeo[segmento] || segmento;
    });

  return (
    <header className="w-full bg-[#0048ac] py-4 text-white">
      <nav className="container mx-auto px-4">
        <ul className="flex items-center space-x-2 text-sm">
          <li>
            <Link href="/pageArea" className="hover:underline">
              Inicio
            </Link>
          </li>
          {rutas.map((ruta, index) => (
            <li key={index} className="flex items-center">
              <span className="mx-2">›</span>
              <Link
                href={`/${pathname.split("/").slice(1, index + 2).join("/")}`}
                className="hover:underline"
              >
                {ruta}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
