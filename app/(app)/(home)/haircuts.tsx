import { Carousel } from '@/components/Carousel'
import Image from 'next/image'

const haircuts = [
  {
    image: '/corte1.jpeg'
  },
  {
    image: '/corte2.jpeg'
  },
  {
    image: '/corte3.jpeg'
  },
  {
    image: '/corte4.jpeg'
  },
  {
    image: '/corte5.jpeg'
  },
  {
    image: '/corte6.jpeg'
  }
  // Adicione mais cortes de cabelo conforme necessário
]

export function Haircuts() {
  return (
    <section id="haircuts" className="py-16 bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-8">Nossos serviços</h2>
      <div className="max-w-6xl mx-auto">
        <Carousel autoplay autoplaySpeed={5000}>
          {haircuts.map((service, index) => (
            <div key={index} className="flex flex-col items-center p-4">
              <div className="relative w-64 h-64 rounded-lg overflow-hidden shadow-lg bg-white">
                <Image
                  src={service.image}
                  alt={`Corte ${index + 1}`}
                  width={256}
                  height={256}
                  layout="responsive"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  )
}
