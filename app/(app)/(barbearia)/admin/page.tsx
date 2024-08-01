import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-500 text-white py-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-xl font-bold mb-2 md:mb-0">Barbearia Cartacho</h1>
          <div className="flex items-center">
            <span className="mr-4">Olá, Danilo!</span>
            <button className="bg-red-500 px-4 py-2 rounded">Sair</button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-gray-700 font-bold mb-2">Total de Funcionários</h2>
            <p className="text-3xl font-semibold text-blue-500">2</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-gray-700 font-bold mb-2">Agendamentos do Dia</h2>
            <p className="text-3xl font-semibold text-green-500">15</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-gray-700 font-bold mb-2">Clientes Registrados</h2>
            <p className="text-3xl font-semibold text-purple-500">200</p>
          </div>
        </section>

        <section className="bg-white p-4 md:p-6 rounded-lg shadow mb-6">
          <h2 className="text-gray-700 font-bold mb-4">Próximos Agendamentos</h2>
          <ul>
            <li className="mb-4">
              <p className="font-semibold">Cliente: João Silva</p>
              <p>Horário: 14:00</p>
              <p>Barbeiro: Carlos</p>
            </li>
            <li className="mb-4">
              <p className="font-semibold">Cliente: Maria Souza</p>
              <p>Horário: 15:00</p>
              <p>Barbeiro: Pedro</p>
            </li>
            {/* Mais agendamentos */}
          </ul>
        </section>

        <section className="bg-white p-4 md:p-6 rounded-lg shadow mb-6">
          <h2 className="text-gray-700 font-bold mb-4">Gerenciamento de Funcionários</h2>
          <Link href="/cad-barbers">
            <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Adicionar Funcionário</button>
          </Link>
          <ul>
            <li className="mb-2">Carlos - <span className="text-sm text-gray-600">Editar | Remover</span></li>
            <li className="mb-2">Pedro - <span className="text-sm text-gray-600">Editar | Remover</span></li>
            {/* Mais funcionários */}
          </ul>
        </section>

        <section className="bg-white p-4 md:p-6 rounded-lg shadow">
          <h2 className="text-gray-700 font-bold mb-4">Gerenciamento de Serviços</h2>
          <Link href="/cad-services">
            <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Adicionar Serviço</button>
          </Link>
          <ul>
            <li className="mb-2">Corte de Cabelo - <span className="text-sm text-gray-600">Editar | Remover</span></li>
            <li className="mb-2">Barba - <span className="text-sm text-gray-600">Editar | Remover</span></li>
            {/* Mais serviços */}
          </ul>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>© 2024 Barbearia Cartacho - Todos os direitos reservados</p>
          <p>Endereço: Rua Augusto Stresser 1511, Bairro Juvevê, Curitiba</p>
        </div>
      </footer>
    </div>
  );
}
