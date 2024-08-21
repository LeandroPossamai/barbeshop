'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/Button'
import { Carousel } from '@/components/Carousel'
import { cn } from '@/utils/cn'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

type Appointment = {
  time: string
  isBooked: boolean
  _id: string
}

export default function Agendamento() {
  const [selectedBarber, setSelectedBarber] = useState<string>('')
  const [availableSlots, setAvailableSlots] = useState<Appointment[]>([])
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (selectedBarber) {
      fetchAvailableSlots(selectedBarber)
    }
  }, [selectedBarber])

  async function fetchAvailableSlots(barberId: string) {
    setLoading(true)
    setError(null)
    try {
      const date = new Date().toISOString().split('T')[0] // Data no formato yyyy-mm-dd
      const response = await fetch(`/api/horario-disponivel?barberId=${barberId}&date=${date}`)

      // Log do status da resposta e dados recebidos
      console.log('Response status:', response.status)

      if (!response.ok) {
        throw new Error('Erro ao buscar horários disponíveis')
      }

      const data: Appointment[] = await response.json()
      console.log('Data received:', data) // Verifique os dados recebidos

      setAvailableSlots(data)
    } catch (error) {
      console.error('Erro ao buscar horários disponíveis:', error)
      setError('Erro ao buscar horários disponíveis')
    } finally {
      setLoading(false)
    }
  }

  const barbers = [
    {
      name: 'Danilo',
      image: '/danilo.jpeg',
      description: '10 anos de experiência em cortes clássicos.',
      id: '66bba5acddac395fde5fac32'
    },
    {
      name: 'Lucas',
      image: '/lucas.jpeg',
      description: 'Especialista em cortes modernos para homens.',
      id: '66bba5acddac395fde5fac32'
    },
    {
      name: 'Erik',
      image: '/erik.jpeg',
      description: 'Barbeiro especializado em cuidados de barba.',
      id: '66be2b08c411ad4269f08ed9'
    }
  ]

  function handleBarberSelect(barberId: string) {
    setSelectedBarber(barberId === selectedBarber ? '' : barberId)
    setSelectedTime('')
  }

  function handleTimeSelect(time: string) {
    setSelectedTime(time)
  }

  function handleConfirm() {
    if (selectedBarber && selectedTime) {
      const queryParams = new URLSearchParams({
        barber: selectedBarber,
        time: selectedTime
      }).toString()
      router.push(`/pre-cadastro?${queryParams}`)
    }
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Escolha seu barbeiro</h2>
      <div className="max-w-4xl mx-auto">
        <Carousel
          responsive={[
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 1000,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1
              }
            }
          ]}
        >
          {barbers.map(barber => (
            <div key={barber.id} className="flex w-fit flex-col items-center p-4">
              <div
                className={cn(
                  'relative w-64 h-64 rounded-lg overflow-hidden shadow-lg bg-white cursor-pointer',
                  selectedBarber === barber.id && 'border-4 border-blue-500'
                )}
                onClick={() => handleBarberSelect(barber.id)}
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
          <h3 className="text-2xl font-bold text-center mb-4">Selecione um horário</h3>
          {loading && <p className="text-center text-gray-500">Carregando...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          <div className="flex flex-wrap justify-center space-y-2">
            {availableSlots.length > 0 ? (
              availableSlots.map(slot => (
                <button
                  key={slot._id}
                  className={cn(
                    'p-2 border rounded-lg w-20 text-sm',
                    selectedTime === slot.time
                      ? 'bg-blue-500 text-white' // Estilo para botão selecionado
                      : 'bg-white text-gray-700' // Estilo para botão não selecionado
                  )}
                  onClick={() => handleTimeSelect(slot.time)}
                  disabled={slot.isBooked} // Desabilita botão se o horário estiver reservado
                >
                  {/* Exibindo o horário diretamente sem formatação */}
                  {slot.time}
                </button>
              ))
            ) : (
              <p className="text-center text-gray-500">Nenhum horário disponível</p>
            )}
          </div>
          <div className="text-center mt-4">
            <Button onClick={handleConfirm} disabled={!selectedTime}>
              Confirmar Agendamento
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
