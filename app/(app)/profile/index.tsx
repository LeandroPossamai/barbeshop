"use client";

import { useUser } from "@/providers/user-provider";
import { redirect } from "next/navigation";

export function Profile() {
  const { user } = useUser();

  if (user?.role === "Barber Shop") return <BarberShopForm />;
  if (user?.role === "Barber") return <BarberForm />;
  else redirect("/");
}

function BarberForm() {
  return (
    <form>
      <label>caramba, que pinto enorme!!</label>
    </form>
  );
}

function BarberShopForm() {
  return (
    <form>
      <label>Dr. Nefario, tire minha calcinha!!</label>
    </form>
  );
}
