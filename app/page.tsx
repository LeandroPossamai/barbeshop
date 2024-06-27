"use client";

import { useState, useEffect } from "react";
import { CiLocationOn } from "react-icons/ci";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
  @import
  url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
</style>;
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
    slidesToShow: 3,
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
    },
    {
      image: "/corte2.jpeg",
    },
    {
      image: "/corte3.jpeg",
    },
    {
      image: "/corte4.jpeg",
    },
    {
      image: "/corte5.jpeg",
    },
    {
      image: "/corte6.jpeg",
    },
    // Adicione mais cortes de cabelo conforme necessário
  ];

  const beards = [
    {
      image: "/barba1.jpeg",
    },
    {
      image: "/barba2.jpeg",
    },
    {
      image: "/barba3.jpeg",
    },
    {
      image: "/barba5.jpeg",
    },
    {
      image: "/imagem4.jpeg",
    },
    // Adicione mais estilos de barba conforme necessário
  ];

  const handleButtonClick = () => {
    // Lógica para o botão aqui, se necessário
    alert("Botão clicado!"); // Exemplo simples de ação ao clicar
  };

  return (
    <>
      {/* Navbar */}
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between p-4 text-white font-sans bg-gray-800 bg-opacity-90 shadow-lg">
        <div className="flex items-center space-x-4">
          <Image src="/branco.png" alt="Logo" width={150} height={50} />
        </div>
        <div className="flex space-x-4 font-libre-baskerville">
          <a
            href="#about"
            className="hover:text-blue-400 hover:underline transition duration-300"
          >
            Sobre nós
          </a>
          <a
            href="#book-appointment"
            className="hover:text-blue-400 hover:underline transition duration-300"
          >
            Agende
          </a>
          <a
            href="#barbers"
            className="hover:text-blue-400 hover:underline transition duration-300"
          >
            Barbeiros
          </a>
          <a
            href="#contact"
            className="hover:text-blue-400 hover:underline transition duration-300"
          >
            Contato
          </a>
        </div>
      </nav>

      <header className="relative w-full h-screen">
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="277998261_552727936140373_4455642813868195897_n (1).mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white font-serif">
            <h1 className="text-4xl md:text-6xl font-bold font-libre-baskerville">
              Bem-vindo à barbearia cartacho
            </h1>
            <button
              className="bg-transparent border-4 border-white text-white px-10 py-4 shadow-lg mt-4 transition duration-300 transform hover:scale-105 hover:bg-blue-600 text-lg font-bold font-bebas-neue"
              onClick={handleButtonClick}
              style={{
                position: "absolute",
                bottom: "20%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              Agende seu horário
            </button>
          </div>
        </div>
      </header>

      {/* Seção dos barbeiros */}
      <section id="barbers" className="p-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Conheça nossos barbeiros
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
      <section id="book-appointment" className="bg-white py-4">
        <div className="max-w-4xl mx-auto text-center">
          <button
            className="bg-black hover:bg-gray-500 text-white px-8 py-4 shadow-lg transition duration-300 transform hover:scale-105"
            onClick={handleButtonClick} // Função a ser chamada ao clicar
          >
            Agende seu horário
          </button>
        </div>
      </section>
      {/* Sobre Nós */}
      <section
        id="about"
        className="relative w-full py-16 bg-gray-700 text-white"
      >
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

          <div className="w-full md:w-1/2 text-center md:text-left font-libre-baskerville">
            <h2 className="text-4xl font-bold mb-4">Sobre nós</h2>
            <p className="mb-4">
              Bem-vindo à nossa barbearia, onde oferecemos os melhores serviços
              de corte de cabelo e barba. Nossa equipe de profissionais
              altamente qualificados está pronta para proporcionar a você uma
              experiência única e personalizada.
            </p>
            <p className="mb-4">
              Com anos de experiência e paixão pelo que fazemos, garantimos que
              cada visita à nossa barbearia seja memorável. Venha nos visitar e
              descubra porque somos a escolha certa para o seu próximo corte ou
              cuidado com a barba.
            </p>
          </div>
        </div>
      </section>

      {/* Cortes de Cabelo */}
      <section id="haircuts" className="py-16 bg-gray-100">
        <h2 className="text-4xl font-bold text-center mb-8">Nossos serviços</h2>
        <div className="max-w-6xl mx-auto">
          <Slider {...settings}>
            {haircuts.map((service, index) => (
              <div key={index} className="flex flex-col items-center p-4">
                <div className="relative w-64 h-64 rounded-lg overflow-hidden shadow-lg bg-white">
                  <Image
                    src={service.image}
                    alt={`Corte ${index + 1}`}
                    width={256}
                    height={256}
                    layout="responsive"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Seção de Barbas */}
      <section id="beards" className="py-16 bg-gray-100">
        <h2 className="text-4xl font-bold text-center mb-8">Barbas</h2>
        <div className="max-w-6xl mx-auto">
          <Slider {...settings}>
            {beards.map((service, index) => (
              <div key={index} className="flex flex-col items-center p-4">
                <div className="relative w-64 h-64 rounded-lg overflow-hidden shadow-lg bg-white">
                  <Image
                    src={service.image}
                    alt={`Barba ${index + 1}`}
                    width={256}
                    height={256}
                    layout="responsive"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Seção de Contato e Rodapé */}

      <footer className="bg-gray-800 text-white p-8">
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
                <MdEmail />{" "}
              </h3>
              <p className="text-lg">danilo.cartacho@hotmail.com</p>
            </div>
            <div>
              <h3 className="text-xl font-bold">
                <FaMapLocationDot />
              </h3>
              <p className="text-lg">
                Rua Augusto Stresser, 1396 - Juvevê, Curitiba
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end space-y-4 mt-8 md:mt-0">
            <button
              className="bg-transparent border-4 border-white text-white px-10 py-4 shadow-lg transition duration-300 transform hover:scale-105 hover:bg-blue-600 text-lg font-bold"
              onClick={handleButtonClick}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontWeight: 400,
              }}
            >
              Agende seu horário
            </button>
            <Image src="/branco.png" alt="Logo" width={200} height={200} />
          </div>
        </div>
        <p className="text-center mt-4">
          &copy; 2024 Barbearia Cartacho. Todos os direitos reservados.
        </p>
      </footer>
    </>
  );
}
