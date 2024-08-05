import bcrypt from 'bcryptjs'
import { type NextRequest } from 'next/server'
import User from '@/api/models/User'
import { connectToDatabase } from '@/api/lib/mongodb'

export async function POST(request: NextRequest) {
  try {
    console.log("Recebendo dados da requisição...");
    const { name, email, password } = await request.json();

    console.log("Conectando ao banco de dados...");
    await connectToDatabase();

    console.log("Verificando se o usuário já existe...");
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Usuário já cadastrado.");
      return new Response(JSON.stringify({ error: 'Email já cadastrado.' }), { status: 400 });
    }

    console.log("Criptografando a senha...");
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Criando novo usuário...");
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    console.log("Usuário criado com sucesso.");

    return new Response(null, { status: 303, headers: { Location: '/admin' } });

  } catch (error) {
    console.error("Erro ao processar a solicitação:", error);
    return new Response(JSON.stringify({ error: error.message || 'Erro ao criar usuário.' }), { status: 500 });
  }
}
