'use client'

import { useState } from 'react'

import { Carousel } from '@/components/Carousel'
import { cn } from '@/utils/cn'
import Image from 'next/image'

export default function Agendamento() {
  const [selectedBarber, setSelectedBarber] = useState('')

  const barbers = [
    {
      name: 'Danilo',
      image: '/danilo.jpeg',
      description: '10 anos de experiência em cortes clássicos.'
    },
    {
      name: 'Lucas',
      image: '/lucas.jpeg',
      description: 'Especialista em cortes modernos para homens.'
    },
    {
      name: 'Erik',
      image: '/erik.jpeg',
      description: 'Barbeiro especializado em cuidados de barba.'
    }
  ]

  function handleBarberSelect(barberName: string) {
    setSelectedBarber(barberName === selectedBarber ? '' : barberName)
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Escolha seu barbeiro</h2>
      <div className="max-w-4xl mx-auto">
        <Carousel>
          {barbers.map((barber, index) => (
            <div key={index} className="flex flex-col items-center p-4">
              <div
                className={cn(
                  'relative w-64 h-64 rounded-lg overflow-hidden shadow-lg bg-white cursor-pointer',
                  selectedBarber === barber.name && 'border-4 border-blue-500'
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
      {selectedBarber && <div>Faz alguma coisa com esse cara selecionado aqui: {selectedBarber}</div>}
    </div>
  )
}
