'use client'
import { useState } from 'react'

import { Button } from '@/components/Button' // Importe o componente Button
import { useUser } from '@/providers/user-provider'

export default function SaveSlots() {
  const [slots, setSlots] = useState<string[]>([])
  const [newSlot, setNewSlot] = useState<string>('')
  const { user, logout } = useUser() // Supondo que você tenha a função logout no seu user-provider

  const handleAddSlot = () => {
    if (newSlot) {
      setSlots([...slots, newSlot])
      setNewSlot('')
    }
  }

  const handleSaveSlots = async () => {
    const date = slots.length > 0 ? new Date(slots[0]).toISOString().split('T')[0] : ''

    if (!user?._id || !date || slots.length === 0) {
      console.error('ID do barbeiro, data ou horários não definidos.')
      return
    }

    try {
      const response = await fetch('/api/listar-horario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          barberId: user._id,
          date,
          times: slots.map(slot => ({
            time: new Date(slot).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            }),
            isBooked: false
          }))
        })
      })

      if (response.ok) {
        console.log('Horários salvos com sucesso!')
        setSlots([]) // Limpa a lista de horários após o sucesso
      } else {
        console.error('Erro ao salvar horários.')
      }
    } catch (error) {
      console.error('Erro ao enviar requisição:', error)
    }
  }

  // Função para logout
  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' })
      logout() // Chama a função de logout do user-provider
    } catch (error) {
      console.error('Erro ao realizar logout:', error)
    }
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-md bg-white p-4 rounded-md shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Gerenciador de Horários</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="datetime-local"
            value={newSlot}
            onChange={e => setNewSlot(e.target.value)}
            className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button onClick={handleAddSlot}>Adicionar</Button>
        </div>

        <ul className="space-y-2 mb-4">
          {slots.map((slot, index) => (
            <li key={index} className="p-2 bg-gray-200 rounded-md text-gray-800">
              {new Date(slot).toLocaleString()}
            </li>
          ))}
        </ul>

        <Button
          onClick={handleSaveSlots}
          className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition"
        >
          Salvar Horários
        </Button>

        {/* Botão de logout */}
        <Button
          onClick={handleLogout}
          className="mt-4 w-full bg-red-500 text-white p-3 rounded-md hover:bg-red-600 transition"
        >
          Logout
        </Button>
      </div>
    </div>
  )
}
