import User from "../models/User";
import { connectToDatabase } from "../lib/mongodb";
import { type NextRequest } from "next/server";
import { generateToken } from "../lib/jwt";

export async function GET() {
  await connectToDatabase();
  const users = await User.find(); // Obtém todos os usuários do banco de dados
  return Response.json(users);
}

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const { name, email, password, role, number } = await req.json();

  try {
    const newUser = await User.create({ name, email, password, role, number }); // Cria o novo usuário
    const token = generateToken({ id: newUser._id });
    return new Response(JSON.stringify({ user: newUser, token }));
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 400 });
  }
}
