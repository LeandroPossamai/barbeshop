import Image from 'next/image'

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between p-4 text-white font-sans bg-gray-800 bg-opacity-90 shadow-lg">
      <div className="flex items-center space-x-4">
        <Image src="/branco.png" alt="Logo" width={150} height={50} />
      </div>
      <div className="flex space-x-4 font-libre-baskerville">
        <a href="#about" className="hover:text-blue-400 hover:underline transition duration-300">
          Sobre nós
        </a>
        <a href="#book-appointment" className="hover:text-blue-400 hover:underline transition duration-300">
          Agende
        </a>
        <a href="#barbers" className="hover:text-blue-400 hover:underline transition duration-300">
          Barbeiros
        </a>
        <a href="#contact" className="hover:text-blue-400 hover:underline transition duration-300">
          Contato
        </a>
      </div>
    </nav>
  )
}
