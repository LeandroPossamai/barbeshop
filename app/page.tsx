"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const [currentBarberIndex, setCurrentBarberIndex] = useState(0);
  const barbers = [
    {
      name: "Danilo",
      image: "/danilo.jpeg",
      description: "10 anos de experiência em cortes clássicos.",
    },
    {
      name: "Lucas",
      image: "/lucas.jpeg",
      description: "Especialista em cortes modernos para homens.",
    },
    {
      name: "Erik",
      image: "/erik.jpeg",
      description: "Barbeiro especializado em cuidados de barba.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBarberIndex((prevIndex) => (prevIndex + 1) % barbers.length);
    }, 5000); // Troca a cada 5 segundos (5000ms)

    return () => clearInterval(interval);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const haircuts = [
    {
      image: "/corte1.jpeg",
      description: "Corte clássico e elegante.",
    },
    {
      image: "/corte2.jpeg",
      description: "Corte moderno e estiloso.",
    },
    {
      image: "/corte3.jpeg",
      description: "Corte moderno e estiloso.",
    },
    // Adicione mais cortes de cabelo conforme necessário
  ];

  const beards = [
    {
      image: "/barba1.jpeg",
      description: "Barba bem cuidada e alinhada.",
    },
    {
      title: "Barba 2",
      image: "/barba2.jpeg",
      description: "Estilo robusto e marcante.",
    },
    {
      title: "Barba 3",
      image: "/barba3.jpeg",
      description: "Estilo robusto e marcante.",
    },
    // Adicione mais estilos de barba conforme necessário
  ];

  return (
    <>
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Image
            src="/cartacho.png"
            alt="Logo da Barbearia"
            width={300}
            height={300}
          />
        </div>
        <nav className="flex items-center">
          <a href="#home" className="mx-2">
            Home
          </a>
          <a href="#about" className="mx-2">
            Sobre Nós
          </a>
          <a href="#haircuts" className="mx-2">
            Cortes de Cabelo
          </a>
          <a href="#beards" className="mx-2">
            Barbas
          </a>
          <button className="mx-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md">
            Agende seu horário
          </button>
          <a href="#contact" className="mx-2">
            Contato
          </a>
          <div className="mx-2">
            {/* Espaço reservado para futuros itens no nav */}
            {/* Adicione o que você quiser aqui mais tarde */}
          </div>
        </nav>
      </header>

      {/* Banner no topo */}
      <div id="home" className="relative w-full h-[30vh]">
        <img
          src="/pexels-maksgelatin-4351727.jpg"
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold">
            Bem-vindo à Barbearia Cartacho
          </h1>
        </div>
      </div>

      {/* Seção dos barbeiros */}
      <section id="barbers" className="p-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Conheça Nossos Barbeiros
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {barbers.map((barber, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  src={barber.image}
                  alt={barber.name}
                  className="w-48 h-48 object-cover rounded-full mb-4"
                />
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">{barber.name}</h3>
                  <p>{barber.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre Nós */}
      <section
        id="about"
        className="relative w-full h-[50vh] bg-blue-900 text-white flex items-center justify-center"
      >
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
        >
          <source
            src="277998261_552727936140373_4455642813868195897_n (1).mp4"
            type="video/mp4"
          />
        </video>
        <div className="relative z-10 text-center max-w-2xl p-8 bg-black bg-opacity-50 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Sobre Nós</h2>
          <p className="mb-4">
            Bem-vindo à nossa barbearia, onde oferecemos os melhores serviços de
            corte de cabelo e barba.
          </p>
        </div>
      </section>

      {/* Cortes de Cabelo */}
      <section id="haircuts" className="p-8 bg-white">
        <h2 className="text-3xl font-bold text-center mb-4">Nossos serviços</h2>
        <Slider {...settings}>
          {haircuts.map((service, index) => (
            <div key={index} className="flex flex-col items-center p-4">
              <Image
                src={service.image}
                alt={service.title}
                width={300}
                height={300}
                className="rounded-full"
              />
              <h4 className="text-xl font-bold mt-4">{service.title}</h4>
              <p className="text-center mt-2">{service.description}</p>
              <a
                href="https://wa.me/5541997623903?text=Olá,%20gostaria%20de%20consultar%20um%20horário!"
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md"
              >
                AGENDAR
              </a>
            </div>
          ))}
        </Slider>
      </section>

      {/* Barbas */}
      <section id="beards" className="p-8 bg-white">
        <h2 className="text-3xl font-bold text-center mb-4">Barbas</h2>
        <Slider {...settings}>
          {beards.map((service, index) => (
            <div key={index} className="flex flex-col items-center p-4">
              <Image
                src={service.image}
                alt={service.title}
                width={300}
                height={300}
                className="rounded-full"
              />
              <h4 className="text-xl font-bold mt-4">{service.title}</h4>
              <p className="text-center mt-2">{service.description}</p>
              <a
                href="https://wa.me/5541997623903?text=Olá,%20gostaria%20de%20consultar%20um%20horário!"
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md"
              >
                AGENDAR
              </a>
            </div>
          ))}
        </Slider>
      </section>

      <section id="contact" className="p-8 bg-white">
        <h2 className="text-3xl font-bold text-center mb-4">Contato</h2>
        <div className="flex flex-col items-center">
          <p className="text-center max-w-2xl mb-4">
            Estamos sempre disponíveis para responder às suas perguntas e
            agendar seu próximo corte ou cuidado com a barba. Entre em contato
            conosco pelos canais abaixo:
          </p>
          <div className="flex items-center space-x-4">
            <div>
              <h3 className="text-xl font-bold">Telefone:</h3>
              <p className="text-lg">+55 41 99762-3903</p>
            </div>
            <div>
              <h3 className="text-xl font-bold">Email:</h3>
              <p className="text-lg">contato@obarbeirocwb.com.br</p>
            </div>
            <div>
              <h3 className="text-xl font-bold">Localização:</h3>
              <p className="text-lg">Rua Tal, 123 - Centro, Curitiba, PR</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2024 Barbearia Cartacho. Todos os direitos reservados.</p>
      </footer>
    </>
  );
}
