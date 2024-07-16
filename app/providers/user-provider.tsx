import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface UserContextProps {
  user?: User;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const UserContext = createContext({} as UserContextProps);

const barberShopMock: User = {
  id: "admin",
  name: "Barbearia",
  email: "admin@gmail.com",
  role: "Barber Shop",
  barbers: [
    {
      id: "barber 1",
      name: "Barbearia",
      email: "barber1@gmail.com",
      role: "Barber",
      schedule: {},
      schedules: [],
    },
    {
      id: "barber 2",
      name: "Barbearia",
      email: "barber2@gmail.com",
      role: "Barber",
      schedule: {},
      schedules: [],
    },
  ],
};

const barberMock: User = {
  id: "barber1",
  name: "Barbearia",
  email: "barber1@gmail.com",
  role: "Barber",
  schedule: {},
  schedules: [],
};

export function UserProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || (token !== "admin" && token !== " barber")) return logout();

    setUser(token === "admin" ? barberShopMock : barberMock);
  }, []);

  async function login(email: string, password: string) {
    if (email === "admin@gmail.com" && password === "admin") {
      setUser(barberShopMock);
      localStorage.setItem("token", "admin");
      router.push("/barbers");
    } else if (email === "barber1@gmail.com" && password === "barber1") {
      setUser(barberMock);
      localStorage.setItem("token", "barber");
      router.push("/ver-horarios");
    } else {
      throw new Error("Credenciais inválidas!");
    }
  }

  function logout() {
    localStorage.removeItem("token");
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
