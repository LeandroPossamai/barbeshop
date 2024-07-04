import Link from 'next/link'

export function Header() {
  return (
    <header className="relative w-full h-screen">
      <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover">
        <source src="277998261_552727936140373_4455642813868195897_n (1).mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center text-white font-serif">
          <h1 className="text-4xl md:text-6xl font-bold font-libre-baskerville">Bem-vindo à barbearia cartacho</h1>
          <Link
            href="/agendamento"
            className="absolute bottom-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-transparent border-4 border-white text-white px-10 py-4 shadow-lg mt-4 transition duration-300 transform hover:scale-105 hover:bg-blue-600 text-lg font-bold"
          >
            Agende seu horário
          </Link>
        </div>
      </div>
    </header>
  )
}
