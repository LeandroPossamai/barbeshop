import Link from 'next/link'

export function Barbers() {
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

  return (
    <>
      <section id="barbers" className="p-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Conheça nossos barbeiros</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {barbers.map((barber, index) => (
              <div key={index} className="flex flex-col items-center">
                <img src={barber.image} alt={barber.name} className="w-48 h-48 object-cover rounded-full mb-4" />
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">{barber.name}</h3>
                  <p>{barber.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="book-appointment" className="bg-white flex items-center justify-center py-4">
        <Link
          href="/agendamento"
          className="bg-black hover:bg-gray-500 text-white px-8 py-4 shadow-lg transition duration-300 transform hover:scale-105"
        >
          Agende seu horário
        </Link>
      </section>
    </>
  )
}
