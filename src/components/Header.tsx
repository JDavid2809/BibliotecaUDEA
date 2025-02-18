export default function Header() {
    return (
      <header className="w-full bg-[#1e3a4c] py-6">
        <nav className="container mx-auto px-4">
          <ul className="flex items-center">
            <li>
              <a href="/" className="text-white hover:text-gray-300 transition-colors">
                Inicio
              </a>
            </li>
          </ul>
        </nav>
      </header>
    )
  }