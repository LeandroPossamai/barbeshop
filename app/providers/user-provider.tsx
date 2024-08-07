import { useRouter } from "next/navigation"; // Importar o hook de roteamento
import { createContext, useContext, useState } from "react";
import { User } from "@/types/user";

interface UserContextProps {
  user?: User;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const UserContext = createContext({} as UserContextProps);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>();
  const router = useRouter(); // Hook de roteamento

  async function login(email: string, password: string) {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro no login");
      }

      setUser(data.user);
      localStorage.setItem("token", data.token);

      router.push("/ver-horarios"); // Redireciona após o login bem-sucedido
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  }

  function logout() {
    setUser(undefined);
    localStorage.removeItem("token");
    router.push("/"); // Redireciona para a home após logout
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
