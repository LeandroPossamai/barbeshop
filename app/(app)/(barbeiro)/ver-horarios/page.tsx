"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";

type Appointment = {
  barber: string;
  time: string;
  name: string;
  email: string;
  phone: string;
};

export default function ViewSlots() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const response = await fetch(`/api/schedules?barberId=ID_DO_BARBEIRO`);
        if (!response.ok) {
          throw new Error('Erro ao buscar horários');
        }
        const data = await response.json();

        // Transforme os dados recebidos em appointments se necessário
        const formattedAppointments = data.map((slot: any) => ({
          barber: slot.barberId, // Ajuste conforme necessário
          time: slot.date,
          name: slot.clientName || "N/A", // Adapte conforme a estrutura dos dados
          email: slot.clientEmail || "N/A", // Adapte conforme a estrutura dos dados
          phone: slot.clientPhone || "N/A", // Adapte conforme a estrutura dos dados
        }));

        setAppointments(formattedAppointments);
      } catch (error) {
        console.error("Erro ao buscar os horários:", error);
      }
    }

    fetchAppointments();
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
                <strong>Barbeiro:</strong> {appointment.barber}
              </p>
              <p>
                <strong>Horário:</strong> {formatDateTime(appointment.time)}
              </p>
              <p>
                <strong>Cliente:</strong> {appointment.name}
              </p>
              <p>
                <strong>Email:</strong> {appointment.email}
              </p>
              <p>
                <strong>Telefone:</strong> {appointment.phone}
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
