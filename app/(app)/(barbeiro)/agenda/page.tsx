"use client";

import { useState } from "react";

import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";

export default function BarberAgenda() {
  const [slots, setSlots] = useState<string[]>([]);
  const [newSlot, setNewSlot] = useState("");
  const router = useRouter();

  function addSlot() {
    if (newSlot && !slots.includes(newSlot)) {
      setSlots([...slots, newSlot]);
      setNewSlot("");
    }
  }

  function saveSlots() {
    // Simulação de salvar slots no backend
    localStorage.setItem("barberSlots", JSON.stringify(slots));
    alert("Horários salvos com sucesso!");
  }

  function viewSlots() {
    router.push("/ver-horarios");
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        Definir Horários Disponíveis
      </h2>
      <div className="flex flex-col items-center space-y-4">
        <input
          type="datetime-local"
          value={newSlot}
          onChange={(e) => setNewSlot(e.target.value)}
          placeholder="Adicionar novo horário"
          className="p-2 border border-gray-300 rounded"
        />
        <Button onClick={addSlot}>Adicionar Horário</Button>
        <ul className="w-full list-disc pl-5">
          {slots.map((slot, index) => (
            <li key={index} className="p-2 border-b border-gray-300">
              {slot}
            </li>
          ))}
        </ul>
        <Button onClick={saveSlots}>Salvar Horários</Button>
        <Button onClick={viewSlots}>Ver Horários</Button>
      </div>
    </div>
  );
}
