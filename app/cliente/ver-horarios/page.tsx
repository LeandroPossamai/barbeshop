"use client";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useRouter } from "next/navigation";

export default function ClienteHorarios() {
  const [slots, setSlots] = useState<string[]>([]);
  const router = useRouter();

  const viewSlots = () => {
    router.push("/cliente/horarios");
  };

  useEffect(() => {
    // Simulação de fetch dos horários do backend/localStorage
    const savedSlots = JSON.parse(localStorage.getItem("barberSlots") || "[]");
    setSlots(savedSlots);
  }, []);

  const voltarHome = () => {
    router.push("/");
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        Horários do Barbeiro
      </h2>
      <ul className="w-full list-disc pl-5">
        {slots.length > 0 ? (
          slots.map((slot, index) => (
            <li key={index} className="p-2 border-b border-gray-300">
              {slot}
            </li>
          ))
        ) : (
          <li className="p-2">Nenhum horário disponível.</li>
        )}
      </ul>
      <Button className="custom-class" onClick={voltarHome}>
        Voltar
      </Button>
      <Button className="custom-class" onClick={viewSlots}>
        Ver Horários
      </Button>
    </div>
  );
}
