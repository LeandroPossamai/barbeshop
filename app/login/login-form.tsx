"use client";
import { FaLock } from "react-icons/fa";
import { DiYeoman } from "react-icons/di";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../components/Button";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // Simulação de autenticação
    if (email === "danilo@gmail.com" && password === "1234") {
      router.push("/barbeiro/agenda");
    } else {
      alert("Credenciais inválidas!");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 flex flex-col space-y-4">
      <div className="flex items-center text-sm text-gray-800 space-x-2">
        <DiYeoman />
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="E-mail"
          className="flex-1 p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex items-center text-sm text-gray-800 space-x-2">
        <FaLock />
        <input
          type="password"
          id="password"
          value={password}
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
          required
          className="flex-1 p-2 border border-gray-300 rounded"
        />
      </div>
      <Button className="custom-class">Login</Button>
    </form>
  );
}
