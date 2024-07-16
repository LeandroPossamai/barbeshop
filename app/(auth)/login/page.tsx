"use-client";
import { LoginForm } from "./login-form";
import Link from "next/link";

export const metadata = {
  title: "Login",
};

export default function Login() {
  return (
    <div className="flex items-center justify-center h-screen flex-col bg-[url('/tesoura.jpg')] bg-cover bg-no-repeat bg-center">
      <div className="shadow-2xl rounded-md p-5 bg-white/75">
        <LoginForm />
        <div className="mt-4 text-center">
          <p className="text-sm">
            Não tem uma conta?{" "}
            <Link href="/register" className="text-blue-500 underline">
              Registre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
