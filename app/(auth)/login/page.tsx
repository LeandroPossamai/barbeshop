"use-client";
import { LoginForm } from "./login-form";
import Link from "next/link";

export const metadata = {
  title: "Login",
};

export default function Login() {
  return (
    <div className="flex items-center justify-center h-screen flex-col bg-[url('/tesoura.jpg')] bg-cover bg-no-repeat bg-center">
      <div>
        <LoginForm />
        <div className="mt-4 text-center">
        </div>
      </div>
    </div>
  );
}
