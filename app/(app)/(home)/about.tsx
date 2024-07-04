import Image from 'next/image'

export function About() {
  return (
    <section id="about" className="relative w-full py-16 bg-gray-700 text-white">
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center max-w-4xl mx-auto p-8 bg-black bg-opacity-50 rounded-lg space-y-8 md:space-y-0 md:space-x-8">
        <div className="w-full md:w-1/2">
          <Image
            src="/sobre.jpeg"
            alt="Sobre Nós"
            width={500}
            height={500}
            className="object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-bold mb-4">Sobre nós</h2>
          <p className="mb-4">
            Bem-vindo à nossa barbearia, onde oferecemos os melhores serviços de corte de cabelo e barba. Nossa equipe
            de profissionais altamente qualificados está pronta para proporcionar a você uma experiência única e
            personalizada.
          </p>
          <p className="mb-4">
            Com anos de experiência e paixão pelo que fazemos, garantimos que cada visita à nossa barbearia seja
            memorável. Venha nos visitar e descubra porque somos a escolha certa para o seu próximo corte ou cuidado com
            a barba.
          </p>
        </div>
      </div>
    </section>
  )
}
