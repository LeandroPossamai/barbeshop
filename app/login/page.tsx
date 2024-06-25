import { LoginForm } from "./login-form";

export default function Login() {
  return (
    <div className="flex items-center justify-center h-screen flex-col bg-[url('/barbearia.jpg')] bg-cover bg-no-repeat bg-center">
      <div className="shadow-2xl rounded-md p-5 bg-white/75">
        <LoginForm />
      </div>
    </div>
  );
}
