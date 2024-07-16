"use client";

import { useUser } from "@/providers/user-provider";
import { redirect } from "next/navigation";
import { useState } from "react";

const Barbers = () => {
  const { user } = useUser();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para cadastrar o email e senha no servidor.
    console.log("Email:", email);
  };

  if (user?.role !== "Barber Shop") redirect("/");

  return (
    <div className="max-w-md mx-auto p-8 border border-gray-300 rounded-lg shadow-lg bg-white mt-10">
      <h1 className="text-center text-3xl mb-8 font-bold">
        Cadastro de Barbeiro
      </h1>
      <h2 className="text-center text-xl mb-6">
        Preencha as informações abaixo para cadastrar um novo barbeiro
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-700 font-medium"
        >
          Cadastrar Barbeiro
        </button>
      </form>
      <div>
        <ul>
          {user.barbers.map((barber) => (
            <li key={barber.id}>{barber.email}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Barbers;
