"use client";
import { FaLock } from "react-icons/fa";
import { DiYeoman } from "react-icons/di";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    router.push("/");
  }

  return (
    <form onSubmit={handleSubmit} className="p-2 flex flex-col">
      <div className="flex gap-2 items-center ">
        <DiYeoman />
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="E-mail"
        />
      </div>
      <div className="flex gap-2 items-center ">
        <FaLock />
        <input
          type="password"
          id="password"
          value={password}
          placeholder="senha"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="">
        Login
      </button>
    </form>
  );
}
