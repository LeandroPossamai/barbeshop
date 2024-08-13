"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";

type Appointment = {
  time: string;
  // Ajuste o tipo de appointment conforme os dados retornados pela API
  isBooked: boolean;
};

export default function ViewSlots() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const barberId = "66bba5acddac395fde5fac32"; // Substitua pelo ID correto
        const date = new Date().toISOString().split('T')[0]; // Data atual no formato YYYY-MM-DD
        const response = await fetch(`/api/horario-disponivel?barberId=${barberId}&date=${date}`);

        if (!response.ok) {
          throw new Error('Erro ao buscar horários');
        }

        const data = await response.json();
        console.log(data); // Verifique se os dados estão corretos
        setAppointments(data); // Atualiza o estado com os dados retornados
      } catch (error) {
        console.error(error);
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
                <strong>Horário:</strong> {formatDateTime(appointment.time)}
              </p>
              <p>
                <strong>Status:</strong> {appointment.isBooked ? 'Reservado' : 'Disponível'}
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
