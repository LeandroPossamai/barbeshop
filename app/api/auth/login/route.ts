import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '../../lib/mongodb';
import User from '../../models/User';
import { generateToken } from '../../lib/jwt'; // Certifique-se de que esta função está corretamente implementada

export async function POST(req: NextRequest) {
  let body;
  try {
    body = await req.json();
    console.log("Corpo da requisição recebido:", body);
  } catch (error) {
    console.log("Erro ao ler o corpo da requisição:", error);
    return new Response(JSON.stringify({ error: "Erro ao processar o corpo da requisição" }), {
      status: 400,
    });
  }

  await connectToDatabase();
  const { email, password } = body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("Usuário não encontrado:", email);
      return new Response(JSON.stringify({ error: "Usuário não encontrado" }), {
        status: 404,
      });
    }

    console.log("Usuário encontrado:", user);
    console.log("Senha fornecida:", password);
    console.log("Senha armazenada:", user.password);

    // Verifique se a senha fornecida corresponde à senha armazenada
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("Senha inválida para o usuário:", email);
      return new Response(JSON.stringify({ error: "Credenciais inválidas" }), {
        status: 401,
      });
    }

    // Geração do token de autenticação
    const token = generateToken({ id: user._id });
    console.log("Login bem-sucedido. Token gerado:", token);
    const response = JSON.stringify({ success: true, user, token });
    console.log("Resposta enviada:", response);

    // Retorne a resposta com o token de autenticação
    return new Response(response, {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.log("Erro durante o processo de login:", error);
    return new Response(JSON.stringify({ error: "Erro interno no servidor" }), { status: 500 });
  }
}
