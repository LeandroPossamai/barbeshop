'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/Button'
import { useRouter } from 'next/navigation'

export default function ViewSlots() {
  const [slots, setSlots] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    // Simulação de fetch dos horários do backend/localStorage
    const savedSlots = JSON.parse(localStorage.getItem('barberSlots') || '[]')
    setSlots(savedSlots)
  }, [])

  function backToAgenda() {
    router.push('/agenda')
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Horários Marcados</h2>
      <ul className="w-full list-disc pl-5">
        {slots.length > 0 ? (
          slots.map((slot, index) => (
            <li key={index} className="p-2 border-b border-gray-300">
              {slot}
            </li>
          ))
        ) : (
          <li className="p-2">Nenhum horário marcado.</li>
        )}
      </ul>
      <Button onClick={backToAgenda}>Voltar à Agenda</Button>
    </div>
  )
}
