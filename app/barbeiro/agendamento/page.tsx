"use client";
import { useState } from "react";
import Image from "next/image";
import Slider from "react-slick"; // Certifique-se de instalar e configurar react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "../../components/Button";
import { useRouter } from "next/navigation";

export default function Agendamento() {
  const [selectedBarber, setSelectedBarber] = useState("");
  const router = useRouter();

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

  const handleBarberSelect = (barberName: string) => {
    setSelectedBarber(barberName);
    router.push("/cliente/ver-horarios"); // Redireciona para a tela de horários disponíveis do cliente
  };

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

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        Escolha seu barbeiro
      </h2>
      <div className="max-w-4xl mx-auto">
        <Slider {...settings}>
          {barbers.map((barber, index) => (
            <div key={index} className="flex flex-col items-center p-4">
              <div
                className={`relative w-64 h-64 rounded-lg overflow-hidden shadow-lg bg-white cursor-pointer ${
                  selectedBarber === barber.name
                    ? "border-4 border-blue-500"
                    : ""
                }`}
                onClick={() => handleBarberSelect(barber.name)}
              >
                <Image
                  src={barber.image}
                  alt={`Barbeiro ${barber.name}`}
                  width={256}
                  height={256}
                  layout="responsive"
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mt-4">{barber.name}</h3>
              <p className="text-sm text-gray-600">{barber.description}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
