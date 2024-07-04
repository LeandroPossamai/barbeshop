import { FaWhatsapp } from 'react-icons/fa'
import { FaMapLocationDot } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'

import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
  return (
    <footer id="contact" className="bg-gray-800 text-white p-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col space-y-4 text-center md:text-left">
          <div>
            <h3 className="text-xl font-bold">
              <FaWhatsapp />
            </h3>
            <p className="text-lg">(41) 3402-4001</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">
              <MdEmail />
            </h3>
            <p className="text-lg">danilo.cartacho@hotmail.com</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">
              <FaMapLocationDot />
            </h3>
            <p className="text-lg">Rua Augusto Stresser, 1396 - Juvevê, Curitiba</p>
          </div>
        </div>
        <div className="flex flex-col items-center md:items-end space-y-4 mt-8 md:mt-0">
          <Link
            href="/agendamento"
            className="bg-transparent border-4 border-white text-white px-10 py-4 shadow-lg transition duration-300 transform hover:scale-105 hover:bg-blue-600 text-lg font-bold"
          >
            Agende seu horário
          </Link>
          <Image src="/branco.png" alt="Logo" width={200} height={200} />
        </div>
      </div>
      <p className="text-center mt-4">&copy; 2024 Barbearia Cartacho. Todos os direitos reservados.</p>
    </footer>
  )
}
