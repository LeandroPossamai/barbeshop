"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Button } from "@/components/Button";
import { FaLock } from "react-icons/fa";
import { GiMustache } from "react-icons/gi";
import { useUser } from "@/providers/user-provider";

// Schema de validação com Yup
const validationSchema = Yup.object().shape({
  email: Yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  password: Yup.string()
    .min(5, "A senha deve ter no mínimo 5 caracteres")
    .required("Senha é obrigatória"),
});

// Componente LoginForm
export function LoginForm() {
  const { login } = useUser();
  const [error, setError] = useState("");

  async function handleSubmit(
    values: { email: string; password: string },
    { setSubmitting }: any
  ) {
    setSubmitting(true);
    setError("");

    try {
      await login(values.email, values.password);
    } catch (error: any) {
      setError(error.message || "Erro ao fazer login");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/fundo.jpg')" }}
    >
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => {
          const formError = Object.values(errors).filter((v) => v != null)[0];

          return (
            <Form
              noValidate
              className="p-6 bg-white rounded-lg shadow-md max-w-sm w-full"
            >
              <div className="flex items-center text-gray-700 space-x-2 mb-4">
                <GiMustache className="text-2xl" />
                <Field
                  type="email"
                  name="email"
                  required
                  placeholder="E-mail"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center text-gray-700 space-x-2 mb-4">
                <FaLock className="text-xl" />
                <Field
                  type="password"
                  name="password"
                  required
                  placeholder="Senha"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {(error || formError) && (
                <div className="text-red-500 text-sm mb-4">
                  {error || formError}
                </div>
              )}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {isSubmitting ? "Enviando..." : "Login"}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
