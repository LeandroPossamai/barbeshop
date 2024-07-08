"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type Appointment = {
  barber: string;
  time: string;
  name: string;
  email: string;
  phone: string; // Adicionado o campo phone
};

export default function PreCadastro() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const barber = searchParams.get("barber");
  const time = searchParams.get("time");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // Estado para armazenar o telefone

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Salvar os dados do agendamento
    const appointments = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    ) as Appointment[];
    const newAppointment: Appointment = {
      barber: barber!,
      time: time!,
      name,
      email,
      phone, // Incluindo o telefone no novo agendamento
    };
    appointments.push(newAppointment);
    localStorage.setItem("appointments", JSON.stringify(appointments));

    // Remover o horário selecionado da lista de horários disponíveis
    const savedSlots = JSON.parse(localStorage.getItem("barberSlots") || "[]");
    const updatedSlots = savedSlots.filter((slot: string) => slot !== time);
    localStorage.setItem("barberSlots", JSON.stringify(updatedSlots));

    alert(
      `Agendamento confirmado:\nBarbeiro: ${barber}\nHorário: ${time}\nNome: ${name}\nEmail: ${email}\nTelefone: ${phone}`
    );
    router.push("/");
  }

  return (
    <div className="max-w-md mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Pré-cadastro</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nome
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Telefone
          </label>
          <input
            type="tel" // Tipo "tel" para input de telefone
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded w-full"
        >
          Confirmar Agendamento
        </button>
      </form>
    </div>
  );
}
