"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Button } from "@/components/Button";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
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
      setError(error.message);
    }

    setSubmitting(false);
  }

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors }) => {
        const formError = Object.values(errors).filter((v) => v != null)[0];

        return (
          <Form noValidate className="p-4 flex flex-col space-y-4">
            <div className="flex items-center text-sm text-gray-800 space-x-2">
              <MdEmail />
              <Field
                type="email"
                name="email"
                required
                placeholder="E-mail"
                className="flex-1 p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center text-sm text-gray-800 space-x-2">
              <FaLock />
              <Field
                type="password"
                name="password"
                required
                placeholder="Senha"
                className="flex-1 p-2 border border-gray-300 rounded"
              />
            </div>
            {(error || formError) && (
              <div className="text-red-500 text-sm">{error || formError}</div>
            )}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="custom-class"
            >
              {isSubmitting ? "Enviando..." : "Login"}
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}
