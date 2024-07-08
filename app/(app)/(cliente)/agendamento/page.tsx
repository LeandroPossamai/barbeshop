"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Carousel } from "@/components/Carousel";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { Button } from "@/components/Button";

type Appointment = {
  barber: string;
  time: string;
  name: string;
  email: string;
};

export default function Agendamento() {
  const [selectedBarber, setSelectedBarber] = useState("");
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Fetch available slots from localStorage
    const savedSlots = JSON.parse(localStorage.getItem("barberSlots") || "[]");
    setAvailableSlots(savedSlots);
  }, []);

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

  function handleBarberSelect(barberName: string) {
    setSelectedBarber(barberName === selectedBarber ? "" : barberName);
    setSelectedTime("");
  }

  function handleTimeSelect(time: string) {
    setSelectedTime(time);
  }

  function handleConfirm() {
    if (selectedBarber && selectedTime) {
      const queryParams = new URLSearchParams({
        barber: selectedBarber,
        time: selectedTime,
      }).toString();
      router.push(`/pre-cadastro?${queryParams}`);
    }
  }

  function formatDateTime(dateTime: string) {
    const dateObj = new Date(dateTime);
    const formattedDate = `${String(dateObj.getDate()).padStart(2, "0")}/${String(
      dateObj.getMonth() + 1
    ).padStart(2, "0")}/${String(dateObj.getFullYear()).slice(2)}`;
    const formattedTime = `${String(dateObj.getHours()).padStart(2, "0")}:${String(
      dateObj.getMinutes()
    ).padStart(2, "0")}`;
    return `${formattedDate} ${formattedTime}`;
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        Escolha seu barbeiro
      </h2>
      <div className="max-w-4xl mx-auto">
        <Carousel>
          {barbers.map((barber, index) => (
            <div key={index} className="flex flex-col items-center p-4">
              <div
                className={cn(
                  "relative w-64 h-64 rounded-lg overflow-hidden shadow-lg bg-white cursor-pointer",
                  selectedBarber === barber.name && "border-4 border-blue-500"
                )}
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
        </Carousel>
      </div>
      {selectedBarber && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-center mb-4">
            Selecione um horário
          </h3>
          <div className="flex flex-wrap justify-center space-y-2">
            {availableSlots.map((slot, index) => (
              <button
                key={index}
                className={cn(
                  "p-2 border rounded-lg w-20 text-sm",
                  selectedTime === slot
                    ? "bg-blue-500 text-white" // Estilo para botão selecionado
                    : "bg-white text-gray-700" // Estilo para botão não selecionado
                )}
                onClick={() => handleTimeSelect(slot)}
              >
                {formatDateTime(slot)}
              </button>
            ))}
          </div>
          <div className="text-center mt-4">
            <Button onClick={handleConfirm} disabled={!selectedTime}>
              Confirmar Agendamento
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
