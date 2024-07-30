import React from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/Button";
import { DiYeoman } from "react-icons/di";
import { FaLock } from "react-icons/fa";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  email: Yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  password: Yup.string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .required("Senha é obrigatória"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "As senhas devem coincidir")
    .required("Confirmação de senha é obrigatória"),
});

export function RegisterForm() {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  async function handleSubmit(
    values: {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    },
    {
      resetForm,
    }: FormikHelpers<{
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    }>
  ) {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      });

      if (response.ok) {
        resetForm();
        alert("Usuário registrado com sucesso!");
      } else {
        const data = await response.json();
        alert(`Erro ao registrar usuário: ${data.message}`);
      }
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      alert(
        "Ocorreu um erro ao registrar o usuário. Por favor, tente novamente."
      );
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="p-4 flex flex-col space-y-4">
        <div className="flex items-center text-sm text-gray-800 space-x-2">
          <DiYeoman />
          <Field
            type="text"
            id="name"
            name="name"
            placeholder="Nome"
            className="flex-1 p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex items-center text-sm text-gray-800 space-x-2">
          <DiYeoman />
          <Field
            type="email"
            id="email"
            name="email"
            placeholder="E-mail"
            className="flex-1 p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex items-center text-sm text-gray-800 space-x-2">
          <FaLock />
          <Field
            type="password"
            id="password"
            name="password"
            placeholder="Senha"
            className="flex-1 p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex items-center text-sm text-gray-800 space-x-2">
          <FaLock />
          <Field
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirmar Senha"
            className="flex-1 p-2 border border-gray-300 rounded"
          />
        </div>
        <Button type="submit" className="custom-class">
          Registrar
        </Button>
      </Form>
    </Formik>
  );
}
