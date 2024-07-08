"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";

type Appointment = {
  barber: string;
  time: string;
  name: string;
  email: string;
  phone: string; // Adicionando o campo de telefone
};

export default function ViewSlots() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Simulação de fetch dos agendamentos do backend/localStorage
    const savedAppointments = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    ) as Appointment[];
    setAppointments(savedAppointments);
  }, []);

  function backToAgenda() {
    router.push("/agenda");
  }

  function formatDateTime(dateTime: string) {
    const dateObj = new Date(dateTime);
    const formattedDate = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${String(
      dateObj.getFullYear()
    ).slice(2)}`;
    const formattedTime = `${dateObj.getHours()}:${String(
      dateObj.getMinutes()
    ).padStart(2, "0")}`;
    return `${formattedDate} ${formattedTime}`;
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Horários Marcados</h2>
      <ul className="w-full list-disc pl-5">
        {appointments.length > 0 ? (
          appointments.map((appointment, index) => (
            <li key={index} className="p-2 border-b border-gray-300">
              <p>
                <strong></strong> {appointment.barber}
              </p>
              <p>
                <strong></strong> {formatDateTime(appointment.time)}
              </p>
              <p>
                <strong></strong> {appointment.name}
              </p>
              <p>
                <strong></strong> {appointment.email}
              </p>
              <p>
                <strong></strong> {appointment.phone}
              </p>
            </li>
          ))
        ) : (
          <li className="p-2">Nenhum horário agendado.</li>
        )}
      </ul>
      <Button onClick={backToAgenda}>Voltar à Agenda</Button>
    </div>
  );
}
