import { Carousel } from '@/components/Carousel'
import Image from 'next/image'

const beards = [
  {
    image: '/barba1.jpeg'
  },
  {
    image: '/barba2.jpeg'
  },
  {
    image: '/barba3.jpeg'
  },
  {
    image: '/barba5.jpeg'
  },
  {
    image: '/imagem4.jpeg'
  }
  // Adicione mais estilos de barba conforme necessário
]

export function Beards() {
  return (
    <section id="beards" className="py-16 bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-8">Barbas</h2>
      <div className="max-w-6xl mx-auto">
        <Carousel autoplay autoplaySpeed={5000}>
          {beards.map((service, index) => (
            <div key={index} className="flex flex-col items-center p-4">
              <div className="relative w-64 h-64 rounded-lg overflow-hidden shadow-lg bg-white">
                <Image
                  src={service.image}
                  alt={`Barba ${index + 1}`}
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
