import Image from 'next/image';



export default function Home() {
  return (
  <>
    <div>
      <header>

      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-2xl font-bold">peloApp</div>
      <nav>
        <a href="#" className="mx-2">Home</a>
        <a href="#about" className="mx-2">Sobre Nós</a>
        <a href="#services" className="mx-2">Serviços</a>
        <a href="#contact" className="mx-2">Contato</a>
      </nav>
    </header>
      </header>


      <div className="relative w-full h-[80vh]">
      <Image src="/banner.jpeg" alt="Barber Shop" layout="fill" objectFit="cover" quality={75} priority />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h1 className="text-white text-4xl md:text-6xl font-bold">Bem-vindo à Barbearia Cartacho</h1>
      </div>
    </div>


    <section id="about" className="p-8 bg-white">
      <h2 className="text-3xl font-bold text-center mb-4">Sobre Nós</h2>
      <p className="text-center max-w-2xl mx-auto">
        Bem-vindo à nossa barbearia, onde oferecemos os melhores serviços de corte de cabelo e barba.
      </p>
    </section>


    </div>
    </>
  );
}
